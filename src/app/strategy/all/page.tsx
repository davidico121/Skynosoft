import type { Metadata } from "next";
import Image from "next/image";
import { strategyPitches } from "@/lib/strategy";
import { IslandNav } from "../IslandNav";
import logo from "../../../../public/brand/skynosoft-logo-horizontal.png";

export const metadata: Metadata = {
  title: "All pitches — Skynosoft",
  robots: { index: false, follow: false },
};

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const navLinks = [{ href: "https://www.skynosoft.net", label: "skynosoft.net" }];

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-4 md:px-16 ${className}`}>{children}</div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-label text-sm uppercase tracking-wide text-primary-soft">{children}</p>
  );
}

export default function AllPitchesPage() {
  return (
    <>
      <IslandNav logo={logo} links={navLinks} />

      <main id="main">
        <section className="pt-32">
          <Wrap className="pb-24">
            <Eyebrow>Internal</Eyebrow>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              Every pitch page, in one place.
            </h1>
            <p className="mt-4 max-w-[560px] font-body text-lg text-foreground-muted text-pretty">
              {strategyPitches.length} live {strategyPitches.length === 1 ? "pitch" : "pitches"}.
              Click through to see any of them as the prospect would.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {strategyPitches.map((pitch) => (
                <a
                  key={pitch.slug}
                  href={`/${pitch.slug}`}
                  className={`group flex flex-col overflow-hidden rounded-xl border border-border-hairline bg-card transition-all duration-300 ${EASE} hover:-translate-y-1 hover:border-border-hairline-strong ${FOCUS}`}
                >
                  {pitch.hero.visuals && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border-hairline bg-white">
                      <Image
                        src={pitch.hero.visuals.main.src}
                        alt={pitch.hero.visuals.main.alt}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <Eyebrow>{pitch.hero.eyebrow}</Eyebrow>
                    <h2 className="mt-3 font-heading text-2xl font-semibold">{pitch.brand}</h2>
                    <p className="mt-2 flex-1 font-body text-base text-foreground-muted text-pretty">
                      {pitch.hero.headline.join(" ")}
                    </p>
                    <span className="mt-4 font-label text-sm uppercase tracking-wide text-primary-soft">
                      View pitch &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Wrap>
        </section>
      </main>
    </>
  );
}
