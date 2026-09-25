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
  category: "Fashion" | "Activewear" | "Skincare" | "Haircare" | "Home Decor" | "Supplements" | "Oral Care" | "Online Courses" | "Wellness";
  services: string[];
  summary: string;
  metrics: { value: string; label: string }[];
  logoInitial: string;
  logo?: { src: string; width: number; height: number };
  /** Optional real narrative — falls back to generic copy on the detail page when omitted. */
  challenge?: string;
  approach?: string[];
  gallery?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  heroImage?: { src: string; alt: string; width: number; height: number };
  resultsImages?: { src: string; alt: string; width: number; height: number }[];
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
    logo: { src: "/case-studies/novaya/logo.png", width: 489, height: 130 },
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
  {
    slug: "afrocenchix",
    brand: "Afrocenchix",
    category: "Haircare",
    services: ["Website Redesign", "CRO"],
    summary:
      "A 60-day CRO sprint and Shopify redesign for a premium vegan haircare brand, built around clearer product discovery and stronger brand storytelling.",
    metrics: [
      { value: "+23%", label: "Add-to-cart rate" },
      { value: "$47K", label: "Revenue from the sprint" },
      { value: "60 days", label: "CRO sprint length" },
    ],
    logoInitial: "A",
    logo: { src: "/case-studies/afrocenchix/logo.svg", width: 636, height: 158 },
    brandDescription:
      "Afrocenchix is a Diverse Owned vegan haircare brand making safe, effective products for Afro, tightly coiled, and curly hair. Its Shopify store is priced in GBP and has been featured in Vogue, the Daily Mail, Forbes, and the BBC.",
    goal: [
      "Raise conversion rate through a focused 60-day CRO sprint",
      "Make products easier to find and the brand story easier to understand",
      "Improve page load performance on a responsive Shopify build",
    ],
    execution: [
      "Ran a full Shopify redesign as a 60-day CRO sprint",
      "Built a clean, modern responsive design on custom Shopify templates",
      "Improved product discoverability and load performance",
    ],
    resultPoints: [
      "+23% add-to-cart rate over the 60-day sprint",
      "$47K in revenue from the sprint",
    ],
    clientReview: {
      quote:
        "The team\u2019s skills are outstanding, and they always make time for me, despite our smaller-scale projects compared to their major ones. They provide valuable advice when needed and assist with all aspects of website design and management. I highly recommend them for their courtesy, expertise, and talent.",
      name: "Ameen Kalla",
    },
    gallery: [
      {
        src: "/case-studies/afrocenchix/home.jpg",
        alt: "The Afrocenchix homepage, with a promotional hero, customer favourites, shop by hair need, press logos, and customer reviews",
        width: 1200,
        height: 6375,
      },
      {
        src: "/case-studies/afrocenchix/collection.jpg",
        alt: "The Afrocenchix Best Sellers collection page, showing a filterable grid of 22 products with ratings and prices",
        width: 1200,
        height: 2967,
      },
      {
        src: "/case-studies/afrocenchix/product.jpg",
        alt: "The Swish and Swirl Wash Day Duo product page, with a photo gallery, subscribe and save pricing, ingredients, and FAQs",
        width: 1200,
        height: 4927,
      },
    ],
  },
  {
    slug: "heron-cycling",
    brand: "Heron Cycling",
    category: "Activewear",
    services: ["Website Redesign", "CRO"],
    summary:
      "A 90-day partnership building a conversion-focused Shopify store for a performance cycling brand, designed to match its bold identity while cutting abandonment.",
    metrics: [
      { value: "+42%", label: "Revenue growth" },
      { value: "-26%", label: "Abandonment rate" },
      { value: "90 days", label: "Partnership length" },
    ],
    logoInitial: "H",
    heroImage: {
      src: "/case-studies/heron-cycling/hero.png",
      alt: "The Heron Cycling homepage hero, showing two cyclists on a mountain road under the headline Find Freedom In Every Ride",
      width: 576,
      height: 301,
    },
    brandDescription:
      "Heron Cycling is a performance wear brand built around freedom, creativity, and self-expression, selling cycling jerseys and hats for men and women through a Shopify store.",
    goal: [
      "Grow revenue and reduce abandonment over a 90-day partnership",
      "Reflect the brand's bold identity in the store design",
      "Deliver a seamless shopping experience for cycling enthusiasts",
    ],
    execution: [
      "Designed a conversion-focused Shopify store around the brand's bold identity",
      "Built the homepage as a hero, a brand story section, a featured product collection, and an email signup",
      "Built dedicated landing page sections for featured jerseys and collections",
    ],
    resultPoints: [
      "+42% revenue growth over the 90-day partnership",
      "-26% abandonment rate",
    ],
    clientReview: {
      quote:
        "The team was great to work with. Despite Squarespace\u2019s limitations, they did an amazing job with personalizing our site. Communication was easy and our time difference didn\u2019t have any negative impacts on us. Looking forward to working with them again for another project!",
      name: "Hana Lee",
    },
    gallery: [
      {
        src: "/case-studies/heron-cycling/homepage.png",
        alt: "The Heron Cycling homepage, with a hero, a who we are section, and the Heartbeat Collection jersey grid",
        width: 576,
        height: 894,
      },
      {
        src: "/case-studies/heron-cycling/portfolio-collage.png",
        alt: "A collage of the Heron Cycling store, including the homepage, the Monochrome Jersey banner, the Heartbeat Collection, and the community signup and footer",
        width: 1080,
        height: 1920,
      },
    ],
  },
  {
    slug: "elissa-and-stef",
    brand: "Elissa & Stef",
    category: "Activewear",
    services: ["Website Redesign", "CRO"],
    summary:
      "A Shopify revamp for a fashion and activewear brand whose site lacked branding and a consistent layout, rebuilt to look like one brand and optimized for conversion.",
    metrics: [],
    logoInitial: "E",
    brandDescription:
      "Elissa & Stef is a fashion and activewear brand selling collections like Agile, Rooftop Couture, Brave, and Momentum through a Shopify store with worldwide shipping.",
    challengePoints: [
      "The former website lacked branding",
      "The layout and design were inconsistent across the site",
    ],
    goal: [
      "Give the website a better look and feel",
      "Optimize the site for conversion rate",
    ],
    execution: [
      "Evaluated the state of the existing website and identified the areas that needed to be fixed",
      "Built a Notion breakdown for the brand owner covering everything that needed to change",
      "Fixed those areas to give the store a consistent, branded design",
    ],
    gallery: [
      {
        src: "/case-studies/elissa-stef/portfolio-collage.png",
        alt: "The Elissa & Stef store on desktop and mobile, with a Play Bravely This Season hero, collection tiles for Agile, Rooftop Couture, Brave, and Momentum, and a Rooftop Couture feature",
        width: 1080,
        height: 1920,
      },
    ],
  },
  {
    slug: "lipo-beauty-tea",
    brand: "Lipo Beauty Tea",
    category: "Supplements",
    services: ["Email Marketing", "CRO"],
    summary:
      "Targeted Klaviyo campaigns and a refined checkout for a premium wellness tea brand, producing $26K from a single email campaign and open rates up to 43.61%.",
    metrics: [
      { value: "$26K", label: "From a single email campaign" },
      { value: "+33.4%", label: "Conversion rate increase" },
      { value: "-21.7%", label: "Reduced cart abandonment" },
    ],
    logoInitial: "L",
    logo: { src: "/case-studies/lipo-beauty-tea/logo.png", width: 500, height: 157 },
    heroImage: {
      src: "/case-studies/lipo-beauty-tea/hero.jpg",
      alt: "The Lipo Beauty Tea homepage hero, with a video thumbnail of the founder and the headline Feel powerful, feel beautiful: Discover the power of Lipo Beauty Tea",
      width: 1200,
      height: 623,
    },
    brandDescription:
      "Lipo Beauty Tea is a premium wellness brand selling a herbal detox tea through a Shopify store, with email campaigns written in Dutch for its Belgian audience.",
    challengePoints: ["High cart abandonment", "Low conversion rates"],
    goal: [
      "Reduce cart abandonment and lift conversion rate",
      "Turn seasonal sales into high-revenue email campaigns",
    ],
    execution: [
      "Optimized the Shopify store and refined the checkout flow",
      "Revamped email marketing with targeted Klaviyo campaigns and personalized messaging",
      "Ran a Black Friday campaign built around a 40% discount code, with a customer review and benefit icons",
      "Ran a Cyber Monday buy-one-get-one-free campaign with a 24-hour countdown timer",
    ],
    resultPoints: [
      "$26K in revenue from a single email campaign",
      "+33.4% conversion rate",
      "-21.7% cart abandonment",
      "+42% ROI",
      "Open rates up to 43.61%",
    ],
    resultsImages: [
      {
        src: "/case-studies/lipo-beauty-tea/results-metrics.jpg",
        alt: "Lipo Beauty Tea results: 33.4% conversion rate increase, 21.7% reduced cart abandonment, and a Klaviyo table of three campaigns with open rates of 37.32%, 41.67% and 43.61% and revenue of $6,127.50, $25,463.95 and $26,579.01",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/lipo-beauty-tea/email-mockups.jpg",
        alt: "A collage of phone mockups showing the Lipo Beauty Tea Black Friday and Cyber Monday emails",
        width: 1640,
        height: 924,
      },
    ],
    gallery: [
      {
        src: "/case-studies/lipo-beauty-tea/email-last-chance.png",
        alt: "Lipo Beauty Tea last-chance email: Onze Lipo detox-thee vliegt de deur uit, with a 40% discount code button and three benefit icons",
        width: 600,
        height: 1814,
      },
      {
        src: "/case-studies/lipo-beauty-tea/email-black-friday.png",
        alt: "Lipo Beauty Tea Black Friday email with a 40% discount, a customer review from Sandra Kox, and icons for weight loss support, energy, and reduced bloating",
        width: 600,
        height: 2218,
      },
      {
        src: "/case-studies/lipo-beauty-tea/email-cyber-monday.png",
        alt: "Lipo Beauty Tea Cyber Monday email: buy one get one free, with a 24-hour countdown timer and product photo",
        width: 599,
        height: 1970,
      },
    ],
  },
  {
    slug: "feno",
    brand: "Feno",
    category: "Oral Care",
    services: ["Email Marketing", "Email Template Design"],
    summary:
      "Klaviyo email flows and template design for an AI-driven oral health brand, reaching a 59.5% open rate and a 22.5% lift in click-through rate.",
    metrics: [
      { value: "59.5%", label: "Open rate" },
      { value: "+22.5%", label: "CTR lift" },
      { value: "+18.3%", label: "Revenue per email" },
    ],
    logoInitial: "F",
    heroImage: {
      src: "/case-studies/feno/hero.jpg",
      alt: "The Feno homepage hero, showing the Smartbrush with the headline 20-Second Brush. Stroke Defense",
      width: 1200,
      height: 675,
    },
    brandDescription:
      "Feno is an AI-driven oral health brand behind the Feno Smartbrush, a 20-second brush with a companion app that tracks brushing habits and gives users an oral health report.",
    challengePoints: ["Low engagement", "High drop-off rates"],
    goal: [
      "Lift engagement and retention with better email and site experience",
      "Help new customers set up and get more from their Smartbrush",
    ],
    execution: [
      "Optimized the website flow and streamlined checkout",
      "Refined email sequences and designed Klaviyo email templates",
      "Designed a setup email that walks new customers through getting their brush running in 5 minutes, with app store download buttons",
      "Designed a follow-up email with tips for getting more from the brush and the Feno app, including a pro tip and a call to action to see it in the app",
    ],
    resultPoints: [
      "59.5% open rate and 3.86% click rate across 180,615 recipients over 30 days",
      "22.5% lift in click-through rate",
      "18.3% increase in revenue per email",
      "0.59% bounce rate, 0.29% unsubscribe rate, and 0.01% spam complaint rate",
    ],
    resultsImages: [
      {
        src: "/case-studies/feno/results-metrics.jpg",
        alt: "Feno results summary: 59.5% open rate, 18.3% increase in revenue per email, 22.5% CTR boost, and Klaviyo key metrics for the past 30 days",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/feno/email-mockups.jpg",
        alt: "A collage of phone mockups showing Feno emails, including the Smartbrush setup steps and the Mastering Your Brushing Experience tips",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/feno/key-metrics.jpg",
        alt: "Klaviyo key metrics for Feno over 30 days: 59.5% open rate, 3.86% click rate, 0.59% bounce rate, 0.29% unsubscribe rate, 0.01% spam complaint rate, 180,615 total recipients",
        width: 1640,
        height: 924,
      },
    ],
    gallery: [
      {
        src: "/case-studies/feno/email-setup.png",
        alt: "Feno setup email: Get ready for the smartest brush of your life, with five steps to set up the Smartbrush in 5 minutes",
        width: 280,
        height: 2578,
      },
      {
        src: "/case-studies/feno/email-mastering.png",
        alt: "Feno email: Mastering your brushing experience, with a tip on adjusting brushing speed in the Feno app and a pro tip",
        width: 280,
        height: 1787,
      },
      {
        src: "/case-studies/feno/email-mastering-alt.png",
        alt: "An alternate version of the Feno Mastering Your Brushing Experience email with a product photo header",
        width: 280,
        height: 1704,
      },
    ],
  },
  {
    slug: "streaky-academy",
    brand: "Streaky Academy",
    category: "Online Courses",
    services: ["Email Marketing", "CRO"],
    summary:
      "Targeted Klaviyo campaigns and a streamlined enrollment funnel for an online course platform, helping drive $242K in total revenue with $75K attributed to email.",
    metrics: [
      { value: "$242K", label: "Total revenue" },
      { value: "$75K", label: "Attributed to email (31%)" },
      { value: "+52.6%", label: "Enrollment growth" },
    ],
    logoInitial: "S",
    heroImage: {
      src: "/case-studies/streaky-academy/hero.jpg",
      alt: "The Streaky Academy welcome email header, with the headline Welcome To Streaky Academy and a WELCOME10 code for 10% off a first order",
      width: 600,
      height: 400,
    },
    brandDescription:
      "Streaky Academy is an online course platform selling mixing and mastering courses, Logic Pro and Ableton Live bootcamps, and plugin presets to music creators.",
    challengePoints: ["Low enrollments", "High bounce rates"],
    goal: [
      "Grow enrollments and reduce bounce rate",
      "Build an email program that contributes a meaningful share of revenue",
    ],
    execution: [
      "Streamlined the enrollment funnel and enhanced the site's user experience",
      "Launched targeted Klaviyo email campaigns",
      "Designed a welcome email with a 10% first-order code and the most popular courses",
      "Designed a social proof email built on the 4.91 out of 5 rating from 5,000+ students, with customer reviews",
      "Designed a comparison email setting Streaky Academy against competitors, with course recommendations and the welcome code",
    ],
    resultPoints: [
      "$242K total revenue, up 29% on the previous period",
      "$75K attributed revenue, 31% of the total and up 18% on the previous period",
      "$44,952 of attributed revenue from flows and $30,213 from campaigns",
      "+52.6% enrollments",
      "-24.1% bounce rate",
      "+34% course completions",
    ],
    resultsImages: [
      {
        src: "/case-studies/streaky-academy/results-metrics.jpg",
        alt: "Streaky Academy results: 52.6% enrollment growth, 24.1% bounce rate reduction, 34% boost in course completions, and a Klaviyo business performance summary showing $242,115.35 total revenue and $75,164.69 attributed revenue",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/streaky-academy/email-mockups.jpg",
        alt: "A collage of phone mockups showing Streaky Academy emails, including the welcome, social proof, and course recommendation designs",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/streaky-academy/revenue-summary.jpg",
        alt: "Klaviyo business performance summary for Apr 27 to May 27, 2024: $242,115.35 total revenue up 29%, and $75,164.69 attributed revenue, 31.04% of total, up 18%, split across campaigns, flows, email and SMS",
        width: 1640,
        height: 924,
      },
    ],
    gallery: [
      {
        src: "/case-studies/streaky-academy/email-welcome.png",
        alt: "Streaky Academy welcome email: Take 10% off your first order with code WELCOME10, followed by the most popular courses",
        width: 639,
        height: 3327,
      },
      {
        src: "/case-studies/streaky-academy/email-social-proof.png",
        alt: "Streaky Academy email: Creators love Streaky Academy, with a 4.91 out of 5 rating from 5,000+ students and customer reviews",
        width: 600,
        height: 2844,
      },
      {
        src: "/case-studies/streaky-academy/email-comparison.png",
        alt: "Streaky Academy email: Why are we your best choice, comparing Streaky Academy to competitors, with four course recommendations",
        width: 600,
        height: 2996,
      },
    ],
  },
  {
    slug: "cannonbalm",
    brand: "CannonBalm",
    category: "Wellness",
    services: ["Email Marketing", "Popups"],
    summary:
      "A rebuilt Klaviyo strategy for an Australian natural pain relief brand: targeted popups, optimized post-purchase flows, and win-back campaigns that helped drive $96.7K in total revenue, with $32.8K attributed to email.",
    metrics: [
      { value: "$96.7K", label: "Total revenue" },
      { value: "$32.8K", label: "Attributed to email" },
      { value: "3.7K", label: "Leads from popups" },
    ],
    logoInitial: "C",
    logo: { src: "/case-studies/cannonbalm/logo.webp", width: 235, height: 42 },
    heroImage: {
      src: "/case-studies/cannonbalm/hero.jpg",
      alt: "The CannonBalm homepage hero, showing the Ultimate, Let-Go, Magic Touch and Muscle-Aid balms under the headline Rapid Pain Relief Naturally",
      width: 1200,
      height: 667,
    },
    brandDescription:
      "CannonBalm is an Australian natural pain relief brand whose superfruit-based balms and massage oils target joint and muscle pain.",
    challengePoints: [
      "Low email engagement",
      "Low customer retention",
      "A dormant email list",
    ],
    goal: [
      "Boost email engagement and customer retention",
      "Grow the email list and re-activate dormant subscribers",
    ],
    execution: [
      "Implemented targeted popups to grow the email list",
      "Optimized post-purchase email flows",
      "Introduced win-back campaigns for the dormant list",
      "Designed a launch email for the limited-batch Ultimate 120ml balm, sent exclusively to existing customers",
      "Designed a tiered discount email offering 10% off and 20% off with free shipping",
      "Designed a social proof email built on verified customer reviews",
    ],
    resultPoints: [
      "$96.7K total revenue, up 39% on the previous period",
      "$32.8K attributed to email, 34% of total revenue and up 77% on the previous period",
      "$20.5K of attributed revenue from flows and $12.3K from campaigns",
      "3.7K leads generated through popups",
      "47% lift in email engagement",
      "38% conversion increase",
    ],
    resultsImages: [
      {
        src: "/case-studies/cannonbalm/results-metrics.jpg",
        alt: "CannonBalm results: 47% increase in engagement, 3.7K generated from popups, 38% customer retention boost, and a Klaviyo business performance summary showing $96,717 total revenue and $32,847 attributed revenue",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/cannonbalm/email-mockups.jpg",
        alt: "A collage of phone mockups showing CannonBalm emails, including Start The Year Strong, Superfruits For Superheroes, and customer reviews",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/cannonbalm/revenue-summary.jpg",
        alt: "Klaviyo business performance summary for Apr 27 to May 27, 2024: $96,717 total revenue up 39%, and $32,847 attributed revenue, 33.96% of total, up 77%, split across campaigns and flows",
        width: 1640,
        height: 924,
      },
    ],
    clientReview: {
      quote:
        "The team did a great job. I found their communication was excellent and any problems that were encountered was dealt with in a pleasant and ethical way that was good for both parties. I had an excellent experience and was pleased with the results and I will be using them for future projects and recommend this team if you are looking for a hard working honest and reliable team to hire on upwork",
      name: "Rohan",
    },
    gallery: [
      {
        src: "/case-studies/cannonbalm/email-ultimate.jpg",
        alt: "CannonBalm email: The Ultimate 120ml is here, an exclusive limited-time release for existing customers",
        width: 1200,
        height: 5342,
      },
      {
        src: "/case-studies/cannonbalm/email-spend-more.jpg",
        alt: "CannonBalm email: Spend more to save more, with 10% off orders under $100 and 20% off orders over $200 with free shipping",
        width: 1200,
        height: 2950,
      },
      {
        src: "/case-studies/cannonbalm/email-start-the-year.jpg",
        alt: "CannonBalm email: Start the year strong with pain-free living, with verified customer reviews",
        width: 600,
        height: 2901,
      },
    ],
  },
  {
    slug: "bwll",
    brand: "BWLL",
    category: "Wellness",
    services: ["Email Marketing"],
    summary:
      "A Klaviyo revamp built around real customer stories and exclusive offers for an Australian nasal strip brand, generating $187K in total revenue with $75K attributed to email.",
    metrics: [
      { value: "$187K", label: "Total revenue" },
      { value: "$75K", label: "Attributed to email" },
      { value: "+54.2%", label: "Repeat purchases" },
    ],
    logoInitial: "B",
    heroImage: {
      src: "/case-studies/bwll/hero.jpg",
      alt: "The BWLL homepage hero, showing a woman holding a BWLL nasal strip pouch beside the headline Breathe Well. Sleep Well. Live Well.",
      width: 1200,
      height: 589,
    },
    brandDescription:
      "BWLL is an Australian nasal strip brand, also selling mouth tape and sleep masks, built around breathing better, sleeping deeper, and living well.",
    challengePoints: ["Struggled to convert visitors into repeat customers"],
    goal: [
      "Turn first-time visitors into repeat customers",
      "Lift email engagement and conversions",
    ],
    execution: [
      "Revamped BWLL's email campaigns to spotlight real customer stories and exclusive offers",
      "Designed a welcome email introducing the brand with a first-order discount code",
      "Designed a discount reminder email with a struggle-versus-relief comparison and a buy one get one free offer",
      "Designed a customer stories email with real reviews and a comparison of BWLL against other strips",
    ],
    resultPoints: [
      "$187K total revenue, up 202% on the previous period",
      "$75K attributed to email, 40% of total revenue and up 783% on the previous period",
      "$68.5K of attributed revenue from flows and $6.9K from campaigns",
      "+28% click-through rate",
      "+54.2% repeat purchases",
      "+35.7% conversion rate",
    ],
    resultsImages: [
      {
        src: "/case-studies/bwll/results-metrics.jpg",
        alt: "BWLL results: 28% boost in CTR, 35.7% conversion rate increase, 54.2% boost in repeat purchases, and a Klaviyo business performance summary showing $187,156.95 total revenue and $75,377.60 attributed revenue",
        width: 1640,
        height: 924,
      },
      {
        src: "/case-studies/bwll/revenue-summary.jpg",
        alt: "Klaviyo business performance summary for Jan 1 to May 31, 2024: $187,156.95 total revenue up 202%, and $75,377.60 attributed revenue, 40.28% of total, up 783%, split across campaigns and flows",
        width: 1640,
        height: 924,
      },
    ],
    gallery: [
      {
        src: "/case-studies/bwll/email-real-stories.jpg",
        alt: "BWLL email: Real stories, real results, with customer reviews and a comparison of BWLL against other nasal strips",
        width: 600,
        height: 4821,
      },
      {
        src: "/case-studies/bwll/email-difference.jpg",
        alt: "BWLL email: The difference BWLL tape makes, with a discount reminder and a struggle versus relief comparison",
        width: 600,
        height: 4266,
      },
      {
        src: "/case-studies/bwll/email-welcome.jpg",
        alt: "BWLL welcome email: Breathe better with us, with a first-order discount code and product benefits",
        width: 600,
        height: 4235,
      },
    ],
  },
  {
    slug: "thyvita",
    brand: "ThyVita",
    category: "Supplements",
    services: ["Website Design", "Store Migration", "CRO"],
    summary:
      "Website design and seamless store migrations for a thyroid support supplement brand, moving from Squarespace to Shopify to Wix while keeping the site high converting.",
    metrics: [],
    logoInitial: "T",
    logo: { src: "/case-studies/thyvita/logo.png", width: 200, height: 200 },
    heroImage: {
      src: "/case-studies/thyvita/hero.jpg",
      alt: "The ThyVita homepage hero, with the Women's Ultra bottle beside the headline Still exhausted and bloated with normal labs?",
      width: 1200,
      height: 417,
    },
    brandDescription:
      "ThyVita is a thyroid support supplement brand whose Women's Ultra is marketed as the first and only patented multi for thyroid support, alongside gummies, a starter kit, and a thyroid-friendly meal plan.",
    challengePoints: [
      "The store had to move platforms more than once",
      "Each migration risked disrupting the shopping experience and hurting conversion",
    ],
    goal: [
      "Migrate the store seamlessly at each step",
      "Keep the site high converting through every platform change",
    ],
    execution: [
      "Designed the site on Squarespace",
      "Supported the store's migration to Shopify, and then to Wix",
      "Made sure each migration was seamless for customers",
      "Took responsibility for keeping the site high converting throughout",
    ],
    clientReview: {
      quote:
        "The team is truly exceptional. Possessing remarkable talent and extensive experience as artists, they demonstrate proficiency across multiple platforms. Their problem-solving skills are commendable, and they work with remarkable efficiency. They respect both time constraints and budgetary limits, making them a highly recommended professional team in their field.",
      name: "Rebecca Gould",
    },
    gallery: [
      {
        src: "/case-studies/thyvita/home.jpg",
        alt: "The ThyVita homepage, with a Women's Ultra hero, the reasons you still don't feel like yourself, the clinical expertise behind ThyVita, how it works, top benefits, and best sellers",
        width: 1200,
        height: 7565,
      },
      {
        src: "/case-studies/thyvita/collection.jpg",
        alt: "The ThyVita All Products page, showing a filterable grid of supplements including the Reset Bundle, Collagen Gummies, and the Starter Kit",
        width: 1200,
        height: 1890,
      },
      {
        src: "/case-studies/thyvita/product.jpg",
        alt: "The ThyVita Thyroid Support Starter Kit product page, with a photo gallery, Afterpay pricing, the clinical expertise section, and FAQs",
        width: 1200,
        height: 6692,
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

export const CALENDLY_URL = "https://calendly.com/david_owoeye/discuss";

export const SITE_URL = "https://www.skynosoft.net";
export const SITE_NAME = "Skynosoft";
