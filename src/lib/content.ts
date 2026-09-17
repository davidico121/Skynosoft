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
      width: 1000,
      height: 580,
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
        src: "/case-studies/novaya/jeans-campaign.png",
        alt: "A Novaya campaign email telling the story of a customer, Charles-Olivier, who switched from stiff jeans to the Novaya cargo pants, with a testimonial and 'Rejoindre Michel' call to action",
        width: 1200,
        height: 7086,
      },
      {
        src: "/case-studies/novaya/testimonials-email.png",
        alt: "A Novaya welcome flow email built around 17,000+ five-star reviews, pairing customer testimonials with product photography",
        width: 1200,
        height: 5643,
      },
      {
        src: "/case-studies/novaya/bestsellers-email.png",
        alt: "A Novaya welcome flow email showcasing men's and women's best-selling products with a 10% discount code",
        width: 1200,
        height: 6583,
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
  {
    slug: "maxsleek",
    brand: "MaxSleek",
    category: "Fashion",
    services: ["Email Marketing", "Lifecycle Flow Rebuild"],
    summary:
      "Took over a Klaviyo account with no welcome or abandoned-cart automation and a weekly sale-campaign program that wasn't converting, and rebuilt the core lifecycle flows from scratch. Two weeks in, this is the honest early read, not a results showcase yet.",
    metrics: [
      { value: "17,000+", label: "Reviews cited in the brand's own campaigns" },
      { value: "0 → 3", label: "Live lifecycle flows built" },
      { value: "2 weeks", label: "Since the new flows went live" },
    ],
    logoInitial: "M",
    heroImage: {
      src: "/case-studies/maxsleek/hero-lifestyle.png",
      alt: "Lifestyle marketing imagery used in MaxSleek's own email campaigns",
      width: 900,
      height: 570,
    },
    brandDescription:
      "MaxSleek is a London-based direct-to-consumer fashion retailer selling women's and men's apparel and accessories (dresses, knitwear, outerwear, bags) through a discount-led offer, running frequent site-wide sale campaigns to a list built up since early 2026.",
    challengePoints: [
      "No welcome flow existed at all, new subscribers received nothing after signing up",
      "No abandoned cart flow existed either",
      "The account's only cart-recovery automation, an 'Abandoned Checkout' flow built months earlier, had been left sitting in draft status and was never actually sending",
      "Weekly sale campaigns (12 sends since May) were getting solid opens (35 to 51%) but very low click-through and close to zero orders per send",
    ],
    goal: [
      "Stand up real welcome and cart-recovery automation where none existed",
      "Get a working baseline of real flow performance data instead of a draft flow no one was watching",
      "Use the campaign program's healthy opens alongside its weak clicks to start diagnosing where the conversion gap actually is",
    ],
    strategy: {
      intro:
        "Fix the missing foundation first, then use the account's first real weeks of data to diagnose the campaign conversion gap, rather than guessing at it.",
      points: [
        "Build welcome, abandoned cart, and abandoned checkout flows from scratch, matching MaxSleek's existing email design",
        "Leave the legacy draft checkout flow in place rather than deleting it, as a comparison point once there's enough new data",
        "Treat the first weeks live as a diagnostic period, not a results period, given how small the recipient volumes still are",
      ],
    },
    execution: [
      "Audited the account and found a single abandoned-checkout flow, built in May and left in draft, plus no welcome or abandoned-cart automation at all",
      "Built and launched 3 new flows the week of September 2, 2026: Welcome, Abandoned Cart, and Abandoned Checkout",
      "Kept the existing weekly sale-campaign cadence running throughout the rebuild",
    ],
    resultPoints: [
      "3 lifecycle flows now live where there were effectively 0 working ones before",
      "Early open rates across the new flows are already in the 35 to 50% range, in line with the campaign program's opens",
      "Volumes are still small (each flow has seen well under 100 recipients so far), so this is a structural update, not a revenue result yet",
      "The campaign program's open-vs-click gap is the next thing being worked on now that the flow foundation is in place",
    ],
    gallery: [
      {
        src: "/case-studies/maxsleek/customer-stories.png",
        alt: "A MaxSleek campaign email featuring named verified-buyer reviews (Georgia in Bristol, Robert in Edinburgh, Kenzie in Manchester) alongside product photography",
        width: 1200,
        height: 5998,
      },
      {
        src: "/case-studies/maxsleek/bestsellers.png",
        alt: "A MaxSleek sale campaign email showcasing discounted bestselling products with review counts and star ratings",
        width: 1200,
        height: 5285,
      },
      {
        src: "/case-studies/maxsleek/welcome-email.png",
        alt: "The newly built MaxSleek welcome email, showing the signup discount offer and bestselling product grid",
        width: 1200,
        height: 5725,
      },
    ],
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
