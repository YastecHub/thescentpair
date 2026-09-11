"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/analytics";

const topics = [
  "General enquiry",
  "Product question",
  "Gifting",
  "Wholesale",
  "Bespoke request",
  "Delivery question",
];

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  // eslint-disable-next-line react-hooks/purity -- Date.now() is stored in a ref for anti-spam timing, not used in render output
  const mountedAt = useRef(Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setServerError("");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      _hp: String(data.get("_hp") ?? ""),
      _ts: Date.now() - mountedAt.current,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (res.ok) {
        setState("success");
        trackEvent("enquiry_submit", { topic: payload.topic });
        form.reset();
      } else if (res.status === 422 && json.fieldErrors) {
        setFieldErrors(json.fieldErrors);
        setState("error");
      } else {
        setServerError(
          json.error ?? "Something went wrong. Please try WhatsApp instead.",
        );
        setState("error");
      }
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="border border-onyx-700 bg-onyx-900 p-8 text-center"
        role="status"
      >
        <p className="font-display text-2xl text-foil">Message received.</p>
        <p className="mt-3 text-sm text-parchment/68">
          We&apos;ll respond as quickly as possible. For urgent questions,
          WhatsApp is faster.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-gold-300 underline underline-offset-4 hover:text-gold-100"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact enquiry form"
    >
      {/* Honeypot  hidden from real users */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      <label
        className="grid gap-2 text-sm font-semibold text-parchment"
        htmlFor="contact-name"
      >
        Name
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment placeholder:text-parchment/40 focus:border-gold-300 focus:outline-none"
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          aria-invalid={Boolean(fieldErrors.name)}
        />
        {fieldErrors.name ? (
          <span
            id="contact-name-error"
            role="alert"
            className="text-xs text-gold-300"
          >
            {fieldErrors.name[0]}
          </span>
        ) : null}
      </label>

      <label
        className="grid gap-2 text-sm font-semibold text-parchment"
        htmlFor="contact-contact"
      >
        Email or phone
        <input
          id="contact-contact"
          name="contact"
          autoComplete="email"
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment placeholder:text-parchment/40 focus:border-gold-300 focus:outline-none"
          aria-describedby={
            fieldErrors.contact ? "contact-contact-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.contact)}
        />
        {fieldErrors.contact ? (
          <span
            id="contact-contact-error"
            role="alert"
            className="text-xs text-gold-300"
          >
            {fieldErrors.contact[0]}
          </span>
        ) : null}
      </label>

      <label
        className="grid gap-2 text-sm font-semibold text-parchment"
        htmlFor="contact-topic"
      >
        Enquiry topic
        <select
          id="contact-topic"
          name="topic"
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment focus:border-gold-300 focus:outline-none"
        >
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label
        className="grid gap-2 text-sm font-semibold text-parchment"
        htmlFor="contact-message"
      >
        Message
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="border border-onyx-700 bg-onyx-900 px-4 py-3 text-parchment placeholder:text-parchment/40 focus:border-gold-300 focus:outline-none"
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message ? (
          <span
            id="contact-message-error"
            role="alert"
            className="text-xs text-gold-300"
          >
            {fieldErrors.message[0]}
          </span>
        ) : null}
      </label>

      {serverError ? (
        <p role="alert" className="text-sm text-gold-300">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 bg-gold-300 px-6 py-3 type-button text-ink-900 transition-opacity disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
