import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/typography/typography";
import { GoldRule } from "@/components/ui/gold-rule";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How His & Her's Scents collects, uses and protects your personal information.",
  path: "/legal/privacy",
});

// [DRAFT] This privacy policy requires client and legal review before launch.
// Fields marked [PENDING] need final information from the client.

export default function PrivacyPage() {
  return (
    <article aria-labelledby="privacy-title">
      <Section labelledBy="privacy-title" className="bg-parchment text-ink-900 light-surface">
        <div className="max-w-readable">
          <Eyebrow className="text-gold-700">Legal</Eyebrow>
          <h1 id="privacy-title" className="type-page-heading mt-4">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-ink-600">
            Last reviewed: [PENDING: Insert effective date before launch]
          </p>

          <GoldRule className="my-10" />

          <div className="grid gap-10 text-body text-ink-600 leading-relaxed">
            <div className="border-l-2 border-gold-700 pl-6 py-2 bg-gold-100/30">
              <p className="text-sm font-semibold text-ink-900">
                Draft notice
              </p>
              <p className="mt-2 text-sm">
                This privacy policy is a draft structure prepared for review.
                It does not constitute a final legal document. All sections
                marked [PENDING] require client information, legal review and
                approval before this page can be published.
              </p>
            </div>

            <section aria-labelledby="privacy-who">
              <h2 id="privacy-who" className="type-section-heading mb-4 text-ink-900">
                Who we are
              </h2>
              <p>
                His &amp; Her&apos;s Scents is a fragrance brand operating at
                thescentpair.com. [PENDING: Legal company name, registration
                number and registered address]
              </p>
              <p className="mt-4">
                If you have questions about this policy, contact us at:{" "}
                [PENDING: privacy contact email or postal address]
              </p>
            </section>

            <section aria-labelledby="privacy-collect">
              <h2 id="privacy-collect" className="type-section-heading mb-4 text-ink-900">
                What information we collect
              </h2>
              <p>
                We may collect the following information when you use this
                website or contact us:
              </p>
              <ul className="mt-4 grid gap-2 list-disc pl-6">
                <li>Your name and email address if you sign up for our mailing list</li>
                <li>Your name, email, phone number and message if you submit an enquiry</li>
                <li>Order details when you place an order via WhatsApp</li>
                <li>
                  Usage data collected automatically if analytics are enabled
                  [PENDING: analytics provider and data collected]
                </li>
              </ul>
            </section>

            <section aria-labelledby="privacy-use">
              <h2 id="privacy-use" className="type-section-heading mb-4 text-ink-900">
                How we use your information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-4 grid gap-2 list-disc pl-6">
                <li>Process and fulfil your orders</li>
                <li>Respond to enquiries</li>
                <li>Send launch announcements and mailing-list updates, if you opted in</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent or share your personal information with
                third parties for their own marketing purposes.
              </p>
            </section>

            <section aria-labelledby="privacy-storage">
              <h2 id="privacy-storage" className="type-section-heading mb-4 text-ink-900">
                How we store your data
              </h2>
              <p>
                [PENDING: Describe data storage approach, jurisdiction and
                security measures once technical infrastructure is confirmed]
              </p>
            </section>

            <section aria-labelledby="privacy-rights">
              <h2 id="privacy-rights" className="type-section-heading mb-4 text-ink-900">
                Your rights
              </h2>
              <p>
                Depending on your location, you may have rights including:
              </p>
              <ul className="mt-4 grid gap-2 list-disc pl-6">
                <li>The right to access the personal data we hold about you</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at: [PENDING:
                contact details]
              </p>
            </section>

            <section aria-labelledby="privacy-cookies">
              <h2 id="privacy-cookies" className="type-section-heading mb-4 text-ink-900">
                Cookies
              </h2>
              <p>
                [PENDING: Describe cookie usage, third-party services and
                consent mechanism once analytics and form providers are
                confirmed]
              </p>
            </section>

            <section aria-labelledby="privacy-changes">
              <h2 id="privacy-changes" className="type-section-heading mb-4 text-ink-900">
                Changes to this policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Any
                changes will be posted on this page with an updated review
                date. We recommend checking this page periodically.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </article>
  );
}
