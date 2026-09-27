import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Eyebrow, Wrap } from "@/components/ui/page-kit";
import { CALENDLY_URL } from "@/lib/content";
import founderAvatar from "../../../../public/brand/david-owoeye-avatar.jpg";

export const metadata: Metadata = pageMetadata({
  title: "Book a free audit — Skynosoft",
  description:
    "Book a free audit call with Skynosoft. We look at your store and email setup together and show you where revenue is leaking.",
  path: "/contact",
});


const expect = [
  "You bring your store URL and your questions, not your card.",
  "We look at your website and your email setup together, live on the call.",
  "You leave with a plan that shows where revenue is leaking, whether or not we work together.",
];

export default function ContactPage() {
  preconnect("https://calendly.com");
  preconnect("https://assets.calendly.com");
  return (
    <section>
      <Wrap className="pb-24 pt-16">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Book a free audit</Eyebrow>
            <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              Let&rsquo;s find your revenue leak.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              Pick a time that suits you. The call is free, and it is not a sales pitch.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {expect.map((line) => (
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
            <div className="mt-12 flex items-center gap-4">
              <Image
                src={founderAvatar}
                alt="David Owoeye"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-heading text-lg font-semibold">David Owoeye</p>
                <p className="font-body text-base text-foreground-muted">
                  Founder &amp; CEO, Skynosoft Ltd.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <CalendlyEmbed url={CALENDLY_URL} />
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
