"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  /** When true, renders a compact horizontal layout without the heading label or verbose help text. Intended for footer use. */
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  // Use a unique ID suffix to avoid duplicate ids when rendered on the same page
  const idSuffix = compact ? "footer" : "main";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setState("error");
      return;
    }

    setState("loading");
    window.setTimeout(() => setState("success"), 250);
  }

  if (compact) {
    return (
      <form
        className="grid gap-3"
        onSubmit={handleSubmit}
        aria-label="Mailing list signup"
      >
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <label className="sr-only" htmlFor={`newsletter-email-${idSuffix}`}>
            Email address
          </label>
          <input
            id={`newsletter-email-${idSuffix}`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-11 flex-1 border border-onyx-700 bg-onyx-800 px-4 text-sm text-parchment placeholder:text-parchment/45"
            placeholder="your@email.com"
            aria-describedby={`newsletter-status-${idSuffix}`}
          />
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 px-5 type-button text-sm text-gold-300 transition-colors hover:bg-gold-300 hover:text-ink-900 disabled:opacity-60"
            disabled={state === "loading" || state === "success"}
            type="submit"
          >
            {state === "loading"
              ? "…"
              : state === "success"
                ? "✓ Joined"
                : "Join"}
          </button>
        </div>
        <p
          id={`newsletter-status-${idSuffix}`}
          className="min-h-4 text-xs text-gold-300"
          aria-live="polite"
        >
          {state === "success" ? "You're on the list." : null}
          {state === "error" ? "Please enter a valid email." : null}
        </p>
      </form>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={handleSubmit}
      aria-label="Mailing list signup"
    >
      <div className="grid gap-2">
        <label
          className="text-sm font-semibold text-parchment"
          htmlFor={`newsletter-email-${idSuffix}`}
        >
          Email address
        </label>
        <input
          id={`newsletter-email-${idSuffix}`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment placeholder:text-parchment/45"
          placeholder="you@example.com"
          aria-describedby={`newsletter-help-${idSuffix} newsletter-status-${idSuffix}`}
        />
      </div>
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 bg-gold-300 px-6 py-3 type-button text-ink-900 disabled:opacity-60"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" ? "Preparing" : "Join the list"}
      </button>
      <p
        id={`newsletter-help-${idSuffix}`}
        className="text-sm text-parchment/58"
      >
        Reserved for launch announcements and first access. No remote
        subscription is sent until the provider is configured.
      </p>
      <p
        id={`newsletter-status-${idSuffix}`}
        className="min-h-6 text-sm text-gold-300"
        aria-live="polite"
      >
        {state === "success"
          ? "Demo state: the form is ready, but the mailing-list provider is not connected yet."
          : null}
        {state === "error"
          ? "Enter a valid email address to preview the signup state."
          : null}
      </p>
    </form>
  );
}
