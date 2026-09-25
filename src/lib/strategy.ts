/**
 * Personalized strategy pitch pages, served at strategy.skynosoft.net/<slug>.
 * The page template is the same for every brand; only this content changes.
 * Add a new entry to strategyPitches to spin up a new page.
 */
export type StrategyShot = { src: string; alt: string; width: number; height: number };

export type StrategyIconKey = "welcome" | "reorder" | "subscription" | "winback";

export type StrategyPitch = {
  /** URL slug: strategy.skynosoft.net/<slug>. */
  slug: string;
  brand: string;
  hero: {
    eyebrow: string;
    /** Headline lines, broken at meaningful points (they flow together on mobile). */
    headline: string[];
    subheading: string;
    /** Primary button label, reused for the final call to action. */
    cta: string;
    /** One real proof signal from the brand's own site or reviews. */
    proof?: { source: string; quote: string; name: string };
    /** Real screenshots of the brand's site, shown in a browser frame beside the headline. */
    visuals?: {
      /** Shown in the browser frame's address bar, e.g. "myowellness.co.uk". */
      url: string;
      main: StrategyShot;
      /** A smaller frame overlapping the main one, e.g. a highlighted detail. */
      inset?: StrategyShot & { caption: string };
    };
  };
  /** The customer journey with the step(s) where it breaks. */
  gap: {
    label: string;
    steps: { day: string; title: string; detail: string; status: string; leak?: boolean }[];
  };
  problemSolution: {
    heading: string;
    problem: { title: string; text: string };
    solution: { title: string; points: string[] };
  };
  /** 3-5 outcome-led benefits, each with a short description. */
  benefits: {
    heading: string;
    items: { icon: StrategyIconKey; title: string; detail: string }[];
  };
  how: {
    heading: string;
    /** Three steps. */
    steps: { week: string; title: string; description: string }[];
    /** Three metric boxes. */
    impact: { value: string; label: string }[];
  };
  proofHeading: string;
  /** Slugs from caseStudies to show as relevant proof. */
  caseStudySlugs: string[];
  /** Slug of the case study whose client review is shown under the cards. */
  reviewFromCaseStudy?: string;
  /** Large statement whose words light up as you scroll. Two lines or more. */
  tagline: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  risk: { heading: string; text: string };
};

export const strategyPitches: StrategyPitch[] = [
  {
    slug: "myowellness",
    brand: "MYOwellness",
    hero: {
      eyebrow: "A note for MYOwellness",
      headline: [
        "Repeat orders from your",
        "collagen and protein customers,",
        "without paying to win them again",
      ],
      subheading:
        "Debbie's hair stopped falling out. Ling's skin cleared up. Neither heard from you again. Here is the retention system that changes that, live before BFCM.",
      cta: "Book a strategy call",
      proof: {
        source: "From a verified review on your site",
        quote: "my hair loss has stopped and new growth has started.",
        name: "Debbie Smyth",
      },
      visuals: {
        url: "myowellness.co.uk",
        main: {
          src: "/pitch-assets/myowellness/site-home.jpg",
          alt: "The MYOwellness homepage, with a supplement shop hero showing a woman holding a collagen pouch",
          width: 1200,
          height: 750,
        },
        inset: {
          src: "/pitch-assets/myowellness/site-signup.jpg",
          alt: "The footer of the MYOwellness site, where the only email signup is a single Email address field under the heading Keep up to date with us",
          width: 1110,
          height: 195,
          caption: "Their only email signup",
        },
      },
    },
    gap: {
      label: "What happens after one collagen order today",
      steps: [
        {
          day: "Day 0",
          title: "First purchase",
          detail: "Buys collagen, protein, or a superfood blend.",
          status: "Order placed",
        },
        {
          day: "Day 25 to 30",
          title: "The pouch runs low",
          detail: "The natural moment to reorder.",
          status: "Nothing sent",
          leak: true,
        },
        {
          day: "Day 60 and on",
          title: "The customer lapses",
          detail: "Forgets, or picks up something else instead.",
          status: "Nothing sent",
          leak: true,
        },
      ],
    },
    problemSolution: {
      heading: "Your customers already believe in the product. Nothing brings them back.",
      problem: {
        title: "Right now",
        text: "When a pouch runs out, nothing happens. No email tells them it's time to reorder. No sequence reminds them why they started. They pause, forget, maybe pick something up at Holland & Barrett, and quietly become someone else's customer.",
      },
      solution: {
        title: "With the system in place",
        points: [
          "Someone curious about collagen for hair health gets a real reason to hand over their email, not \"keep up to date\"",
          "A first time buyer gets welcomed properly and told what to expect, so they don't quietly give up before results kick in",
          "A collagen customer gets an email right around day 25 to 30, timed to when their pouch is actually running low",
          "A customer gone quiet for 60+ days gets a specific win back sequence instead of falling off the list forever",
        ],
      },
    },
    benefits: {
      heading: "Four pieces that turn one purchase into a habit",
      items: [
        {
          icon: "welcome",
          title: "Buyers who stay past week one",
          detail:
            "A welcome sequence confirms the purchase, sets expectations for results, and introduces the product range, timed to when the customer is most engaged.",
        },
        {
          icon: "reorder",
          title: "Reorders before the pouch runs out",
          detail:
            "Triggered emails timed to typical product usage (e.g. a 30 day collagen pouch) prompt reorder before the customer runs out.",
        },
        {
          icon: "subscription",
          title: "Subscribers, not one time buyers",
          detail:
            "A clear incentive structure turns one time buyers into subscribers, reducing reliance on repeat cold traffic.",
        },
        {
          icon: "winback",
          title: "Quiet customers brought back",
          detail:
            "An automated win back flow for customers who have gone quiet recovers revenue currently written off entirely.",
        },
      ],
    },
    how: {
      heading: "Three steps, four weeks, live before BFCM",
      steps: [
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
      impact: [
        {
          value: "40 to 50%",
          label: "Additional revenue unlocked from the existing customer base",
        },
        { value: "0 → live", label: "Retention flows currently active vs. proposed" },
        {
          value: "BFCM",
          label: "Target window to have infrastructure live before peak traffic",
        },
      ],
    },
    proofHeading: "The same kind of work, for wellness brands like yours",
    caseStudySlugs: ["bwll", "cannonbalm"],
    reviewFromCaseStudy: "cannonbalm",
    tagline:
      "Do this and MYOwellness stops depending entirely on new customer acquisition to grow. Your existing, already convinced customers start compounding on their own, the way AG1 and Grunds customers do.",
    faqHeading: "Before you book",
    faqs: [
      {
        q: "What do you need from us to start?",
        a: "Access to your email platform and store, and a short conversation about how long each product lasts. Week one is spent confirming usage cycles and segments before anything is built.",
      },
      {
        q: "How do you decide when the reorder email goes out?",
        a: "It is timed to how long the product actually lasts. For a 30 day collagen pouch that means roughly day 25 to 30, and we confirm the exact timing with you in week one.",
      },
      {
        q: "What if a customer has already reordered?",
        a: "The flows check for a new purchase and stop, so nobody gets a reorder reminder after they have already bought again.",
      },
      {
        q: "Is the 40 to 50% a guarantee?",
        a: "No. It is the target this plan is aimed at, and we check it against your real reorder cycles in week one before anything is built.",
      },
      {
        q: "Can it be live before BFCM?",
        a: "The plan runs four weeks, so starting soon keeps the flows live comfortably ahead of peak traffic.",
      },
      {
        q: "What does it cost?",
        a: "We cover scope and pricing on the call, once we know which of the four pieces you want.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
];
