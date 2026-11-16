import type { Metadata } from "next";
import Image from "next/image";
import { preconnect } from "react-dom";
import { ArrowSquareOut, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Playfair_Display, Poppins } from "next/font/google";
import { ProposalDeck } from "./deck";
import { ProposalMessageForm } from "@/components/ui/ProposalMessageForm";
import { BUTTON, Eyebrow, H2, Section, Wrap } from "@/components/ui/page-kit";
import { CALENDLY_URL } from "@/lib/content";
import founderAvatar from "../../../../../public/brand/david-owoeye-avatar.jpg";

export const metadata: Metadata = {
  title: "Lashcott Hair: your Black Friday plan",
  description: "A short intro from David, the full Black Friday proposal for Lashcott Hair, and two easy ways to reply.",
  robots: { index: false, follow: false },
};

const BASE = "/proposals/lashcott-hair";
const VIDEO_SHARE_URL =
  "https://www.awesomescreenshot.com/video/58401727?key=e79ed81b65ecae041b5c245d8869079f";
const VIDEO_EMBED_URL =
  "https://www.awesomescreenshot.com/embed?id=58401727&shareKey=e79ed81b65ecae041b5c245d8869079f";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function LashcottProposalPage() {
  preconnect("https://calendly.com");
  return (
    <>
      <section>
        <Wrap className="pb-16 pt-16">
          <Reveal>
            <Eyebrow>Prepared for Starr · Lashcott Hair</Eyebrow>
            <h1 className="mt-6 max-w-[900px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-6xl">
              Your Black Friday plan, ready to go live in 9 days.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              Watch the short intro, flip through the full proposal, then book a call or send a
              question. Everything you need to decide is on this page.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#proposal" className={`px-5 py-3 ${BUTTON}`}>
                See the proposal
              </a>
              <p className="font-body text-sm text-foreground-muted">
                Say yes by Wednesday, Nov 18 to get the full 9 days.
              </p>
            </div>
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
        </Wrap>
      </section>

      <Section id="intro" tint>
        <Reveal>
          <Eyebrow>A quick hello</Eyebrow>
          <div className="mt-4">
            <H2>A short intro from David.</H2>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-border-hairline-strong bg-black shadow-lg">
            <div className="relative aspect-video w-full">
              <iframe
                src={VIDEO_EMBED_URL}
                title="Intro video from David Owoeye"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-4 font-body text-sm text-foreground-muted">
            Video not playing?{" "}
            <a
              href={VIDEO_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-soft underline underline-offset-4"
            >
              Watch it here
              <ArrowSquareOut size={14} aria-hidden />
            </a>
          </p>
        </Reveal>
      </Section>

      <Section id="proposal">
        <Reveal>
          <Eyebrow>The proposal</Eyebrow>
          <div className="mt-4">
            <H2>Your full plan, slide by slide.</H2>
          </div>
          <p className="mt-4 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
            What we build, the 9-day timeline, results from brands like yours, and the
            investment. Swipe or use the arrows, and download a copy to keep.
          </p>
          <div className="mt-10">
            <div className={`${playfair.variable} ${poppins.variable}`}>
              <ProposalDeck downloadHref={`${BASE}/lashcott-hair-black-friday-proposal.pptx`} />
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="book" tint>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Book a call</Eyebrow>
            <div className="mt-4">
              <H2>Rather talk it through? Pick a time.</H2>
            </div>
            <p className="mt-4 max-w-[480px] font-body text-lg text-foreground-muted text-pretty">
              A relaxed call to answer your questions, choose the right build and lock in your
              start date.
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
              Your budget, the packages, timing, anything at all. It goes straight to David.
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
            <ProposalMessageForm proposal="the Lashcott Hair proposal page" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
