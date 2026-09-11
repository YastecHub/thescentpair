import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQAccordion } from "@/components/contact/faq-accordion";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact & Enquiries",
  description:
    "Get in touch with His & Her's Scents for product questions, gifting, wholesale or general enquiries. WhatsApp ordering support available.",
  path: "/contact",
});

// [PENDING CLIENT CONTENT] Replace placeholders when final details are approved
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? null;
const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? null;
const TIKTOK_HANDLE = process.env.NEXT_PUBLIC_TIKTOK_HANDLE ?? null;
const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL ?? null;
const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? null;

export default function ContactPage() {
  const channels = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      description:
        "The primary ordering channel. Message us to confirm availability, place an order or ask about a fragrance.",
      href: WHATSAPP_NUMBER
        ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
        : null,
      display: WHATSAPP_NUMBER ?? "[PENDING: WhatsApp number]",
      available: Boolean(WHATSAPP_NUMBER),
    },
    {
      id: "instagram",
      label: "Instagram",
      description:
        "Follow the brand for new launches, editorial content and scent stories.",
      href: INSTAGRAM_HANDLE
        ? `https://instagram.com/${INSTAGRAM_HANDLE}`
        : null,
      display: INSTAGRAM_HANDLE
        ? `@${INSTAGRAM_HANDLE}`
        : "[PENDING: Instagram handle]",
      available: Boolean(INSTAGRAM_HANDLE),
    },
    {
      id: "tiktok",
      label: "TikTok",
      description:
        "Short-form fragrance content, behind-the-scenes and scent education.",
      href: TIKTOK_HANDLE ? `https://tiktok.com/@${TIKTOK_HANDLE}` : null,
      display: TIKTOK_HANDLE ? `@${TIKTOK_HANDLE}` : "[PENDING: TikTok handle]",
      available: Boolean(TIKTOK_HANDLE),
    },
    {
      id: "twitter",
      label: "Twitter / X",
      description:
        "Follow along for launch updates, fragrance thoughts and brand news.",
      href: TWITTER_URL,
      display: TWITTER_URL ? "@thescentpair" : "[PENDING: Twitter / X profile]",
      available: Boolean(TWITTER_URL),
    },
    {
      id: "email",
      label: "Email",
      description:
        "For wholesale enquiries, bespoke requests and press. Response time: 1–3 business days.",
      href: EMAIL_ADDRESS ? `mailto:${EMAIL_ADDRESS}` : null,
      display: EMAIL_ADDRESS ?? "[PENDING: Email address]",
      available: Boolean(EMAIL_ADDRESS),
    },
  ];

  return (
    <>
      <Section labelledBy="contact-title">
        <div className="max-w-readable">
          <Eyebrow>Contact &amp; enquiries</Eyebrow>
          <h1 id="contact-title" className="type-page-heading mt-4 text-foil">
            Start the fragrance conversation.
          </h1>
          <BodyText className="mt-5 type-supporting">
            Whether you have a question about a scent, want to place an order or
            are exploring something bespoke  we&apos;re here.
          </BodyText>
        </div>
      </Section>

      {/* Contact channels */}
      <Section labelledBy="channels-title" className="bg-onyx-800">
        <Eyebrow>Find us</Eyebrow>
        <h2 id="channels-title" className="type-section-heading mt-4 text-foil">
          How to reach us.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="group relative overflow-hidden border border-onyx-700 bg-onyx-900 p-5 transition-colors hover:border-gold-300/50 md:p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent opacity-70"
                aria-hidden="true"
              />
              <p className="type-eyebrow text-gold-300">{channel.label}</p>
              <p className="mt-3 text-sm text-parchment/68 leading-relaxed">
                {channel.description}
              </p>
              <div className="mt-5">
                {channel.available && channel.href ? (
                  <a
                    href={channel.href}
                    className="text-sm font-semibold text-gold-300 underline underline-offset-4 hover:text-gold-100"
                    target={channel.id !== "email" ? "_blank" : undefined}
                    rel={
                      channel.id !== "email" ? "noopener noreferrer" : undefined
                    }
                  >
                    {channel.display}
                  </a>
                ) : (
                  <p className="text-sm text-parchment/45 italic">
                    {channel.display}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Enquiry form */}
      <Section labelledBy="enquiry-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>Enquiry form</Eyebrow>
            <h2
              id="enquiry-title"
              className="type-section-heading mt-4 text-foil"
            >
              Send us a message.
            </h2>
            <BodyText className="mt-5 type-supporting">
              Fill in the form and we&apos;ll respond as quickly as possible.
              For time-sensitive questions, WhatsApp is faster.
            </BodyText>
            <p className="mt-4 text-sm text-parchment/45 italic">
              Note: the form endpoint is not yet connected. Validation is live
              for review.
            </p>
          </div>
          <div className="border border-onyx-700 bg-onyx-800 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section labelledBy="faq-title" className="bg-onyx-800">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>Frequently asked</Eyebrow>
            <h2 id="faq-title" className="type-section-heading mt-4 text-foil">
              Common questions.
            </h2>
            <BodyText className="mt-5 type-supporting">
              Answers to the most common questions about ordering, delivery,
              fragrance longevity and application.
            </BodyText>
          </div>
          <div>
            <FAQAccordion />
          </div>
        </div>
      </Section>
    </>
  );
}
