"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CollectionReveal } from "@/components/motion/collection-reveal";
import { FragranceCard } from "@/components/product/fragrance-card";
import { EmptyState } from "@/components/ui/state-messages";
import type { Fragrance } from "@/lib/content/schemas";

const audiences = ["his", "hers", "unisex"] as const;
const availabilityOptions = ["available", "unavailable"] as const;

type Filters = Readonly<{ audience?: Fragrance["audience"]; family?: string; availability?: (typeof availabilityOptions)[number] }>;

export function filterFragrances(fragrances: readonly Fragrance[], filters: Filters) {
  return fragrances.filter((fragrance) => {
    const matchesAudience = filters.audience ? fragrance.audience === filters.audience : true;
    const matchesFamily = filters.family ? fragrance.family === filters.family : true;
    const isAvailable = fragrance.variants.some((variant) => variant.inStock);
    const matchesAvailability = filters.availability ? (filters.availability === "available" ? isAvailable : !isAvailable) : true;

    return matchesAudience && matchesFamily && matchesAvailability;
  });
}

export function CollectionFilters({ fragrances }: Readonly<{ fragrances: readonly Fragrance[] }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const families = [...new Set(fragrances.map((fragrance) => fragrance.family))].sort();
  const queryAudience = searchParams.get("for");
  const queryFamily = searchParams.get("family");
  const queryAvailability = searchParams.get("availability");
  const filters: Filters = {
    audience: audiences.includes(queryAudience as Fragrance["audience"]) ? (queryAudience as Fragrance["audience"]) : undefined,
    family: queryFamily && families.includes(queryFamily) ? queryFamily : undefined,
    availability:
      queryAvailability && (availabilityOptions as readonly string[]).includes(queryAvailability)
        ? (queryAvailability as Filters["availability"])
        : undefined,
  };
  const filtered = filterFragrances(fragrances, filters);

  function updateFilter(key: "for" | "family" | "availability", value: string) {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    router.push(next.toString() ? `${pathname}?${next.toString()}` : pathname);
  }

  return (
    <div>
      <div className="grid gap-4 border border-onyx-700 bg-onyx-800 p-5 md:grid-cols-[repeat(3,minmax(0,1fr))_auto] md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-parchment">
          Audience
          <select className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment" value={filters.audience ?? ""} onChange={(event) => updateFilter("for", event.target.value)}>
            <option value="">All</option>
            <option value="his">His</option>
            <option value="hers">Her&apos;s</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-parchment">
          Scent family
          <select className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment" value={filters.family ?? ""} onChange={(event) => updateFilter("family", event.target.value)}>
            <option value="">All families</option>
            {families.map((family) => (
              <option key={family} value={family}>
                {family.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-parchment">
          Availability
          <select className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment" value={filters.availability ?? ""} onChange={(event) => updateFilter("availability", event.target.value)}>
            <option value="">Any</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
        <Link href="/collection" className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 px-5 type-button text-gold-300 hover:bg-gold-300 hover:text-ink-900">
          Reset filters
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-sm text-parchment/68 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite">{filtered.length} fragrance{filtered.length === 1 ? "" : "s"} shown</p>
        <Link href="/pairs" className="min-h-11 py-2 text-gold-300 underline underline-offset-4">
          Explore pair sets
        </Link>
      </div>
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-motion="reveal">
          {filtered.map((fragrance, index) => (
            <CollectionReveal key={fragrance.slug} index={index}>
              <FragranceCard fragrance={fragrance} />
            </CollectionReveal>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState title="No fragrances match those filters." message="Reset the filters, explore pairs, or contact the brand for guidance on the closest scent profile." actionHref="/collection" actionLabel="Reset filters" />
        </div>
      )}
    </div>
  );
}
