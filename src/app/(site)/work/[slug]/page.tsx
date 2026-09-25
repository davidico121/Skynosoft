import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { MetricStat } from "@/components/ui/MetricStat";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.brand} — Skynosoft Case Study`,
    description: caseStudy.summary,
    alternates: {
      canonical: `/work/${slug}`,
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-body text-body-lg text-foreground-muted">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseSection({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items?: string[];
}) {
  return (
    <div>
      <h2 className="font-heading text-headline-md font-semibold">{title}</h2>
      {intro && (
        <div className="mt-4">
          <Paragraphs text={intro} className="font-body text-body-lg text-foreground-muted" />
        </div>
      )}
      {items && <BulletList items={items} />}
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) notFound();

  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                {caseStudy.services.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <h1 className="mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
                {caseStudy.brand}
              </h1>
              <p className="mt-2 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
                {caseStudy.category}
              </p>
              <p className="mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
                {caseStudy.summary}
              </p>
            </div>
            {caseStudy.heroImage && (
              <div className="overflow-hidden rounded-xl border border-border-hairline bg-card">
                <Image
                  src={caseStudy.heroImage.src}
                  alt={caseStudy.heroImage.alt}
                  width={caseStudy.heroImage.width}
                  height={caseStudy.heroImage.height}
                  className="block h-auto w-full"
                  priority
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl border border-border-hairline bg-card p-6">
                <Image
                  src="/brand/skynosoft-icon.png"
                  alt="Skynosoft"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <p className="mt-4 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
                  Want this for your brand?
                </p>
                <p className="mt-2 font-heading text-headline-md font-semibold">
                  Book a call
                </p>
                <Button href="/contact" className="mt-6 w-full justify-center">
                  Book a Call / Audit
                </Button>
              </div>
            </aside>

            <div>
              {caseStudy.metrics.length > 0 && (
                <div className="grid gap-8 rounded-xl border border-border-hairline bg-card p-10 sm:grid-cols-3">
                  {caseStudy.metrics.map((m) => (
                    <MetricStat key={m.label} value={m.value} label={m.label} />
                  ))}
                </div>
              )}

              {caseStudy.brandDescription ? (
                <div className={`${caseStudy.metrics.length > 0 ? "mt-16" : ""} flex flex-col gap-12`}>
                  <CaseSection title="The brand" intro={caseStudy.brandDescription} />
                  {caseStudy.challengePoints && (
                    <CaseSection title="The challenge" items={caseStudy.challengePoints} />
                  )}
                  {caseStudy.goal && <CaseSection title="The goal" items={caseStudy.goal} />}
                  {caseStudy.strategy && (
                    <CaseSection
                      title="The strategy"
                      intro={caseStudy.strategy.intro}
                      items={caseStudy.strategy.points}
                    />
                  )}
                  {caseStudy.execution && (
                    <CaseSection title="The execution" items={caseStudy.execution} />
                  )}
                  {caseStudy.resultPoints && (
                    <div>
                      <CaseSection title="The results" items={caseStudy.resultPoints} />
                      {caseStudy.resultsImages?.map((img) => (
                        <div
                          key={img.src}
                          className="mt-8 overflow-hidden rounded-lg border border-border-hairline bg-card"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="block h-auto w-full"
                          />
                        </div>
                      ))}
                      {caseStudy.resultsChart && (
                        <figure className="mt-8">
                          <div className="overflow-hidden rounded-lg border border-border-hairline bg-card">
                            <Image
                              src={caseStudy.resultsChart.src}
                              alt={caseStudy.resultsChart.alt}
                              width={caseStudy.resultsChart.width}
                              height={caseStudy.resultsChart.height}
                              className="block h-auto w-full"
                            />
                          </div>
                          {caseStudy.resultsChart.caption && (
                            <figcaption className="mt-3 font-body text-body-md text-foreground-muted">
                              {caseStudy.resultsChart.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  )}
                  {caseStudy.whyItWorked && (
                    <CaseSection title="Why this worked" items={caseStudy.whyItWorked} />
                  )}
                </div>
              ) : (
                <div className="mt-16 flex flex-col gap-12">
                  <CaseSection
                    title="The challenge"
                    intro={
                      caseStudy.challenge ||
                      `${caseStudy.brand} came to us with strong product-market fit but a website and email program that weren't converting that demand into revenue — traffic was healthy, checkout and retention weren't keeping up.`
                    }
                  />
                  <CaseSection
                    title="What we did"
                    items={caseStudy.approach || caseStudy.services}
                  />
                </div>
              )}

              {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-heading text-headline-md font-semibold">
                    The work
                  </h2>
                  <div className="hide-scrollbar mt-8 flex flex-col gap-6 sm:flex-row sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:pb-4">
                    {caseStudy.gallery.map((item) => (
                      <figure
                        key={item.src}
                        className="w-full shrink-0 sm:w-[260px] sm:snap-start"
                      >
                        <div className="hide-scrollbar h-[400px] overflow-y-auto rounded-lg border border-border-hairline bg-card">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="block h-auto w-full"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.clientReview && (
                <div className="mt-16">
                  <h2 className="font-heading text-headline-md font-semibold">
                    Client review
                  </h2>
                  <div className="mt-8 rounded-lg bg-[#f7f6f3] p-6 md:p-8">
                    <QuoteBadge />
                    <div className="mt-6">
                      <Paragraphs
                        quote
                        text={caseStudy.clientReview.quote}
                        className="font-body text-body-lg leading-7 text-foreground-muted"
                      />
                    </div>
                    <p className="mt-5 font-body text-body-lg text-foreground">
                      {caseStudy.clientReview.name}
                    </p>
                    {caseStudy.clientReview.role && (
                      <p className="mt-1 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
                        {caseStudy.clientReview.role}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-2xl font-heading text-headline-lg font-semibold">
            Want results like {caseStudy.brand}?
          </h2>
          <div className="mt-8">
            <Button href="/contact">Book a Call / Audit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
