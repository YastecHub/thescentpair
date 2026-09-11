"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/components/navigation/nav-links";
import { BrandLogo } from "@/components/brand/brand-logo";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "2348000000000";
const WA_GREETING = encodeURIComponent(
  "Hello His & Her's Scents, I'd like to place an order.",
);

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHomePage = pathname === "/";

  // Scroll-aware: transparent on hero, hide on scroll-down, show on scroll-up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 60);
      // Hide when scrolling down past 200px, show when scrolling up
      if (y > 200) {
        setIsHidden(y > lastScrollY.current);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = mobileNavRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close mobile nav on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Route change: close mobile menu on navigation
    setIsOpen(false);
  }, [pathname]);

  function isCurrentRoute(href: string) {
    return href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMobileMenu() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  const transparent = isHomePage && !isScrolled && !isOpen;

  return (
    <header
      className={[
        "sticky top-0 z-nav border-b transition-all duration-base",
        isHidden && !isOpen ? "-translate-y-full" : "translate-y-0",
        transparent
          ? "border-transparent bg-transparent"
          : "border-onyx-700 bg-onyx-900/92 backdrop-blur-md",
      ].join(" ")}
    >
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-3"
          aria-label="His and Her's Scents home"
        >
          <BrandLogo variant="header" priority />
        </Link>
        <nav
          className="hidden items-center gap-5 md:flex lg:gap-7"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrentRoute(link.href) ? "page" : undefined}
              className="min-h-11 border-b border-transparent py-3 text-sm text-parchment/76 transition-colors hover:border-gold-300/70 hover:text-gold-300 aria-[current=page]:border-gold-300 aria-[current=page]:text-gold-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WA_PHONE}?text=${WA_GREETING}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order via WhatsApp"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-onyx-700 px-4 text-xs text-parchment/62 transition-colors hover:border-gold-300/60 hover:text-gold-300 md:inline-flex"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.519 5.845L.057 23.5a.5.5 0 0 0 .623.607l5.761-1.507A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.938 9.938 0 0 1-5.185-1.453l-.371-.221-3.854 1.009 1.025-3.733-.242-.385A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Order
          </a>
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gold-300/70 px-4 type-button text-gold-300 transition duration-fast ease-out-soft hover:bg-gold-300 hover:text-ink-900 md:hidden"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span aria-hidden="true">Menu</span>
          </button>
        </div>
      </Container>
      <nav
        ref={mobileNavRef}
        id="mobile-navigation"
        className={
          isOpen
            ? "fixed inset-x-0 top-20 z-mobileNav min-h-[calc(100dvh-5rem)] border-b border-onyx-700 bg-onyx-900 px-[var(--page-gutter)] py-8 md:hidden"
            : "hidden"
        }
        aria-label="Mobile navigation"
      >
        <div className="grid gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrentRoute(link.href) ? "page" : undefined}
              className="min-h-11 rounded-luxury py-3 text-3xl font-display text-parchment aria-[current=page]:text-gold-300"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-10 border-t border-onyx-700 pt-6 text-sm text-parchment/62">
          <p>Phase 1 ordering is WhatsApp-led.</p>
          <button
            type="button"
            className="mt-6 min-h-11 text-gold-300 underline underline-offset-4"
            onClick={closeMobileMenu}
          >
            Close menu
            <VisuallyHidden> and return to page</VisuallyHidden>
          </button>
        </div>
      </nav>
    </header>
  );
}
