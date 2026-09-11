import { clsx } from "clsx";

type ButtonProps = Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>;

const baseButtonClasses =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 type-button transition duration-fast ease-out-soft disabled:opacity-45";

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        baseButtonClasses,
        "border border-gold-300 bg-gold-300 text-ink-900 hover:bg-gold-100 active:bg-gold-500",
        className,
      )}
    />
  );
}

export function SecondaryButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        baseButtonClasses,
        "border border-gold-300/80 bg-transparent text-gold-300 hover:bg-gold-300 hover:text-ink-900 active:border-gold-500 active:bg-gold-500",
        className,
      )}
    />
  );
}

export function IconButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gold-300/70 text-gold-300 transition duration-fast ease-out-soft hover:bg-gold-300 hover:text-ink-900 disabled:opacity-45",
        className,
      )}
    >
      {children}
    </button>
  );
}
