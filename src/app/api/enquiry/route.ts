import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required.").max(120),
  contact: z
    .string()
    .min(1, "Email or phone is required.")
    .max(200)
    .refine(
      (v) => v.includes("@") || v.replace(/\D/g, "").length >= 7,
      "Enter a valid email address or phone number.",
    ),
  topic: z.string().min(1),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000),
  // Honeypot — must be empty
  _hp: z.string().max(0, "Bot detected."),
  // Time-to-submit in ms — must be > 3s to filter instant bots
  _ts: z.coerce.number().min(3000, "Submission too fast."),
});

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

async function sendViaAdapter(data: {
  name: string;
  contact: string;
  topic: string;
  message: string;
}): Promise<void> {
  const endpoint = process.env.FORM_ENDPOINT;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  // Adapter 1: Generic form endpoint (e.g. Formspree, Basin)
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
    return;
  }

  // Adapter 2: Resend transactional email
  if (resendKey && recipient) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "His & Her's Scents <noreply@thescentpair.com>",
        to: [recipient],
        subject: `Enquiry: ${data.topic} — ${data.name}`,
        text: `Name: ${data.name}\nContact: ${data.contact}\nTopic: ${data.topic}\n\n${data.message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend returned ${res.status}`);
    return;
  }

  // No provider configured — log in dev, silently succeed in prod
  if (process.env.NODE_ENV === "development") {
    console.info("[enquiry] No provider configured. Payload:", data);
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors },
      { status: 422 },
    );
  }

  const { name, contact, topic, message } = parsed.data;

  try {
    await sendViaAdapter({ name, contact, topic, message });
  } catch (err) {
    console.error("[enquiry] Send failed:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try WhatsApp instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
