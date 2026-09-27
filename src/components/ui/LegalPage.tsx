import type { ReactNode } from "react";
import { Eyebrow, Wrap } from "@/components/ui/page-kit";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section>
      <Wrap className="pb-24 pt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-label text-sm text-foreground-muted">Last updated {updated}</p>
          <p className="mt-6 font-body text-lg text-foreground-muted text-pretty">{intro}</p>
          <div className="prose-blog mt-12 font-body text-lg text-foreground-muted">{children}</div>
        </div>
      </Wrap>
    </section>
  );
}
