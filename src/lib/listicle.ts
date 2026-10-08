/**
 * Listicle/advertorial pitch pages, served at listicle.skynosoft.net/<slug>.
 * Built for ONE purpose: proof of capability sent to a prospect we want to
 * pitch, in the exact format being pitched (advertorials, listicles, pre-sell
 * pages). Not a real ad page, not indexed, not linked from the main site.
 *
 * Hard rule, same as every other pitch asset in this repo: every product
 * detail, spec, price and testimonial must be real, pulled from the
 * prospect's own live site. Never invented copy dressed up as theirs.
 * See .claude/skills/listicle-pitch-builder/SKILL.md for the process.
 */
export type ListicleShot = { src: string; alt: string; width: number; height: number };

export type ListiclePitch = {
  /** URL slug: listicle.skynosoft.net/<slug>. */
  slug: string;
  brand: string;
  /** The prospect's own product/collection URL, real proof CTAs point here. */
  productUrl: string;
  /**
   * Hex accent color pulled from the prospect's own brand, used for CTAs and
   * the bonus badge. This page represents THEIR brand, not Skynosoft's, so it
   * never uses Skynosoft's blue/Sora identity.
   */
  accentColor: string;
  meta: {
    title: string;
    description: string;
  };
  hook: {
    /** e.g. "I tried the original yoga tool used for hundreds of years and this is what happened..." */
    headline: string;
    /** A light, non-journalist byline, e.g. "by The Skynosoft Team". Never a real reporter's name. */
    byline: string;
    hero: ListicleShot;
  };
  /** 4-6 short, self-contained teaser lines, the "I wish I knew this" numbered list early on the page. */
  teaserList: string[];
  /** Optional "as seen in" style credibility bar. Only real, verifiable logos. */
  pressBar?: { name: string; logo?: { src: string; width: number; height: number } }[];
  /** The numbered deep-dive sections, the heart of the page. 3-5 items. */
  sections: {
    number: number;
    title: string;
    /** 1-3 short paragraphs. */
    body: string[];
    image?: ListicleShot;
  }[];
  /** Repeated inline text-link CTA shown after the teaser list and each section. */
  ctaLabel: string;
  /** Optional value-stack bonus badge shown over a lifestyle image. */
  bonus?: { label: string; image: ListicleShot };
  /** The product feature/trust block, pivoting from story to offer. */
  productBlock: {
    headline: string;
    subheadline: string;
    description: string;
    featureGroups: { heading: string; items: string[] }[];
    image: ListicleShot;
    ratingValue?: string;
    ratingCount?: number;
    shopCtaLabel: string;
  };
  /** Real, named testimonials pulled from the prospect's own site. */
  testimonials: { quote: string; name: string; role: string }[];
  closing: {
    headline: string;
    ctaLabel: string;
  };
};

export const listiclePitches: ListiclePitch[] = [
  {
    slug: "ecyo",
    brand: "ecyo",
    productUrl: "https://ecyo.com.au/products/eco-dishwasher-tablets-30-pack",
    accentColor: "#293237",
    meta: {
      title: "Why Australian families are switching to ecyo",
      description: "A look at why Supermarket Swap customers keep switching from supermarket cleaners to ecyo's plastic free, plant based formulas.",
    },
    hook: {
      headline: "Why Australian families are quietly ditching supermarket cleaners for this one brand",
      byline: "by The Skynosoft Team",
      hero: {
        src: "/pitch-assets/listicle-ecyo/hero.jpg",
        alt: "The ecyo homepage hero, showing laundry capsules and dishwasher tablets on a kitchen counter",
        width: 1200,
        height: 750,
      },
    },
    teaserList: [
      "Activated charcoal and enzyme powered dishwasher tablets that naturally target tough stains, dishes and conscience both clean.",
      "Zero palm oil, zero phosphates, and the foaming hand soap refills are grey water and septic safe.",
      "A concentrated formula means less water shipped per wash, which means a lighter footprint on the way to your door.",
      "Plastic free packaging, right down to the cardboard tube the hand soap refills ship in.",
      "Started in 2020 by three Aussie sisters in Wagga, Orange and Sydney, not a venture backed import.",
    ],
    ctaLabel: "See why families are switching",
    sections: [
      {
        number: 1,
        title: "The switch that keeps surprising supermarket loyalists",
        body: [
          "A recurring pattern in ecyo's own reviews: someone gets recommended the dishwasher tablets through a program like Supermarket Swap, assumes an eco brand can't match the supermarket staple they've used for years, then finds out it actually can.",
          "The tablets use activated charcoal and enzymes to target tough stains, plus a rinse aid action and limescale protection built in, the same jobs people expect from a mainstream tablet, just without the formula most supermarket brands still run on.",
        ],
        image: {
          src: "/pitch-assets/listicle-ecyo/product-dishwasher.jpg",
          alt: "ecyo Eco Dishwasher Tablets, 30 pack box",
          width: 900,
          height: 900,
        },
      },
      {
        number: 2,
        title: "Everything your current cleaner doesn't tell you it's missing",
        body: [
          "No palm oil. No phosphates. The hand soap refills are grey water and septic safe, and the formula is non toxic and plant based rather than built around whatever's cheapest to manufacture at scale.",
          "None of that shows up on a supermarket shelf label the way it does when a brand is actually built around it from the start.",
        ],
        image: {
          src: "/pitch-assets/listicle-ecyo/product-handsoap.jpg",
          alt: "ecyo hand soap refill tube beside a recycled plastic foam pump bottle",
          width: 900,
          height: 900,
        },
      },
      {
        number: 3,
        title: "Less plastic, less water, less guilt",
        body: [
          "Concentrated formulas mean ecyo isn't shipping water across the country in every box, which is most of what a standard bottle of cleaner actually is.",
          "Packaging is plastic free, cardboard tubes and boxes instead of the bottle-in-a-bottle most cleaning aisles are still built on.",
        ],
        image: {
          src: "/pitch-assets/listicle-ecyo/product-laundry.jpg",
          alt: "ecyo Eco Laundry Capsules Value Bundle box with capsules spilling out",
          width: 900,
          height: 900,
        },
      },
    ],
    productBlock: {
      headline: "Eco Dishwasher Tablets, 30 Pack",
      subheadline: "ecyo cleaning",
      description: "Using activated charcoal and enzymes, these eco dishwasher tablets naturally target tough stains to leave your dishes, and your conscience, clean. The added rinse aid action and protection against limescale keeps your machine running smoothly.",
      featureGroups: [
        {
          heading: "In every tablet",
          items: ["Activated charcoal formula", "Added enzymes for tough stains", "Rinse aid action", "Limescale protection"],
        },
        {
          heading: "Across the ecyo range",
          items: ["No palm oil", "Plastic free packaging", "Aussie family owned since 2020"],
        },
      ],
      image: {
        src: "/pitch-assets/listicle-ecyo/product-dishwasher.jpg",
        alt: "ecyo Eco Dishwasher Tablets, 30 pack box",
        width: 900,
        height: 900,
      },
      shopCtaLabel: "Shop the 30 pack",
    },
    testimonials: [
      {
        quote: "We were recommended these dishwasher tablets via Supermarket Swap and weren't sure if they would be as good as the supermarket brands. They are. In fact, they are so good, we'll never use the regular supermarket brands again! We could not rate the Ecyo tablets more highly. Such a great find.",
        name: "Louise C.",
        role: "verified customer, Australia",
      },
      {
        quote: "These work better than the major supermarket brands!",
        name: "Lisa L",
        role: "verified customer",
      },
      {
        quote: "I absolutely love these products! My experience so far has been great. The cleaners are easy to prepare, they do the job that's expected of them, and they're really eco friendly.",
        name: "Allison V.",
        role: "verified buyer",
      },
    ],
    closing: {
      headline: "Ready to make the switch?",
      ctaLabel: "Yes, I'm ready to try ecyo",
    },
  },
];
