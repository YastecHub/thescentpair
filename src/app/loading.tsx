import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <Container className="py-24">
      <div
        className="animate-pulse space-y-6"
        aria-label="Loading…"
        role="status"
      >
        {/* Eyebrow */}
        <div className="h-3 w-24 rounded bg-onyx-700" />
        {/* Heading */}
        <div className="h-8 w-64 rounded bg-onyx-700" />
        {/* Body lines */}
        <div className="space-y-3 pt-2">
          <div className="h-4 w-full max-w-prose rounded bg-onyx-700" />
          <div className="h-4 w-5/6 max-w-prose rounded bg-onyx-700" />
          <div className="h-4 w-4/6 max-w-prose rounded bg-onyx-700" />
        </div>
        {/* Card grid */}
        <div className="grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/5] rounded bg-onyx-700" />
          ))}
        </div>
      </div>
    </Container>
  );
}
