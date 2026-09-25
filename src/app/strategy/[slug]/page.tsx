import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CALENDLY_URL } from "@/lib/content";
import { strategyPitches } from "@/lib/strategy";
import { Reveal, TaglineReveal } from "../Reveal";
import logo from "../../../../public/brand/skynosoft-logo-horizontal.png";

export const dynamicParams = false;

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function generateStaticParams() {
  return strategyPitches.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pitch = strategyPitches.find((p) => p.slug === slug);
  if (!pitch) return {};
  return {
    title: `A note for ${pitch.brand} | Skynosoft`,
    robots: { index: false, follow: false },
  };
}

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

function H2({ children }: { children: string }) {
  return (
    <h2 className="font-heading text-3xl font-semibold text-balance md:text-4xl">{children}</h2>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {items.map((text) => (
        <p key={text} className="font-body text-lg text-foreground-muted text-pretty">
          {text}
        </p>
      ))}
    </div>
  );
}

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-border-hairline ${className}`}>
      <Wrap className="py-24">{children}</Wrap>
    </section>
  );
}

export default async function StrategyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pitch = strategyPitches.find((p) => p.slug === slug);
  if (!pitch) notFound();

  return (
    <>
      <a
        href="#main"
        className={`sr-only z-[60] rounded-lg bg-primary px-3 py-2 font-body text-base font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${FOCUS}`}
      >
        Skip to content
      </a>

      <header className="sticky top-6 z-50 mt-6 flex justify-center px-4">
        <nav
          aria-label="Page"
          className="flex w-max items-center gap-8 rounded-full border border-border-hairline bg-white/80 py-2 pl-6 pr-2 shadow-sm backdrop-blur-xl"
        >
          <Image src={logo} alt="Skynosoft" height={28} className="w-auto" priority />
          <a
            href="#book"
            className={`rounded-full bg-primary px-3 py-2 font-body text-sm font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`}
          >
            Book a call
          </a>
        </nav>
      </header>

      <main id="main">
        <section>
          <Wrap className="py-24">
            <Reveal>
              <Eyebrow>{pitch.eyebrow}</Eyebrow>
              <h1 className="mt-6 max-w-[680px] whitespace-pre-line bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-3xl font-bold text-balance text-transparent md:text-4xl">
                {pitch.headline}
              </h1>
              <div className="max-w-[680px]">
                <Paragraphs items={pitch.problem} />
              </div>
            </Reveal>
          </Wrap>
        </section>

        <Section>
          <Reveal className="max-w-[680px]">
            <H2>{pitch.amplify.heading}</H2>
            <Paragraphs items={pitch.amplify.paragraphs} />
          </Reveal>
        </Section>

        <Section>
          <Reveal className="max-w-[680px]">
            <H2>{pitch.story.heading}</H2>
            <Paragraphs items={pitch.story.paragraphs} />
          </Reveal>
        </Section>

        <Section>
          <Reveal className="max-w-[680px]">
            <H2>{pitch.transformation.heading}</H2>
            <ul className="mt-6 flex flex-col gap-3">
              {pitch.transformation.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-body text-lg text-foreground-muted text-pretty"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section>
          <TaglineReveal
            text={pitch.transformation.closing}
            className="max-w-[680px] font-heading text-4xl font-semibold text-pretty"
          />
        </Section>

        <Section>
          <Reveal className="max-w-[680px]">
            <H2>{pitch.offer.heading}</H2>
            <Paragraphs items={pitch.offer.paragraphs} />
          </Reveal>
        </Section>

        <div id="plan" className="scroll-mt-24">
          <Section>
            <Reveal>
              <Eyebrow>Current state</Eyebrow>
              <div className="mt-4 max-w-[680px]">
                <H2>Where the customer journey breaks</H2>
              </div>
              <ol className="mt-12 grid gap-6 md:grid-cols-4">
                {pitch.currentState.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className={`flex flex-col rounded-xl border p-6 ${
                      step.leak
                        ? "border-red-300 bg-red-50"
                        : "border-border-hairline bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-label text-sm ${
                          step.leak ? "bg-red-600 text-white" : "bg-primary/10 text-primary-soft"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {step.leak && (
                        <span className="rounded-full bg-red-600 px-2 py-0.5 font-label text-xs uppercase tracking-wide text-white">
                          Leak
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 font-body text-base text-foreground-muted text-pretty">
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-xl border border-border-hairline bg-card p-8">
                <Eyebrow>Why this matters</Eyebrow>
                <p className="mt-3 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                  {pitch.currentState.callout}
                </p>
              </div>
            </Reveal>
          </Section>

          <Section>
            <Reveal>
              <Eyebrow>Proposed infrastructure</Eyebrow>
              <div className="mt-4 max-w-[680px]">
                <H2>The fixes we would put in place</H2>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {pitch.infrastructure.map((item, i) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border-hairline bg-card p-8"
                  >
                    <p className="font-heading text-4xl font-semibold text-outline-variant">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-heading text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>

          <Section>
            <Reveal>
              <Eyebrow>Expected impact</Eyebrow>
              <div className="mt-4 max-w-[680px]">
                <H2>What this is aimed at</H2>
              </div>
              <div className="mt-12 grid gap-8 rounded-xl border border-border-hairline bg-card p-8 sm:grid-cols-3">
                {pitch.impact.map((m) => (
                  <div key={m.label}>
                    <p className="font-heading text-4xl font-bold text-growth-green">{m.value}</p>
                    <p className="mt-2 font-body text-base text-foreground-muted text-pretty">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>

          <Section>
            <Reveal>
              <Eyebrow>Rollout timeline</Eyebrow>
              <div className="mt-4 max-w-[680px]">
                <H2>How it would run</H2>
              </div>
              <ol className="mt-12 grid gap-8 md:grid-cols-3">
                {pitch.timeline.map((phase) => (
                  <li key={phase.week}>
                    <p className="font-label text-sm uppercase tracking-wide text-primary-soft">
                      {phase.week}
                    </p>
                    <h3 className="mt-3 font-heading text-2xl font-semibold">{phase.title}</h3>
                    <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                      {phase.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Section>
        </div>

        <Section id="book">
          <Reveal>
            <h2 className="mx-auto max-w-[680px] text-center font-heading text-3xl font-semibold text-balance md:text-4xl">
              {pitch.response.heading}
            </h2>
            <div className="mt-12 overflow-hidden rounded-xl border border-border-hairline bg-card">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                className="block"
                title="Book a call with Skynosoft"
              />
            </div>
            <p className="mx-auto mt-8 max-w-[680px] text-center font-body text-lg text-foreground-muted text-pretty">
              P.S. {pitch.response.ps}
            </p>
            <p className="mt-4 text-center font-body text-base text-foreground-muted">
              David Owoeye, Skynosoft Ltd.
            </p>
          </Reveal>
        </Section>
      </main>
    </>
  );
}
