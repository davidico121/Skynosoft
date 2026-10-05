import Image from "next/image";
import {
  ArrowSquareOut,
  ChartLineUp,
  EnvelopeSimple,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { Reveal, TaglineReveal } from "@/components/ui/Reveal";
import { BUTTON, BUTTON_SECONDARY, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";
import { caseStudies, services } from "@/lib/content";

const UPWORK_URL = "https://www.upwork.com/freelancers/~017a87b019f1f7020a";

const cro = services.find((s) => s.slug === "website-design-cro")!;
const email = services.find((s) => s.slug === "email-marketing")!;
const growth = services.find((s) => s.slug === "growth-partnership")!;

const proofSlugs = ["afrocenchix", "cannonbalm", "thyvita"];
const proof = proofSlugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const testimonial = caseStudies.find((c) => c.slug === "afrocenchix")?.clientReview;

const tagline =
  "A store that converts the first visit is half the job. The other half is bringing that customer back without paying for the click twice.";

const steps = [
  {
    step: "01",
    title: "Audit",
    description:
      "I go through the store and the funnel myself, product pages, cart, checkout, and show exactly where visitors are dropping off before they buy.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Fixes and redesigns built around how that specific store's customers actually shop, not a generic template or a theme swap.",
  },
  {
    step: "03",
    title: "Test",
    description:
      "Changes go live as a testing plan, so what moves the needle keeps compounding instead of being a one time edit.",
  },
];

export default function DavidPortfolioPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mt-6 flex justify-center px-4">
        <nav
          aria-label="Page"
          className="flex w-max items-center gap-6 rounded-full border border-border-hairline bg-white/80 py-2 pl-6 pr-2 shadow-sm backdrop-blur-xl"
        >
          <span className="font-heading text-base font-semibold">David Owoeye</span>
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <a
                href="#work"
                className={`rounded-full font-body text-base text-foreground-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground ${FOCUS}`}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#how"
                className={`rounded-full font-body text-base text-foreground-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground ${FOCUS}`}
              >
                How I work
              </a>
            </li>
          </ul>
          <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className={BUTTON}>
            Hire me on Upwork
          </a>
        </nav>
      </header>

      <main id="main">
        <section>
          <Wrap className="pb-24 pt-40">
            <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
              <Reveal>
                <Eyebrow>David Owoeye</Eyebrow>
                <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
                  <span className="md:block">Ecommerce conversion work</span>{" "}
                  <span className="md:block">that turns the traffic</span>{" "}
                  <span className="md:block">you already have into revenue</span>
                </h1>
                <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                  I audit and rebuild the parts of a store between a click and a sale, product
                  pages, cart, checkout, so the traffic already arriving actually converts. When a
                  brand wants the full picture, I also build the Klaviyo email and SMS systems
                  that bring customers back afterward.
                </p>
                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <a
                    href={UPWORK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`shrink-0 ${BUTTON}`}
                  >
                    Hire me on Upwork
                    <ArrowSquareOut size={18} weight="bold" className="ml-2" aria-hidden />
                  </a>
                  <p className="max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                    Afrocenchix saw a +23% lift in add to cart rate from a 60 day CRO sprint.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150} className="mx-auto w-full max-w-[360px] lg:mx-0 lg:ml-auto">
                <figure>
                  <div className="overflow-hidden rounded-xl border border-border-hairline-strong bg-card shadow-lg">
                    <Image
                      src="/about/david-owoeye.jpg"
                      alt="David Owoeye"
                      width={800}
                      height={1000}
                      priority
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-heading text-lg font-semibold">David Owoeye</p>
                    <p className="font-body text-base text-foreground-muted">
                      Ecommerce CRO &amp; Email Retention Specialist
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </Wrap>
        </section>

        <Section tint>
          <Reveal>
            <TaglineReveal
              text={tagline}
              className="max-w-[680px] font-heading text-4xl font-semibold text-balance md:text-5xl"
            />
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <Eyebrow>What I do</Eyebrow>
            <div className="mt-4">
              <H2>Conversion rate optimization, done properly</H2>
            </div>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              {cro.description}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {cro.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-xl border border-border-hairline bg-card p-6 font-body text-base text-foreground-muted"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section tint id="work">
          <Reveal>
            <Eyebrow>Recent work</Eyebrow>
            <div className="mt-4">
              <H2>Real stores, real numbers</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {proof.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} baseUrl="https://www.skynosoft.net" />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href="https://www.skynosoft.net/case-studies"
                target="_blank"
                rel="noopener noreferrer"
                className={BUTTON_SECONDARY}
              >
                View more case studies
              </a>
            </div>
          </Reveal>
          {testimonial && (
            <Reveal delay={150} className="mt-12 max-w-[680px] rounded-xl bg-[#f7f6f3] p-8">
              <QuoteBadge />
              <Paragraphs
                text={testimonial.quote}
                quote
                className="mt-6 font-heading text-xl font-medium text-balance"
              />
              <p className="mt-4 font-body text-base text-foreground-muted">
                {testimonial.name}, Afrocenchix
              </p>
            </Reveal>
          )}
        </Section>

        <Section>
          <Reveal>
            <Eyebrow>What I also do</Eyebrow>
            <div className="mt-4">
              <H2>The rest of the system, when you want it</H2>
            </div>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              CRO is the main focus of my Upwork work, but the stores I build for are rarely one
              project. Most of them need the email side too, and some want both planned together
              from day one.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border-hairline bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <EnvelopeSimple size={24} weight="bold" aria-hidden />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold">{email.name}</h3>
                <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                  Klaviyo flows and campaigns built to recover abandoned revenue, grow a list, and
                  turn customers who buy once into customers who buy again.
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {email.deliverables.slice(0, 2).map((d) => (
                    <li key={d} className="font-body text-sm text-foreground-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border-hairline bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lightning size={24} weight="bold" aria-hidden />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold">{growth.name}</h3>
                <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                  The combination most of my repeat clients land on: a highly converting site
                  paired with email flows and campaigns that compound, so every dollar of traffic
                  works harder.
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {growth.deliverables.slice(0, 2).map((d) => (
                    <li key={d} className="font-body text-sm text-foreground-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section tint id="how">
          <Reveal>
            <Eyebrow>How I work</Eyebrow>
            <div className="mt-4">
              <H2>From audit to a store that keeps converting.</H2>
            </div>
            <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((s, i) => (
                <li key={s.step} className="relative flex gap-6 md:block">
                  {i < steps.length - 1 && (
                    <>
                      <span
                        aria-hidden
                        className="absolute left-6 top-14 h-[calc(100%+24px)] w-px bg-border-hairline-strong md:hidden"
                      />
                      <span
                        aria-hidden
                        className="absolute left-16 -right-4 top-6 hidden h-px bg-border-hairline-strong md:block"
                      />
                    </>
                  )}
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-white">
                    {s.step}
                  </span>
                  <div className="md:mt-6">
                    <h3 className="font-heading text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        <Section>
          <Reveal className="flex flex-col items-center text-center">
            <ChartLineUp size={40} weight="bold" className="text-primary" aria-hidden />
            <h2 className="mt-6 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
              See where your store is leaking revenue before you hire anyone
            </h2>
            <p className="mt-4 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              Send me the store URL on Upwork and I will tell you plainly whether there is a real
              fix here, before you spend anything.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={UPWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={BUTTON}
              >
                Hire me on Upwork
                <ArrowSquareOut size={18} weight="bold" className="ml-2" aria-hidden />
              </a>
              <a
                href="#work"
                className={BUTTON_SECONDARY}
              >
                See the work
              </a>
            </div>
            <Image
              src="/brand/david-owoeye-avatar.jpg"
              alt="David Owoeye"
              width={96}
              height={96}
              className="mt-12 h-24 w-24 rounded-full object-cover"
            />
            <p className="mt-4 font-heading text-lg font-semibold">David Owoeye</p>
            <p className="mt-1 font-body text-base text-foreground-muted">
              Ecommerce CRO &amp; Email Retention Specialist
            </p>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-border-hairline">
        <Wrap className="flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-body text-sm text-foreground-muted">
            © {new Date().getFullYear()} David Owoeye
          </p>
          <a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary-soft ${FOCUS}`}
          >
            View my Upwork profile
          </a>
        </Wrap>
      </footer>
    </>
  );
}
