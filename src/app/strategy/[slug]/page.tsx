import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { MetricStat } from "@/components/ui/MetricStat";
import { CALENDLY_URL } from "@/lib/content";
import { strategyPitches } from "@/lib/strategy";
import logo from "../../../../public/brand/skynosoft-logo-horizontal.png";

export const dynamicParams = false;

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
    title: `Prepared for ${pitch.brand} — Skynosoft`,
    robots: { index: false, follow: false },
  };
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
        {label}
      </p>
      <h2 className="mt-4 font-heading text-headline-md font-semibold md:text-headline-lg">
        {title}
      </h2>
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      {items.map((text) => (
        <p key={text} className="font-body text-body-lg text-foreground-muted">
          {text}
        </p>
      ))}
    </div>
  );
}

function Narrative({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border-hairline">
      <Container className="py-section-gap">
        <div className="max-w-3xl">
          <h2 className="font-heading text-headline-md font-semibold md:text-headline-lg">
            {heading}
          </h2>
          {children}
        </div>
      </Container>
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
      <header className="sticky top-0 z-50 border-b border-border-hairline bg-background/80 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          <Image src={logo} alt="Skynosoft" height={36} className="w-auto" priority />
          <Button href="#book" className="text-sm">
            Book a Call
          </Button>
        </Container>
      </header>

      <section className="relative overflow-hidden border-b border-border-hairline">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-electric-blue-glow blur-3xl"
          aria-hidden
        />
        <Container className="relative py-20 md:py-28">
          <Chip>{pitch.eyebrow}</Chip>
          <h1 className="mt-6 max-w-4xl font-heading text-headline-md font-bold tracking-tight md:text-headline-lg">
            {pitch.headline}
          </h1>
          <div className="max-w-2xl">
            <Paragraphs items={pitch.problem} />
          </div>
        </Container>
      </section>

      <Narrative heading={pitch.amplify.heading}>
        <Paragraphs items={pitch.amplify.paragraphs} />
      </Narrative>

      <Narrative heading={pitch.story.heading}>
        <Paragraphs items={pitch.story.paragraphs} />
      </Narrative>

      <Narrative heading={pitch.transformation.heading}>
        <ul className="mt-6 flex flex-col gap-3">
          {pitch.transformation.points.map((point) => (
            <li key={point} className="flex gap-3 font-body text-body-lg text-foreground-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Paragraphs items={[pitch.transformation.closing]} />
      </Narrative>

      <Narrative heading={pitch.offer.heading}>
        <Paragraphs items={pitch.offer.paragraphs} />
      </Narrative>

      <div id="plan" className="scroll-mt-24">
      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <SectionHeading label="Current state" title="Where the customer journey breaks." />
          <ol className="mt-14 grid gap-4 md:grid-cols-4">
            {pitch.currentState.steps.map((step, i) => (
              <li
                key={step.title}
                className={`relative flex flex-col rounded-xl border p-6 ${
                  step.leak
                    ? "border-red-300 bg-red-50"
                    : "border-border-hairline bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-label text-label-mono ${
                      step.leak ? "bg-red-600 text-white" : "bg-primary/10 text-primary-soft"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {step.leak && (
                    <span className="rounded-full bg-red-600 px-2.5 py-0.5 font-label text-label-mono uppercase tracking-wide text-white">
                      Leak
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-heading text-body-lg font-semibold">{step.title}</h3>
                <p className="mt-2 font-body text-body-md text-foreground-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-xl border border-border-hairline border-l-4 border-l-primary bg-card p-8">
            <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
              Why this matters
            </p>
            <p className="mt-3 max-w-3xl font-body text-body-lg text-foreground-muted">
              {pitch.currentState.callout}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <SectionHeading
            label="Proposed infrastructure"
            title="The fixes we would put in place."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {pitch.infrastructure.map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl border border-border-hairline bg-card p-8"
              >
                <div className="font-heading text-headline-lg text-outline-variant">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-heading text-headline-md font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-body-md text-foreground-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <SectionHeading label="Expected impact" title="What this is aimed at." />
          <div className="mt-14 grid gap-8 rounded-xl border border-border-hairline bg-card p-10 sm:grid-cols-3">
            {pitch.impact.map((m) => (
              <MetricStat key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <SectionHeading label="Rollout timeline" title="How it would run." />
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {pitch.timeline.map((phase) => (
              <li key={phase.week}>
                <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  {phase.week}
                </p>
                <h3 className="mt-3 font-heading text-headline-md font-semibold">
                  {phase.title}
                </h3>
                <p className="mt-3 font-body text-body-md text-foreground-muted">
                  {phase.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      </div>

      <section id="book" className="scroll-mt-24 border-t border-border-hairline">
        <Container className="py-section-gap">
          <h2 className="mx-auto max-w-3xl text-center font-heading text-headline-md font-semibold md:text-headline-lg">
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
          <p className="mx-auto mt-8 max-w-2xl text-center font-body text-body-lg text-foreground-muted">
            P.S. {pitch.response.ps}
          </p>
          <p className="mt-4 text-center font-body text-body-md text-foreground-muted">
            David Owoeye, Skynosoft Ltd.
          </p>
        </Container>
      </section>
    </>
  );
}
