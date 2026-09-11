import React from "react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/typography/typography";
import { ButtonLink } from "@/components/ui/button-link";

export function ArtOfGifting({ className = "" }: { className?: string }) {
  return (
    <Section
      labelledBy="gifting-title"
      className={`border-t border-onyx-700 bg-onyx-900 text-parchment ${className}`}
    >
      <div className="max-w-3xl">
        {/* Left: Editorial & Promises */}
        <div className="max-w-xl">
          <Eyebrow className="text-gold-300">The Art of Gifting</Eyebrow>
          <h2
            id="gifting-title"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foil"
          >
            A gesture of devotion, sealed in gold.
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-parchment/80">
            Inspired by the grand French parfumeries and the intimate tradition of romantic gift-giving, every HIS &amp; HER’S order arrives as a complete sensory ceremony.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-300/60 bg-gold-500/10 text-xs font-serif text-gold-300">
                01
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-parchment">
                  The Dual Coffret
                </h3>
                <p className="mt-1 text-xs text-parchment/65 leading-relaxed">
                  Rigid Onyx collector’s box lined with midnight velvet, hot-stamped with the royal HSH crest.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-300/60 bg-gold-500/10 text-xs font-serif text-gold-300">
                02
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-parchment">
                  The Handwritten Dedication
                </h3>
                <p className="mt-1 text-xs text-parchment/65 leading-relaxed">
                  Heavy deckle-edged parchment card inscribed with your personal message and sealed in gold foil.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-300/60 bg-gold-500/10 text-xs font-serif text-gold-300">
                03
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-parchment">
                  Concierge Delivery &amp; Surprises
                </h3>
                <p className="mt-1 text-xs text-parchment/65 leading-relaxed">
                  Discreet personal coordination on WhatsApp. Exact delivery timing, gift wrapping, and receipt concealment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink
              href="https://wa.me/2348000000000?text=Hello%20His%20%26%20Her%27s%20Scents%2C%20I%20would%20like%20to%20arrange%20a%20gift%20order%20for%20my%20partner."
              variant="primary"
            >
              Order via Gift Concierge
            </ButtonLink>
            <ButtonLink href="/pairs">
              Explore Pair Sets
            </ButtonLink>
          </div>
        </div>

      </div>
    </Section>
  );
}
