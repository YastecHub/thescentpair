import { Section } from "@/components/layout/section";

export function PageSection({
  children,
  className,
  labelledBy,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}>) {
  return (
    <Section labelledBy={labelledBy} className={className}>
      {children}
    </Section>
  );
}
