import type { ReactNode } from "react";

export const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
export const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;

export const BUTTON_SECONDARY = `inline-flex items-center justify-center rounded-full border border-border-hairline-strong bg-white px-3 py-2 font-body text-base font-semibold text-foreground transition-all duration-300 ${EASE} hover:bg-card active:scale-[0.98] ${FOCUS}`;

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-4 md:px-16 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-label text-sm uppercase tracking-wide text-primary-soft">{children}</p>
  );
}

export function H2({ children }: { children: string }) {
  return (
    <h2 className="max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
      {children}
    </h2>
  );
}

export function Section({
  children,
  id,
  tint = false,
}: {
  children: ReactNode;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-border-hairline ${tint ? "bg-card" : ""}`}
    >
      <Wrap className="py-24">{children}</Wrap>
    </section>
  );
}

export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border-hairline bg-card px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
        </span>
        <span className="rounded-full bg-white px-3 py-0.5 font-body text-xs text-foreground-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
