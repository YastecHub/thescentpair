import { PageSection } from "@/components/layout/page-section";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <PageSection labelledBy="page-title" className="min-h-[70vh]">
      <div className="max-w-3xl">
        <p className="type-eyebrow mb-5 text-gold-300">{eyebrow}</p>
        <h1 id="page-title" className="type-page-heading text-foil">
          {title}
        </h1>
        <p className="mt-6 max-w-[68ch] text-body type-supporting">
          {description}
        </p>
      </div>
    </PageSection>
  );
}
