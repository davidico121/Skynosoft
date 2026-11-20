import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { EASE, Eyebrow, FOCUS, Wrap } from "@/components/ui/page-kit";

export const metadata: Metadata = pageMetadata({
  title: "Free resources for ecommerce email marketing — Skynosoft",
  description:
    "Free guides and tools from Skynosoft for ecommerce brands: a playbook for brand-matched emails in Claude Design and an email list cleaner for messy lead exports.",
  path: "/resources",
});

const CLEANER_EXAMPLES = [
  ["mailto:jane@brand.com", "jane@brand.com"],
  ["tom@kettleandco,com", "tom@kettleandco.com"],
  ["u003eade@lagosleather.ng", "ade@lagosleather.ng"],
  ["sara@gmial.com", "sara@gmail.com"],
];

const CARD = `group flex h-full flex-col overflow-hidden rounded-xl border border-border-hairline bg-white transition-[border-color,box-shadow] duration-300 ${EASE} hover:border-border-hairline-strong hover:shadow-lg ${FOCUS}`;

export default function ResourcesPage() {
  return (
    <section>
      <Wrap className="pb-24 pt-16">
        <Reveal>
          <Eyebrow>Free resources</Eyebrow>
          <h1 className="mt-6 max-w-[900px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
            Guides and tools we use every day, free.
          </h1>
          <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
            The same processes and tools behind our client work for ecommerce brands. Take them,
            use them, no strings.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal>
            <Link href="/resources/claude-email-design-playbook" className={CARD}>
              <div className="relative h-56 overflow-hidden border-b border-border-hairline bg-card">
                <div className="absolute inset-x-0 top-6 flex justify-center gap-4 px-6">
                  {["novaya-november-rush", "lipo-black-friday", "maxsleek-welcome"].map((name, i) => (
                    <Image
                      key={name}
                      src={`/resources/emails/${name}.jpg`}
                      alt=""
                      width={520}
                      height={900}
                      sizes="160px"
                      className={`w-1/3 max-w-[160px] rounded-lg border border-border-hairline shadow-sm ${i === 1 ? "mt-6" : ""}`}
                    />
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-card to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-label text-xs uppercase tracking-wide text-primary-soft">Free guide · PDF</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-balance">Email Design Playbook</h2>
                <p className="mt-3 flex-1 font-body text-base text-foreground-muted text-pretty">
                  Turn any brand&rsquo;s website into a finished, on-brand email in Claude Design,
                  then into a Klaviyo campaign. 10 steps with copy-paste prompts.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-body text-base font-semibold text-primary-soft">
                  Get the guide
                  <ArrowRight size={18} weight="bold" aria-hidden className={`transition-transform duration-300 ${EASE} group-hover:translate-x-1`} />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <Link href="/resources/email-cleaner" className={CARD}>
              <div className="flex h-56 flex-col justify-center gap-2.5 border-b border-border-hairline bg-card px-6">
                {CLEANER_EXAMPLES.map(([before, after]) => (
                  <div key={before} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 font-label text-xs sm:text-sm">
                    <span className="truncate text-foreground-muted line-through decoration-red-400/70">{before}</span>
                    <ArrowRight size={14} aria-hidden className="text-foreground-muted" />
                    <span className="truncate rounded-md bg-white px-2 py-1 font-medium text-foreground shadow-sm">{after}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-label text-xs uppercase tracking-wide text-primary-soft">Free tool · in your browser</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-balance">Email List Cleaner</h2>
                <p className="mt-3 flex-1 font-body text-base text-foreground-muted text-pretty">
                  Fix badly formatted emails from verifier and scraper exports: mailto: in front,
                  commas for dots, stray characters and typos. Your list never leaves your browser.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-body text-base font-semibold text-primary-soft">
                  Open the cleaner
                  <ArrowRight size={18} weight="bold" aria-hidden className={`transition-transform duration-300 ${EASE} group-hover:translate-x-1`} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
