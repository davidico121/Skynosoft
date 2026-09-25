/**
 * Personalized strategy pitch pages, served at strategy.skynosoft.net/<slug>.
 * Each entry renders one page. Optional fields are omitted from the page when absent,
 * so only put in what is real: never invent audit findings, numbers, or results.
 */
export type StrategyPitch = {
  /** URL slug: strategy.skynosoft.net/<slug>. Use something not easily guessed. */
  slug: string;
  brand: string;
  /** Shown as a link under the brand name. */
  website?: string;
  /** Who the page is addressed to. */
  contactName?: string;
  /** Free text, e.g. "September 2026". */
  preparedDate: string;
  /** Overrides the default "A growth strategy for {brand}" headline. */
  headline?: string;
  /** Opening paragraph, written for this brand. */
  intro: string;
  /** Things noticed on the brand's site/emails. Each can carry a screenshot. */
  observations?: {
    title: string;
    detail: string;
    screenshot?: { src: string; alt: string; width: number; height: number };
  }[];
  /** The recommended plays, in priority order. */
  plays: { title: string; what: string; why?: string; impact?: string }[];
  /** Optional phased plan, e.g. Days 1-30. */
  roadmap?: { phase: string; items: string[] }[];
  /** Slugs from caseStudies to show as relevant proof. */
  caseStudySlugs?: string[];
  /** A Loom (or similar) embed URL, e.g. https://www.loom.com/embed/<id>. */
  videoUrl?: string;
};

export const strategyPitches: StrategyPitch[] = [];
