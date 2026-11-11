import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterSignupForm } from "@/components/ui/NewsletterSignupForm";
import { Eyebrow, Wrap } from "@/components/ui/page-kit";

export const metadata: Metadata = pageMetadata({
  title: "Free guide: Brand-matched emails in Claude Design — Skynosoft",
  description:
    "A free 12-page playbook for turning any brand's website into a finished, on-brand email design in Claude Design, then into a Klaviyo campaign.",
  path: "/lead-magnet",
});

const inside = [
  "Build a brand design system from a live website link, in one prompt",
  "Load it into Claude Design so every email uses the same colors, fonts and voice",
  "Recreate a proven reference email for your brand, step by step",
  "Write copy for a different campaign angle without rebuilding the layout",
  "Generate on-brand product and lifestyle image prompts",
  "Turn the design into a Klaviyo campaign that holds up on a phone",
];

export default function LeadMagnetPage() {
  return (
    <section>
      <Wrap className="pb-24 pt-16">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Free guide</Eyebrow>
            <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              Brand-matched emails in Claude Design.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              The exact process I use to take a brand&rsquo;s website and end with a finished,
              on-brand email design. Works for any brand you spot, no design background needed.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {inside.map((line) => (
                <li key={line} className="flex items-start gap-3 font-body text-base text-foreground">
                  <CheckCircle
                    size={24}
                    weight="duotone"
                    aria-hidden
                    className="mt-0.5 shrink-0 text-primary-soft"
                  />
                  <span className="text-pretty">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-border-hairline bg-white p-8 md:p-10">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Get the free guide
            </h2>
            <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
              Enter your email and we&rsquo;ll send the download link to your inbox.
            </p>
            <NewsletterSignupForm className="mt-8" />
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
