"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { GoldRule } from "@/components/ui/gold-rule";
import { ButtonLink } from "@/components/ui/button-link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <Container className="flex min-h-[85vh] items-center py-24">
      <section aria-labelledby="error-title" className="w-full max-w-2xl">
        <GoldRule className="max-w-xs" />

        <p className="mt-8 type-eyebrow text-gold-300">Something went wrong</p>

        <h1
          id="error-title"
          className="mt-4 type-page-heading text-foil max-w-[22ch]"
        >
          The experience encountered an error.
        </h1>

        <p className="mt-6 max-w-prose text-body type-supporting">
          We apologise for the interruption. You can try again or return to the
          collection.
        </p>

        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-parchment/40">
            Ref: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 bg-gold-300 px-6 py-3 font-sans text-sm font-semibold tracking-wider text-ink-900 transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/collection">Browse the collection</ButtonLink>
        </div>
      </section>
    </Container>
  );
}
