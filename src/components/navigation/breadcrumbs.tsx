import Link from "next/link";

export type BreadcrumbItem = Readonly<{ href?: string; label: string }>;

export function Breadcrumbs({ items }: Readonly<{ items: readonly BreadcrumbItem[] }>) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-parchment/62">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="min-h-11 py-2 hover:text-gold-300">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="py-2 text-gold-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
