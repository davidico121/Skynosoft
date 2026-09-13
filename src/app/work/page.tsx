import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Skynosoft",
  description:
    "Case studies from ecommerce fashion, skincare, home decor, and supplement brands we've scaled.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 text-center md:py-28">
          <Chip>Work</Chip>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            Brands we&rsquo;ve helped fly.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            A selection of ecommerce brands across fashion, skincare, home
            decor, and supplements — scaled through website design, CRO, and
            email marketing.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
