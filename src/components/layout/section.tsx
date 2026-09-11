import { clsx } from "clsx";
import { Container } from "@/components/layout/container";

export function Section({
  children,
  className,
  containerClassName,
  labelledBy,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
}> &
  React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={clsx("py-[var(--section-space)]", className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function DarkSection(
  props: Readonly<React.ComponentProps<typeof Section>>,
) {
  return (
    <Section
      {...props}
      className={clsx("bg-onyx-900 text-parchment", props.className)}
    />
  );
}

export function LightSection(
  props: Readonly<React.ComponentProps<typeof Section>>,
) {
  return (
    <Section
      {...props}
      className={clsx(
        "light-surface bg-parchment text-ink-900",
        props.className,
      )}
    />
  );
}

export function FullBleedSection({
  children,
  className,
  labelledBy,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}>) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={clsx("py-[var(--section-space)]", className)}
    >
      {children}
    </section>
  );
}
