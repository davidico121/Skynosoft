import type { Metadata } from "next";
import Image from "next/image";
import { preconnect } from "react-dom";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { ProposalMessageForm } from "@/components/ui/ProposalMessageForm";
import { Eyebrow, H2, Section, Wrap } from "@/components/ui/page-kit";
import { CALENDLY_URL } from "@/lib/content";
import founderAvatar from "../../../../../public/brand/david-owoeye-avatar.jpg";

export const metadata: Metadata = {
  title: "Flaming Gorilla: Black Friday email designs",
  description:
    "Three Black Friday email designs for Flaming Gorilla: early access, launch day and last call.",
  robots: { index: false, follow: false },
};

const BASE = "/brand-demo/flaming-gorilla";

const emails = [
  {
    src: `${BASE}/early-access.jpg`,
    width: 900,
    height: 6120,
    label: "Early access",
    note: "Sent to your list before Black Friday opens to everyone.",
    alt: "Flaming Gorilla early access email: Black Friday starts early for you, with an early access code and a shop early button",
  },
  {
    src: `${BASE}/black-friday.jpg`,
    width: 900,
    height: 7482,
    label: "Black Friday launch",
    note: "The main announcement, sent when the sale goes live.",
    alt: "Flaming Gorilla Black Friday launch email: Black Friday is here, with the offer, featured scales and a shop Black Friday button",
  },
  {
    src: `${BASE}/last-call.jpg`,
    width: 900,
    height: 4176,
    label: "Last call",
    note: "A final reminder on the last day, with a countdown feel.",
    alt: "Flaming Gorilla last call email: Black Friday ends tonight at midnight, with the discount code and three scales still in stock",
  },
];

export default function FlamingGorillaDemoPage() {
  preconnect("https://calendly.com");
  return (
    <>
      <section>
        <Wrap className="pb-16 pt-16">
          <Reveal>
            <Eyebrow>Prepared for Bruce · Flaming Gorilla</Eyebrow>
            <h1 className="mt-6 max-w-[900px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              Three Black Friday emails for Flaming Gorilla.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              Early access, launch day and last call, shown in full. They are built on the look of
              your current site, so they are a starting point and easy to adjust to your vision.
            </p>
            <p className="mt-3 max-w-[680px] font-body text-base text-foreground-muted text-pretty">
              Details in square brackets, like [XX]% and [CODE], are placeholders for your offer and
              discount code.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Image
                src={founderAvatar}
                alt="David Owoeye"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-heading text-lg font-semibold">David Owoeye</p>
                <p className="font-body text-sm text-foreground-muted">
                  Founder, Skynosoft · DTC CRO &amp; Email Retention Specialist
                </p>
              </div>
            </div>
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
                  <figcaption className="mt-3">
                    <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">
                      {i + 1}. {email.label}
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground-muted text-pretty">
                      {email.note}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <Section id="book" tint>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Book a call</Eyebrow>
            <div className="mt-4">
              <H2>Want the full setup? Pick a time.</H2>
            </div>
            <p className="mt-4 max-w-[480px] font-body text-lg text-foreground-muted text-pretty">
              A relaxed call to walk you through the whole email setup and how it can still go live in
              time for Black Friday.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-body text-sm text-foreground-muted">
              <CalendarCheck size={20} weight="duotone" aria-hidden className="text-primary-soft" />
              Free, no obligation.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <CalendlyEmbed url={CALENDLY_URL} lazy />
          </Reveal>
        </div>
      </Section>

      <Section id="message">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <Eyebrow>Send a message</Eyebrow>
            <div className="mt-4">
              <H2>Got a question? Ask it here.</H2>
            </div>
            <p className="mt-4 max-w-[480px] font-body text-lg text-foreground-muted text-pretty">
              About the emails, the timing or anything else. It goes straight to David.
            </p>
            <p className="mt-6 font-body text-sm text-foreground-muted">
              Or email{" "}
              <a
                href="mailto:david@skynosoft.net"
                className="text-primary-soft underline underline-offset-4"
              >
                david@skynosoft.net
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ProposalMessageForm proposal="the Flaming Gorilla email demo page" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
