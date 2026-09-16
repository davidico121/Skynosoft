export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "website-design-cro",
    name: "Website Design & CRO",
    tagline: "Turn traffic into revenue",
    description:
      "Ground-up ecommerce website and funnel design, or conversion rate optimization on your existing store — built around how your specific customers actually buy.",
    deliverables: [
      "Full Shopify/ecommerce site design & build",
      "Landing page & funnel design",
      "CRO audits + A/B testing roadmap",
      "Checkout & mobile conversion fixes",
    ],
  },
  {
    slug: "email-marketing",
    name: "Email & SMS Marketing",
    tagline: "Recover lost revenue, on autopilot",
    description:
      "Klaviyo flows and campaigns engineered to recover abandoned revenue, grow your list, and turn one-time buyers into repeat customers.",
    deliverables: [
      "Full flow build-out (welcome, abandoned cart, post-purchase, win-back)",
      "Weekly campaign strategy & copy",
      "List growth & segmentation",
      "Deliverability & revenue reporting",
    ],
  },
  {
    slug: "growth-partnership",
    name: "Full Growth Partnership",
    tagline: "Website + email, working as one system",
    description:
      "The combination Skynosoft is built on — a highly converting site paired with email flows and campaigns that compound, so every dollar of traffic works harder.",
    deliverables: [
      "Everything in Website Design & CRO",
      "Everything in Email & SMS Marketing",
      "Unified reporting on revenue impact",
      "Ongoing optimization sprints",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  brand: string;
  category: "Fashion" | "Skincare" | "Home Decor" | "Supplements";
  services: string[];
  summary: string;
  metrics: { value: string; label: string }[];
  logoInitial: string;
  /** Optional real narrative — falls back to generic copy on the detail page when omitted. */
  challenge?: string;
  approach?: string[];
  gallery?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  heroImage?: { src: string; alt: string; width: number; height: number };
  resultsChart?: { src: string; alt: string; width: number; height: number; caption?: string };
  clientReview?: { quote: string; name: string; role?: string };
  /**
   * Fuller structure (Brand/Challenge/Goal/Strategy/Execution/Results/Why it worked).
   * When brandDescription is present, the detail page renders this instead of the
   * simple challenge/approach fallback above.
   */
  brandDescription?: string;
  challengePoints?: string[];
  goal?: string[];
  strategy?: { intro: string; points: string[] };
  execution?: string[];
  resultPoints?: string[];
  whyItWorked?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "aurelle-skincare",
    brand: "Aurelle Skincare",
    category: "Skincare",
    services: ["Website Redesign", "CRO"],
    summary:
      "Redesigned a cluttered Shopify store into a fast, story-led experience — cutting checkout drop-off and lifting average order value.",
    metrics: [
      { value: "+186%", label: "Revenue in 90 days" },
      { value: "+64%", label: "Conversion rate" },
      { value: "+22%", label: "Average order value" },
    ],
    logoInitial: "A",
  },
  {
    slug: "north-fields-supplements",
    brand: "North Fields",
    category: "Supplements",
    services: ["Email Marketing"],
    summary:
      "Rebuilt every core Klaviyo flow and launched a weekly campaign engine to recover abandoned checkouts and grow repeat purchase rate.",
    metrics: [
      { value: "$412K", label: "Email-attributed revenue" },
      { value: "+38%", label: "Repeat purchase rate" },
      { value: "31%", label: "Revenue from flows" },
    ],
    logoInitial: "N",
  },
  {
    slug: "haven-home",
    brand: "Haven Home",
    category: "Home Decor",
    services: ["New Website", "Email Marketing"],
    summary:
      "Launched a new brand from zero — website, funnel, and full email system live before day one, scaling past six figures monthly within a year.",
    metrics: [
      { value: "$0 → $140K/mo", label: "In 11 months" },
      { value: "+91%", label: "Landing page conversion" },
      { value: "27%", label: "Email revenue share" },
    ],
    logoInitial: "H",
  },
  {
    slug: "lumen-fashion",
    brand: "Lumen",
    category: "Fashion",
    services: ["CRO", "Email Marketing"],
    summary:
      "A full-funnel overhaul — homepage, PDPs, and cart flow redesigned alongside a rebuilt email program — to fix a stalled growth curve.",
    metrics: [
      { value: "+143%", label: "Revenue growth" },
      { value: "+56%", label: "Add-to-cart rate" },
      { value: "3.2x", label: "Email ROI" },
    ],
    logoInitial: "L",
  },
  {
    slug: "novaya",
    brand: "Novaya",
    category: "Fashion",
    services: ["Email & SMS Marketing", "Lifecycle Flow Strategy"],
    summary:
      "Rebuilt a Klaviyo account running on untouched default flows into a full lifecycle system, then iterated on the highest-leverage flows twice more once the data showed where they were leaking.",
    metrics: [
      { value: "$300K+", label: "Revenue from flows" },
      { value: "43%", label: "Welcome flow open rate" },
      { value: "6", label: "Lifecycle flows built" },
    ],
    logoInitial: "N",
    heroImage: {
      src: "/case-studies/novaya/hero-product.png",
      alt: "Product photography from the Novaya welcome email showing the brand's menswear styling",
      width: 524,
      height: 303,
    },
    brandDescription:
      "Novaya is a direct-to-consumer apparel brand selling men's and women's essentials (cargo pants, t-shirts, outerwear, and footwear) through a French-language storefront. Their audience shops entirely in French and expects the same lifecycle experience (welcome, order updates, promotions) that English-language DTC brands take for granted.",
    challengePoints: [
      "Klaviyo account running on default flows that had never been touched since launch",
      "A single abandoned-cart sequence existed, built once and left alone for over a year with no revisions",
      "No coverage at all for welcome, browse abandonment, post-purchase, or win-back, some of the highest-leverage moments in the customer lifecycle",
      "No process for knowing which flows were actually working versus just running",
    ],
    goal: [
      "Turn a single static flow into genuine full-lifecycle coverage",
      "Make cart and checkout recovery reliably convert, not just exist",
      "Build a system that improves itself over time based on real performance data, not a set-and-forget flow",
    ],
    strategy: {
      intro:
        "Full-lifecycle build, prioritized by leverage, not a patch on what already existed.",
      points: [
        "Map every meaningful customer action and build a flow for it, instead of leaving gaps at the highest-value moments",
        "Treat flows as living systems: judge each one on real revenue per recipient, not just open and click rates",
        "Prioritize the highest-leverage gaps first (welcome, cart, checkout) before filling in the rest",
      ],
    },
    execution: [
      "Full audit of the existing Klaviyo account and the one legacy flow already in place",
      "Rebuilt the welcome series from scratch, it now drives the single largest share of flow revenue",
      "Rebuilt the abandoned cart flow twice, and the checkout flow twice, once the data showed exactly where each version was leaking",
      "Added browse abandonment, post-purchase, and win-back flows that didn't exist before",
      "Reviewed every flow against real revenue-per-recipient data before deciding what to rebuild next",
    ],
    resultPoints: [
      "$300K+ in flow-attributed revenue across the rebuilt account",
      "Welcome flow alone: over 80,000 recipients, a 43% open rate, and $173,929 in attributed revenue, the single largest share of flow revenue",
      "Full lifecycle coverage: 6 flows live across welcome, browse abandonment, cart, checkout, post-purchase, and win-back, versus 1 before",
      "Cart and checkout flows each rebuilt twice once the data showed exactly where they were leaking",
    ],
    whyItWorked: [
      "Treated the account as a system to build, not a single flow to patch",
      "Let real revenue-per-recipient data decide what got rebuilt, not assumptions",
      "Prioritized the highest-leverage gaps first before filling in the rest",
      "Iterated instead of shipping once and walking away",
    ],
    gallery: [
      {
        src: "/case-studies/novaya/welcome-email.png",
        alt: "The rebuilt Novaya welcome email, showing the discount offer, hero product photography, and best-seller product grid",
        width: 650,
        height: 3549,
        caption: "The rebuilt welcome email, the single highest-revenue flow in the account",
      },
    ],
    resultsChart: {
      src: "/case-studies/novaya/revenue-chart.png",
      alt: "Bar chart showing flow-attributed revenue by lifecycle stage: Welcome $173,929, Cart and Checkout $88,179, Browse Abandonment $20,773, Post-Purchase $7,966, Winback $434",
      width: 1300,
      height: 700,
      caption: "Revenue by lifecycle stage, pulled directly from the Klaviyo flow performance report",
    },
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  brand: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Skynosoft rebuilt our site and our email system in the same month — revenue hasn't dipped below +100% year-over-year since.",
    name: "Priya Nandan",
    role: "Founder",
    brand: "Aurelle Skincare",
  },
  {
    quote:
      "We'd tried three other agencies before this. The difference is they treat the website and email like one machine, not two separate projects.",
    name: "Marcus Webb",
    role: "CEO",
    brand: "North Fields",
  },
  {
    quote:
      "Launched our brand from nothing to six figures a month in under a year. Skynosoft built the whole growth engine.",
    name: "Ines Duarte",
    role: "Co-founder",
    brand: "Haven Home",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "David Owoeye",
    role: "Founder",
    bio: "Leads strategy across every engagement — the connective thread between conversion design and email revenue.",
  },
];

export const CALENDLY_URL = "https://calendly.com/david-owoeye/discuss";

export const SITE_URL = "https://www.skynosoft.net";
export const SITE_NAME = "Skynosoft";
