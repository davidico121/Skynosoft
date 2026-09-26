import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CurrencyDollar, LinkSimple, Rocket } from "@phosphor-icons/react/dist/ssr";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { Reveal, TaglineReveal } from "@/components/ui/Reveal";
import { BUTTON, Eyebrow, H2, Section, Wrap } from "@/components/ui/page-kit";
import { FinalCta, LogoStrip, ProcessSection } from "@/components/ui/sections";
import { CTA_LABEL, caseStudies, team } from "@/lib/content";
import { splitParagraphs } from "@/lib/paragraphs";

export const metadata: Metadata = {
  title: "About — Skynosoft",
  description:
    "Skynosoft is an ecommerce growth agency that builds the website and the email system as one, led by founder David Owoeye.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: CurrencyDollar,
    title: "Revenue, not vanity metrics",
    description:
      "Traffic and impressions don't pay bills. Every decision is measured against checkout revenue and email attributed revenue.",
  },
  {
    icon: LinkSimple,
    title: "One system, not two vendors",
    description:
      "Your website and your email program should work together. We build both, so nothing falls through the gap between agencies.",
  },
  {
    icon: Rocket,
    title: "Built to keep working as you grow",
    description:
      "We design systems that hold up as a brand scales, so you are not rebuilding the same flows and pages a year from now.",
  },
];

const tagline =
  "We measure ourselves the way you measure the business. In revenue that reached the bank, not impressions.";

export default function AboutPage() {
  const founder = team[0];
  const reviews = ["cannonbalm", "thyvita"]
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c) => c?.clientReview);

  return (
    <>
      <section>
        <Wrap className="pb-24 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
                We build the two things that move ecommerce revenue.
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                Skynosoft started from a simple observation. Agencies that only do web design
                ignore retention, and agencies that only do email are fighting a website that
                leaks conversions. We do both, as one system, for one goal: revenue.
              </p>
              <Link href="/contact" className={`mt-8 ${BUTTON}`}>
                {CTA_LABEL}
              </Link>
            </Reveal>
            <Reveal delay={150} className="mx-auto w-full max-w-[360px] lg:mx-0 lg:ml-auto">
              <figure>
                <div className="overflow-hidden rounded-xl border border-border-hairline-strong bg-card shadow-lg">
                  <Image
                    src="/about/david-owoeye.jpg"
                    alt="David Owoeye, founder of Skynosoft"
                    width={800}
                    height={1000}
                    priority
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-heading text-lg font-semibold">{founder.name}</p>
                  <p className="font-body text-base text-foreground-muted">
                    Founder &amp; CEO, Skynosoft Ltd.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <LogoStrip />

      <Section tint>
        <Reveal>
          <Eyebrow>Why one team</Eyebrow>
          <div className="mt-4">
            <H2>Most stores get half the job done.</H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border-hairline bg-white p-8">
              <h3 className="font-heading text-2xl font-semibold">Web design only</h3>
              <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                A beautiful store that converts the first visit, then does nothing to bring the
                customer back.
              </p>
            </div>
            <div className="rounded-xl border border-border-hairline bg-white p-8">
              <h3 className="font-heading text-2xl font-semibold">Email only</h3>
              <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                Sharp flows and campaigns sending traffic to a site that leaks conversions on
                the way to checkout.
              </p>
            </div>
            <div className="rounded-xl border border-primary bg-white p-8">
              <h3 className="font-heading text-2xl font-semibold">Both, as one system</h3>
              <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                One person plans the site and the emails together, so every visitor has a reason
                to buy and a reason to return.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="values">
        <Reveal>
          <Eyebrow>How we think</Eyebrow>
          <div className="mt-4">
            <H2>Three rules behind every project.</H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border-hairline bg-card p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                  <v.icon size={24} weight="duotone" aria-hidden />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-semibold">{v.title}</h3>
                <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          {splitParagraphs(tagline, 100, 100).map((para) => (
            <TaglineReveal
              key={para}
              text={para}
              className="max-w-[680px] font-heading text-4xl font-semibold text-pretty"
            />
          ))}
        </div>
      </Section>

      <Section id="founder" tint>
        <Reveal>
          <Eyebrow>Who is behind it</Eyebrow>
          <div className="mt-4">
            <H2>{`Meet ${founder.name}.`}</H2>
          </div>
          <div className="mt-8 max-w-[680px]">
            <Paragraphs
              text={`${founder.bio} He has worked hands on across Shopify conversion programs, Klaviyo lifecycle systems, and store migrations between Squarespace, Shopify and Wix.`}
              className="font-body text-lg text-foreground-muted text-pretty"
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reviews.map((cs) => (
              <figure key={cs!.slug} className="rounded-xl bg-[#f7f6f3] p-6 md:p-8">
                <QuoteBadge />
                <blockquote className="mt-6">
                  <Paragraphs
                    quote
                    text={cs!.clientReview!.quote}
                    className="font-body text-lg text-foreground-muted text-pretty"
                  />
                </blockquote>
                <figcaption className="mt-6 font-body text-base text-foreground">
                  {cs!.clientReview!.name}, {cs!.brand}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Section>

      <ProcessSection tint={false} />
      <FinalCta />
    </>
  );
}
