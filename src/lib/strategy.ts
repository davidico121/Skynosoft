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
    /** Real customer reviews from the brand's own site, shown beside the problem. */
    reviews?: { heading: string; items: { quote: string; name: string }[] };
  };
  /** 3-5 outcome-led benefits, each with a short description. */
  benefits: {
    heading: string;
    items: { icon: StrategyIconKey; title: string; detail: string }[];
    /** Real product photos from the brand's site, shown beside the benefits. */
    products?: { name: string; image: StrategyShot }[];
  };
  how: {
    heading: string;
    /** Three steps. */
    steps: { week: string; title: string; description: string }[];
    /** Three metric boxes. */
    impact: { value: string; label: string }[];
  };
  /** Real, finished creative already built for this brand on spec, shown as proof, not a mockup. */
  builtForYou?: {
    heading: string;
    subheading?: string;
    /** An actual email the brand currently sends, shown next to our rebuild of it. */
    comparison?: {
      heading: string;
      before: { label: string; image: StrategyShot };
      after: { label: string; image: StrategyShot };
    };
    emails: { label: string; image: StrategyShot }[];
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
        "Repeat orders from customers",
        "who already believe in you,",
        "not new ones you pay to find",
      ],
      subheading:
        "Debbie's hair stopped falling out. Ling's skin cleared up. Neither heard from you again after that. **Here's the system that fixes it**, live before BFCM.",
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
        text: "When a pouch runs out, nothing happens. No email tells them it's time to reorder. No sequence reminds them why they started. They pause, forget, maybe pick something up at Holland & Barrett, and quietly become someone else's customer. That's not a lapsed customer. **That's a customer you already paid to acquire, gone for the cost of one email you never sent.** And it won't fix itself. Your only signup right now says keep up to date with us. That already proves you know emails matter, there's just nothing automatic waiting on the other side of it.",
      },
      solution: {
        title: "With the system in place",
        points: [
          "Someone curious about collagen for hair health gets **an actual reason to hand over their email**. Not \"keep up to date\"",
          "A first time buyer gets **welcomed properly**, told what to expect, so they don't quietly give up before results even kick in",
          "A collagen customer hears from you **right around day 25 to 30**, exactly when the pouch is running low",
          "Someone quiet for 60+ days gets **a real win back sequence**, not silence until they're gone for good",
        ],
      },
      reviews: {
        heading: "What your customers already say",
        items: [
          {
            quote: "my hair loss has stopped and new growth has started.",
            name: "Debbie Smyth, verified customer",
          },
          {
            quote: "It really help with my skin infection, i will buy more.",
            name: "Ling Wilson, verified customer",
          },
        ],
      },
    },
    benefits: {
      heading: "Four pieces that turn one purchase into a habit",
      products: [
        {
          name: "Collagen",
          image: {
            src: "/pitch-assets/myowellness/product-collagen.jpg",
            alt: "MYOwellness Hydrolysed Bovine Collagen pouch with a bowl of powder",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Protein",
          image: {
            src: "/pitch-assets/myowellness/product-protein.jpg",
            alt: "MYOwellness Whey Blend Protein Shake pouch",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Mushroom",
          image: {
            src: "/pitch-assets/myowellness/product-mushroom.jpg",
            alt: "MYOwellness Superfoods Complete Mushroom Balance pouch with powder",
            width: 900,
            height: 900,
          },
        },
      ],
      items: [
        {
          icon: "welcome",
          title: "Buyers who stay past week one",
          detail:
            "A welcome sequence confirms the purchase and sets expectations for results, **sent while the customer is most engaged**, not a week later.",
        },
        {
          icon: "reorder",
          title: "Reorders before the pouch runs out",
          detail:
            "Timed to typical product usage, a 30 day collagen pouch means **an email lands right before it runs out**, not after.",
        },
        {
          icon: "subscription",
          title: "Subscribers, not customers who buy once",
          detail:
            "A clear incentive turns customers who buy once into subscribers, so **growth stops depending entirely on repeat cold traffic**.",
        },
        {
          icon: "winback",
          title: "Quiet customers brought back",
          detail:
            "An automated win back flow for customers who've gone quiet **recovers revenue you're currently writing off entirely**.",
        },
      ],
    },
    how: {
      heading: "Two steps, two weeks, live before BFCM",
      steps: [
        {
          week: "Week 1",
          title: "Strategy & Build",
          description:
            "Confirm product usage cycles and customer segments with MYOwellness, then design and build the welcome sequence, post purchase nurture, and subscription mechanics in Klaviyo.",
        },
        {
          week: "Week 2",
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
    proofHeading: "A dormant list, then $32.8K from email: the same fix",
    caseStudySlugs: ["bwll", "cannonbalm"],
    reviewFromCaseStudy: "cannonbalm",
    tagline:
      "Do this and you stop paying twice for customers you already won. They compound on their own from here, the way AG1 and Gruns customers do.",
    faqHeading: "Before you book",
    faqs: [
      {
        q: "What do you need from us to start?",
        a: "**Access to your email platform and store**, and a short conversation about how long each product lasts, confirmed in the first couple of days before the build starts.",
      },
      {
        q: "How do you decide when the reorder email goes out?",
        a: "**It's timed to how long the product actually lasts.** For a 30 day collagen pouch that's roughly day 25 to 30, and we confirm the exact timing with you early on.",
      },
      {
        q: "What if a customer has already reordered?",
        a: "**The flows check for a new purchase and stop**, so nobody gets a reorder reminder after they've already bought again.",
      },
      {
        q: "Is the 40 to 50% a guarantee?",
        a: "No. **It's the target this plan is aimed at**, and we check it against your real reorder cycles before the flows go live.",
      },
      {
        q: "Can it be live before BFCM?",
        a: "The plan runs two weeks. Every week you wait is a week closer to BFCM traffic hitting a store with no flows running yet, so starting now is what keeps this comfortably ahead of peak instead of built in the middle of it. Not after BFCM. **Now.**",
      },
      {
        q: "What does it cost?",
        a: "**We cover scope and pricing on the call**, once we know which of the four pieces you want.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
  {
    slug: "naturesbest",
    brand: "Nature's Best",
    hero: {
      eyebrow: "A note for Nature's Best",
      headline: [
        "Every sold out product,",
        "turned into a sale",
        "the second it's back",
      ],
      subheading:
        "Pukka Night Time Tea, HRI Water Balance, HRI Milk Thistle: all three sold out right now. Each one sends the shopper to your Nutrition Advice Team instead of asking for their email. **That's the last you hear from most of them.**",
      cta: "Book a strategy call",
      proof: {
        source: "From a review on your HRI Milk Thistle page",
        quote: "Great quality, with size and shape easy to swallow. A definite re-purchase for me.",
        name: "Anonymous, verified customer",
      },
      visuals: {
        url: "naturesbest.co.uk",
        main: {
          src: "/pitch-assets/naturesbest/site-home.jpg",
          alt: "The Nature's Best homepage, with a supplement bundle hero and site wide Trustpilot rating",
          width: 1200,
          height: 750,
        },
        inset: {
          src: "/pitch-assets/naturesbest/site-oos.jpg",
          alt: "The HRI Milk Thistle product page, marked Sold out, with a notice directing shoppers to contact the Nutrition Advice Team instead of leaving an email",
          width: 1140,
          height: 340,
          caption: "Sold out. No capture.",
        },
      },
    },
    gap: {
      label: "What happens when HRI Milk Thistle sells out",
      steps: [
        {
          day: "Right now",
          title: "Someone wants it",
          detail: "They land on the HRI Milk Thistle page ready to buy.",
          status: "Sold out",
        },
        {
          day: "Same visit",
          title: "They're sent to a human",
          detail: "The page points them to your Nutrition Advice Team instead of asking for an email.",
          status: "No capture offered",
          leak: true,
        },
        {
          day: "After that",
          title: "Nothing",
          detail: "No back in stock alert. If they do sign up through the footer, no welcome email either.",
          status: "Nothing sent",
          leak: true,
        },
      ],
    },
    problemSolution: {
      heading: "Your customers already trust you. Then they hit a dead end.",
      problem: {
        title: "Right now",
        text: "Three of your best sellers are sold out today, Pukka Night Time Tea, HRI Water Balance, HRI Milk Thistle. The only option for someone who wants one is to email your Nutrition Advice Team and ask. Sound familiar? Most people don't bother, they just close the tab. Your only real email capture is a generic footer signup that never mentions the product they actually wanted. **We signed up through it ourselves and got no welcome email at all.** So even the ones who do leave an email hear nothing back.",
      },
      solution: {
        title: "With the system in place",
        points: [
          "Someone who wants HRI Milk Thistle right now gets **a real way to ask to be told the second it's back**, not a dead end",
          "Everyone who signs up, for any reason, gets **an actual welcome message**, not silence",
          "The people who asked get told first, **before it's even back on the shelf for everyone else**",
          "A shopper who leaves without buying anything still gets **one more real reason to come back**, not just a generic newsletter",
        ],
      },
      reviews: {
        heading: "What your customers already say",
        items: [
          {
            quote: "Great quality, with size and shape easy to swallow. A definite re-purchase for me.",
            name: "Anonymous, verified customer",
          },
          {
            quote:
              "I have noticed Natures Best do not sell their own high strength ones any more and these are half the amount of same price.",
            name: "Christine J, verified customer",
          },
        ],
      },
    },
    benefits: {
      heading: "Three pieces that turn a sold out page into a sale",
      products: [
        {
          name: "Pukka Tea",
          image: {
            src: "/pitch-assets/naturesbest/product-pukka-tea.jpg",
            alt: "Pukka Night Time Tea Bags, 20 sachets, currently sold out on the Nature's Best site",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Water Balance",
          image: {
            src: "/pitch-assets/naturesbest/product-water-balance.jpg",
            alt: "HRI Water Balance Tablets, 60 tablets, currently sold out on the Nature's Best site",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Milk Thistle",
          image: {
            src: "/pitch-assets/naturesbest/product-milk-thistle.jpg",
            alt: "HRI Milk Thistle Tablets, 30 tablets, currently sold out on the Nature's Best site",
            width: 900,
            height: 900,
          },
        },
      ],
      items: [
        {
          icon: "welcome",
          title: "Buyers who hear from you immediately",
          detail:
            "A welcome sequence fires **the moment someone signs up**, on the footer form or anywhere else, so silence stops being the default.",
        },
        {
          icon: "reorder",
          title: "Restocks that sell before they're public",
          detail:
            "Everyone who asked to be notified **hears about it before the shelf does**, timed to when the product actually goes live again.",
        },
        {
          icon: "winback",
          title: "Sold out shoppers brought back",
          detail:
            "A flow built around the specific product someone wanted, **not a generic newsletter blast**, brings them back when it matters.",
        },
      ],
    },
    how: {
      heading: "Two steps, two weeks, live before BFCM",
      steps: [
        {
          week: "Week 1",
          title: "Map and build",
          description:
            "Confirm which products run out often, then build back in stock capture, a real welcome sequence, and a win back flow, all in Klaviyo.",
        },
        {
          week: "Week 2",
          title: "Test and launch",
          description:
            "Flows go live, starting with the three products sold out today, well ahead of BFCM traffic.",
        },
      ],
      impact: [
        {
          value: "3",
          label: "Best sellers sold out today, with no way to ask for a restock",
        },
        {
          value: "0 → live",
          label: "Welcome and back in stock flows, today versus what's proposed",
        },
        {
          value: "36.6K",
          label: "Trustpilot reviews already trusting the brand, with nothing keeping them close",
        },
      ],
    },
    proofHeading: "3.7K leads from one popup, on a brand with the same missing piece",
    caseStudySlugs: ["lipo-beauty-tea", "cannonbalm"],
    reviewFromCaseStudy: "cannonbalm",
    tagline: "Do this and a sold out page stops being a dead end. It becomes the start of the next sale.",
    faqHeading: "Before you book",
    faqs: [
      {
        q: "What do you need from us to start?",
        a: "**Access to your email platform and your product catalogue**, plus a quick list of which products actually run out most, confirmed in the first couple of days before the build starts.",
      },
      {
        q: "How do you decide when the notify me email goes out?",
        a: "**The moment a product is marked back in stock**, so the people who asked hear about it before it's even live on the site for everyone else.",
      },
      {
        q: "What if a product never comes back in stock?",
        a: "Then that person moves into a win back flow instead, **so the interest doesn't just disappear**.",
      },
      {
        q: "How fast can this be live?",
        a: "The build runs two weeks. **Every week it isn't live is another shopper who leaves for nothing, especially with BFCM getting closer.**",
      },
      {
        q: "Is this a guarantee you'll recover every lost sale?",
        a: "No. **It's the system that catches the demand you're currently losing**, not a promise every visitor converts.",
      },
      {
        q: "What does it cost?",
        a: "**We cover scope and pricing on the call**, once we know how many pieces of this you want built.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
  {
    slug: "nccsupplements",
    brand: "NCC Supplements",
    hero: {
      eyebrow: "A note for NCC Supplements",
      headline: [
        "Five flavors crossed off,",
        "and nothing catching",
        "the people who wanted them",
      ],
      subheading:
        "Mountain Joe's Protein Cake in Carrot Cake. Trained By JP Sustain in Orange & Mango. Five of eight Gas Mark 10 Cream of Rice flavors, gone at once. Each one just shows a line through the name. **Nobody asks for an email before they leave.**",
      cta: "Book a strategy call",
      visuals: {
        url: "nccsupplements.co.uk",
        main: {
          src: "/pitch-assets/nccsupplements/site-home.jpg",
          alt: "The NCC Supplements homepage, showing a performance nutrition hero and a 190+ brands trust bar",
          width: 1200,
          height: 750,
        },
        inset: {
          src: "/pitch-assets/nccsupplements/site-oos.jpg",
          alt: "The Gas Mark 10 Cream of Rice product page, showing five of eight flavors crossed out including Chocolate Brownie, with no way to ask to be notified",
          width: 740,
          height: 460,
          caption: "5 of 8 flavors gone",
        },
      },
    },
    gap: {
      label: "What happens when a flavor runs out",
      steps: [
        {
          day: "Right now",
          title: "A flavor sells out",
          detail: "Carrot Cake, Orange & Mango, or one of five Cream of Rice flavors, gone.",
          status: "Crossed out",
        },
        {
          day: "Same visit",
          title: "They try to select it anyway",
          detail: "The flavor swatch is just crossed out. Nothing happens when they click it.",
          status: "Not clickable",
          leak: true,
        },
        {
          day: "After that",
          title: "Nothing",
          detail: "No sold out message. No notify me option. Nothing captured, nothing sent.",
          status: "Nothing sent",
          leak: true,
        },
      ],
    },
    problemSolution: {
      heading: "190 brands worth of demand. No system catching any of it.",
      problem: {
        title: "Right now",
        text: "Mountain Joe's Protein Cake in Carrot Cake is gone. So is Trained By JP Sustain in Orange & Mango. Five of eight Gas Mark 10 Cream of Rice flavors are gone at once, including Chocolate Brownie. Every one of them just shows a line through the name. Nothing to click, nothing to ask for, nothing captured. Your footer does have a signup, the NCC edit. We joined it ourselves. **No welcome email ever arrived.** So even the shoppers who do try to stay in touch hear nothing back.",
      },
      solution: {
        title: "With the system in place",
        points: [
          "Someone who wants Carrot Cake or Orange & Mango gets **a real way to ask to be told the moment it's back**, not a crossed out swatch",
          "Everyone who joins the NCC edit, for any reason, gets **an actual welcome message**, not silence",
          "The people who asked get told first, **before that flavor is even back on the site for everyone else**",
          "A shopper who leaves without buying anything still gets **one more real reason to come back**, not just an occasional newsletter",
        ],
      },
    },
    benefits: {
      heading: "Three pieces that turn a crossed out flavor into a sale",
      products: [
        {
          name: "Protein Cake",
          image: {
            src: "/pitch-assets/nccsupplements/product-protein-cake.jpg",
            alt: "Mountain Joe's Protein Cake 10x60g, Carrot Cake flavor currently crossed out on the NCC Supplements site",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Cream of Rice",
          image: {
            src: "/pitch-assets/nccsupplements/product-cream-of-rice.jpg",
            alt: "Gas Mark 10 Cream of Rice 2kg, five of its eight flavors currently crossed out on the NCC Supplements site",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Intra Workout",
          image: {
            src: "/pitch-assets/nccsupplements/product-intra-workout.jpg",
            alt: "Trained By JP Sustain Intra Workout 1800g, Orange & Mango flavor currently crossed out on the NCC Supplements site",
            width: 900,
            height: 900,
          },
        },
      ],
      items: [
        {
          icon: "welcome",
          title: "Buyers who hear from you immediately",
          detail:
            "A welcome sequence fires **the moment someone joins the NCC edit**, so silence stops being the default.",
        },
        {
          icon: "reorder",
          title: "Restocks that sell before they're public",
          detail:
            "Everyone who asked to be notified **hears about it before the flavor is back on the shelf**, timed to when it's actually available again.",
        },
        {
          icon: "winback",
          title: "Shoppers who leave empty handed, brought back",
          detail:
            "A flow built around the exact flavor someone wanted, **not a generic occasional email**, brings them back when it matters.",
        },
      ],
    },
    how: {
      heading: "Two steps, two weeks, live before BFCM",
      steps: [
        {
          week: "Week 1",
          title: "Map and build",
          description:
            "Confirm which flavors and brands run out most often, then build back in stock capture, a real welcome sequence, and a win back flow, all in Klaviyo.",
        },
        {
          week: "Week 2",
          title: "Test and launch",
          description:
            "Flows go live, starting with the flavors crossed out today, well ahead of BFCM traffic.",
        },
      ],
      impact: [
        {
          value: "5",
          label: "Flavors crossed out on one product page alone, with no way to ask for a restock",
        },
        {
          value: "0 → live",
          label: "Welcome and back in stock flows, today versus what's proposed",
        },
        {
          value: "190+",
          label: "Brands on one site, all sharing the same missing system",
        },
      ],
    },
    proofHeading: "$26K from a single email campaign: the same fix, applied here",
    caseStudySlugs: ["lipo-beauty-tea", "cannonbalm"],
    reviewFromCaseStudy: "cannonbalm",
    tagline:
      "Do this and every flavor that runs out becomes the start of the next sale, not a dead end. That is how a catalog like yours starts compounding the way AG1 and Gruns customers already do.",
    faqHeading: "Before you book",
    faqs: [
      {
        q: "What do you need from us to start?",
        a: "**Access to your email platform and your product catalogue**, plus a quick list of which flavors and products run out most, confirmed in the first couple of days before the build starts.",
      },
      {
        q: "How do you decide when the notify me email goes out?",
        a: "**The moment a flavor is marked back in stock**, so the people who asked hear about it before it's even live on the site for everyone else.",
      },
      {
        q: "What if a flavor never comes back?",
        a: "Then that person moves into a win back flow instead, **so the interest doesn't just disappear**.",
      },
      {
        q: "How fast can this be live?",
        a: "The build runs two weeks. **Every week it isn't live is another shopper who leaves for nothing, especially with BFCM getting closer.**",
      },
      {
        q: "Is this a guarantee you'll recover every lost sale?",
        a: "No. **It's the system that catches the demand you're currently losing**, not a promise every visitor converts.",
      },
      {
        q: "What does it cost?",
        a: "**We cover scope and pricing on the call**, once we know how many pieces of this you want built.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
  {
    slug: "alimentnutrition",
    brand: "Aliment Nutrition",
    hero: {
      eyebrow: "A note for Aliment Nutrition",
      headline: [
        "A welcome email that works,",
        "sitting behind a signup",
        "almost nobody sees",
      ],
      subheading:
        "We signed up through your footer form. What came back was a real welcome email with a working ALIMENT10 code. **Your footer never mentions a discount at all.**",
      cta: "Book a strategy call",
      visuals: {
        url: "alimentnutrition.co.uk",
        main: {
          src: "/pitch-assets/alimentnutrition/site-home.jpg",
          alt: "The Aliment Nutrition homepage, showing a 3 for 2 mix and match promotion and the supplement range",
          width: 1200,
          height: 750,
        },
        inset: {
          src: "/pitch-assets/alimentnutrition/site-footer-signup.jpg",
          alt: "The Aliment Nutrition footer newsletter signup, reading Sign up for our newsletter, be the first to hear about special offers and discounts, with no specific offer mentioned",
          width: 1440,
          height: 420,
          caption: "No discount shown here",
        },
      },
    },
    gap: {
      label: "What happens when someone lands on ProVen BioForm today",
      steps: [
        {
          day: "Right now",
          title: "They're ready to buy on mobile",
          detail: "No sticky add to cart bar, so the button scrolls away the moment they read anything.",
          status: "No sticky bar",
          leak: true,
        },
        {
          day: "Same visit",
          title: "The only signup is at the very bottom",
          detail: "A plain newsletter form. No mention of the discount code that actually exists.",
          status: "No offer shown",
          leak: true,
        },
        {
          day: "After that",
          title: "A popup sits dormant in the code",
          detail: "Built, installed, and never shown to a single fresh visitor.",
          status: "Not firing",
          leak: true,
        },
      ],
    },
    problemSolution: {
      heading: "The flow already works. Almost nobody reaches it.",
      problem: {
        title: "Right now",
        text: "Someone shopping on mobile for ProVen BioForm, the Neuro Plus Bundle, or Alkalising Salts scrolls past the add to cart button with nothing pinned to bring it back. Three of your five core product pages show no cross-sell at all, so a customer who came for one thing is never shown a second. And the one real incentive you have, an actual working discount code, only reaches someone who scrolls all the way to the footer and signs up for a newsletter that promises nothing specific. **We found a popup already built into your site that has never once shown itself to a real visitor.** The infrastructure exists. It just isn't switched on where it would matter.",
      },
      solution: {
        title: "With the system in place",
        points: [
          "A mobile shopper gets **the add to cart button pinned in view**, all the way through the page, not just at the top",
          "Someone on Alkalising Salts or the Neuro Plus Bundle gets **a real cross-sell shown**, not a page that just ends",
          "The discount you already send by email gets **offered up front**, not buried behind a vague footer form",
          "That existing popup gets **turned on and actually shown**, so the welcome flow that already works finally has something to welcome",
        ],
      },
    },
    benefits: {
      heading: "Three pieces that put your own welcome flow to work",
      products: [
        {
          name: "BioForm",
          image: {
            src: "/pitch-assets/alimentnutrition/product-bioform.jpg",
            alt: "ProVen BioForm 30 capsules, one of the five core products with no mobile sticky add to cart",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Neuro Plus",
          image: {
            src: "/pitch-assets/alimentnutrition/product-neuro-plus.jpg",
            alt: "The Neuro Plus Bundle for cognitive support, a product page with no cross-sell shown",
            width: 900,
            height: 900,
          },
        },
        {
          name: "Alkalising Salts",
          image: {
            src: "/pitch-assets/alimentnutrition/product-alkalising-salts.jpg",
            alt: "Aliment Alkalising Salts electrolytes, a product page with no cross-sell shown",
            width: 900,
            height: 900,
          },
        },
      ],
      items: [
        {
          icon: "welcome",
          title: "A popup that actually greets people",
          detail:
            "The discount you already email out gets offered **the moment someone lands**, not hidden behind a scroll to the footer.",
        },
        {
          icon: "reorder",
          title: "A cart button that stays in reach",
          detail:
            "A sticky mobile bar keeps add to cart pinned **through the entire page**, on every core product.",
        },
        {
          icon: "winback",
          title: "A second sale on every product page",
          detail:
            "Real cross-sell recommendations on the pages that don't have any, **not just the two that already do**.",
        },
      ],
    },
    builtForYou: {
      heading: "Three emails, already designed and ready to send",
      subheading:
        "We didn't wait for a yes. **Here's a welcome email and two Black Friday campaigns, built for Aliment Nutrition specifically**, ready to plug into your flow.",
      comparison: {
        heading: "The welcome email you send today, next to the one we built",
        before: {
          label: "What goes out today",
          image: {
            src: "/pitch-assets/alimentnutrition/email-original-welcome.jpg",
            alt: "The current Aliment Nutrition welcome email: a plain white header, one line of text, an Apply Discount button, and a flat four-product grid",
            width: 1200,
            height: 2644,
          },
        },
        after: {
          label: "What we'd send instead",
          image: {
            src: "/pitch-assets/alimentnutrition/email-welcome-design.jpg",
            alt: "A designed welcome email for Aliment Nutrition offering 10% off, featuring the Four Essentials pack and a product range",
            width: 1200,
            height: 9116,
          },
        },
      },
      emails: [
        {
          label: "Black Friday",
          image: {
            src: "/pitch-assets/alimentnutrition/email-bfcm-design.jpg",
            alt: "A designed Black Friday email for Aliment Nutrition titled Black Friday Reimagined, offering 30% off with bundle, best-seller and brand footer sections",
            width: 1200,
            height: 7822,
          },
        },
        {
          label: "Early Access",
          image: {
            src: "/pitch-assets/alimentnutrition/email-bfcm-early-design.jpg",
            alt: "A designed early access Black Friday email for Aliment Nutrition titled Shop Before the Rush, offering 30% off ahead of the main sale",
            width: 1200,
            height: 8960,
          },
        },
      ],
    },
    how: {
      heading: "Two steps, two weeks, live before BFCM",
      steps: [
        {
          week: "Week 1",
          title: "Map and build",
          description:
            "Confirm the discount logic already behind ALIMENT10, then build the popup, the sticky add to cart bar, and cross-sell for the pages missing it.",
        },
        {
          week: "Week 2",
          title: "Test and launch",
          description:
            "Everything goes live together, well ahead of BFCM traffic.",
        },
      ],
      impact: [
        {
          value: "0 → live",
          label: "A working popup, today versus what's proposed",
        },
        {
          value: "3 of 5",
          label: "Core product pages with no cross-sell shown at all",
        },
        {
          value: "5",
          label: "Core products with no mobile sticky add to cart",
        },
      ],
    },
    proofHeading: "3.7K leads from one popup: the same fix, on the same kind of gap",
    caseStudySlugs: ["lipo-beauty-tea", "cannonbalm"],
    reviewFromCaseStudy: "cannonbalm",
    tagline:
      "Do this and the welcome email you already built finally has a real front door. The flow was never the problem, the doorway was.",
    faqHeading: "Before you book",
    faqs: [
      {
        q: "What do you need from us to start?",
        a: "**Access to your Shopify theme and your email platform**, plus the discount logic already behind ALIMENT10, confirmed in the first couple of days before the build starts.",
      },
      {
        q: "Why not just turn the existing popup back on?",
        a: "We can look at it first. If it's solid, **we switch it on and improve the offer**, we don't rebuild what already works.",
      },
      {
        q: "Will the sticky cart bar work across all our products, not just the five?",
        a: "Yes. **We build it once, into the theme**, so it applies everywhere, not just the pages we audited.",
      },
      {
        q: "How fast can this be live?",
        a: "The build runs two weeks. **Every week it isn't live is another shopper who leaves for nothing, especially with BFCM getting closer.**",
      },
      {
        q: "Is this a guarantee you'll recover every lost sale?",
        a: "No. **It's the system that catches the demand you're currently losing**, not a promise every visitor converts.",
      },
      {
        q: "What does it cost?",
        a: "**We cover scope and pricing on the call**, once we know how many pieces of this you want built.",
      },
    ],
    risk: {
      heading: "See the plan before you spend anything",
      text: "This isn't a sales call. Bring your questions, not your card.",
    },
  },
];
