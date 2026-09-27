import Image from "next/image";
import Link from "next/link";
import { Wrap, BUTTON, FOCUS, EASE } from "@/components/ui/page-kit";
import { CTA_LABEL } from "@/lib/content";
import logo from "../../../public/brand/skynosoft-logo-horizontal.png";

const columns = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/services#website-design-cro", label: "Website design and CRO" },
      { href: "/services#email-marketing", label: "Email and SMS marketing" },
      { href: "/services#growth-partnership", label: "Full growth partnership" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-hairline">
      <Wrap className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image src={logo} alt="Skynosoft, where brands fly" height={40} className="w-auto" />
          <p className="mt-4 max-w-sm font-body text-base text-foreground-muted text-pretty">
            Ecommerce websites and Klaviyo email systems for fashion, skincare, wellness and
            supplement brands.
          </p>
          <Link href="/contact" className={`mt-6 ${BUTTON}`}>
            {CTA_LABEL}
          </Link>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
              {col.heading}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded font-body text-base text-foreground transition-colors duration-300 ${EASE} hover:text-primary-soft ${FOCUS}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Wrap>
      <Wrap className="flex flex-col gap-2 border-t border-border-hairline py-6 text-foreground-muted md:flex-row md:items-center md:justify-between">
        <p className="font-body text-sm">
          © {new Date().getFullYear()} Skynosoft Ltd. All rights reserved.
        </p>
        <ul className="flex gap-6">
          {[
            { href: "/privacy", label: "Privacy policy" },
            { href: "/terms", label: "Terms of use" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded font-body text-sm underline-offset-4 hover:text-foreground hover:underline ${FOCUS}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </footer>
  );
}
