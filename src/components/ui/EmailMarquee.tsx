import Image from "next/image";

const FADE =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

// Pre-cropped top sections of real client sends (public/resources/emails), kept small so the strip paints immediately.
const strip = [
  { src: "/resources/emails/novaya-social-proof.jpg", brand: "Novaya · Oct 10", width: 520, alt: "Novaya campaign email with customer testimonials and a reviews stat grid" },
  { src: "/resources/emails/novaya-november-rush.jpg", brand: "Novaya · Oct 21", width: 520, alt: "Novaya campaign email with a shipping comparison table and a bundle offer" },
  { src: "/resources/emails/canbat-self-heating.jpg", brand: "CANBAT", width: 520, alt: "CANBAT email for a self-heating LiFePO4 battery" },
  { src: "/resources/emails/maxsleek-welcome.jpg", brand: "MaxSleek", width: 520, alt: "MaxSleek welcome email with a signup discount and bestselling products" },
  { src: "/resources/emails/cannonbalm-ultimate.jpg", brand: "CannonBalm", width: 520, alt: "CannonBalm email announcing a limited-time release" },
  { src: "/resources/emails/feno-mastering.jpg", brand: "Feno", width: 280, alt: "Feno email on mastering your brushing experience" },
  { src: "/resources/emails/lipo-black-friday.jpg", brand: "Lipo Beauty Tea", width: 520, alt: "Lipo Beauty Tea Black Friday email with a 40% discount" },
  { src: "/resources/emails/streaky-welcome.jpg", brand: "Streaky Academy", width: 520, alt: "Streaky Academy welcome email with a 10% discount code" },
  { src: "/resources/emails/bwll-real-stories.jpg", brand: "BWLL", width: 520, alt: "BWLL email with customer reviews and a comparison against other nasal strips" },
];

/** Auto-scrolling strip of real client email sends, fading out at both edges. */
export function EmailMarquee() {
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <ul className="animate-marquee flex w-max gap-6 [animation-duration:60s]">
        {[0, 1].map((copy) =>
          strip.map((item) => (
            <li
              key={`${copy}-${item.src}`}
              aria-hidden={copy === 1 || undefined}
              className="w-[220px] shrink-0 sm:w-[260px]"
            >
              <div
                className="relative h-[340px] overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg sm:h-[400px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 78%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent)",
                }}
              >
                <Image
                  src={item.src}
                  alt={copy === 1 ? "" : item.alt}
                  width={item.width}
                  height={900}
                  sizes="260px"
                  className="block h-auto w-full"
                />
              </div>
              <p className="mt-3 font-label text-xs uppercase tracking-wide text-foreground-muted">
                {item.brand}
              </p>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
