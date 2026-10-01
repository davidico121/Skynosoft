import Image from "next/image";
import Link from "next/link";
import { BUTTON, Eyebrow } from "@/components/ui/page-kit";

const CARD_W = 200;
const CARD_H = 258;

const left = [
  { src: "/home/scroll-emails/bwll-difference.jpg", alt: "BWLL email: 'The Difference BWLL Tape Makes'" },
  { src: "/home/scroll-emails/cannonbalm-start-the-year.jpg", alt: "CannonBalm New Year promotional email" },
  { src: "/home/scroll-emails/feno-mastering.jpg", alt: "Feno educational email on mastering their routine" },
  { src: "/home/scroll-emails/lipo-black-friday.jpg", alt: "Lipo Beauty Tea Black Friday email" },
  { src: "/home/scroll-emails/streaky-welcome.jpg", alt: "Streaky Academy welcome email" },
  { src: "/home/scroll-emails/bwll-real-stories.jpg", alt: "BWLL 'Real Stories' customer email" },
  { src: "/home/scroll-emails/cannonbalm-ultimate.jpg", alt: "CannonBalm Ultimate 120ml launch email" },
  { src: "/home/scroll-emails/maxsleek-welcome.jpg", alt: "MaxSleek welcome email" },
];

const right = [
  { src: "/home/scroll-emails/streaky-comparison.jpg", alt: "Streaky Academy comparison email" },
  { src: "/home/scroll-emails/lipo-cyber-monday.jpg", alt: "Lipo Beauty Tea Cyber Monday email" },
  { src: "/home/scroll-emails/bwll-welcome.jpg", alt: "BWLL welcome email" },
  { src: "/home/scroll-emails/feno-setup.jpg", alt: "Feno setup email" },
  { src: "/home/scroll-emails/cannonbalm-spend-more.jpg", alt: "CannonBalm spend and save email" },
  { src: "/home/scroll-emails/lipo-last-chance.jpg", alt: "Lipo Beauty Tea last chance email" },
  { src: "/home/scroll-emails/streaky-social-proof.jpg", alt: "Streaky Academy social proof email" },
];

const maskStyle = {
  maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
};

function Column({
  items,
  animation,
  duration,
}: {
  items: typeof left;
  animation: "animate-scroll-up" | "animate-scroll-down";
  duration: string;
}) {
  return (
    <div className="h-[560px] w-[200px] overflow-hidden sm:h-[640px] md:h-[720px]" style={maskStyle}>
      <ul className={`flex flex-col gap-5 ${animation}`} style={{ animationDuration: duration }}>
        {[...items, ...items].map((shot, i) => (
          <li
            key={`${shot.src}-${i}`}
            aria-hidden={i >= items.length}
            className="shrink-0 overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg"
          >
            <Image
              src={shot.src}
              alt={i >= items.length ? "" : shot.alt}
              width={CARD_W}
              height={CARD_H}
              sizes={`${CARD_W}px`}
              className="block h-auto w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A standalone section: real email creative scrolling in two tilted columns, flanking a center card. */
export function CreativeColumns() {
  return (
    <section className="relative overflow-hidden border-t border-border-hairline bg-[radial-gradient(ellipse_60%_50%_at_15%_10%,var(--color-electric-blue-glow),transparent),radial-gradient(ellipse_60%_50%_at_85%_90%,var(--color-electric-blue-glow),transparent)] py-24">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-center">
        <div
          className="pointer-events-none absolute left-[-70px] top-1/2 hidden -translate-y-1/2 -rotate-6 md:block lg:left-[-10px]"
          aria-hidden
        >
          <Column items={left} animation="animate-scroll-up" duration="34s" />
        </div>
        <div
          className="pointer-events-none absolute right-[-70px] top-1/2 hidden -translate-y-1/2 rotate-6 md:block lg:right-[-10px]"
          aria-hidden
        >
          <Column items={right} animation="animate-scroll-down" duration="30s" />
        </div>

        <div className="relative z-10 mx-auto max-w-[560px] rounded-2xl border border-border-hairline bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm md:p-10">
          <Eyebrow>Real creative</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-balance md:text-4xl">
            Emails and ads we actually wrote, designed and sent.
          </h2>
          <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
            Every one of these went to a real list for a real client. No templates, no stock
            copy, planned against the same calendar as the website.
          </p>
          <Link href="/case-studies" className={`mt-6 inline-flex ${BUTTON}`}>
            See the case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
