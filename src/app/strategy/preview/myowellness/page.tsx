import type { Metadata } from "next";
import { CaretDown, ClockCountdown, HandWaving, Repeat, ShieldCheck, UserCirclePlus, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CALENDLY_URL, SITE_URL, caseStudies } from "@/lib/content";
import { strategyPitches } from "@/lib/strategy";
import { Reveal, TaglineReveal } from "../../Reveal";
import { IslandNav } from "./IslandNav";
import logo from "../../../../../public/brand/skynosoft-logo-horizontal.png";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;

export const metadata: Metadata = {
  title: "A note for MYOwellness | Skynosoft",
  robots: { index: false, follow: false },
};

const pitch = strategyPitches.find((p) => p.slug === "myowellness")!;
const cannonbalm = caseStudies.find((c) => c.slug === "cannonbalm");
const proofCases = ["bwll", "cannonbalm"]
  .map((s) => caseStudies.find((c) => c.slug === s))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const navLinks = [
  { href: "#gap", label: "The gap" },
  { href: "#benefits", label: "What changes" },
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "Questions" },
  { href: "#book", label: "Book a call" },
];

const gap = [
  {
    day: "Day 0",
    title: "First purchase",
    detail: "Buys collagen, protein, or a superfood blend.",
    status: "Order placed",
    leak: false,
  },
  {
    day: "Day 25 to 30",
    title: "The pouch runs low",
    detail: "The natural moment to reorder.",
    status: "Nothing sent",
    leak: true,
  },
  {
    day: "Day 60 and on",
    title: "The customer lapses",
    detail: "Forgets, or picks up something else instead.",
    status: "Nothing sent",
    leak: true,
  },
];

const benefits = [
  {
    icon: HandWaving,
    title: "Buyers who stay past week one",
    detail: pitch.infrastructure[0].description,
  },
  {
    icon: ClockCountdown,
    title: "Reorders before the pouch runs out",
    detail: pitch.infrastructure[1].description,
  },
  {
    icon: Repeat,
    title: "Subscribers, not one time buyers",
    detail: pitch.infrastructure[2].description,
  },
  {
    icon: UserCirclePlus,
    title: "Quiet customers brought back",
    detail: pitch.infrastructure[3].description,
  },
];

const faqs = [
  {
    q: "What do you need from us to start?",
    a: "Access to your email platform and store, and a short conversation about how long each product lasts. Week one is spent confirming usage cycles and segments before anything is built.",
  },
  {
    q: "How do you decide when the reorder email goes out?",
    a: "It is timed to how long the product actually lasts. For a 30 day collagen pouch that means roughly day 25 to 30, and we confirm the exact timing with you in week one.",
  },
  {
    q: "What if a customer has already reordered?",
    a: "The flows check for a new purchase and stop, so nobody gets a reorder reminder after they have already bought again.",
  },
  {
    q: "Is the 40 to 50% a guarantee?",
    a: "No. It is the target this plan is aimed at, and we check it against your real reorder cycles in week one before anything is built.",
  },
  {
    q: "Can it be live before BFCM?",
    a: "The plan runs four weeks, so starting soon keeps the flows live comfortably ahead of peak traffic.",
  },
  {
    q: "What does it cost?",
    a: "We cover scope and pricing on the call, once we know which of the four pieces you want.",
  },
];

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

function H2({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <h2
      className={`max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
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

export default function MyoWellnessFullSkillPreview() {
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
        {/* 1-5. Above the fold: headline, subheadline, one CTA, one proof signal, hero visual */}
        <section className="pt-32">
          <Wrap className="pb-24">
            <Reveal>
              <Eyebrow>A note for MYOwellness</Eyebrow>
              <h1 className="mt-6 max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-3xl font-bold text-transparent md:text-4xl">
                <span className="md:block">Repeat orders from your </span>
                <span className="md:block">collagen and protein customers, </span>
                <span className="md:block">without paying to win them again</span>
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                Debbie&rsquo;s hair stopped falling out. Ling&rsquo;s skin cleared up. Neither
                heard from you again. Here is the retention system that changes that, live
                before BFCM.
              </p>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                <a href="#book" className={BUTTON}>
                  Book a strategy call
                </a>
                <p className="max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                  From a verified review on your site: &ldquo;my hair loss has stopped and new
                  growth has started.&rdquo; Debbie Smyth
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-16" delay={150}>
              <div className="rounded-xl border border-border-hairline bg-card p-8">
                <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
                  What happens after one collagen order today
                </p>
                <ol className="mt-8 grid gap-6 md:grid-cols-3">
                  {gap.map((step) => (
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

        {/* 6. Problem to solution */}
        <Section id="gap" tint>
          <Reveal>
            <Eyebrow>The gap</Eyebrow>
            <div className="mt-4">
              <H2>Your customers already believe in the product. Nothing brings them back.</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border-hairline bg-white p-8">
                <h3 className="font-heading text-2xl font-semibold">Right now</h3>
                <p className="mt-4 font-body text-lg text-foreground-muted text-pretty">
                  {pitch.amplify.paragraphs[1]}
                </p>
              </div>
              <div className="rounded-xl border border-border-hairline bg-white p-8">
                <h3 className="font-heading text-2xl font-semibold">With the system in place</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {pitch.transformation.points.map((point) => (
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
          </Reveal>
        </Section>

        {/* 7. Benefits */}
        <Section id="benefits">
          <Reveal>
            <Eyebrow>What changes</Eyebrow>
            <div className="mt-4">
              <H2>Four pieces that turn one purchase into a habit</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {benefits.map(({ icon: Icon, title, detail }) => (
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
              ))}
            </div>
          </Reveal>
        </Section>

        {/* 8. How it works, plus the expected impact row */}
        <Section id="how" tint>
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <div className="mt-4">
              <H2>Three steps, four weeks, live before BFCM</H2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {pitch.timeline.map((phase, i) => (
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

        {/* 9. Social proof */}
        <Section id="proof">
          <Reveal>
            <Eyebrow>Proof</Eyebrow>
            <div className="mt-4">
              <H2>The same kind of work, for wellness brands like yours</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {proofCases.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} baseUrl={SITE_URL} />
              ))}
            </div>
            {cannonbalm?.clientReview && (
              <figure className="mt-6 rounded-xl border border-border-hairline bg-card p-8">
                <blockquote className="max-w-[680px] font-body text-xl text-foreground-muted text-pretty">
                  &ldquo;{cannonbalm.clientReview.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 font-body text-base text-foreground">
                  {cannonbalm.clientReview.name}, {cannonbalm.brand}
                </figcaption>
              </figure>
            )}
          </Reveal>
        </Section>

        {/* Mandatory tagline reveal */}
        <Section>
          <TaglineReveal
            text={pitch.transformation.closing}
            className="max-w-[680px] font-heading text-4xl font-semibold text-pretty"
          />
        </Section>

        {/* 10. FAQ */}
        <Section id="faq" tint>
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-4">
              <H2>Before you book</H2>
            </div>
            <div className="mt-12 flex max-w-[680px] flex-col gap-3">
              {faqs.map((f) => (
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
            </div>
          </Reveal>
        </Section>

        {/* 11-12. Risk reversal and final CTA */}
        <Section id="book">
          <Reveal>
            <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                <ShieldCheck size={24} weight="duotone" aria-hidden />
              </span>
              <h2 className="mt-6 font-heading text-3xl font-semibold text-balance md:text-4xl">
                See the plan before you spend anything
              </h2>
              <p className="mt-4 font-body text-lg text-foreground-muted text-pretty">
                This isn&rsquo;t a sales call. Bring your questions, not your card.
              </p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`mt-8 ${BUTTON}`}>
                Book a strategy call
              </a>
            </div>
            <div className="mt-12 overflow-hidden rounded-xl border border-border-hairline bg-card">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                className="block"
                title="Book a call with Skynosoft"
              />
            </div>
            <p className="mt-8 text-center font-body text-base text-foreground-muted">
              David Owoeye, Skynosoft Ltd.
            </p>
          </Reveal>
        </Section>
      </main>
    </>
  );
}
