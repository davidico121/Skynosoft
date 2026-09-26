import Link from "next/link";
import { BUTTON, BUTTON_SECONDARY, FOCUS } from "@/components/ui/page-kit";

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function NotFoundContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 py-24 text-center md:px-16">
      <p className="font-label text-sm uppercase tracking-wide text-primary-soft">Error 404</p>
      <h1 className="mt-6 max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
        This page has moved, or never existed
      </h1>
      <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
        The link may be out of date or mistyped. Head back to the homepage, or pick up where you
        meant to be.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className={BUTTON}>
          Back to the homepage
        </Link>
        <Link href="/contact" className={BUTTON_SECONDARY}>
          Book a free audit
        </Link>
      </div>
      <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2">
        {suggestions.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={`rounded font-body text-base text-foreground-muted underline underline-offset-4 hover:text-foreground ${FOCUS}`}
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
