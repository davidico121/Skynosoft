import type { StrategyShot } from "@/lib/strategy";

/**
 * "Belief ladder" pitch pages, served at strategy.skynosoft.net/<slug>.
 *
 * For brands that do not use email marketing yet and rely on ads, a social
 * media manager and manual WhatsApp follow ups. The page walks a reader from
 * "ads are fine" to "I am paying for the same customer again and again" to
 * "I want this running", and every outside claim links to its source.
 *
 * Hard rule: a pitch can only go live when every source it cites is marked
 * `verified: true`, meaning someone opened the page and read the claim there
 * (see `unverifiedSources`). Until then the page 404s in production and only
 * renders locally for review.
 */

export type EvidenceId =
  | "nairaDollarCosts"
  | "nairaFell2023"
  | "metaFines"
  | "whatsappBlocks"
  | "jumiaBlackFriday"
  | "jumiaCartWaiting"
  | "jumiaCeo"
  | "inflation"
  | "lagosSpending"
  | "smartphones"
  | "litmusRoi";

export type Evidence = {
  /** What the source says, in our words. Must match the page. */
  claim: string;
  title: string;
  publisher: string;
  /** Publish date as printed on the page, if any. */
  published?: string;
  url: string;
  /** Who reported it, and how far to trust it. Shown to the reader. */
  basis: "Company reported" | "News report" | "Industry survey" | "Research firm" | "Commentary";
  /** Anything the reader should keep in mind, shown under the source. */
  caution?: string;
  /** True only after someone opened the page and read this claim on it. */
  verified: boolean;
  /** ISO date of that check. */
  checkedOn?: string;
};

export const evidence: Record<EvidenceId, Evidence> = {
  nairaDollarCosts: {
    claim:
      "As the naira has lost value against the dollar, products priced in dollars cost more in naira, even though their dollar price has not changed.",
    title: "Nigeria's currency devaluation is forcing startups to seek local alternatives",
    publisher: "Techpoint Africa",
    url: "https://techpoint.africa/insight/nigerias-currency-devaluation-is-forcing-startups-to-seek-local-alternatives/",
    basis: "News report",
    caution: "About software and tools in general. Check your own ad invoice to see how your ads are billed.",
    verified: false,
  },
  nairaFell2023: {
    claim: "The naira lost about 55% of its value against the dollar in 2023.",
    title: "Devaluation of the naira",
    publisher: "The Nigerian Business Weekly",
    url: "https://ngbusinessweekly.substack.com/p/devaluation-of-the-naira-reduces",
    basis: "Commentary",
    caution: "Confirm who the 55% figure is attributed to before this goes live.",
    verified: false,
  },
  metaFines: {
    claim:
      "Meta has been fined more than $290 million in Nigeria and has threatened to pull Facebook and Instagram from the country.",
    title: "Why Meta is in trouble in Nigeria, and what this means for Facebook, Instagram and WhatsApp users",
    publisher: "The African Mirror",
    url: "https://theafricanmirror.africa/special-features/special-features-analysis/why-meta-is-in-trouble-in-nigeria-and-what-this-means-for-facebook-instagram-and-whatsapp-users/",
    basis: "News report",
    verified: false,
  },
  whatsappBlocks: {
    claim: "Small businesses selling on WhatsApp face the risk of being blocked or having their Status muted.",
    title: "WhatsApp, not Instagram, is the preferable platform for small businesses in Nigeria",
    publisher: "Techpoint Africa",
    published: "2019",
    url: "https://techpoint.africa/insight/whatsapp-not-instagram-is-the-preferable-platform-for-small-businesses-in-nigeria/",
    basis: "News report",
    caution: "Published in 2019.",
    verified: false,
  },
  jumiaBlackFriday: {
    claim:
      "Jumia Nigeria's Black Friday campaign in 2025 brought 3.2 million orders, about 63% of the orders in the period, with orders up 28% and GMV up 45% year on year.",
    title: "Jumia sales in Nigeria and Ghana, November 2025",
    publisher: "The Condia",
    published: "December 2025",
    url: "https://thecondia.com/jumia-sales-nigeria-ghana-nov-2025/",
    basis: "Company reported",
    caution: "Figures come from Jumia's own investor update.",
    verified: false,
  },
  jumiaCartWaiting: {
    claim:
      "Before Black Friday 2025, Jumia saw a marked rise in wishlist and add to cart activity without immediate checkouts, as shoppers waited for deeper discounts.",
    title: "Jumia sales in Nigeria and Ghana, November 2025",
    publisher: "The Condia",
    published: "December 2025",
    url: "https://thecondia.com/jumia-sales-nigeria-ghana-nov-2025/",
    basis: "Company reported",
    verified: false,
  },
  jumiaCeo: {
    claim: "Jumia's CEO says Black Friday has become a predictable, planned retail period, not a brief surge.",
    title: "Jumia CEO highlights Nigeria's e-commerce progress as Black Friday becomes a year round phenomenon",
    publisher: "Brand Times Nigeria",
    url: "https://www.brandtimes.com.ng/?p=34763",
    basis: "Company reported",
    verified: false,
  },
  inflation: {
    claim: "Nigeria's headline inflation rate was 14.06% in October 2026, with cost of living pressure still high.",
    title: "Nigeria's inflation falls to 14.06% in October",
    publisher: "EdgeX News",
    url: "https://pro.edgex.exchange/en-US/news/article/nigeria-inflation-cools-october-2026",
    basis: "News report",
    caution: "Replace with the National Bureau of Statistics release before this goes live.",
    verified: false,
  },
  lagosSpending: {
    claim: "Lagos residents are prioritising essentials as costs rise, and cutting back on non essential purchases.",
    title: "Consumer spending trends in Lagos 2026: residents prioritise essentials amid rising costs",
    publisher: "Brands PR Nigeria",
    published: "22 May 2026",
    url: "https://brandspurng.com/2026/05/22/consumer-spending-trends-in-lagos-2026-residents-prioritise-essentials-amid-rising-costs/",
    basis: "News report",
    verified: false,
  },
  smartphones: {
    claim: "Smartphone ownership in Nigeria rose from 64% in 2023 to 75% in 2025, and 86% of smartphone users are on Android.",
    title: "Nigeria smartphone study",
    publisher: "KPMG Nigeria",
    published: "September 2026",
    url: "https://kpmg.com/ng/en/insights/2026/09/nigeria-smartphone-study.html",
    basis: "Research firm",
    verified: false,
  },
  litmusRoi: {
    claim:
      "Most marketers who track it report that email returns between $10 and $50 for every $1 spent, measured against the cost of the email tool.",
    title: "The ROI of email marketing",
    publisher: "Litmus",
    url: "https://www.litmus.com/blog/email-marketing-roi",
    basis: "Industry survey",
    caution: "The ratio is measured against the email tool's fee, not the whole programme cost.",
    verified: false,
  },
};

export type BeliefPitch = {
  /** URL slug: strategy.skynosoft.net/<slug>. */
  slug: string;
  brand: string;
  /** What they sell, lower case, used in sentences ("hair care", "skincare", "fashion"). */
  category: string;
  hero: {
    eyebrow: string;
    /** Headline lines, broken at meaning. */
    headline: string[];
    subheading: string;
    /** Button that scrolls the reader into the page. */
    cta: string;
  };
  /** What the brand does today. Only things someone has actually verified. */
  nowDoing: { title: string; detail: string }[];
  /**
   * What we found when we checked their site and signed up as a customer.
   * Only real findings, dated, with a screenshot where possible.
   */
  audit?: {
    heading: string;
    checkedOn: string;
    findings: { label: string; result: string; shot?: StrategyShot }[];
  };
  /** Starting numbers for the leak calculator. Shown as examples, never as the brand's own. */
  calculator: { newCustomers: number; orderValue: number; costToWin: number; repeatPercent: number };
  /** Skynosoft case study slugs shown as proof. Closest category first. */
  caseStudySlugs: string[];
  /** Evidence ids in the order they first appear on the page. Numbers the footnotes. */
  sources: EvidenceId[];
  faqs: { q: string; a: string; cite?: EvidenceId }[];
  risk: { heading: string; text: string };
  pitcher?: {
    name: string;
    title: string;
    photo: { src: string; width: number; height: number };
    calendlyUrl: string;
    socials?: boolean;
  };
};

/** Source ids a pitch cites that nobody has opened and read yet. */
export function unverifiedSources(pitch: BeliefPitch): EvidenceId[] {
  return pitch.sources.filter((id) => !evidence[id].verified);
}

export const beliefPitches: BeliefPitch[] = [
  {
    // Local preview only. Not a real brand, and it cannot go live while its sources are unverified.
    slug: "template",
    brand: "Your Brand",
    category: "ecommerce",
    hero: {
      eyebrow: "A note for Your Brand",
      headline: ["You are paying for", "the same customer", "again and again"],
      subheading:
        "Right now every sale starts with an ad, a post or a chat. **Here is what that is costing you**, and what brands do instead once they own the list.",
      cta: "See what you are missing",
    },
    nowDoing: [
      {
        title: "Ads every time you want sales",
        detail: "Switch the ads off and the orders stop the same week.",
      },
      {
        title: "A social media manager posting on repeat",
        detail: "Your reach belongs to the platform. When its rules change, your month changes.",
      },
      {
        title: "WhatsApp and DM follow ups, one by one",
        detail: "Someone has to remember to message each customer, and nobody can message them all.",
      },
    ],
    calculator: { newCustomers: 200, orderValue: 30000, costToWin: 6000, repeatPercent: 8 },
    caseStudySlugs: ["streaky-academy", "cannonbalm"],
    sources: [
      "nairaDollarCosts",
      "metaFines",
      "whatsappBlocks",
      "jumiaCartWaiting",
      "jumiaBlackFriday",
      "jumiaCeo",
      "lagosSpending",
      "smartphones",
      "litmusRoi",
    ],
    faqs: [
      {
        q: "Our customers live on Instagram and WhatsApp. Will they read email?",
        a: "Keep them on Instagram and WhatsApp. **Email is not a replacement, it is the one channel you own.** A blocked number or a muted Status takes the whole audience with it. A list does not.",
        cite: "whatsappBlocks",
      },
      {
        q: "Do people in Nigeria even check email?",
        a: "Fair question, and we could not find a published figure for email use in Nigeria, so we will not make one up. What we can point to is that most people here are on a phone. **The honest answer is in your own list.** From week one we measure opens and orders, so you see it in your numbers, not in our opinion.",
        cite: "smartphones",
      },
      {
        q: "We have no email list yet.",
        a: "Every order you have taken has an email address attached, and so does every checkout. The first job is capturing them properly from now on. **If your sales happen on WhatsApp, we start by giving people a reason to share one:** a welcome offer, a restock alert, an order update.",
      },
      {
        q: "We cannot afford more spend right now.",
        a: "This is not more ad spend. **It is getting more from customers you have already paid to win.** The calculator above uses your own numbers so you can see what a small change in repeat orders is worth.",
      },
      {
        q: "Is the result guaranteed?",
        a: "No. Any number on this page that is not a real client result is an example or a target, and it says so. **What we do guarantee is that you see the plan before you spend anything.**",
      },
      {
        q: "Can it be live before Black Friday?",
        a: "The build takes two weeks: strategy and build together in week one, then testing and launch in week two. **If you start now, it is possible.** Every week of delay is a week of the season sent without it.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "Book a call and we walk through your store, what is missing, and exactly what we would build. If it is not right for you, you leave with a clear picture and nothing owed.",
    },
  },
];
