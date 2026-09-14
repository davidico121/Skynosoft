import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { CALENDLY_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Skynosoft",
  description: "Book a free audit call with Skynosoft.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 text-center md:py-28">
          <Chip>Contact</Chip>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            Let&rsquo;s find your revenue leak.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            Book a free audit call. We&rsquo;ll walk through your website and
            email program and show you exactly where revenue is being left
            on the table.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="overflow-hidden rounded-xl border border-border-hairline bg-card">
            <iframe
              src={CALENDLY_URL}
              width="100%"
              height="700"
              className="block"
              title="Book a call with Skynosoft"
            />
          </div>
          <p className="mt-6 text-center font-body text-sm text-foreground-muted">
            Trouble loading the calendar?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-soft underline"
            >
              Open it in a new tab
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
