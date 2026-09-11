import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/typography/typography";
import { GoldRule } from "@/components/ui/gold-rule";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Terms & Ordering Guidance",
  description:
    "Terms of use and ordering guidance for His & Her's Scents including WhatsApp ordering, delivery, returns and authenticity.",
  path: "/legal/terms",
});

// [DRAFT] This terms document requires client and legal review before launch.

export default function TermsPage() {
  return (
    <article aria-labelledby="terms-title">
      <Section
        labelledBy="terms-title"
        className="bg-parchment text-ink-900 light-surface"
      >
        <div className="max-w-readable">
          <Eyebrow className="text-gold-700">Legal</Eyebrow>
          <h1 id="terms-title" className="type-page-heading mt-4">
            Terms &amp; Ordering Guidance
          </h1>

          <p className="mt-4 text-sm text-ink-600">
            Last reviewed: [PENDING: Insert effective date before launch]
          </p>

          <GoldRule className="my-10" />

          <div className="grid gap-10 text-body text-ink-600 leading-relaxed">
            <div className="border-l-2 border-gold-700 pl-6 py-2 bg-gold-100/30">
              <p className="text-sm font-semibold text-ink-900">Draft notice</p>
              <p className="mt-2 text-sm">
                These terms are a draft structure prepared for review. They do
                not constitute a final legal document. All sections marked
                [PENDING] require client information, legal review and approval
                before this page can be published.
              </p>
            </div>

            <section aria-labelledby="terms-general">
              <h2
                id="terms-general"
                className="type-section-heading mb-4 text-ink-900"
              >
                About this website
              </h2>
              <p>
                This website is operated by His &amp; Her&apos;s Scents at
                thescentpair.com. By using this website, you agree to these
                terms. [PENDING: Legal company name and registered details]
              </p>
            </section>

            <section aria-labelledby="terms-ordering">
              <h2
                id="terms-ordering"
                className="type-section-heading mb-4 text-ink-900"
              >
                How to order
              </h2>
              <p>
                Orders are placed via WhatsApp conversation. When you initiate
                an order:
              </p>
              <ul className="mt-4 grid gap-2 list-disc pl-6">
                <li>
                  You select your fragrance and size on the product page and tap
                  &ldquo;Order on WhatsApp&rdquo;
                </li>
                <li>
                  A brand representative will confirm the item, availability and
                  total price before payment
                </li>
                <li>
                  Payment details will be provided by the brand representative
                  [PENDING: payment methods accepted]
                </li>
                <li>Your order is confirmed once payment is received</li>
              </ul>
            </section>

            <section aria-labelledby="terms-pricing">
              <h2
                id="terms-pricing"
                className="type-section-heading mb-4 text-ink-900"
              >
                Pricing
              </h2>
              <p>
                All prices shown on this website are in Nigerian Naira (₦).
                Prices are inclusive of product cost. Delivery charges, where
                applicable, will be confirmed at the time of ordering.
              </p>
              <p className="mt-4">
                We reserve the right to adjust prices at any time. The price
                confirmed at the point of your WhatsApp order is the price you
                will be charged.
              </p>
            </section>

            <section aria-labelledby="terms-delivery">
              <h2
                id="terms-delivery"
                className="type-section-heading mb-4 text-ink-900"
              >
                Delivery
              </h2>
              <p>
                [PENDING: Delivery policy including: zones covered, estimated
                timeframes, courier partners, handling for failed deliveries and
                risk of loss]
              </p>
            </section>

            <section aria-labelledby="terms-returns">
              <h2
                id="terms-returns"
                className="type-section-heading mb-4 text-ink-900"
              >
                Returns and exchanges
              </h2>
              <p>
                Due to the nature of fragrance products, opened and used bottles
                cannot be accepted for return or exchange unless the product is
                faulty or was incorrectly supplied.
              </p>
              <p className="mt-4">
                [PENDING: Final returns window for unopened items, process for
                faulty goods and any applicable statutory consumer rights in the
                operating jurisdiction]
              </p>
            </section>

            <section aria-labelledby="terms-authenticity">
              <h2
                id="terms-authenticity"
                className="type-section-heading mb-4 text-ink-900"
              >
                Product authenticity
              </h2>
              <p>
                All fragrances sold by His &amp; Her&apos;s Scents are original
                formulations created exclusively for the brand. Each product is
                supplied sealed and in original packaging.
              </p>
              <p className="mt-4">
                [PENDING: Any certification or authentication statements to be
                verified by the brand before publication]
              </p>
            </section>

            <section aria-labelledby="terms-liability">
              <h2
                id="terms-liability"
                className="type-section-heading mb-4 text-ink-900"
              >
                Limitation of liability
              </h2>
              <p>
                [PENDING: Limitation of liability clause to be provided by legal
                counsel before launch]
              </p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2
                id="terms-contact"
                className="type-section-heading mb-4 text-ink-900"
              >
                Contact
              </h2>
              <p>
                For any questions about these terms, please contact us via our
                enquiry form or WhatsApp. [PENDING: postal or legal contact
                address]
              </p>
            </section>
          </div>
        </div>
      </Section>
    </article>
  );
}
