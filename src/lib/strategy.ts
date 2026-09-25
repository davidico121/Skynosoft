/**
 * Personalized strategy pitch pages, served at strategy.skynosoft.net/<slug>.
 * The page template is the same for every brand; only this content changes.
 * Add a new entry to strategyPitches to spin up a new page.
 */
export type StrategyPitch = {
  /** URL slug: strategy.skynosoft.net/<slug>. */
  slug: string;
  brand: string;
  /** One-line summary of the opportunity, shown as the hero headline. */
  heroSummary: string;
  currentState: {
    /** The customer journey, in order. Mark the steps where it breaks with leak: true. */
    steps: { title: string; detail: string; leak?: boolean }[];
    /** Why this matters for this specific brand or niche. */
    callout: string;
  };
  /** 3-4 fixes: a title and a sentence or two each. */
  infrastructure: { title: string; description: string }[];
  /** 3 metric boxes. */
  impact: { value: string; label: string }[];
  /** 3-4 phases. */
  timeline: { week: string; title: string; description: string }[];
  ctaHeadline: string;
};

export const strategyPitches: StrategyPitch[] = [
  {
    slug: "myowellness",
    brand: "MYOwellness",
    heroSummary:
      "Your products deliver real results. Your retention infrastructure doesn't exist yet, and that's costing you repeat revenue.",
    currentState: {
      steps: [
        {
          title: "Discovery",
          detail: "Customer finds MYOwellness via social or search.",
        },
        {
          title: "First Purchase",
          detail: "Buys collagen, protein, or a superfood blend.",
        },
        {
          title: "Silence",
          detail: "No welcome sequence, no reorder nudge, no loyalty touch.",
          leak: true,
        },
        {
          title: "Customer Lapses",
          detail: "Product runs out. Customer forgets or switches brand.",
          leak: true,
        },
      ],
      callout:
        "Collagen and protein are consumed daily. That means every customer has a built-in reorder point. Brands like AG1 and Grunds win by automating what happens at that point. Right now, MYOwellness has no system at all in that gap. It's the single highest-leverage fix available before BFCM.",
    },
    infrastructure: [
      {
        title: "Welcome Sequence",
        description:
          "Confirms the purchase, sets expectations for results, and introduces the product range, timed to when the customer is most engaged.",
      },
      {
        title: "Usage & Reorder Nurture",
        description:
          "Triggered emails timed to typical product usage (e.g. a 30-day collagen pouch) that prompt reorder before the customer runs out.",
      },
      {
        title: "Subscription & Loyalty Layer",
        description:
          "Turns one-time buyers into subscribers with a clear incentive structure, reducing reliance on repeat cold traffic.",
      },
      {
        title: "Lapsed Customer Recovery",
        description:
          "Automated win-back flow for customers who have gone quiet, recovering revenue currently written off entirely.",
      },
    ],
    impact: [
      {
        value: "40-50%",
        label: "Additional revenue unlocked from the existing customer base",
      },
      {
        value: "0 → live",
        label: "Retention flows currently active vs. proposed",
      },
      {
        value: "BFCM",
        label: "Target window to have infrastructure live before peak traffic",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        title: "Strategy & Mapping",
        description:
          "Confirm product usage cycles, customer segments, and exact flow logic with MYOwellness before any build begins.",
      },
      {
        week: "Week 2-3",
        title: "Build & Design",
        description:
          "Welcome sequence, post-purchase nurture, and subscription mechanics designed and built in Klaviyo.",
      },
      {
        week: "Week 4",
        title: "Test & Launch",
        description:
          "Flows go live ahead of BFCM, with recovery automation activated for existing lapsed customers.",
      },
    ],
    ctaHeadline: "Let's put this infrastructure in place before BFCM",
  },
];
