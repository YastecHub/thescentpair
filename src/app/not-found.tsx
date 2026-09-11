import { Container } from "@/components/layout/container";
import { GoldRule } from "@/components/ui/gold-rule";
import { ButtonLink } from "@/components/ui/button-link";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function NotFound() {
  return (
    <Container className="flex min-h-[85vh] items-center py-24">
      <section aria-labelledby="not-found-title" className="w-full max-w-2xl">
        {/* Brand mark */}
        <BrandLogo variant="mark" className="h-16 w-16" />

        <GoldRule className="mt-8 max-w-xs" />

        <p className="mt-8 type-eyebrow text-gold-300">404</p>

        <h1
          id="not-found-title"
          className="mt-4 type-page-heading text-foil max-w-[18ch]"
        >
          This trail has faded.
        </h1>

        <p className="mt-6 max-w-prose text-body type-supporting">
          Return to the collection and find your signature.
        </p>

        <p className="mt-3 text-sm text-parchment/45">
          The page you were looking for is not available.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary">
            Return home
          </ButtonLink>
          <ButtonLink href="/collection">
            Browse the collection
          </ButtonLink>
          <ButtonLink href="/pairs">
            Explore pairs
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
