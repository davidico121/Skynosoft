import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CALENDLY_URL, SITE_URL, caseStudies } from "@/lib/content";
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
    title: `A growth strategy for ${pitch.brand} — Skynosoft`,
    robots: { index: false, follow: false },
  };
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
      {children}
    </p>
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

  const proof = (pitch.caseStudySlugs ?? [])
    .map((s) => caseStudies.find((cs) => cs.slug === s))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-hairline bg-background/80 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          <Image src={logo} alt="Skynosoft" height={36} className="w-auto" priority />
          <Button href={CALENDLY_URL} className="text-sm">
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
          <Chip>{`Prepared for ${pitch.brand}`}</Chip>
          <h1 className="mt-6 max-w-4xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-display-xl">
            {pitch.headline ?? `A growth strategy for ${pitch.brand}.`}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            {pitch.contactName ? `Hi ${pitch.contactName}, ` : ""}
            {pitch.intro}
          </p>
          <p className="mt-6 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
            By David Owoeye, Skynosoft · {pitch.preparedDate}
          </p>
        </Container>
      </section>

      {pitch.videoUrl && (
        <section>
          <Container className="pt-section-gap">
            <div className="aspect-video overflow-hidden rounded-xl border border-border-hairline bg-card">
              <iframe
                src={pitch.videoUrl}
                title={`A walkthrough for ${pitch.brand}`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </Container>
        </section>
      )}

      {pitch.observations && pitch.observations.length > 0 && (
        <section>
          <Container className="py-section-gap">
            <SectionLabel>What we noticed</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-heading text-headline-lg font-semibold">
              Where {pitch.brand} is leaving revenue on the table.
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {pitch.observations.map((o) => (
                <div
                  key={o.title}
                  className="flex flex-col rounded-xl border border-border-hairline bg-card p-8"
                >
                  <h3 className="font-heading text-headline-md font-semibold">{o.title}</h3>
                  <p className="mt-3 font-body text-body-md text-foreground-muted">
                    {o.detail}
                  </p>
                  {o.screenshot && (
                    <div className="mt-6 overflow-hidden rounded-lg border border-border-hairline bg-background">
                      <Image
                        src={o.screenshot.src}
                        alt={o.screenshot.alt}
                        width={o.screenshot.width}
                        height={o.screenshot.height}
                        className="block h-auto w-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <SectionLabel>The strategy</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-heading text-headline-lg font-semibold">
            What we would do first.
          </h2>
          <ol className="mt-14 flex flex-col gap-6">
            {pitch.plays.map((play, i) => (
              <li
                key={play.title}
                className="grid gap-4 rounded-xl border border-border-hairline bg-card p-8 md:grid-cols-[80px_1fr]"
              >
                <div className="font-heading text-headline-lg text-outline-variant">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-heading text-headline-md font-semibold">{play.title}</h3>
                  <p className="mt-3 font-body text-body-lg text-foreground-muted">
                    {play.what}
                  </p>
                  {play.why && (
                    <p className="mt-3 font-body text-body-md text-foreground-muted">
                      <span className="font-semibold text-foreground">Why: </span>
                      {play.why}
                    </p>
                  )}
                  {play.impact && (
                    <p className="mt-3 font-body text-body-md text-foreground-muted">
                      <span className="font-semibold text-foreground">Impact: </span>
                      {play.impact}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {pitch.roadmap && pitch.roadmap.length > 0 && (
        <section className="border-t border-border-hairline">
          <Container className="py-section-gap">
            <SectionLabel>The plan</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-heading text-headline-lg font-semibold">
              How the first months would run.
            </h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {pitch.roadmap.map((phase) => (
                <div key={phase.phase}>
                  <h3 className="font-heading text-headline-md font-semibold">{phase.phase}</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-body text-body-md text-foreground-muted"
                      >
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {proof.length > 0 && (
        <section className="border-t border-border-hairline">
          <Container className="py-section-gap">
            <SectionLabel>Proof</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-heading text-headline-lg font-semibold">
              Similar work we have done.
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {proof.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} baseUrl={SITE_URL} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-3xl font-heading text-headline-lg font-semibold">
            Want to talk it through?
          </h2>
          <p className="mt-4 max-w-xl font-body text-body-lg text-foreground-muted">
            Book a short call and we will walk through this together and
            answer any questions.
          </p>
          <div className="mt-8">
            <Button href={CALENDLY_URL}>Book a Call</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
