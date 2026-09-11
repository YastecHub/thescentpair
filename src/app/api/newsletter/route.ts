import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address.").max(254),
  // Honeypot  must be empty
  _hp: z.string().max(0, "Bot detected."),
  // Time-to-submit in ms  must be > 2s
  _ts: z.coerce.number().min(2000, "Submission too fast."),
});

// Simple in-memory rate limiter: max 3 signups per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
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

async function subscribeViaAdapter(email: string): Promise<void> {
  const endpoint = process.env.FORM_ENDPOINT;
  const apiKey = process.env.NEWSLETTER_API_KEY;

  // Adapter 1: Generic form endpoint (Formspree, Basin, etc.)
  if (endpoint) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, list: "newsletter" }),
    });
    if (!res.ok) throw new Error(`Newsletter endpoint returned ${res.status}`);
    return;
  }

  // No provider configured  log in dev, silently succeed in prod
  if (process.env.NODE_ENV === "development") {
    console.info("[newsletter] No provider configured. Email:", email);
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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors },
      { status: 422 },
    );
  }

  try {
    await subscribeViaAdapter(parsed.data.email);
  } catch (err) {
    console.error("[newsletter] Subscribe failed:", err);
    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
