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

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-ecommerce-site-isnt-converting",
    title: "Why Your Ecommerce Site Isn't Converting (And It's Not Traffic)",
    excerpt:
      "Most brands blame ad spend when revenue stalls. Here's the checkout and PDP audit we run before touching a single campaign.",
    category: "CRO",
    date: "2026-07-14",
    readTime: "6 min read",
  },
  {
    slug: "email-flows-that-actually-recover-revenue",
    title: "The 5 Klaviyo Flows That Actually Recover Revenue in 2026",
    excerpt:
      "Abandoned cart isn't enough anymore. The flow stack we build for every 6-figure brand, in order of impact.",
    category: "Email Marketing",
    date: "2026-06-02",
    readTime: "8 min read",
  },
  {
    slug: "redesign-vs-rebuild",
    title: "Redesign vs. Rebuild: How We Decide for a $50K+/mo Brand",
    excerpt:
      "A full rebuild isn't always the answer. The framework we use to decide between a redesign, a CRO pass, or starting fresh.",
    category: "Strategy",
    date: "2026-05-18",
    readTime: "5 min read",
  },
];

export const CALENDLY_URL = "https://calendly.com/david-owoeye/discuss";
