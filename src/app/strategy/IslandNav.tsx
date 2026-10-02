"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;

/**
 * The island nav for strategy pitch pages. On desktop it expands to show every
 * link inline, the last one styled as the primary button, same pattern as the
 * site's Navbar. On mobile it collapses to logo plus hamburger, same as before.
 */
export function IslandNav({
  logo,
  links,
}: {
  logo: StaticImageData;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const navLinks = links.slice(0, -1);
  const cta = links[links.length - 1];

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mt-6 flex justify-center px-4">
        <nav
          aria-label="Page"
          className="flex w-max items-center gap-8 rounded-full border border-border-hairline bg-white/80 py-2 pl-6 pr-2 shadow-sm backdrop-blur-xl"
        >
          <Image src={logo} alt="Skynosoft" height={28} className="w-auto" priority />
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-full font-body text-base text-foreground-muted transition-colors duration-300 ${EASE} hover:text-foreground ${FOCUS}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && (
            <div className="hidden md:block">
              <a href={cta.href} className={BUTTON}>
                {cta.label}
              </a>
            </div>
          )}
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
      </header>

      <div
        id="island-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-3xl transition-all duration-700 ${EASE} md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {links.map((link, i) => {
            const isCta = i === links.length - 1;
            return (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={`transition-all duration-700 ${EASE} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <a
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`font-heading text-3xl font-semibold transition-colors duration-300 ${EASE} ${FOCUS} ${
                    isCta ? "text-primary hover:text-primary-soft" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
