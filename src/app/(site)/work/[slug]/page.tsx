import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
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
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl border border-border-hairline bg-card p-6">
                <p className="font-label text-label-mono uppercase tracking-wide text-foreground-muted">
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
              <div className="grid gap-8 rounded-xl border border-border-hairline bg-card p-10 sm:grid-cols-3">
                {caseStudy.metrics.map((m) => (
                  <MetricStat key={m.label} value={m.value} label={m.label} />
                ))}
              </div>

              {caseStudy.brandDescription ? (
                <div className="mt-16 flex flex-col gap-12">
                  <div>
                    <h2 className="font-heading text-headline-md font-semibold">
                      The brand
                    </h2>
                    <p className="mt-4 font-body text-body-lg text-foreground-muted">
                      {caseStudy.brandDescription}
                    </p>
                  </div>

                  {caseStudy.challengePoints && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        The challenge
                      </h2>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.challengePoints.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.goal && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        The goal
                      </h2>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.goal.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.strategy && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        The strategy
                      </h2>
                      <p className="mt-4 font-body text-body-lg text-foreground-muted">
                        {caseStudy.strategy.intro}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.strategy.points.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.execution && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        The execution
                      </h2>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.execution.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.resultPoints && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        The results
                      </h2>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.resultPoints.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.whyItWorked && (
                    <div>
                      <h2 className="font-heading text-headline-md font-semibold">
                        Why this worked
                      </h2>
                      <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                        {caseStudy.whyItWorked.map((s) => (
                          <li key={s}>— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-16">
                  <h2 className="font-heading text-headline-md font-semibold">
                    The challenge
                  </h2>
                  <p className="mt-4 font-body text-body-lg text-foreground-muted">
                    {caseStudy.challenge ||
                      `${caseStudy.brand} came to us with strong product-market fit but a website and email program that weren't converting that demand into revenue — traffic was healthy, checkout and retention weren't keeping up.`}
                  </p>
                  <h2 className="mt-12 font-heading text-headline-md font-semibold">
                    What we did
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2 font-body text-body-lg text-foreground-muted">
                    {(caseStudy.approach || caseStudy.services).map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-heading text-headline-md font-semibold">
                    The work
                  </h2>
                  <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
                    {caseStudy.gallery.map((item) => (
                      <figure
                        key={item.src}
                        className="w-[280px] shrink-0 snap-start sm:w-[340px]"
                      >
                        <div className="h-[480px] overflow-y-auto rounded-lg border border-border-hairline bg-card">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="h-auto w-full"
                          />
                        </div>
                        {item.caption && (
                          <figcaption className="mt-3 font-body text-body-md text-foreground-muted">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
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
