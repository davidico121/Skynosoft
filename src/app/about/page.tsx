import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Skynosoft",
  description:
    "Skynosoft is an ecommerce growth agency combining website design, CRO, and email marketing.",
};

const values = [
  {
    title: "Revenue, not vanity metrics",
    description:
      "Traffic and impressions don't pay bills. Every decision we make is measured against checkout revenue and email-attributed revenue.",
  },
  {
    title: "One system, not two vendors",
    description:
      "Your website and your email program should work together. We build both, so nothing falls through the cracks between agencies.",
  },
  {
    title: "Built for scale",
    description:
      "We work with brands doing $50K–$500K+/month — the systems we build are made to hold up as you scale past 7 figures.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 md:py-28">
          <Chip>About</Chip>
          <h1 className="mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            We build the two things that actually move ecommerce revenue.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            Skynosoft was built on a simple observation: agencies that only
            do web design ignore retention, and agencies that only do email
            are fighting a website that leaks conversions. We do both, as
            one system, for one goal — revenue.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border-hairline bg-card p-8"
              >
                <h3 className="font-heading text-headline-md font-semibold">
                  {v.title}
                </h3>
                <p className="mt-4 font-body text-body-md text-foreground-muted">
                  {v.description}
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
              Team
            </p>
            <h2 className="mt-4 font-heading text-headline-lg font-semibold">
              Who&rsquo;s behind it.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-border-hairline bg-card p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high font-heading text-headline-md text-foreground-muted">
                  {member.name.charAt(0)}
                </div>
                <h3 className="mt-6 font-heading text-headline-md font-semibold">
                  {member.name}
                </h3>
                <p className="mt-1 font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  {member.role}
                </p>
                <p className="mt-4 font-body text-body-md text-foreground-muted">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-2xl font-heading text-headline-lg font-semibold">
            Let&rsquo;s see if we&rsquo;re a fit.
          </h2>
          <div className="mt-8">
            <Button href="/contact">Book a Call / Audit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
