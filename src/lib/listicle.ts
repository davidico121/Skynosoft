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

export const listiclePitches: ListiclePitch[] = [];
