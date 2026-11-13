import type { Metadata } from "next";
import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON_SECONDARY, Eyebrow, Wrap } from "@/components/ui/page-kit";

export const metadata: Metadata = {
  title: "Lashcott Hair email designs",
  description: "Three email designs for Lashcott Hair: a welcome email, a seasonal campaign and a product guide.",
  robots: { index: false, follow: false },
};

const BASE = "/brand-demo/lashcott-hair";

const emails = [
  {
    src: `${BASE}/email-1.jpg`,
    width: 900,
    height: 6630,
    label: "Welcome email",
    alt: "Lashcott Hair welcome email: Silky bundles, made for you, with a welcome offer, reasons to choose Lashcott, best sellers and a short FAQ",
  },
  {
    src: `${BASE}/email-2.jpg`,
    width: 900,
    height: 5850,
    label: "Seasonal campaign",
    alt: "Lashcott Hair seasonal email: The air changes, so does your hair, with tips for dry weather and three featured products",
  },
  {
    src: `${BASE}/email-3.jpg`,
    width: 900,
    height: 4545,
    label: "Product guide",
    alt: "Lashcott Hair product guide email: Find your match, comparing bodywave bundles, a frontal wig and HD frontals",
  },
];

export default function LashcottHairDemoPage() {
  return (
    <section>
      <Wrap className="pb-24 pt-16">
        <Reveal>
          <Eyebrow>Email design</Eyebrow>
          <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
            Lashcott Hair email designs
          </h1>
          <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
            Three emails, shown in full: a welcome email, a seasonal campaign and a product guide.
          </p>
          <p className="mt-3 max-w-[680px] font-body text-base text-foreground-muted text-pretty">
            Details in square brackets, like [YOUR CODE], are placeholders for the offer and address.
          </p>
          <a
            href={`${BASE}/lashcott-hair-emails.pdf`}
            download
            className={`mt-8 gap-2 px-5 py-3 ${BUTTON_SECONDARY}`}
          >
            <DownloadSimple size={20} weight="bold" aria-hidden />
            Download the PDF
          </a>
        </Reveal>

        <div className="mt-16 grid items-start gap-10 md:grid-cols-3">
          {emails.map((email, i) => (
            <Reveal key={email.src} delay={i * 80}>
              <figure>
                <div className="overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg">
                  <Image
                    src={email.src}
                    alt={email.alt}
                    width={email.width}
                    height={email.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 font-label text-sm uppercase tracking-wide text-foreground-muted">
                  {i + 1}. {email.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
