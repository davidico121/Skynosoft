import Image from "next/image";
import { designGalleryItems } from "@/components/ui/DesignGallery";

const FADE =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

/** Auto-scrolling strip of real client email sends, fading out at both edges. */
export function EmailMarquee() {
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <ul className="animate-marquee flex w-max gap-6 [animation-duration:60s]">
        {[0, 1].map((copy) =>
          designGalleryItems.map((item) => (
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
                  height={item.height}
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
