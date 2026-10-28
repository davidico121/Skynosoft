import Image from "next/image";
import { Eyebrow } from "@/components/ui/page-kit";
import { Reveal } from "@/components/ui/Reveal";

type DesignGalleryItem = {
  src: string;
  alt: string;
  brand: string;
  width: number;
  height: number;
};

export const designGalleryItems: DesignGalleryItem[] = [
  {
    src: "/portfolio/novaya-campaigns/social-proof.png",
    alt: "Novaya campaign email, subject 'Ce que 2 847+ Québécois ont remarqué', sent Oct 10, with customer testimonials, lifestyle photography, and a reviews stat grid",
    brand: "Novaya · Oct 10",
    width: 600,
    height: 3163,
  },
  {
    src: "/portfolio/novaya-campaigns/november-rush.png",
    alt: "Novaya campaign email, subject 'Acheter Des Cadeaux en Novembre', sent Oct 21, with an October vs. November shipping comparison table, lifestyle photography, and a bundle offer",
    brand: "Novaya · Oct 21",
    width: 600,
    height: 4322,
  },
  {
    src: "/portfolio/canbat/self-heating-battery.png",
    alt: "CANBAT email for a self-heating LiFePO4 battery, headlined 'Reliable power even at -20°C', with product shots, spec highlights, and stack/floor/wall mounting options",
    brand: "CANBAT",
    width: 600,
    height: 3657,
  },
  {
    src: "/case-studies/maxsleek/welcome-email.png",
    alt: "The newly built MaxSleek welcome email, showing the signup discount offer and bestselling product grid",
    brand: "MaxSleek",
    width: 1200,
    height: 5725,
  },
  {
    src: "/case-studies/cannonbalm/email-ultimate.jpg",
    alt: "CannonBalm email: The Ultimate 120ml is here, an exclusive limited-time release for existing customers",
    brand: "CannonBalm",
    width: 1200,
    height: 5342,
  },
  {
    src: "/case-studies/feno/email-mastering.png",
    alt: "Feno email: Mastering your brushing experience, with a tip on adjusting brushing speed in the Feno app and a pro tip",
    brand: "Feno",
    width: 280,
    height: 1787,
  },
  {
    src: "/case-studies/lipo-beauty-tea/email-black-friday.png",
    alt: "Lipo Beauty Tea Black Friday email with a 40% discount, a customer review from Sandra Kox, and icons for weight loss support, energy, and reduced bloating",
    brand: "Lipo Beauty Tea",
    width: 600,
    height: 2218,
  },
  {
    src: "/case-studies/streaky-academy/email-welcome.png",
    alt: "Streaky Academy welcome email: Take 10% off your first order with code WELCOME10, followed by the most popular courses",
    brand: "Streaky Academy",
    width: 639,
    height: 3327,
  },
  {
    src: "/case-studies/bwll/email-real-stories.jpg",
    alt: "BWLL email: Real stories, real results, with customer reviews and a comparison of BWLL against other nasal strips",
    brand: "BWLL",
    width: 600,
    height: 4821,
  },
];

export function DesignGallery({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string;
  heading: string;
  description: string;
}) {
  return (
    <>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-[680px] font-heading text-2xl font-semibold text-balance md:text-3xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-[680px] font-body text-base text-foreground-muted text-pretty">
          {description}
        </p>
      </Reveal>
      <p className="mt-8 hidden font-label text-xs uppercase tracking-wide text-foreground-muted sm:block">
        Drag to see more &rarr;
      </p>
      <Reveal
        delay={100}
        className="hide-scrollbar mt-4 flex flex-col gap-6 sm:cursor-grab sm:active:cursor-grabbing sm:snap-x sm:snap-mandatory sm:flex-row sm:overflow-x-auto sm:pb-4"
      >
        {designGalleryItems.map((item) => (
          <figure key={item.src} className="w-full shrink-0 sm:w-[280px] sm:snap-start">
            <div className="hide-scrollbar h-[420px] overflow-y-auto rounded-xl border border-border-hairline-strong bg-white shadow-lg">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-label text-sm uppercase tracking-wide text-foreground-muted">
              {item.brand}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </>
  );
}
