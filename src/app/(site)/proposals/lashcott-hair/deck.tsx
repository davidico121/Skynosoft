"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TouchEvent,
} from "react";
import Image from "next/image";
import {
  ArrowsIn,
  ArrowsOut,
  CaretLeft,
  CaretRight,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import s from "./deck.module.css";

const IMG = "/proposals/lashcott-hair/img";
type Tone = "paper" | "blush" | "dark";

/** A block that rises in after the slide arrives; `i` sets its place in the stagger. */
function R({
  i = 0,
  as: Tag = "div",
  className = "",
  children,
}: {
  i?: number;
  as?: "div" | "p" | "h1" | "h2" | "ul" | "blockquote";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`${s.r} ${className}`} style={{ "--i": i } as CSSProperties}>
      {children}
    </Tag>
  );
}

function Head({ eyebrow, children, h1 = false }: { eyebrow: string; children: ReactNode; h1?: boolean }) {
  return (
    <>
      <R as="p" i={0} className={s.eyebrow}>
        {eyebrow}
      </R>
      <R as="h2" i={1} className={h1 ? s.h1 : s.h2}>
        {children}
      </R>
    </>
  );
}

function Card({ title, children, className = "" }: { title?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`${s.card} ${className}`}>
      {title && <h3 className={s.h3}>{title}</h3>}
      {children}
    </div>
  );
}

type SlideDef = { title: string; tone: Tone; center?: boolean; body: ReactNode };

const slides: SlideDef[] = [
  {
    title: "Turn Black Friday into customers who come back",
    tone: "dark",
    center: true,
    body: (
      <>
        <R i={0}>
          <Image src={`${IMG}/skynosoft-logo.png`} alt="Skynosoft" width={180} height={47} />
        </R>
        <R as="p" i={1} className={s.eyebrow}>
          Black Friday proposal · November 2026
        </R>
        <R as="h1" i={2} className={s.h1}>
          Turn Black Friday into <i>customers who come back</i>.
        </R>
        <R as="p" i={3} className={s.lead}>
          In 9 days, we build the emails that capture your Black Friday visitors and turn them into buyers. Then we
          keep them buying through Christmas and beyond.
        </R>
        <R i={4} className={s.byline}>
          <p>
            <span>Prepared for</span>Starr, Lashcott Hair
          </p>
          <p>
            <span>Prepared by</span>David Owoeye, Skynosoft
          </p>
        </R>
      </>
    ),
  },
  {
    title: "A beautiful store, ready for more",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="Where you are today">
          A beautiful store, <i>ready for more</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g2}`}>
          <Card title="What is already working">
            <ul className={s.list}>
              <li>A live store with bundles, wigs, frontals and closures</li>
              <li>A calm, premium voice that customers can trust</li>
              <li>Three demo emails we built from your website alone</li>
            </ul>
          </Card>
          <Card title="Where the opportunity is">
            <ul className={s.list}>
              <li>Black Friday brings your biggest wave of new visitors</li>
              <li>Email turns one-time visitors into repeat buyers</li>
              <li>Your products suit bundles, gifts and repeat orders</li>
            </ul>
          </Card>
        </R>
        <R as="p" i={3} className={s.lead}>
          Your answers turn a good plan into your plan. The six quick questions are near the end.
        </R>
      </>
    ),
  },
  {
    title: "Last Black Friday, loyalty beat discounts",
    tone: "dark",
    body: (
      <>
        <Head eyebrow="Why Black Friday, and why now">
          Last Black Friday, <i>loyalty beat discounts</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          <Card>
            <p className={s.stat}>42%</p>
            <p className={s.p}>
              of revenue across Klaviyo customers came from email and text over the Black Friday to Cyber Monday
              stretch.
            </p>
          </Card>
          <Card>
            <p className={s.stat}>+14%</p>
            <p className={s.p}>growth for brands with the smallest discounts, the best of any group.</p>
          </Card>
          <Card>
            <p className={s.stat}>+11%</p>
            <p className={s.p}>rise in consumer spending, even as discounts fell 10%.</p>
          </Card>
        </R>
        <R as="p" i={3} className={s.lead}>
          The lesson for Lashcott: you don&rsquo;t need to slash prices to win. You need to capture visitors and
          follow up well.
        </R>
        <R as="p" i={4} className={s.small}>
          Source: Klaviyo 2025 BFCM Recap Report. Klaviyo customer data from last year, not a forecast for Lashcott.
        </R>
      </>
    ),
  },
  {
    title: "Built from your website alone. Imagine what comes next",
    tone: "paper",
    body: (
      <>
        <R as="p" i={0} className={s.eyebrow}>
          About the demo emails
        </R>
        <div className={s.split}>
          <div className={s.stack}>
            <R as="h2" i={1} className={s.h2}>
              Built from your website alone. <i>Imagine what comes next.</i>
            </R>
            <R i={2} className={s.minis}>
              <div className={s.mini}>
                <h3 className={s.h3}>Your ideal look</h3>
                <p className={s.p}>Colours, fonts and brands you love. Anything you want your emails to feel like.</p>
              </div>
              <div className={s.mini}>
                <h3 className={s.h3}>Your story</h3>
                <p className={s.p}>Why you started, who the hair is for, and what makes it different.</p>
              </div>
              <div className={s.mini}>
                <h3 className={s.h3}>Your photos</h3>
                <p className={s.p}>Your best product shots, customer photos and any video you have.</p>
              </div>
            </R>
          </div>
          <R i={3} className={s.demos}>
            {[
              ["demo-welcome.jpg", "Welcome", "Lashcott welcome email: Silky bundles, made for you"],
              ["demo-seasonal.jpg", "Seasonal", "Lashcott seasonal email: The air changes, so does your hair"],
              ["demo-guide.jpg", "Product guide", "Lashcott product guide email: Find your match"],
            ].map(([f, label, alt]) => (
              <figure key={f}>
                <Image src={`${IMG}/${f}`} alt={alt} width={440} height={1040} sizes="(min-width: 900px) 180px, 30vw" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </R>
        </div>
        <R as="p" i={4} className={s.lead}>
          Add your look, your story and your photos, and every email becomes unmistakably Lashcott.
        </R>
      </>
    ),
  },
  {
    title: "23 emails, 5 flows and a pop-up, live in 9 days",
    tone: "blush",
    body: (
      <>
        <Head eyebrow="Everything you get before Black Friday">
          23 emails, 5 flows and a pop-up, <i>live in 9 days</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g4}`}>
          <Card>
            <p className={s.big}>13</p>
            <h3 className={s.h3}>Campaign emails</h3>
            <p className={s.p}>2 early access, 8 across Black Friday weekend, 3 for Cyber Monday.</p>
          </Card>
          <Card>
            <p className={s.big}>10</p>
            <h3 className={s.h3}>Flow emails</h3>
            <p className={s.p}>Emails that send themselves when someone signs up, browses or leaves a cart.</p>
          </Card>
          <Card>
            <p className={s.big}>1</p>
            <h3 className={s.h3}>Sign-up pop-up</h3>
            <p className={s.p}>Leads with your offer and catches every new visitor.</p>
          </Card>
          <Card>
            <p className={s.big}>100%</p>
            <h3 className={s.h3}>Set up and tested</h3>
            <p className={s.p}>Klaviyo connected, sender verified, every email checked on phone and desktop.</p>
          </Card>
        </R>
        <R i={3} className={`${s.grid} ${s.g2}`}>
          <Card title="Built to win new customers">
            <p className={s.p}>
              Black Friday brings more first-time visitors than any other week. The pop-up captures them and your
              flows turn them into buyers, around the clock, while you focus on orders.
            </p>
          </Card>
          <Card title="Built once, earning all year">
            <p className={s.p}>
              The 10 flow emails sell your Black Friday offer now. In the complete setup, they become your year-round
              flows. An asset, not a one-off campaign.
            </p>
          </Card>
        </R>
      </>
    ),
  },
  {
    title: "Selling for Black Friday now, selling all year after",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="In the complete setup · an asset, not a one-off">
          Selling for Black Friday now, <i>selling all year</i> after.
        </Head>
        <R i={2} className={s.rows}>
          <div className={`${s.row} ${s.row3} ${s.rowHead}`}>
            <p>Flow</p>
            <p>Black Friday version</p>
            <p>December onward</p>
          </div>
          {[
            ["Welcome", "3 emails", "Explains the offer, shows best sellers, last call before it ends.", "Your story, how to choose the right hair, a first-order nudge."],
            ["Browse abandonment", "2 emails", "The piece they looked at, plus the deal.", "Reviews, care tips and similar styles."],
            ["Site abandonment", "1 email", "A reminder that the sale is on.", "Best sellers and what's new."],
            ["Abandoned cart", "3 emails", "Their bag, the offer, then “ends tonight”.", "Reviews, questions answered, a gentle reminder."],
            ["Post-purchase", "1 email", "A thank-you from Starr and a second piece before gifting.", "Care guide and a review request."],
          ].map(([flow, n, now, later]) => (
            <div key={flow} className={`${s.row} ${s.row3}`}>
              <p className={s.rowKey}>
                {flow}
                <span>{n}</span>
              </p>
              <p className={s.p}>
                <span className={s.rowLabel}>Black Friday</span>
                {now}
              </p>
              <p className={s.p}>
                <span className={s.rowLabel}>December onward</span>
                {later}
              </p>
            </div>
          ))}
        </R>
      </>
    ),
  },
  {
    title: "This build usually takes weeks. Yours is live in 9 days",
    tone: "dark",
    body: (
      <>
        <Head eyebrow="Why timing is everything">
          This build usually takes weeks. <i>Yours is live in 9 days.</i>
        </Head>
        <R i={2} className={`${s.grid} ${s.g2}`}>
          <Card>
            <span className={s.tag}>The usual way</span>
            <p className={s.price}>4 to 6 weeks</p>
            <ul className={s.list}>
              <li>Strategy and access in week one</li>
              <li>Copy and design over the next two</li>
              <li>Build, test and revise after that</li>
              <li>Live long after Black Friday traffic has gone</li>
            </ul>
          </Card>
          <Card className={s.cardRose}>
            <span className={s.tag}>Your sprint</span>
            <p className={s.price}>9 days</p>
            <ul className={s.list}>
              <li>The same 23 emails, flows and pop-up</li>
              <li>Built side by side, not one after another</li>
              <li>The earners go live first, the pop-up on day two</li>
              <li>Approvals in hours, so nothing waits</li>
            </ul>
          </Card>
        </R>
        <R as="p" i={3} className={s.lead}>
          Black Friday traffic comes once a year. Every visitor who leaves before your pop-up and flows are live is a
          customer you may never see again.
        </R>
      </>
    ),
  },
  {
    title: "Say yes on Wednesday. Sell on Friday",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="The 9 days">
          Say yes on Wednesday. <i>Sell on Friday.</i>
        </Head>
        <R i={2} className={s.rows}>
          {[
            ["Wed Nov 18", "You say yes and we start the same day. Kickoff, access to your store and Klaviyo, your look, story and photos, and the offer decided."],
            ["Thu 19 to Fri 20", "Klaviyo connected, sender verified, Black Friday pop-up live and growing your list."],
            ["Sat 21 to Mon 23", "Welcome and cart flows live. Both early access emails designed and approved."],
            ["Tue 24 to Wed 25", "Early access goes to your list. Browse, site and post-purchase flows live. Black Friday and Cyber Monday emails designed."],
            ["Thu 26 to Fri 27", "Final checks on every device, all 11 sale emails scheduled. Black Friday goes live on the 27th."],
          ].map(([k, v]) => (
            <div key={k} className={s.row}>
              <p className={s.rowKey}>{k}</p>
              <p className={s.p} style={{ color: "var(--ink)" }}>
                {v}
              </p>
            </div>
          ))}
        </R>
        <R as="p" i={3} className={s.note}>
          From you: a 45-minute kickoff on Wednesday, then about 30 minutes a day to approve emails. We handle
          everything else.
        </R>
      </>
    ),
  },
  {
    title: "Three ways to sell more without a fire sale",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="Your offer · your margins protected">
          Three ways to sell more <i>without a fire sale</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          <Card>
            <span className={s.tag}>Gentlest on margin</span>
            <h3 className={s.h3}>VIP early access</h3>
            <p className={s.p}>
              Your list gets the deal a day or two before everyone else. Exclusivity does the work, not a deep discount.
            </p>
          </Card>
          <Card>
            <span className={s.tag}>Lifts order size</span>
            <h3 className={s.h3}>A gift with bundles</h3>
            <p className={s.p}>
              A free add-on when someone buys a bundle package. It feels like two offers for one price cut.
            </p>
          </Card>
          <Card>
            <span className={s.tag}>Rewards bigger carts</span>
            <h3 className={s.h3}>Spend more, unlock more</h3>
            <p className={s.p}>Higher spend, better reward. Thresholds set from your real prices and margins.</p>
          </Card>
        </R>
        <R as="p" i={3} className={s.lead}>
          Last year, the brands that discounted least grew fastest. We find the lightest offer that still sells, so you
          protect your margin and your brand.
        </R>
      </>
    ),
  },
  {
    title: "Black Friday opens the door. December keeps it open",
    tone: "blush",
    body: (
      <>
        <Head eyebrow="After Black Friday · in the complete setup">
          Black Friday opens the door. <i>December keeps it open.</i>
        </Head>
        <R i={2} className={s.rows}>
          {[
            ["Nov 27 to 29", "Black Friday weekend: 8 sends across three days, from the morning launch to the last call."],
            ["Nov 30", "Cyber Monday: 3 sends, a new angle and a second chance for anyone who missed Friday."],
            ["Dec 1 to 14", "Gifting: gift guides and bundles that make Lashcott the easy gift."],
            ["Dec 15 to 21", "Last order dates, built from your dispatch and delivery times. Dec 19 and 20 is the last full shopping weekend."],
            ["Dec 26 to 31", "New year: a fresh-start offer and a thank-you to everyone who bought."],
          ].map(([k, v]) => (
            <div key={k} className={s.row}>
              <p className={s.rowKey}>{k}</p>
              <p className={s.p} style={{ color: "var(--ink)" }}>
                {v}
              </p>
            </div>
          ))}
        </R>
      </>
    ),
  },
  {
    title: "A list is only worth what you do with it",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="After the sprint">
          A list is only worth what you <i>do with it</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g2}`}>
          <Card title="Monthly, from January">
            <ul className={s.list}>
              <li>A campaign calendar planned a month ahead</li>
              <li>2 to 3 campaigns every week, a mix of designed and plain-text emails</li>
              <li>Flows reviewed and improved from real numbers</li>
              <li>List growth and sender health checks</li>
              <li>A monthly report in plain words</li>
            </ul>
          </Card>
          <Card title="Why January matters" className={s.bar}>
            <p className={s.p} style={{ color: "var(--ink)" }}>
              Black Friday buyers came for the deal. January is when we give them a reason to love the brand and buy
              again, at full price.
            </p>
            <p className={s.p} style={{ color: "var(--ink)" }}>
              Flows go stale when no one tends them. We keep yours earning.
            </p>
          </Card>
        </R>
      </>
    ),
  },
  {
    title: "One team for your store and your emails. Measured in sales",
    tone: "paper",
    body: (
      <div className={s.about}>
        <R i={0} className={s.portrait}>
          <Image
            src="/about/david-owoeye.jpg"
            alt="David Owoeye, founder of Skynosoft"
            width={800}
            height={1000}
            sizes="(min-width: 900px) 280px, 96px"
            className={s.portraitImg}
          />
          <div>
            <p className={s.h3}>David Owoeye</p>
            <p className={s.small}>Founder, Skynosoft Ltd. · DTC CRO and email retention specialist</p>
          </div>
        </R>
        <div className={s.stack}>
          <R as="p" i={1} className={s.eyebrow}>
            Who you&rsquo;d be working with
          </R>
          <R as="h2" i={2} className={s.h2}>
            One team for your store and your emails. <i>Measured in sales.</i>
          </R>
          <R as="p" i={3} className={s.lead}>
            Skynosoft is an ecommerce growth agency. We build the website and the email system as one, so every visitor
            has a reason to buy and a reason to come back.
          </R>
          <R i={4} className={`${s.card} ${s.caseRow}`}>
            <Image src="/case-studies/afrocenchix/logo.svg" alt="Afrocenchix" width={150} height={37} />
            <p className={s.p} style={{ flex: "1 1 260px" }}>
              <b style={{ color: "var(--ink)" }}>+23% add-to-cart rate and $47K in 60 days</b> for Afrocenchix, a vegan
              haircare brand for Afro, coily and curly hair.
            </p>
          </R>
          <R as="blockquote" i={5} className={s.quote}>
            &ldquo;David&rsquo;s skills are outstanding, and he always makes time for me, despite our smaller-scale
            projects compared to his major ones.&rdquo;
            <cite>Ameen Kalla, Afrocenchix</cite>
          </R>
        </div>
      </div>
    ),
  },
  {
    title: "Novaya: from one flow to full lifecycle",
    tone: "paper",
    body: (
      <>
        <R as="p" i={0} className={s.eyebrow}>
          Case study · Email and SMS marketing
        </R>
        <div className={s.split}>
          <div className={s.stack}>
            <R i={1}>
              <Image src={`${IMG}/novaya-logo.png`} alt="Novaya" width={113} height={30} className={s.logo} />
            </R>
            <R as="h2" i={2} className={s.h2}>
              Novaya: from one flow to <i>full lifecycle</i>.
            </R>
            <R i={3} className={s.stats}>
              <div className={s.st}>
                <p className={s.sv}>$173,929</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Revenue from the welcome flow alone, across 80,000+ recipients
                </p>
              </div>
              <div className={s.st}>
                <p className={s.sv}>43%</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Open rate on that welcome flow
                </p>
              </div>
              <div className={s.st}>
                <p className={s.sv}>1 to 6</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Lifecycle flows live: welcome, browse, cart, checkout, post-purchase and win-back
                </p>
              </div>
            </R>
            <R as="p" i={4} className={s.small}>
              A Québécois menswear brand running on default flows. We rebuilt it into a full system, then improved the
              cart and checkout flows twice more from real data.
            </R>
          </div>
          <div className={s.stack}>
            <R i={3}>
              <Image
                src={`${IMG}/novaya-chart.png`}
                alt="Flow revenue by stage: Welcome $173,929, Cart and Checkout $88,179, Browse $20,773, Post-Purchase $7,966, Winback $434"
                width={1300}
                height={700}
                sizes="(min-width: 900px) 520px, 100vw"
                className={s.media}
              />
            </R>
            <R i={4} className={s.strip}>
              <Image src={`${IMG}/novaya-email-1.jpg`} alt="Novaya campaign email" width={390} height={375} sizes="160px" />
              <Image src={`${IMG}/novaya-email-2.jpg`} alt="Novaya Black Friday email: up to 65% off" width={312} height={300} sizes="160px" />
              <Image src={`${IMG}/novaya-email-3.jpg`} alt="Novaya VIP golden ticket email" width={312} height={300} sizes="160px" />
            </R>
          </div>
        </div>
        <R as="p" i={5} className={s.small}>
          Source: Klaviyo flow performance report
        </R>
      </>
    ),
  },
  {
    title: "BWLL: $75K from email, 40% of revenue",
    tone: "paper",
    body: (
      <>
        <R as="p" i={0} className={s.eyebrow}>
          Case study · Email marketing
        </R>
        <div className={s.split}>
          <div className={s.stack}>
            <R i={1}>
              <Image src={`${IMG}/bwll-logo.png`} alt="BWLL" width={71} height={30} className={s.logo} />
            </R>
            <R as="h2" i={2} className={s.h2}>
              BWLL: $75K from email, <i>40% of revenue</i>.
            </R>
            <R i={3} className={s.stats}>
              <div className={s.st}>
                <p className={s.sv}>$75K</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Attributed to email, 40% of total revenue and up 783%
                </p>
              </div>
              <div className={s.st}>
                <p className={s.sv}>$187K</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Total revenue, Jan to May 2024, up 202% on the previous period
                </p>
              </div>
              <div className={s.st}>
                <p className={s.sv}>+54.2%</p>
                <p className={s.p} style={{ color: "var(--ink)" }}>
                  Repeat purchases, with click-through up 28%
                </p>
              </div>
            </R>
            <R as="p" i={4} className={s.small}>
              An Australian nasal strip brand that struggled to turn visitors into repeat customers. We revamped its
              emails around real customer stories and exclusive offers.
            </R>
          </div>
          <div className={s.stack}>
            <R i={3}>
              <Image
                src={`${IMG}/bwll-klaviyo.jpg`}
                alt="Klaviyo summary, Jan 1 to May 31, 2024: $187,156.95 total revenue, $75,377.60 attributed (40.28%)"
                width={1640}
                height={720}
                sizes="(min-width: 900px) 520px, 100vw"
                className={s.media}
              />
            </R>
            <R i={4} className={s.strip}>
              <Image src={`${IMG}/bwll-email-1.jpg`} alt="BWLL email: Real stories, real results" width={520} height={660} sizes="160px" />
              <Image src={`${IMG}/bwll-email-2.jpg`} alt="BWLL email: The difference BWLL tape makes" width={520} height={660} sizes="160px" />
              <Image src={`${IMG}/bwll-email-3.jpg`} alt="BWLL welcome email: Breathe better with us" width={520} height={660} sizes="160px" />
            </R>
          </div>
        </div>
        <R as="p" i={5} className={s.small}>
          Source: Klaviyo business performance summary, Jan 1 to May 31, 2024
        </R>
      </>
    ),
  },
  {
    title: "You don't just get emails. You get a growth partner",
    tone: "dark",
    body: (
      <>
        <Head eyebrow="Included with every package">
          You don&rsquo;t just get emails. <i>You get a growth partner.</i>
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          {[
            ["Direct support", "Questions answered fast by the people building your emails, from kickoff through the sale."],
            ["Live optimisation", "We watch opens, clicks and sales while the sale runs, and improve what underperforms."],
            ["Offer strategy", "Which offers to run, how deep to go and how to protect your margins."],
            ["Marketing structure", "How email, social and your website work together, so every channel feeds the next."],
            ["Ads alignment", "Running ads? We line up your pop-up, offers and flows so paid visitors become subscribers and buyers."],
            ["Results review", "A plain-words recap after Black Friday: what worked, what to keep and what to do next."],
          ].map(([t, d]) => (
            <Card key={t} title={t}>
              <p className={s.p}>{d}</p>
            </Card>
          ))}
        </R>
        <R as="p" i={3} className={s.lead}>
          No extra fees, whichever build you choose or whatever budget you name.
        </R>
      </>
    ),
  },
  {
    title: "Pick your build. Or name your budget",
    tone: "blush",
    body: (
      <>
        <Head eyebrow="Choose your investment">
          Pick your build. <i>Or name your budget.</i>
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          <Card>
            <div className={s.tagRow}>
              <span className={s.tag}>Black Friday only</span>
              <span className={s.meta}>23 emails</span>
            </div>
            <h3 className={s.h3}>Black Friday sprint</h3>
            <p className={s.price}>$2,800</p>
            <p className={s.payback}>Pays for itself at about 16 orders</p>
            <ul className={s.list}>
              <li>Pop-up, Klaviyo setup, testing</li>
              <li>All 5 flows, 10 emails</li>
              <li>13 sale emails, Nov 24 to 30</li>
            </ul>
            <p className={s.plus}>+ Support, strategy and optimisation</p>
          </Card>
          <Card className={s.cardOn}>
            <div className={s.tagRow}>
              <span className={`${s.tag} ${s.tagSolid}`}>Recommended</span>
              <span className={s.meta}>31 emails · to Dec 31</span>
            </div>
            <h3 className={s.h3}>Complete setup</h3>
            <p className={s.price}>$4,000</p>
            <p className={s.payback}>Pays for itself at about 22 orders</p>
            <ul className={s.list}>
              <li>Everything in the sprint</li>
              <li>8 December and new year emails</li>
              <li>All 10 flows switched to year-round</li>
            </ul>
            <p className={s.plus}>+ Support, strategy and optimisation</p>
          </Card>
          <Card className={s.cardDashed}>
            <div className={s.tagRow}>
              <span className={s.tag}>Your budget</span>
              <span className={s.meta}>Built to fit</span>
            </div>
            <h3 className={s.h3}>Custom plan</h3>
            <p className={s.price}>Your number</p>
            <p className={s.payback}>Custom plan back the same day</p>
            <ul className={s.list}>
              <li>Tell us what you&rsquo;re ready to invest</li>
              <li>We plan what earns most</li>
              <li>Biggest earners come first</li>
            </ul>
            <p className={s.plus}>+ Support, strategy and optimisation</p>
          </Card>
        </R>
        <R as="p" i={3} className={s.note}>
          New brand with a small list? That&rsquo;s normal. Your pop-up starts growing the list on day two, and every
          order your flows win back is one you would have lost.
        </R>
        <R as="p" i={4} className={s.small}>
          Same-day fixes during the sale. Orders based on a $180 order (3 bundles and a closure). Klaviyo is free up to
          250 contacts.
        </R>
      </>
    ),
  },
  {
    title: "Six quick questions that shape your plan",
    tone: "dark",
    body: (
      <>
        <Head eyebrow="Your turn · rough answers are welcome">
          Six quick questions that <i>shape your plan</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          {[
            ["Is Klaviyo set up?", "If not, we create and connect it on day one. It's free to start."],
            ["Is traffic coming?", "Ads, Instagram, TikTok? It decides how hard we push list growth."],
            ["What can margins take?", "Rough numbers per product type set the offer."],
            ["Which products lead?", "Your two or three heroes get the spotlight."],
            ["Can you fulfil a busy week?", "Dispatch times and your last Christmas order date."],
            ["What does a win look like?", "Sales, list size, or both. We aim at your number."],
          ].map(([q, a], n) => (
            <Card key={q}>
              <p className={s.num}>{n + 1}</p>
              <h3 className={s.h3}>{q}</h3>
              <p className={s.p}>{a}</p>
            </Card>
          ))}
        </R>
      </>
    ),
  },
  {
    title: "Three simple replies, then we start building",
    tone: "paper",
    body: (
      <>
        <Head eyebrow="Your next step">
          Three simple replies, then <i>we start building</i>.
        </Head>
        <R i={2} className={`${s.grid} ${s.g3}`}>
          <Card>
            <p className={s.num}>1</p>
            <h3 className={s.h3}>Choose a build, or name your budget</h3>
            <p className={s.p}>The Black Friday sprint, the complete setup, or a custom plan built around your number.</p>
          </Card>
          <Card>
            <p className={s.num}>2</p>
            <h3 className={s.h3}>Answer the six questions</h3>
            <p className={s.p}>Rough answers are fine. They set the offer and the order we build in.</p>
          </Card>
          <Card>
            <p className={s.num}>3</p>
            <h3 className={s.h3}>Say yes, and we start</h3>
            <p className={s.p}>Half to start, half when Black Friday goes live. Kickoff the same day.</p>
          </Card>
        </R>
        <R i={3} className={s.bar}>
          <h3 className={s.h3}>Say yes by Wednesday Nov 18 to get the full 9 days.</h3>
          <p className={s.p} style={{ color: "var(--ink)" }}>
            Every day after that is less time to grow your list before the sale. If you&rsquo;re later, the biggest
            earners still go live first.
          </p>
        </R>
        <R i={4} className={s.contact}>
          <a className={s.link} href="mailto:david@skynosoft.net">
            <span>Reply by email</span>david@skynosoft.net
          </a>
          <a className={s.link} href="#book">
            <span>Or book a call</span>Pick a time below
          </a>
        </R>
      </>
    ),
  },
];

export function ProposalDeck({ downloadHref }: { downloadHref: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [full, setFull] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const last = slides.length - 1;

  const go = useCallback(
    (to: number) => {
      const next = Math.max(0, Math.min(last, to));
      if (next === index) return;
      setDir(next > index ? 1 : -1);
      setIndex(next);
      // Slides grow with their content, so bring the top of the deck back into view.
      const el = stageRef.current;
      if (!el) return;
      if (full) {
        viewportRef.current?.scrollTo({ top: 0 });
      } else {
        const top = el.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.5) {
          const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: top + window.scrollY - 96, behavior: smooth ? "smooth" : "auto" });
        }
      }
    },
    [full, index, last],
  );

  // Arrow keys work while the deck is on screen or in full screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      const r = el.getBoundingClientRect();
      const visible = full || (r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4);
      if (!visible) return;
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "Escape" && full) setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full, go, index]);

  useEffect(() => {
    if (!full) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [full]);

  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const t = touch.current;
    touch.current = null;
    if (!t) return;
    const dx = e.changedTouches[0].clientX - t.x;
    const dy = e.changedTouches[0].clientY - t.y;
    // Only a clearly sideways swipe pages; vertical drags scroll the slide.
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  const slide = slides[index];

  return (
    <div className={s.root}>
      <div
        ref={stageRef}
        className={`${s.stage} ${full ? s.full : ""} ${slide.tone === "dark" ? s.isDark : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Lashcott Hair proposal"
      >
        <div className={s.progress} aria-hidden>
          <span style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
        </div>
        <div className={s.topbar}>
          <span className={s.counter} aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            className={s.iconBtn}
            onClick={() => setFull((f) => !f)}
            aria-label={full ? "Exit full screen" : "Full screen"}
          >
            {full ? <ArrowsIn size={18} weight="bold" aria-hidden /> : <ArrowsOut size={18} weight="bold" aria-hidden />}
          </button>
        </div>

        <div ref={viewportRef} className={s.viewport} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <section
            key={index}
            className={`${s.slide} ${slide.center ? s.center : ""}`}
            data-tone={slide.tone}
            data-dir={dir}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
          >
            {slide.body}
          </section>
        </div>

        <div className={s.controls}>
          <button
            type="button"
            className={s.iconBtn}
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <CaretLeft size={20} weight="bold" aria-hidden />
          </button>
          <div className={s.dots} role="group" aria-label="Jump to slide">
            {slides.map((sl, i) => (
              <button
                key={sl.title}
                type="button"
                className={s.dot}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}: ${sl.title}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className={s.iconBtn}
            onClick={() => go(index + 1)}
            disabled={index === last}
            aria-label="Next slide"
          >
            <CaretRight size={20} weight="bold" aria-hidden />
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <p className={s.hint}>Swipe, use the arrows, or tap a dot to jump.</p>
        <a
          href={downloadHref}
          download
          className={s.link}
          style={{ flexDirection: "row", alignItems: "center", gap: 8, fontSize: 15 }}
        >
          <DownloadSimple size={18} weight="bold" aria-hidden />
          Download the PPTX
        </a>
      </div>
    </div>
  );
}
