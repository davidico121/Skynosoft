import Image from "next/image";
import Link from "next/link";
import {
  Browsers,
  CaretDown,
  ChartLineUp,
  CheckCircle,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { Reveal, TaglineReveal } from "@/components/ui/Reveal";
import {
  BUTTON,
  BUTTON_SECONDARY,
  BrowserFrame,
  EASE,
  Eyebrow,
  FOCUS,
  H2,
  Section,
  Wrap,
} from "@/components/ui/page-kit";
import { splitParagraphs } from "@/lib/paragraphs";
import { caseStudies, services } from "@/lib/content";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";
import founderAvatar from "../../../public/brand/david-owoeye-avatar.jpg";

export const revalidate = 60;

const CTA_LABEL = "Book a free audit";

const serviceIcons = {
  "website-design-cro": Browsers,
  "email-marketing": EnvelopeSimple,
  "growth-partnership": ChartLineUp,
} as const;

const problemText =
  "A shopper lands on your store, can't find the product they came for, and leaves. The ones who do buy get a receipt and then silence. You paid to bring both groups in, and nothing you own brings either one back.";

const solutionPoints = [
  "Product pages, collections and checkout rebuilt around how your customers actually shop.",
  "A welcome flow that reaches new subscribers before they go cold.",
  "Abandoned cart and browse flows that bring back people who almost bought.",
  "Post purchase and win back flows that earn the second order.",
];

const tagline =
  "Every visitor you paid for should have a reason to buy today, and a reason to come back next month. We build both halves.";

const steps = [
  {
    step: "01",
    title: "Audit",
    description:
      "We go through your site, funnel and email program and show you exactly where revenue is leaking.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "A website, funnel or email system designed around your customer, not a template.",
  },
  {
    step: "03",
    title: "Scale",
    description:
      "Ongoing testing on the site and the emails, so what works gets bigger every month.",
  },
];

const featuredSlugs = ["novaya", "streaky-academy", "bwll", "cannonbalm"];

const faqs = [
  {
    q: "What do you actually do?",
    a: "We design and improve ecommerce websites, and we build the Klaviyo email and SMS systems that bring customers back. You can hire us for one, or for both as a single growth partnership.",
  },
  {
    q: "Do I need both the website and the email work?",
    a: "No. Many brands start with one. Email is often the faster place to find recovered revenue, and the website is where a conversion lift pays off on every visitor. The audit shows which one is holding you back.",
  },
  {
    q: "What happens on the audit call?",
    a: "We look at your store and your email setup together and point to where revenue is leaking. You leave with a plan you can act on, whether or not we work together. Bring your store URL, not your card.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Email and SMS work is built in Klaviyo. Website work has covered Shopify, Squarespace and Wix, including migrations between them.",
  },
  {
    q: "Who will I be working with?",
    a: "David Owoeye leads strategy on every engagement, so the site and the email program are planned by the same person.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function Home() {
  const latestPosts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);
  const logoBrands = caseStudies.filter((cs) => cs.logo);
  const featured = featuredSlugs
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter((cs) => cs !== undefined);
  const reviews = caseStudies.filter((cs) => cs.clientReview);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section>
        <Wrap className="pb-24 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
            <Reveal>
              <Eyebrow>Ecommerce growth agency</Eyebrow>
              <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-transparent md:text-5xl">
                <span className="md:block">Websites that convert, </span>
                <span className="md:block">email that brings </span>
                <span className="md:block">customers back.</span>
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                Skynosoft builds Shopify stores and Klaviyo email systems for fashion, skincare,
                wellness and supplement brands. One team plans both, so the site and the emails
                work as one machine.
              </p>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                <Link href="/contact" className={`shrink-0 ${BUTTON}`}>
                  {CTA_LABEL}
                </Link>
                <p className="max-w-[420px] font-body text-base text-foreground-muted text-pretty">
                  <Link
                    href="/work/novaya"
                    className={`font-semibold text-foreground underline underline-offset-4 hover:text-primary-soft ${FOCUS}`}
                  >
                    Novaya
                  </Link>{" "}
                  earned $300K+ from email flows we built.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} className="pb-10 pl-0 sm:pl-6 lg:pl-0">
              <div className="relative">
                <BrowserFrame url="afrocenchix.com">
                  <Image
                    src="/home/hero-site.jpg"
                    alt="The Afrocenchix homepage we redesigned, with a promotional hero and shop by category navigation"
                    width={1200}
                    height={750}
                    priority
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
                <figure className="absolute -bottom-10 -left-4 w-[70%] sm:-left-6 lg:-left-10">
                  <BrowserFrame url="klaviyo.com">
                    <Image
                      src="/home/hero-results.jpg"
                      alt="A Klaviyo business performance summary for BWLL showing $187,156.95 total revenue and $75,377.60 attributed to email"
                      width={1000}
                      height={437}
                      className="block h-auto w-full"
                    />
                  </BrowserFrame>
                  <figcaption className="mt-2 inline-flex items-center gap-2 rounded-full bg-growth-green px-3 py-1 font-label text-xs uppercase tracking-wide text-white">
                    <CheckCircle size={16} weight="bold" aria-hidden />
                    BWLL: $75K from email
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <section className="border-t border-border-hairline">
        <Wrap className="py-12">
          <p className="text-center font-label text-sm uppercase tracking-wide text-foreground-muted">
            Brands we have worked with
          </p>
          <ul className="mx-auto mt-8 flex max-w-[960px] flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {logoBrands.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/work/${cs.slug}`}
                  aria-label={`${cs.brand} case study`}
                  className={`block h-8 w-28 rounded transition-opacity duration-300 ${EASE} opacity-80 hover:opacity-100 ${FOCUS}`}
                >
                  <Image
                    src={cs.logo!.src}
                    alt={cs.brand}
                    width={cs.logo!.width}
                    height={cs.logo!.height}
                    unoptimized={cs.logo!.src.endsWith(".svg")}
                    className="h-full w-full object-contain"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <Section id="problem" tint>
        <Reveal>
          <Eyebrow>Where revenue leaks</Eyebrow>
          <div className="mt-4">
            <H2>You already pay for the traffic. Most of it never comes back.</H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border-hairline bg-white p-8">
              <h3 className="font-heading text-2xl font-semibold">Right now</h3>
              <div className="mt-4">
                <Paragraphs
                  text={problemText}
                  className="font-body text-lg text-foreground-muted text-pretty"
                />
              </div>
            </div>
            <div className="rounded-xl border border-border-hairline bg-white p-8">
              <h3 className="font-heading text-2xl font-semibold">With the system in place</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {solutionPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 font-body text-base text-foreground-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="services">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <div className="mt-4">
            <H2>One team, two skill sets, one job: revenue.</H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];
              return (
                <Link
                  key={service.slug}
                  href={`/services#${service.slug}`}
                  className={`group flex flex-col rounded-xl border border-border-hairline bg-card p-8 transition-all duration-300 ${EASE} hover:-translate-y-1 hover:border-border-hairline-strong active:scale-[0.99] ${FOCUS}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                    <Icon size={24} weight="duotone" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-semibold">{service.name}</h3>
                  <p className="mt-2 font-label text-sm uppercase tracking-wide text-primary-soft">
                    {service.tagline}
                  </p>
                  <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                    {service.description.replace(/ — /g, ", ").replace(/-/g, " ")}
                  </p>
                </Link>
              );
            })}
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

      <Section id="how" tint>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <div className="mt-4">
            <H2>From audit to scale in three steps.</H2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.step} className="rounded-xl border border-border-hairline bg-white p-8">
                <p className="font-heading text-4xl font-semibold text-outline-variant">
                  {s.step}
                </p>
                <h3 className="mt-4 font-heading text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section id="proof">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Case studies</Eyebrow>
              <div className="mt-4">
                <H2>Real brands, real revenue.</H2>
              </div>
            </div>
            <Link href="/work" className={BUTTON_SECONDARY}>
              View all case studies
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>

          <div className="mt-24">
            <Eyebrow>Client reviews</Eyebrow>
            <div className="mt-4">
              <H2>What clients say about working with the team.</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {reviews.map((cs) => (
                <figure key={cs.slug} className="rounded-xl bg-[#f7f6f3] p-6 md:p-8">
                  <QuoteBadge />
                  <blockquote className="mt-6">
                    <Paragraphs
                      quote
                      text={cs.clientReview!.quote}
                      className="font-body text-lg text-foreground-muted text-pretty"
                    />
                  </blockquote>
                  <figcaption className="mt-6 font-body text-base text-foreground">
                    {cs.clientReview!.name}, {cs.brand}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="faq" tint>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-4">
              <H2>Before you book</H2>
            </div>
            <Link href="/contact" className={`mt-8 ${BUTTON}`}>
              {CTA_LABEL}
            </Link>
          </Reveal>
          <Reveal className="flex flex-col gap-4" delay={100}>
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border-hairline bg-white p-6"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded font-heading text-lg font-semibold ${FOCUS} [&::-webkit-details-marker]:hidden`}
                >
                  {f.q}
                  <CaretDown
                    size={20}
                    weight="bold"
                    aria-hidden
                    className={`shrink-0 transition-transform duration-500 ${EASE} group-open:rotate-180`}
                  />
                </summary>
                <div className="mt-4">
                  <Paragraphs
                    text={f.a}
                    className="font-body text-base text-foreground-muted text-pretty"
                  />
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </Section>

      {latestPosts.length > 0 && (
        <Section id="blog">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Blog</Eyebrow>
                <div className="mt-4">
                  <H2>Latest from the blog.</H2>
                </div>
              </div>
              <Link href="/blog" className={BUTTON_SECONDARY}>
                View all posts
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {latestPosts.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className={`flex flex-col overflow-hidden rounded-xl border border-border-hairline bg-card transition-all duration-300 ${EASE} hover:-translate-y-1 hover:border-border-hairline-strong active:scale-[0.99] ${FOCUS}`}
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={urlForImage(post.coverImage).width(800).height(450).fit("crop").url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-label text-sm uppercase tracking-wide text-primary-soft">
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-heading text-lg font-semibold text-balance">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-base text-foreground-muted text-pretty">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <Section id="book" tint>
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
            See where your store is leaking revenue before you spend anything
          </h2>
          <p className="mt-4 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
            This isn&rsquo;t a sales call. Bring your store URL and your questions, not your card.
          </p>
          <Link href="/contact" className={`mt-8 ${BUTTON}`}>
            {CTA_LABEL}
          </Link>
          <Image
            src={founderAvatar}
            alt="David Owoeye"
            width={96}
            height={96}
            className="mt-12 h-24 w-24 rounded-full object-cover"
          />
          <p className="mt-4 font-heading text-lg font-semibold">David Owoeye</p>
          <p className="mt-1 font-body text-base text-foreground-muted">
            Founder &amp; CEO, Skynosoft Ltd.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
