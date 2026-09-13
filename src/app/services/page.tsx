import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Skynosoft",
  description:
    "Website design, CRO, and email marketing services for ecommerce brands.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 text-center md:py-28">
          <Chip>Services</Chip>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            Two skill sets. One growth system.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            A highly converting website is only half the equation. We pair it
            with email marketing that recovers lost revenue and builds
            repeat customers — so growth compounds instead of resetting
            every month.
          </p>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-16 py-section-gap">
          {services.map((service, i) => (
            <div
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-24 gap-10 border-t border-border-hairline pt-16 first:border-t-0 first:pt-0 md:grid-cols-[auto_1fr] md:gap-16"
            >
              <div className="font-heading text-headline-lg text-outline-variant">
                0{i + 1}
              </div>
              <div>
                <h2 className="font-heading text-headline-lg font-semibold">
                  {service.name}
                </h2>
                <p className="mt-2 font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  {service.tagline}
                </p>
                <p className="mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
                  {service.description}
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 font-body text-body-md text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-2xl font-heading text-headline-lg font-semibold">
            Not sure which service fits?
          </h2>
          <p className="mt-4 max-w-xl font-body text-body-lg text-foreground-muted">
            Book a free audit and we&rsquo;ll tell you exactly where to
            start.
          </p>
          <div className="mt-8">
            <Button href="/contact">Book a Call / Audit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
