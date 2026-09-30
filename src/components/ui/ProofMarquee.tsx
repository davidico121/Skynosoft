import Image from "next/image";
import Link from "next/link";
import { EASE, FOCUS, Wrap } from "@/components/ui/page-kit";

const shots = [
  {
    slug: "bwll",
    src: "/case-studies/bwll/revenue-summary.jpg",
    alt: "BWLL Klaviyo business performance summary showing $187,156.95 total revenue and $75,377.60 attributed revenue",
  },
  {
    slug: "cannonbalm",
    src: "/case-studies/cannonbalm/revenue-summary.jpg",
    alt: "CannonBalm Klaviyo business performance summary showing $96,717 total revenue and $32,847 attributed revenue",
  },
  {
    slug: "streaky-academy",
    src: "/case-studies/streaky-academy/revenue-summary.jpg",
    alt: "Streaky Academy Klaviyo business performance summary showing $242,115.35 total revenue and $75,164.69 attributed revenue",
  },
];

function Card({ shot, hidden = false }: { shot: (typeof shots)[number]; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden} className="w-[420px] shrink-0 sm:w-[520px]">
      <Link
        href={`/case-studies/${shot.slug}`}
        tabIndex={hidden ? -1 : 0}
        className={`block overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg transition-transform duration-300 ${EASE} hover:-translate-y-1 ${FOCUS}`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1640}
          height={924}
          sizes="(min-width: 640px) 520px, 420px"
          className="block h-auto w-full"
        />
      </Link>
    </li>
  );
}

/** An infinite, edge-fading marquee of real client Klaviyo dashboards, real numbers, no invented proof. */
export function ProofMarquee() {
  return (
    <section className="border-t border-border-hairline py-16">
      <Wrap>
        <p className="text-center font-label text-sm uppercase tracking-wide text-foreground-muted">
          Real dashboards. Real revenue.
        </p>
      </Wrap>
      <div
        className="mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <ul className="animate-marquee flex w-max gap-6">
          {shots.map((shot) => (
            <Card key={shot.slug} shot={shot} />
          ))}
          {shots.map((shot) => (
            <Card key={`${shot.slug}-repeat`} shot={shot} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
