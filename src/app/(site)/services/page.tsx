import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { Reveal, TaglineReveal } from "@/components/ui/Reveal";
import { BUTTON, BrowserFrame, Eyebrow, FOCUS, Section, Wrap } from "@/components/ui/page-kit";
import { FaqSection, FinalCta, ProcessSection } from "@/components/ui/sections";
import { CTA_LABEL, caseStudies, services } from "@/lib/content";
import { splitParagraphs } from "@/lib/paragraphs";

export const metadata: Metadata = {
  title: "Services — Skynosoft",
  description:
    "Ecommerce website design, conversion rate optimization and Klaviyo email marketing, planned as one system by one team.",
  alternates: {
    canonical: "/services",
  },
};

/** Which real case study and client review backs up each service. */
const proofByService: Record<string, { caseStudy: string; review?: string }> = {
  "website-design-cro": { caseStudy: "afrocenchix", review: "afrocenchix" },
  "email-marketing": { caseStudy: "novaya", review: "cannonbalm" },
  "growth-partnership": { caseStudy: "streaky-academy" },
};

const tagline =
  "A better checkout helps every visitor. A better email helps every customer. Do both and growth stops resetting every month.";

const faqs = [
  {
    q: "How do I know which service I need?",
    a: "The audit call shows it. If shoppers reach your store but don't buy, we start with the website. If they buy once and go quiet, we start with email. Many brands need both.",
  },
  {
    q: "Do you rebuild my whole site or improve what I have?",
    a: "Either. We design new stores from the ground up, or work on the one you have: checkout and mobile fixes, product page changes and a testing plan.",
  },
  {
    q: "What does the email work include?",
    a: "The full set of flows (welcome, abandoned cart, post purchase and win back), weekly campaign strategy and copy, list growth and segmentation, and deliverability and revenue reporting.",
  },
  {
    q: "How will I see the results?",
    a: "Reporting ties the website and email changes back to revenue, so you see what each change earned instead of a list of opens and clicks.",
  },
  {
    q: "Can I start with one service and add the other later?",
    a: "Yes. Start where the audit shows the biggest leak, and add the other when you are ready.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Email and SMS work is built in Klaviyo. Website work has covered Shopify, Squarespace and Wix, including migrations between them.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section>
        <Wrap className="pb-24 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
            <Reveal>
              <Eyebrow>Services</Eyebrow>
              <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-transparent md:text-5xl">
                <span className="md:block">Two skill sets, </span>
                <span className="md:block">one growth system.</span>
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                A store that converts is half the job. The other half is email that brings
                customers back to it. We build both, planned by one person, so they work as one
                machine instead of two vendors pulling in different directions.
              </p>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                <Link href="/contact" className={`shrink-0 ${BUTTON}`}>
                  {CTA_LABEL}
                </Link>
                <p className="max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                  <Link
                    href="/work/afrocenchix"
                    className={`font-semibold text-foreground underline underline-offset-4 hover:text-primary-soft ${FOCUS}`}
                  >
                    Afrocenchix
                  </Link>{" "}
                  saw a 23% lift in add to cart rate in a 60 day sprint.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} className="pb-10 pl-0 sm:pl-6 lg:pl-0">
              <div className="relative">
                <BrowserFrame url="afrocenchix.com">
                  <Image
                    src="/home/services-site.jpg"
                    alt="The Afrocenchix Swish and Swirl Wash Day Duo product page with subscribe and save pricing"
                    width={1200}
                    height={750}
                    priority
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
                <figure className="absolute -bottom-10 -left-4 w-[70%] sm:-left-6 lg:-left-10">
                  <div className="overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg">
                    <Image
                      src="/case-studies/novaya/revenue-chart.png"
                      alt="A bar chart of Novaya flow attributed revenue by lifecycle stage, led by $173,929 from the welcome flow"
                      width={1300}
                      height={700}
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 inline-flex items-center gap-2 rounded-full bg-growth-green px-3 py-1 font-label text-xs uppercase tracking-wide text-white">
                    <CheckCircle size={16} weight="bold" aria-hidden />
                    Novaya: revenue by flow
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {services.map((service, i) => {
        const proof = proofByService[service.slug];
        const caseStudy = caseStudies.find((c) => c.slug === proof?.caseStudy);
        const review = caseStudies.find((c) => c.slug === proof?.review)?.clientReview;
        const reviewBrand = caseStudies.find((c) => c.slug === proof?.review)?.brand;
        return (
          <Section key={service.slug} id={service.slug} tint={i % 2 === 0}>
            <div className="grid items-start gap-16 lg:grid-cols-2">
              <Reveal>
                <p className="font-heading text-4xl font-semibold text-outline-variant">
                  0{i + 1}
                </p>
                <h2 className="mt-4 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
                  {service.name}
                </h2>
                <p className="mt-2 font-label text-sm uppercase tracking-wide text-primary-soft">
                  {service.tagline}
                </p>
                <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                  {service.description}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 font-body text-base text-foreground">
                      <CheckCircle
                        size={24}
                        weight="duotone"
                        aria-hidden
                        className="mt-0.5 shrink-0 text-primary-soft"
                      />
                      <span className="text-pretty">{d}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 ${BUTTON}`}>
                  {CTA_LABEL}
                </Link>
              </Reveal>

              <Reveal delay={100} className="flex flex-col gap-6">
                {caseStudy && <CaseStudyCard caseStudy={caseStudy} />}
                {review && (
                  <figure className="rounded-xl bg-[#f7f6f3] p-6 md:p-8">
                    <QuoteBadge />
                    <blockquote className="mt-6">
                      <Paragraphs
                        quote
                        text={review.quote}
                        className="font-body text-lg text-foreground-muted text-pretty"
                      />
                    </blockquote>
                    <figcaption className="mt-6 font-body text-base text-foreground">
                      {review.name}, {reviewBrand}
                    </figcaption>
                  </figure>
                )}
              </Reveal>
            </div>
          </Section>
        );
      })}

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

      <ProcessSection />
      <FaqSection faqs={faqs} tint={false} />
      <FinalCta />
    </>
  );
}
