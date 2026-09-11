import {
  BodyText,
  Eyebrow,
  SectionHeading,
} from "@/components/typography/typography";

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}>) {
  return (
    <div className="max-w-readable">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <SectionHeading id={id} className={eyebrow ? "mt-4" : undefined}>
        {title}
      </SectionHeading>
      {description ? (
        <BodyText className="mt-5 type-supporting">{description}</BodyText>
      ) : null}
    </div>
  );
}
