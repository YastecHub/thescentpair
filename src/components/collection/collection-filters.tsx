"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CollectionReveal } from "@/components/motion/collection-reveal";
import { FragranceCard } from "@/components/product/fragrance-card";
import { EmptyState } from "@/components/ui/state-messages";
import { trackEvent } from "@/lib/analytics/analytics";
import type { Fragrance } from "@/lib/content/schemas";

const audiences = ["his", "hers", "unisex"] as const;
const availabilityOptions = ["available", "unavailable"] as const;

type Filters = Readonly<{
  audience?: Fragrance["audience"];
  family?: string;
  availability?: (typeof availabilityOptions)[number];
}>;

export function filterFragrances(
  fragrances: readonly Fragrance[],
  filters: Filters,
) {
  return fragrances.filter((fragrance) => {
    const matchesAudience = filters.audience
      ? fragrance.audience === filters.audience
      : true;
    const matchesFamily = filters.family
      ? fragrance.family === filters.family
      : true;
    const isAvailable = fragrance.variants.some((v) => v.inStock);
    const matchesAvailability = filters.availability
      ? filters.availability === "available"
        ? isAvailable
        : !isAvailable
      : true;
    return matchesAudience && matchesFamily && matchesAvailability;
  });
}

export function CollectionFilters({
  fragrances,
}: Readonly<{ fragrances: readonly Fragrance[] }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const families = [...new Set(fragrances.map((f) => f.family))].sort();

  const queryAudience = searchParams.get("for");
  const queryFamily = searchParams.get("family");
  const queryAvailability = searchParams.get("availability");

  const filters: Filters = {
    audience: audiences.includes(queryAudience as Fragrance["audience"])
      ? (queryAudience as Fragrance["audience"])
      : undefined,
    family:
      queryFamily && families.includes(queryFamily) ? queryFamily : undefined,
    availability:
      queryAvailability &&
      (availabilityOptions as readonly string[]).includes(queryAvailability)
        ? (queryAvailability as Filters["availability"])
        : undefined,
  };

  const filtered = filterFragrances(fragrances, filters).toSorted((a, b) => {
    const aInStock = a.variants.some((v) => v.inStock);
    const bInStock = b.variants.some((v) => v.inStock);
    if (aInStock === bInStock) return 0;
    return aInStock ? -1 : 1;
  });

  function updateFilter(key: "for" | "family" | "availability", value: string) {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    const newUrl = next.toString()
      ? `${pathname}?${next.toString()}`
      : pathname;
    router.push(newUrl);

    // Map URL key back to a readable facet name for analytics
    const facetLabel = key === "for" ? "audience" : key;
    const resultCount = filterFragrances(fragrances, {
      ...filters,
      ...(key === "for"
        ? { audience: value as Fragrance["audience"] | undefined }
        : key === "family"
          ? { family: value || undefined }
          : { availability: value as Filters["availability"] }),
    }).length;

    if (value) {
      trackEvent("filter_apply", {
        facet: facetLabel,
        value,
        resultCount,
      });
    }
  }

  return (
    <div>
      <div className="bg-onyx-800/70 p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 border-b border-onyx-700/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow text-gold-300">Refine the collection</p>
            <p className="mt-2 font-display text-2xl text-parchment">
              Find the scent that feels like you.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-parchment/50">
            {filtered.length} of {fragrances.length} shown
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <label className="grid min-w-0 gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-parchment/60 sm:text-[0.68rem] sm:tracking-[0.16em]">
            For
            <select
              className="min-h-11 w-full min-w-0 rounded-full border border-onyx-700 bg-onyx-900 px-2 text-xs normal-case tracking-normal text-parchment transition-colors focus:border-gold-300 focus:outline-none focus:ring-0 sm:px-4 sm:text-sm"
              value={filters.audience ?? ""}
              onChange={(e) => updateFilter("for", e.target.value)}
            >
              <option value="">All</option>
              <option value="his">His</option>
              <option value="hers">Her&apos;s</option>
              <option value="unisex">Unisex</option>
            </select>
          </label>

          <label className="grid min-w-0 gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-parchment/60 sm:text-[0.68rem] sm:tracking-[0.16em]">
            Scent family
            <select
              className="min-h-11 w-full min-w-0 rounded-full border border-onyx-700 bg-onyx-900 px-2 text-xs normal-case tracking-normal text-parchment transition-colors focus:border-gold-300 focus:outline-none focus:ring-0 sm:px-4 sm:text-sm"
              value={filters.family ?? ""}
              onChange={(e) => updateFilter("family", e.target.value)}
            >
              <option value="">All families</option>
              {families.map((family) => (
                <option key={family} value={family}>
                  {family.replaceAll("-", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="grid min-w-0 gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-parchment/60 sm:text-[0.68rem] sm:tracking-[0.16em]">
            Availability
            <select
              className="min-h-11 w-full min-w-0 rounded-full border border-onyx-700 bg-onyx-900 px-2 text-xs normal-case tracking-normal text-parchment transition-colors focus:border-gold-300 focus:outline-none focus:ring-0 sm:px-4 sm:text-sm"
              value={filters.availability ?? ""}
              onChange={(e) => updateFilter("availability", e.target.value)}
            >
              <option value="">Any</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-parchment/45">
            Select a lens to narrow your discovery.
          </p>
          <Link
            href="/collection"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-gold-300/70 px-5 type-button text-gold-300 transition-colors hover:bg-gold-300 hover:text-ink-900"
          >
            Reset filters
          </Link>
        </div>
      </div>

      {/* Live result count  announced to screen readers on change */}
      <div className="mt-6 flex flex-col gap-4 text-sm text-parchment/68 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" aria-atomic="true">
          {filtered.length} fragrance{filtered.length === 1 ? "" : "s"} shown
        </p>
        <Link
          href="/pairs"
          className="min-h-11 py-2 text-gold-300 underline underline-offset-4"
        >
          Explore pair sets
        </Link>
      </div>

      {filtered.length > 0 ? (
        <div
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          data-motion="reveal"
        >
          {filtered.map((fragrance, index) => (
            <CollectionReveal key={fragrance.slug} index={index}>
              <FragranceCard fragrance={fragrance} />
            </CollectionReveal>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No fragrances match those filters."
            message="Reset the filters, explore pairs, or contact the brand for guidance on the closest scent profile."
            actionHref="/collection"
            actionLabel="Reset filters"
          />
        </div>
      )}
    </div>
  );
}
