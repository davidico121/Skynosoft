import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CaretDown,
  ClockCountdown,
  HandWaving,
  Repeat,
  ShieldCheck,
  UserCirclePlus,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CALENDLY_URL, SITE_URL, caseStudies } from "@/lib/content";
import { strategyPitches, type StrategyIconKey, type StrategyShot } from "@/lib/strategy";
import { Reveal, TaglineReveal } from "../Reveal";
import { IslandNav } from "../IslandNav";
import logo from "../../../../public/brand/skynosoft-logo-horizontal.png";
import founderAvatar from "../../../../public/brand/david-owoeye-avatar.jpg";

export const dynamicParams = false;

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;

const navLinks = [
  { href: "#gap", label: "The gap" },
  { href: "#benefits", label: "What changes" },
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "Questions" },
  { href: "#book", label: "Book a call" },
];

const icons: Record<StrategyIconKey, typeof HandWaving> = {
  welcome: HandWaving,
  reorder: ClockCountdown,
  subscription: Repeat,
  winback: UserCirclePlus,
};

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

function QuoteIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 40 32" fill="none" aria-hidden className="text-primary">
      <path
        d="M0 32V19.2C0 13.44 1.6 8.8 4.8 5.28C8 1.76 12.16 0 17.28 0V6.72C14.72 6.72 12.72 7.52 11.28 9.12C9.84 10.72 9.12 12.8 9.12 15.36H17.28V32H0ZM22.72 32V19.2C22.72 13.44 24.32 8.8 27.52 5.28C30.72 1.76 34.88 0 40 0V6.72C37.44 6.72 35.44 7.52 34 9.12C32.56 10.72 31.84 12.8 31.84 15.36H40V32H22.72Z"
        fill="currentColor"
      />
    </svg>
  );
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
    <h2 className="max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
      {children}
    </h2>
  );
}

function Section({
  children,
  id,
  tint = false,
}: {
  children: React.ReactNode;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-border-hairline ${tint ? "bg-card" : ""}`}
    >
      <Wrap className="py-24">{children}</Wrap>
    </section>
  );
}

function ShotImage({ shot, className = "" }: { shot: StrategyShot; className?: string }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      className={`block h-auto w-full ${className}`}
    />
  );
}

function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border-hairline bg-card px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
        </span>
        <span className="rounded-full bg-white px-3 py-0.5 font-body text-xs text-foreground-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
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

  const { hero } = pitch;
  const proofCases = pitch.caseStudySlugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const reviewCase = caseStudies.find((c) => c.slug === pitch.reviewFromCaseStudy);

  return (
    <>
      <a
        href="#main"
        className={`sr-only z-[60] rounded-lg bg-primary px-3 py-2 font-body text-base font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${FOCUS}`}
      >
        Skip to content
      </a>
      <IslandNav logo={logo} links={navLinks} />

      <main id="main">
        <section className="pt-32">
          <Wrap className="pb-24">
            <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
              <Reveal>
                <Eyebrow>{hero.eyebrow}</Eyebrow>
                <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-3xl font-bold text-transparent md:text-4xl">
                  {hero.headline.map((line) => (
                    <span key={line} className="md:block">
                      {line}{" "}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 font-body text-lg text-foreground-muted text-pretty">
                  {hero.subheading}
                </p>
                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <a href="#book" className={`shrink-0 ${BUTTON}`}>
                    {hero.cta}
                  </a>
                  {hero.proof && (
                    <p className="max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                      {hero.proof.source}: &ldquo;{hero.proof.quote}&rdquo; {hero.proof.name}
                    </p>
                  )}
                </div>
              </Reveal>

              {hero.visuals && (
                <Reveal delay={150} className="pb-10 pl-0 sm:pl-6 lg:pl-0">
                  <div className="relative">
                    <BrowserFrame url={hero.visuals.url}>
                      <ShotImage shot={hero.visuals.main} />
                    </BrowserFrame>
                    {hero.visuals.inset && (
                      <figure className="absolute -bottom-10 -left-4 w-[70%] sm:-left-6 lg:-left-10">
                        <BrowserFrame url={hero.visuals.url}>
                          <ShotImage shot={hero.visuals.inset} />
                        </BrowserFrame>
                        <figcaption className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 font-label text-xs uppercase tracking-wide text-white">
                          <WarningCircle size={16} weight="bold" aria-hidden />
                          {hero.visuals.inset.caption}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal className="mt-24" delay={150}>
              <div className="rounded-xl border border-border-hairline bg-card p-8">
                <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
                  {pitch.gap.label}
                </p>
                <ol className="mt-8 grid gap-6 md:grid-cols-3">
                  {pitch.gap.steps.map((step) => (
                    <li
                      key={step.title}
                      className={`flex flex-col rounded-xl border p-6 ${
                        step.leak ? "border-red-300 bg-red-50" : "border-border-hairline bg-white"
                      }`}
                    >
                      <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
                        {step.day}
                      </p>
                      <h3 className="mt-3 font-heading text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 flex-1 font-body text-base text-foreground-muted text-pretty">
                        {step.detail}
                      </p>
                      <p
                        className={`mt-6 inline-flex items-center gap-2 font-label text-sm uppercase tracking-wide ${
                          step.leak ? "text-red-700" : "text-growth-green"
                        }`}
                      >
                        {step.leak && <WarningCircle size={20} weight="bold" aria-hidden />}
                        {step.status}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </Wrap>
        </section>

        <Section id="gap" tint>
          <Reveal>
            <Eyebrow>The gap</Eyebrow>
            <div className="mt-4">
              <H2>{pitch.problemSolution.heading}</H2>
            </div>
            <div
              className={`mt-12 grid gap-6 ${
                pitch.problemSolution.reviews ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]" : ""
              }`}
            >
              <div
                className={`grid gap-6 ${
                  pitch.problemSolution.reviews ? "" : "md:grid-cols-2"
                }`}
              >
                <div className="rounded-xl border border-border-hairline bg-white p-8">
                  <h3 className="font-heading text-2xl font-semibold">
                    {pitch.problemSolution.problem.title}
                  </h3>
                  <p className="mt-4 font-body text-lg text-foreground-muted text-pretty">
                    {pitch.problemSolution.problem.text}
                  </p>
                </div>
                <div className="rounded-xl border border-border-hairline bg-white p-8">
                  <h3 className="font-heading text-2xl font-semibold">
                    {pitch.problemSolution.solution.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {pitch.problemSolution.solution.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 font-body text-base text-foreground-muted text-pretty"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {pitch.problemSolution.reviews && (
                <div className="flex flex-col gap-6">
                  <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
                    {pitch.problemSolution.reviews.heading}
                  </p>
                  {pitch.problemSolution.reviews.items.map((review) => (
                    <figure
                      key={review.name}
                      className="rounded-xl border border-border-hairline bg-white p-8"
                    >
                      <blockquote className="font-body text-lg text-foreground text-pretty">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 font-body text-base text-foreground-muted">
                        {review.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </Section>

        <Section id="benefits">
          <Reveal>
            <Eyebrow>What changes</Eyebrow>
            <div className="mt-4">
              <H2>{pitch.benefits.heading}</H2>
            </div>
            <div
              className={`mt-12 grid gap-12 ${
                pitch.benefits.products ? "lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16" : ""
              }`}
            >
              {pitch.benefits.products && (
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-6 lg:self-start">
                  {pitch.benefits.products.map((product) => (
                    <figure
                      key={product.name}
                      className="relative overflow-hidden rounded-xl border border-border-hairline bg-card"
                    >
                      <ShotImage shot={product.image} />
                      <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 font-label text-xs uppercase tracking-wide text-foreground lg:bottom-3 lg:left-3">
                        {product.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
              <div
                className={`grid gap-6 ${pitch.benefits.products ? "" : "md:grid-cols-2"}`}
              >
                {pitch.benefits.items.map(({ icon, title, detail }) => {
                  const Icon = icons[icon];
                  return (
                    <div
                      key={title}
                      className={`rounded-xl border border-border-hairline bg-card p-8 transition-all duration-500 ${EASE} hover:-translate-y-1`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                        <Icon size={24} weight="duotone" aria-hidden />
                      </span>
                      <h3 className="mt-6 font-heading text-xl font-semibold">{title}</h3>
                      <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                        {detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="how" tint>
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <div className="mt-4">
              <H2>{pitch.how.heading}</H2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {pitch.how.steps.map((phase, i) => (
                <li
                  key={phase.week}
                  className="rounded-xl border border-border-hairline bg-white p-8"
                >
                  <p className="font-heading text-4xl font-semibold text-outline-variant">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 font-label text-sm uppercase tracking-wide text-primary-soft">
                    {phase.week}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold">{phase.title}</h3>
                  <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                    {phase.description}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-8 rounded-xl border border-border-hairline bg-white p-8 sm:grid-cols-3">
              {pitch.how.impact.map((m) => (
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

        <Section id="proof">
          <Reveal>
            <Eyebrow>Proof</Eyebrow>
            <div className="mt-4">
              <H2>{pitch.proofHeading}</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {proofCases.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} baseUrl={SITE_URL} />
              ))}
            </div>
            {reviewCase?.clientReview && (
              <figure className="mt-6 rounded-xl bg-[#f7f6f3] p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <QuoteIcon />
                </div>
                <blockquote className="mt-6 max-w-[680px] font-body text-xl text-foreground-muted text-pretty">
                  &ldquo;{reviewCase.clientReview.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 font-body text-base text-foreground">
                  {reviewCase.clientReview.name}, {reviewCase.brand}
                </figcaption>
              </figure>
            )}
          </Reveal>
        </Section>

        <Section>
          <TaglineReveal
            text={pitch.tagline}
            className="max-w-[680px] font-heading text-4xl font-semibold text-pretty"
          />
        </Section>

        <Section id="faq" tint>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Questions</Eyebrow>
              <div className="mt-4">
                <H2>{pitch.faqHeading}</H2>
              </div>
              <a href="#book" className={`mt-8 ${BUTTON}`}>
                {hero.cta}
              </a>
            </Reveal>
            <Reveal className="flex flex-col gap-3">
              {pitch.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border-hairline bg-white p-6"
                >
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold ${FOCUS}`}
                  >
                    {f.q}
                    <CaretDown
                      size={20}
                      weight="bold"
                      aria-hidden
                      className={`shrink-0 transition-transform duration-500 ${EASE} group-open:rotate-180`}
                    />
                  </summary>
                  <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                    {f.a}
                  </p>
                </details>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section id="book">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
              <ShieldCheck size={24} weight="duotone" aria-hidden />
            </span>
            <h2 className="mt-6 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
              {pitch.risk.heading}
            </h2>
            <p className="mt-4 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              {pitch.risk.text}
            </p>
            <div className="mt-12 overflow-hidden rounded-xl border border-border-hairline bg-card">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                className="block"
                title="Book a call with Skynosoft"
              />
            </div>
            <div className="mt-12 flex flex-col items-center text-center">
              <Image
                src={founderAvatar}
                alt="David Owoeye"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover"
              />
              <p className="mt-4 font-heading text-lg font-semibold">David Owoeye</p>
              <p className="mt-1 font-body text-base text-foreground-muted">
                Founder &amp; CEO, Skynosoft Ltd.
              </p>
            </div>
          </Reveal>
        </Section>
      </main>
    </>
  );
}
