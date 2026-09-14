import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { MetricStat } from "@/components/ui/MetricStat";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { services, caseStudies, testimonials } from "@/lib/content";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";

const stats = [
  { value: "$10M+", label: "Client revenue generated" },
  { value: "40+", label: "Ecommerce brands scaled" },
  { value: "6-7fig", label: "Typical client range" },
];

const process = [
  {
    step: "01",
    title: "Audit",
    description:
      "We tear down your current site, funnel, and email program to find exactly where revenue is leaking.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "A high-converting website, funnel, or email system — designed around your specific customer, not a template.",
  },
  {
    step: "03",
    title: "Scale",
    description:
      "Ongoing optimization on both sides — CRO testing and email revenue — so growth compounds month over month.",
  },
];

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-electric-blue-glow blur-3xl"
          aria-hidden
        />
        <Container className="relative flex flex-col items-center pt-24 pb-20 text-center md:pt-32 md:pb-28">
          <Chip>Ecommerce Growth Agency</Chip>
          <h1 className="mt-6 max-w-4xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-display-xl">
            Websites that convert.
            <br />
            Email that recovers revenue.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            Skynosoft builds high-converting ecommerce websites, funnels, and
            email marketing systems for fashion, skincare, home decor, and
            supplement brands scaling past six and seven figures.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">Book a Call / Audit</Button>
            <Button href="/work" variant="secondary">
              See Our Work
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-y border-border-hairline">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <MetricStat value={s.value} label={s.label} tone="primary" />
            </div>
          ))}
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="max-w-2xl">
            <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
              What We Do
            </p>
            <h2 className="mt-4 font-heading text-headline-lg font-semibold">
              One team, two skill sets, one job: revenue.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="flex flex-col rounded-xl border border-border-hairline bg-card p-8 transition-colors hover:border-border-hairline-strong"
              >
                <h3 className="font-heading text-headline-md font-semibold">
                  {service.name}
                </h3>
                <p className="mt-2 font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  {service.tagline}
                </p>
                <p className="mt-4 font-body text-body-md text-foreground-muted">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
                Results
              </p>
              <h2 className="mt-4 font-heading text-headline-lg font-semibold">
                Real brands. Real revenue.
              </h2>
            </div>
            <Button href="/work" variant="secondary">
              View all case studies
            </Button>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {caseStudies.slice(0, 4).map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <div className="max-w-2xl">
            <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
              How It Works
            </p>
            <h2 className="mt-4 font-heading text-headline-lg font-semibold">
              From audit to scale.
            </h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step}>
                <div className="font-heading text-headline-lg text-outline-variant">
                  {p.step}
                </div>
                <h3 className="mt-4 font-heading text-headline-md font-semibold">
                  {p.title}
                </h3>
                <p className="mt-3 font-body text-body-md text-foreground-muted">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="py-section-gap">
          <div className="max-w-2xl">
            <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
              Testimonials
            </p>
            <h2 className="mt-4 font-heading text-headline-lg font-semibold">
              What clients say.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>

      {latestPosts.length > 0 && (
        <section className="border-t border-border-hairline">
          <Container className="py-section-gap">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  Blog
                </p>
                <h2 className="mt-4 font-heading text-headline-lg font-semibold">
                  Latest from the blog.
                </h2>
              </div>
              <Button href="/blog" variant="secondary">
                View all posts
              </Button>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {latestPosts.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-border-hairline bg-card transition-colors hover:border-border-hairline-strong"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={urlForImage(post.coverImage)
                          .width(800)
                          .height(450)
                          .fit("crop")
                          .url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-heading text-body-lg font-semibold">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-body-md text-foreground-muted">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-3xl font-heading text-headline-lg font-semibold">
            Ready to make your brand fly?
          </h2>
          <p className="mt-4 max-w-xl font-body text-body-lg text-foreground-muted">
            Book a free audit and we&rsquo;ll show you exactly where your website
            and email program are leaving revenue on the table.
          </p>
          <div className="mt-8">
            <Button href="/contact">Book a Call / Audit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
