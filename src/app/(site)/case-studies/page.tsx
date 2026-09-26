import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON, Eyebrow, Section, Wrap } from "@/components/ui/page-kit";
import { FinalCta } from "@/components/ui/sections";
import { CTA_LABEL, caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies — Skynosoft",
  description:
    "Case studies from ecommerce fashion, skincare, wellness and supplement brands, with the real numbers behind each website and email project.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section>
        <Wrap className="pb-24 pt-16">
          <Reveal>
            <Eyebrow>Case studies</Eyebrow>
            <h1 className="mt-6 max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              Brands we&rsquo;ve helped fly.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              Real ecommerce brands, with the numbers behind each website and email project.
              Open any of them to see what we did and what it earned.
            </p>
            <Link href="/contact" className={`mt-8 ${BUTTON}`}>
              {CTA_LABEL}
            </Link>
          </Reveal>
        </Wrap>
      </section>

      <Section tint>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <Reveal key={cs.slug}>
              <CaseStudyCard caseStudy={cs} />
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta tint={false} />
    </>
  );
}
