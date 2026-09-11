import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/components/navigation/nav-links";
import { GoldRule } from "@/components/ui/gold-rule";
import { TextLink } from "@/components/ui/text-link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { FooterClose } from "@/components/motion/footer-close";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-onyx-700 bg-onyx-900"
      aria-labelledby="footer-title"
    >
      <Container className="py-16">
        <GoldRule />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <BrandLogo variant="footer" className="mb-4" />
            <p className="mt-3 type-quote text-parchment">
              Signature scents, made for two.
            </p>
            <p className="mt-5 max-w-readable text-sm text-parchment/62">
              A premium fragrance experience prepared for WhatsApp ordering,
              Cloudinary media and future commerce.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid content-start gap-3 text-sm text-parchment/72 sm:grid-cols-2 lg:grid-cols-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="min-h-11 py-2 transition-colors hover:text-gold-300"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="grid content-start gap-6">
            <div>
              <p className="type-eyebrow text-gold-300">Stay close</p>
              <p className="mt-2 text-sm text-parchment/62 leading-relaxed">
                First access to new pairs, scent stories and exclusive launches.
              </p>
              <div className="mt-4">
                <NewsletterForm compact source="footer" />
              </div>
            </div>
            <div className="grid gap-2 text-sm text-parchment/68">
              <TextLink href="/contact">Contact and enquiries →</TextLink>
            </div>
          </div>
        </div>

        {/* Moment 10: The Close */}
        <FooterClose />

        <div className="mt-8 flex flex-col gap-4 border-t border-onyx-700 pt-6 text-sm text-parchment/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} His &amp; Her&apos;s Scents. Primary domain:
            thescentpair.com.
          </p>
          <nav aria-label="Legal links" className="flex gap-5">
            <Link
              className="min-h-11 py-2 hover:text-gold-300"
              href="/legal/privacy"
            >
              Privacy
            </Link>
            <Link
              className="min-h-11 py-2 hover:text-gold-300"
              href="/legal/terms"
            >
              Terms
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
