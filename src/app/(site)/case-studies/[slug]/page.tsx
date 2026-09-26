import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Chip } from "@/components/ui/Chip";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { Reveal } from "@/components/ui/Reveal";
import {
  BUTTON,
  BUTTON_SECONDARY,
  Eyebrow,
  FOCUS,
  Section,
  Wrap,
} from "@/components/ui/page-kit";
import { FinalCta } from "@/components/ui/sections";
import { CTA_LABEL, caseStudies, type CaseStudy } from "@/lib/content";

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
  const title = `${caseStudy.brand} — Skynosoft Case Study`;
  return {
    title,
    description: `${caseStudy.headline}. ${caseStudy.summary}`,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title,
      description: caseStudy.summary,
      images: caseStudy.heroImage ? [{ url: caseStudy.heroImage.src }] : undefined,
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-body text-lg text-foreground-muted">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseSection({
  id,
  title,
  intro,
  items,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  items?: string[];
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div id={id} className="scroll-mt-32">
        <h2 className="font-heading text-3xl font-semibold text-balance">{title}</h2>
        {intro && (
          <div className="mt-4">
            <Paragraphs text={intro} className="font-body text-lg text-foreground-muted text-pretty" />
          </div>
        )}
        {items && <BulletList items={items} />}
        {children}
      </div>
    </Reveal>
  );
}

function related(current: CaseStudy): CaseStudy[] {
  const others = caseStudies.filter((cs) => cs.slug !== current.slug);
  const sameCategory = others.filter((cs) => cs.category === current.category);
  const rest = others.filter((cs) => cs.category !== current.category);
  return [...sameCategory, ...rest].slice(0, 2);
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
      <section>
        <Wrap className="pb-24 pt-16">
          <div
            className={`grid items-center gap-16 ${
              caseStudy.heroImage ? "lg:grid-cols-[minmax(0,680px)_1fr]" : ""
            }`}
          >
            <Reveal>
              <nav aria-label="Breadcrumb">
                <Link
                  href="/case-studies"
                  className={`rounded font-label text-sm uppercase tracking-wide text-primary-soft hover:underline ${FOCUS}`}
                >
                  ← Case studies
                </Link>
              </nav>
              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudy.services.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
                {caseStudy.headline}
              </h1>
              <p className="mt-4 font-label text-sm uppercase tracking-wide text-foreground-muted">
                {caseStudy.brand} · {caseStudy.category}
              </p>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                {caseStudy.summary}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className={BUTTON}>
                  {CTA_LABEL}
                </Link>
                <Link href="/case-studies" className={BUTTON_SECONDARY}>
                  More case studies
                </Link>
              </div>
            </Reveal>
            {caseStudy.heroImage && (
              <Reveal delay={150}>
                <div className="overflow-hidden rounded-xl border border-border-hairline-strong bg-card shadow-lg">
                  <Image
                    src={caseStudy.heroImage.src}
                    alt={caseStudy.heroImage.alt}
                    width={caseStudy.heroImage.width}
                    height={caseStudy.heroImage.height}
                    priority
                    className="block h-auto w-full"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Wrap>
      </section>

      {caseStudy.metrics.length > 0 && (
        <Section tint>
          <Reveal>
            <Eyebrow>Results at a glance</Eyebrow>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {caseStudy.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border-hairline bg-white p-8"
                >
                  <p className="font-heading text-4xl font-bold text-growth-green md:text-5xl">
                    {m.value}
                  </p>
                  <p className="mt-2 font-label text-sm uppercase tracking-wide text-foreground-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <Section>
        <div className="grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl border border-border-hairline bg-card p-6">
              <Image
                src="/brand/skynosoft-icon.png"
                alt="Skynosoft"
                width={40}
                height={40}
                className="rounded-md"
              />
              <p className="mt-4 font-label text-sm uppercase tracking-wide text-foreground-muted">
                Want this for your brand?
              </p>
              <p className="mt-2 font-heading text-3xl font-semibold">Book a call</p>
              <Link href="/contact" className={`mt-6 w-full ${BUTTON}`}>
                {CTA_LABEL}
              </Link>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-16">
            {caseStudy.brandDescription && (
              <CaseSection id="brand" title="The brand" intro={caseStudy.brandDescription} />
            )}
            {caseStudy.challengePoints && (
              <CaseSection id="challenge" title="The challenge" items={caseStudy.challengePoints} />
            )}
            {caseStudy.goal && <CaseSection id="goal" title="The goal" items={caseStudy.goal} />}
            {caseStudy.strategy && (
              <CaseSection
                id="strategy"
                title="The strategy"
                intro={caseStudy.strategy.intro}
                items={caseStudy.strategy.points}
              />
            )}
            {caseStudy.execution && (
              <CaseSection id="execution" title="The execution" items={caseStudy.execution} />
            )}
            {caseStudy.resultPoints && (
              <CaseSection id="results" title="The results" items={caseStudy.resultPoints}>
                {caseStudy.resultsImages?.map((img) => (
                  <div
                    key={img.src}
                    className="mt-8 overflow-hidden rounded-xl border border-border-hairline bg-card"
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
                    <div className="overflow-hidden rounded-xl border border-border-hairline bg-card">
                      <Image
                        src={caseStudy.resultsChart.src}
                        alt={caseStudy.resultsChart.alt}
                        width={caseStudy.resultsChart.width}
                        height={caseStudy.resultsChart.height}
                        className="block h-auto w-full"
                      />
                    </div>
                    {caseStudy.resultsChart.caption && (
                      <figcaption className="mt-3 font-body text-base text-foreground-muted">
                        {caseStudy.resultsChart.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </CaseSection>
            )}

            {caseStudy.clientReview && (
              <Reveal>
                <div id="review" className="scroll-mt-32">
                  <h2 className="font-heading text-3xl font-semibold text-balance">Client review</h2>
                  <figure className="mt-8 rounded-xl bg-[#f7f6f3] p-6 md:p-8">
                    <QuoteBadge />
                    <blockquote className="mt-6">
                      <Paragraphs
                        quote
                        text={caseStudy.clientReview.quote}
                        className="font-body text-lg text-foreground-muted text-pretty"
                      />
                    </blockquote>
                    <figcaption className="mt-6 font-body text-base text-foreground">
                      {caseStudy.clientReview.name}, {caseStudy.brand}
                      {caseStudy.clientReview.role && (
                        <span className="text-foreground-muted">
                          {" "}
                          · {caseStudy.clientReview.role}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            )}

            {caseStudy.whyItWorked && (
              <CaseSection id="why" title="Why this worked" items={caseStudy.whyItWorked} />
            )}

            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <Reveal>
                <div id="work" className="scroll-mt-32">
                  <h2 className="font-heading text-3xl font-semibold text-balance">The work</h2>
                  <div className="hide-scrollbar mt-8 flex flex-col gap-6 sm:snap-x sm:snap-mandatory sm:flex-row sm:overflow-x-auto sm:pb-4">
                    {caseStudy.gallery.map((item) => (
                      <figure
                        key={item.src}
                        className="w-full shrink-0 sm:w-[260px] sm:snap-start"
                      >
                        <div className="hide-scrollbar h-[400px] overflow-y-auto rounded-xl border border-border-hairline bg-card">
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
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <Section tint>
        <Reveal>
          <Eyebrow>Keep reading</Eyebrow>
          <h2 className="mt-4 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
            More brands we have worked with
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {related(caseStudy).map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </Reveal>
      </Section>

      <FinalCta tint={false} />
    </>
  );
}
