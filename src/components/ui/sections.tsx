import Image from "next/image";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON, EASE, Eyebrow, FOCUS, H2, Section } from "@/components/ui/page-kit";
import { CTA_LABEL, processSteps } from "@/lib/content";
import founderAvatar from "../../../public/brand/david-owoeye-avatar.jpg";

export type Faq = { q: string; a: string };

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function ProcessSection() {
  return (
    <Section id="how" tint>
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <div className="mt-4">
          <H2>From audit to scale in three steps.</H2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {processSteps.map((s) => (
            <li key={s.step} className="rounded-xl border border-border-hairline bg-white p-8">
              <p className="font-heading text-4xl font-semibold text-outline-variant">{s.step}</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

export function FaqSection({ faqs, tint = true }: { faqs: Faq[]; tint?: boolean }) {
  return (
    <Section id="faq" tint={tint}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
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
  );
}

export function FinalCta({ tint = true }: { tint?: boolean }) {
  return (
    <Section id="book" tint={tint}>
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
  );
}
