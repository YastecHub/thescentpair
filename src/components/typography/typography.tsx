import { clsx } from "clsx";

type TextProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}>;

export function FoilText({ children, className }: TextProps) {
  return <span className={clsx("text-foil", className)}>{children}</span>;
}

export function DisplayHeading({ children, className, id }: TextProps) {
  return (
    <h1
      id={id}
      className={clsx("type-display max-w-[12ch] text-balance", className)}
    >
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className, id }: TextProps) {
  return (
    <h2
      id={id}
      className={clsx("type-section-heading text-balance", className)}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({ children, className, id }: TextProps) {
  return (
    <p id={id} className={clsx("type-eyebrow text-gold-300", className)}>
      {children}
    </p>
  );
}

export function BodyText({ children, className, id }: TextProps) {
  return (
    <p id={id} className={clsx("max-w-readable text-body", className)}>
      {children}
    </p>
  );
}

export function EditorialQuote({ children, className, id }: TextProps) {
  return (
    <blockquote
      id={id}
      className={clsx("type-quote max-w-quote text-parchment", className)}
    >
      {children}
    </blockquote>
  );
}

export function PriceText({ children, className, id }: TextProps) {
  return (
    <p id={id} className={clsx("type-price", className)}>
      {children}
    </p>
  );
}
