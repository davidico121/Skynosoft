import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    heading: "Company",
    links: [
      { href: "/services", label: "Services" },
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Get Started",
    links: [{ href: "/contact", label: "Book a Call / Audit" }],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-hairline">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="font-heading text-headline-md font-semibold">
            SKYNOSOFT
          </div>
          <p className="mt-2 font-label text-label-mono uppercase tracking-wide text-primary-soft">
            ...where brands fly
          </p>
          <p className="mt-4 max-w-sm font-body text-body-md text-foreground-muted">
            High-converting ecommerce websites and email marketing systems
            for fashion, skincare, home decor, and supplement brands scaling
            to 7 figures and beyond.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <div className="font-label text-label-mono uppercase tracking-wide text-foreground-muted">
              {col.heading}
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-md text-foreground transition-colors hover:text-primary-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border-hairline py-6 text-foreground-muted md:flex-row md:items-center md:justify-between">
        <p className="font-body text-sm">
          © {new Date().getFullYear()} Skynosoft. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
