"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUTTON, EASE, FOCUS } from "@/components/ui/page-kit";
import logo from "../../../public/brand/skynosoft-logo-horizontal.png";

const links = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 h-20">
        <a
          href="#main"
          className={`pointer-events-auto absolute left-4 top-4 -translate-y-24 rounded-full bg-white px-3 py-2 font-body text-base font-semibold text-foreground shadow-md transition-transform duration-300 ${EASE} focus:translate-y-0 ${FOCUS}`}
        >
          Skip to content
        </a>
        <div className="flex justify-center px-4 pt-6">
          <nav
            aria-label="Main"
            className="pointer-events-auto flex w-max items-center gap-8 rounded-full border border-border-hairline bg-white/80 py-2 pl-6 pr-2 shadow-sm backdrop-blur-xl"
          >
            <Link href="/" aria-label="Skynosoft home" className={`rounded-full ${FOCUS}`}>
              <Image src={logo} alt="Skynosoft" height={28} className="w-auto" priority />
            </Link>
            <ul className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`rounded-full font-body text-base transition-colors duration-300 ${EASE} ${FOCUS} ${
                      isActive(link.href)
                        ? "font-semibold text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden md:block">
              <Link href="/contact" className={BUTTON}>
                Book a call
              </Link>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="island-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`relative h-10 w-10 rounded-full bg-primary text-white transition-all duration-500 ${EASE} hover:bg-primary/90 active:scale-[0.98] md:hidden ${FOCUS}`}
            >
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-white transition-all duration-500 ${EASE} ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-white transition-all duration-500 ${EASE} ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      <div
        id="island-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-3xl transition-all duration-700 ${EASE} md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {[...links, { href: "/contact", label: "Book a call" }].map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              className={`transition-all duration-700 ${EASE} ${
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <Link
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-heading text-3xl font-semibold transition-colors duration-300 ${EASE} hover:text-primary ${FOCUS} ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
