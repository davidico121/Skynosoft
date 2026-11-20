import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/skynosoft-logo-horizontal.png";

const LINKS = [
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/send", label: "Send email" },
] as const;

export type AdminPage = (typeof LINKS)[number]["href"];

/** Shared menu across the signed-in admin tools. */
export function AdminNav({ current }: { current: AdminPage }) {
  return (
    <nav aria-label="Admin tools" className="border-b border-border-hairline bg-card">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 lg:px-10">
        <Link href="/" aria-label="Skynosoft home" className="flex items-center gap-3">
          <Image src={logo} alt="Skynosoft" height={26} className="w-auto" priority />
          <span className="font-label text-xs uppercase tracking-widest text-foreground-muted">Admin</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-1">
          {LINKS.map((l) => {
            const active = l.href === current;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 font-body text-sm font-semibold transition-colors ${
                    active ? "bg-primary text-white" : "text-foreground hover:bg-surface-container"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
