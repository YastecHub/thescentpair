"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/analytics";

type FormState = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  compact?: boolean;
  source?: string;
}

export function NewsletterForm({
  compact = false,
  source = "unknown",
}: NewsletterFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // eslint-disable-next-line react-hooks/purity -- Date.now() is stored in a ref for anti-spam timing, not used in render output
  const mountedAt = useRef(Date.now());
  const idSuffix = compact ? "footer" : "main";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMsg("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    if (!email || !email.includes("@")) {
      setErrorMsg("Enter a valid email address.");
      setState("error");
      return;
    }

    const payload = {
      email,
      _hp: String(data.get("_hp") ?? ""),
      _ts: Date.now() - mountedAt.current,
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok) {
        setState("success");
        trackEvent("list_signup", { source });
      } else {
        setErrorMsg(json.error ?? "Signup failed. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  const statusId = `newsletter-status-${idSuffix}`;

  if (compact) {
    return (
      <form
        className="grid gap-3"
        onSubmit={handleSubmit}
        aria-label="Mailing list signup"
      >
        {/* Honeypot */}
        <input
          name="_hp"
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          autoComplete="off"
        />

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <label className="sr-only" htmlFor={`newsletter-email-${idSuffix}`}>
            Email address
          </label>
          <input
            id={`newsletter-email-${idSuffix}`}
            name="email"
            type="email"
            autoComplete="email"
            disabled={state === "success"}
            className="min-h-11 flex-1 border border-onyx-700 bg-onyx-800 px-4 text-sm text-parchment placeholder:text-parchment/45 focus:border-gold-300 focus:outline-none disabled:opacity-60"
            placeholder="your@email.com"
            aria-describedby={statusId}
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
          id={statusId}
          className="min-h-4 text-xs text-gold-300"
          aria-live="polite"
        >
          {state === "success" ? "You're on the list." : null}
          {state === "error" ? errorMsg : null}
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
      {/* Honeypot */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      <div className="grid gap-2">
        <label
          className="text-sm font-semibold text-parchment"
          htmlFor={`newsletter-email-${idSuffix}`}
        >
          Email address
        </label>
        <input
          id={`newsletter-email-${idSuffix}`}
          name="email"
          type="email"
          autoComplete="email"
          disabled={state === "success"}
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment placeholder:text-parchment/45 focus:border-gold-300 focus:outline-none disabled:opacity-60"
          placeholder="you@example.com"
          aria-describedby={`newsletter-help-${idSuffix} ${statusId}`}
        />
      </div>

      <button
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 bg-gold-300 px-6 py-3 type-button text-ink-900 disabled:opacity-60"
        disabled={state === "loading" || state === "success"}
        type="submit"
      >
        {state === "loading"
          ? "Preparing…"
          : state === "success"
            ? "You're on the list"
            : "Join the list"}
      </button>

      <p
        id={`newsletter-help-${idSuffix}`}
        className="text-sm text-parchment/58"
      >
        First access to new pairs and scent stories. Unsubscribe any time.
      </p>

      <p
        id={statusId}
        className="min-h-6 text-sm text-gold-300"
        aria-live="polite"
      >
        {state === "error" ? errorMsg : null}
      </p>
    </form>
  );
}
