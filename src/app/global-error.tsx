"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#080706",
          color: "#f7f4ed",
          fontFamily: "sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "36rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d9bc6a",
              marginBottom: "1rem",
            }}
          >
            His &amp; Her&apos;s Scents
          </p>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            An unexpected error occurred.
          </h1>
          <p style={{ color: "rgba(247,244,237,0.6)", marginBottom: "2rem" }}>
            Please refresh the page or contact us on WhatsApp if the problem
            persists.
          </p>
          {error.digest ? (
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "rgba(247,244,237,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              Ref: {error.digest}
            </p>
          ) : null}
          <button
            onClick={reset}
            style={{
              border: "1px solid #d9bc6a",
              background: "transparent",
              color: "#d9bc6a",
              padding: "0.625rem 1.5rem",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
