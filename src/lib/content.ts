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
    challenge:
      "Novaya had steady traffic and a loyal following, but their Klaviyo account was running on default flows that hadn't been touched since launch. A cart abandonment sequence existed but had never been revisited, and there was no coverage at all for browse abandonment, post-purchase, or win-back moments — some of the highest-leverage points in the customer lifecycle.",
    approach: [
      "Rebuilt the welcome series from scratch — it now drives the single largest share of flow revenue",
      "Iterated on the abandoned cart and checkout flows twice, rebuilding each into a higher-converting version once the data showed exactly where they were leaking",
      "Added full lifecycle coverage that didn't exist before: browse abandonment, post-purchase, and win-back flows",
      "Reviewed every flow against real revenue-per-recipient data, not just open and click rates",
    ],
    gallery: [
      {
        src: "/case-studies/novaya/welcome-email.png",
        alt: "The rebuilt Novaya welcome email, showing the discount offer, hero product photography, and best-seller product grid",
        width: 650,
        height: 3549,
        caption: "The rebuilt welcome email — the single highest-revenue flow in the account",
      },
      {
        src: "/case-studies/novaya/revenue-chart.png",
        alt: "Bar chart showing flow-attributed revenue by lifecycle stage: Welcome $173,929, Cart and Checkout $88,179, Browse Abandonment $20,773, Post-Purchase $7,966, Winback $434",
        width: 1300,
        height: 700,
        caption: "Revenue by lifecycle stage, pulled directly from the Klaviyo flow performance report",
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
