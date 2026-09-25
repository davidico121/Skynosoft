/**
 * Personalized strategy pitch pages, served at strategy.skynosoft.net/<slug>.
 * The page template is the same for every brand; only this content changes.
 * Add a new entry to strategyPitches to spin up a new page.
 */
export type StrategyPitch = {
  /** URL slug: strategy.skynosoft.net/<slug>. */
  slug: string;
  brand: string;
  /** Eyebrow above the headline, e.g. "A note for {brand}". */
  eyebrow: string;
  /** The hero headline: the problem, told through something real about this brand. Use \n to set line breaks at meaningful points. */
  headline: string;
  /** Paragraphs under the headline. */
  problem: string[];
  /** What the problem is costing them. */
  amplify: { heading: string; paragraphs: string[] };
  /** Proof that the site was actually checked. */
  story: { heading: string; paragraphs: string[] };
  /** What it looks like fixed. `closing` is shown as the large tagline reveal statement. */
  transformation: { heading: string; points: string[]; closing: string };
  /** Leads into the flow, infrastructure, impact and timeline sections below it. */
  offer: { heading: string; paragraphs: string[] };
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
  /** Closing section above the Calendly embed. */
  response: { heading: string; ps: string };
};

export const strategyPitches: StrategyPitch[] = [
  {
    slug: "myowellness",
    brand: "MYOwellness",
    eyebrow: "A note for MYOwellness",
    headline:
      "Debbie's hair stopped falling out.\nLing's skin cleared up.\nAnd neither of them\nheard from you again.",
    problem: [
      "I read through your reviews before writing this. Real people are getting real results from your collagen and your mushroom blend. That's rare. Most supplement brands can't say that honestly. You can. But right now, the story stops the moment someone completes checkout.",
    ],
    amplify: {
      heading: "Here's what that's actually costing you",
      paragraphs: [
        "Collagen doesn't last forever. Neither does a 900g protein pouch. Everyone taking Hydrolysed Bovine Collagen daily is going to run out, probably in 30 to 40 days. That's not a maybe, it's built into the product itself.",
        "Right now, when that happens, nothing happens. No email tells them it's time to reorder. No sequence reminds them why they started. They pause, forget, maybe pick something up at Holland & Barrett, and quietly become someone else's customer.",
        "Multiply that across every collagen customer, every protein customer, everyone who bought Immune Defence heading into cold season. That's not a small leak. Over a year, it's most of your repeat revenue disappearing before it ever shows up as a number, because it never registers as a lost sale. It just registers as silence.",
      ],
    },
    story: {
      heading: "I went looking",
      paragraphs: [
        "I checked the site properly before writing this, not just the homepage. There's no pop up capturing intent. The only email signup live right now is one field buried in the footer that says \"Keep up to date with us.\" No incentive, no promise, no reason to give you an email address.",
        "And if someone finds it and signs up anyway, there's nothing waiting for them. No welcome email. No story about why the collagen works. No nudge toward a first order.",
        "This isn't a knock on the brand. The product side is genuinely strong, which is exactly why this gap stands out. You've done the hard part. The infrastructure that should carry that hard part into repeat revenue just isn't built yet.",
      ],
    },
    transformation: {
      heading: "What this looks like fixed",
      points: [
        "Someone curious about collagen for hair health gets a real reason to hand over their email, not \"keep up to date\"",
        "A first time buyer gets welcomed properly and told what to expect, so they don't quietly give up before results kick in",
        "A collagen customer gets an email right around day 25 to 30, timed to when their pouch is actually running low",
        "A customer gone quiet for 60+ days gets a specific win back sequence instead of falling off the list forever",
      ],
      closing:
        "Do this and MYOwellness stops depending entirely on new customer acquisition to grow. Your existing, already convinced customers start compounding on their own, the way AG1 and Grunds customers do.",
    },
    offer: {
      heading: "What I'd do",
      paragraphs: [
        "I've mapped this out specifically for your product range below. Before you spend anything, I want you to see exactly what I'm proposing.",
        "If it's worth a conversation, we get on a short call, I ask a few questions about your actual reorder cycles and customer behavior, and we build from there: welcome sequence, reorder nurture, subscription layer, win back flow, live before BFCM.",
      ],
    },
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
        "Collagen and protein are consumed daily. That means every customer has a built in reorder point. Brands like AG1 and Grunds win by automating what happens at that point. Right now, MYOwellness has no system at all in that gap. It's the single highest leverage fix available before BFCM.",
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
          "Turns one time buyers into subscribers with a clear incentive structure, reducing reliance on repeat cold traffic.",
      },
      {
        title: "Lapsed Customer Recovery",
        description:
          "Automated win back flow for customers who have gone quiet, recovering revenue currently written off entirely.",
      },
    ],
    impact: [
      {
        value: "40 to 50%",
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
        week: "Weeks 2 to 3",
        title: "Build & Design",
        description:
          "Welcome sequence, post purchase nurture, and subscription mechanics designed and built in Klaviyo.",
      },
      {
        week: "Week 4",
        title: "Test & Launch",
        description:
          "Flows go live ahead of BFCM, with recovery automation activated for existing lapsed customers.",
      },
    ],
    response: {
      heading: "Let's talk it through",
      ps: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
];
