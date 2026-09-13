import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-body text-body-md font-medium px-6 py-3 transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary:
    "bg-transparent text-foreground border border-border-hairline-strong hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
