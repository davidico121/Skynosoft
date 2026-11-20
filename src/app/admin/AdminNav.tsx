import Link from "next/link";

const LINKS = [
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/send", label: "Send email" },
  { href: "/admin/email-cleaner", label: "Email cleaner" },
] as const;

export type AdminPage = (typeof LINKS)[number]["href"];

/** Shared menu across the signed-in admin tools. */
export function AdminNav({ current }: { current: AdminPage }) {
  return (
    <nav aria-label="Admin tools" className="border-b border-border-hairline bg-card">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 lg:px-10">
        <span className="font-label text-xs uppercase tracking-widest text-foreground-muted">Skynosoft admin</span>
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
