import Image from "next/image";
import {
  ArrowSquareOut,
  CaretDown,
  ChatCircleDots,
  CheckCircle,
  HandWaving,
  Megaphone,
  ShieldCheck,
  ShoppingCartSimple,
  UserCirclePlus,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Paragraphs } from "@/components/ui/Paragraphs";
import { splitParagraphs } from "@/lib/paragraphs";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Reveal, TaglineReveal } from "@/components/ui/Reveal";
import { BUTTON, EASE, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";
import { CALENDLY_URL, SITE_URL, caseStudies } from "@/lib/content";
import { evidence, type BeliefPitch, type EvidenceId } from "@/lib/belief-pitch";
import { IslandNav } from "./IslandNav";
import { LeakCalculator, ReadProgress } from "./BeliefClient";
import logo from "../../../public/brand/skynosoft-logo-horizontal.png";
import founderAvatar from "../../../public/brand/david-owoeye-avatar.jpg";

const navLinks = [
  { href: "#now", label: "Today" },
  { href: "#leak", label: "The leak" },
  { href: "#after", label: "What changes" },
  { href: "#proof", label: "Proof" },
  { href: "#book", label: "Book a call" },
];

type PhosphorIcon = typeof HandWaving;

const NOW_ICONS: PhosphorIcon[] = [Megaphone, ChatCircleDots, ShoppingCartSimple];

/** What a customer gets from the system, in the order it happens. */
const TIMELINE: { when: string; title: string; detail: string; icon: PhosphorIcon }[] = [
  {
    when: "Minutes after signup",
    title: "A proper welcome",
    detail: "They hear who you are, what to try first and why they can trust you, before the interest cools.",
    icon: HandWaving,
  },
  {
    when: "A few hours after they leave a cart",
    title: "The cart reminder",
    detail: "The person who nearly bought gets a nudge with the exact items they left behind.",
    icon: ShoppingCartSimple,
  },
  {
    when: "Days after the first order",
    title: "The how to and thank you",
    detail: "They learn how to get the best from what they bought, which is what makes a second order likely.",
    icon: CheckCircle,
  },
  {
    when: "When it is running low",
    title: "The reorder reminder",
    detail: "Timed to when they would need more, so you are the first name they think of.",
    icon: ChatCircleDots,
  },
  {
    when: "After weeks of silence",
    title: "The win back",
    detail: "A customer drifting away hears from you before a competitor has won them.",
    icon: UserCirclePlus,
  },
];

function Cite({ pitch, id }: { pitch: BeliefPitch; id: EvidenceId }) {
  const index = pitch.sources.indexOf(id);
  if (index === -1) throw new Error(`Source "${id}" is cited on the page but missing from pitch.sources`);
  return (
    <sup className="ml-0.5">
      <a
        href={`#source-${id}`}
        aria-label={`Source ${index + 1}`}
        className={`rounded px-0.5 font-label text-xs text-primary-soft underline-offset-2 hover:underline ${FOCUS}`}
      >
        [{index + 1}]
      </a>
    </sup>
  );
}

export function BeliefPage({ pitch }: { pitch: BeliefPitch }) {
  const { brand, hero } = pitch;
  const cite = (id: EvidenceId) => <Cite pitch={pitch} id={id} />;
  const proofStudies = pitch.caseStudySlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <ReadProgress />
      <IslandNav logo={logo} links={navLinks} />

      <main id="main">
        {/* Hero: "this is for me" */}
        <section>
          <Wrap className="pb-24 pt-40">
            <Reveal>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-6 max-w-[900px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-transparent md:text-6xl">
                {hero.headline.map((line) => (
                  <span key={line} className="md:block">
                    {line}{" "}
                  </span>
                ))}
              </h1>
              <div className="mt-6 max-w-[680px]">
                <Paragraphs
                  text={hero.subheading}
                  className="font-body text-lg text-foreground-muted text-pretty"
                />
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#now" className={`px-5 py-3 ${BUTTON}`}>
                  {hero.cta}
                </a>
                <p className="font-body text-sm text-foreground-muted">
                  A short read. Every outside claim links to its source.
                </p>
              </div>
            </Reveal>
          </Wrap>
        </section>

        {/* Chapter 1: the mirror */}
        <Section id="now" tint>
          <Reveal>
            <Eyebrow>{`How ${brand} sells today`}</Eyebrow>
            <div className="mt-4">
              <H2>Does this sound like your week?</H2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pitch.nowDoing.map((item, i) => {
                const NowIcon = NOW_ICONS[i % NOW_ICONS.length];
                return (
                  <div key={item.title} className="rounded-xl border border-border-hairline bg-white p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                      <NowIcon size={20} weight="duotone" aria-hidden />
                    </span>
                    <p className="mt-4 font-heading text-lg font-semibold">{item.title}</p>
                    <p className="mt-2 font-body text-base text-foreground-muted text-pretty">{item.detail}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-10 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              It works. That is exactly the trap.{" "}
              <strong className="text-foreground">It works for as long as you keep paying for it, and not one day longer.</strong>
            </p>
          </Reveal>
        </Section>

        {/* Chapter 2: rented attention */}
        <Section id="rented">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>The problem</Eyebrow>
              <div className="mt-4">
                <H2>Every sale is rented. Stop paying and it goes back.</H2>
              </div>
            </Reveal>
            <Reveal className="flex flex-col gap-8">
              <div>
                <p className="font-heading text-xl font-semibold">The price keeps moving, and not in your favour.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Software and platforms priced in dollars cost more naira each time the naira slips.{cite("nairaDollarCosts")}{" "}
                  Look at your own ad invoice. If you pay in naira for a platform priced in dollars,{" "}
                  <strong className="text-foreground">the same budget buys you less than it did.</strong>
                </p>
              </div>
              <div>
                <p className="font-heading text-xl font-semibold">The audience is not yours.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Meta, which owns Facebook, Instagram and WhatsApp, has been fined more than $290 million in Nigeria and
                  has threatened to pull its apps from the country.{cite("metaFines")} Businesses selling on WhatsApp
                  already face the risk of being blocked or muted.{cite("whatsappBlocks")}{" "}
                  <strong className="text-foreground">Lose the account and you lose every customer you ever reached there.</strong>
                </p>
              </div>
              <div>
                <p className="font-heading text-xl font-semibold">The work never stacks up.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Last month&apos;s posts, ads and chats do nothing this month. You start from zero every time.
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Chapter 3: the leak */}
        <Section id="leak" tint>
          <Reveal>
            <Eyebrow>The leak</Eyebrow>
            <div className="mt-4">
              <H2>The customer you already paid for walks away in silence.</H2>
            </div>
            <div className="mt-4 max-w-[680px]">
              <Paragraphs
                text={`Someone buys from ${brand}. You paid to find them. Then nothing happens. No message when they are running low, no reason to come back, no one remembering their name. Most of them do not leave angry. **They just never think of you again.**`}
                className="font-body text-lg text-foreground-muted text-pretty"
              />
            </div>

            <ol className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                { day: "Day 0", title: "They buy", status: "You paid to win them", leak: false },
                { day: "Day 3", title: "They try it", status: "Nobody asks how it went", leak: true },
                { day: "Day 30", title: "They run low", status: "Nothing reminds them", leak: true },
                { day: "Day 60", title: "They buy elsewhere", status: "Gone to someone who did", leak: true },
              ].map((step) => (
                <li
                  key={step.day}
                  className={`rounded-xl border p-5 ${step.leak ? "border-red-300 bg-white" : "border-border-hairline bg-white"}`}
                >
                  <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">{step.day}</p>
                  <p className="mt-2 font-heading text-lg font-semibold">{step.title}</p>
                  <p
                    className={`mt-2 inline-flex items-center gap-2 font-body text-sm ${step.leak ? "text-red-700" : "text-foreground-muted"}`}
                  >
                    {step.leak ? <XCircle size={16} weight="fill" aria-hidden /> : <CheckCircle size={16} weight="fill" aria-hidden />}
                    {step.status}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-16">
              <p className="mb-6 max-w-[680px] font-heading text-2xl font-semibold text-balance">
                Put in your own numbers and see what it adds up to.
              </p>
              <LeakCalculator start={pitch.calculator} />
            </div>
          </Reveal>
        </Section>

        {/* Chapter 4: waiting shoppers and the season */}
        <Section id="season">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Why now</Eyebrow>
              <div className="mt-4">
                <H2>The people who hear from you first get the order.</H2>
              </div>
            </Reveal>
            <Reveal className="flex flex-col gap-8">
              <div>
                <p className="font-heading text-xl font-semibold">Shoppers are waiting, and nobody is talking to them.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Before Black Friday 2025, Jumia saw more shoppers adding to wishlists and carts without checking out,
                  waiting for a bigger discount.{cite("jumiaCartWaiting")}{" "}
                  <strong className="text-foreground">Whoever messages them with a reason to buy now gets the sale.</strong>
                </p>
              </div>
              <div>
                <p className="font-heading text-xl font-semibold">The season is no longer one weekend.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Black Friday brought Jumia Nigeria 3.2 million orders, about 63% of its orders in that period.{cite("jumiaBlackFriday")}{" "}
                  Its CEO calls it a predictable, planned retail period.{cite("jumiaCeo")} Brands that plan their messages
                  ahead win it. The rest run ads and hope.
                </p>
              </div>
              <div>
                <p className="font-heading text-xl font-semibold">Money is tight, so loyalty has to be earned.</p>
                <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
                  Lagos shoppers are putting essentials first and cutting back elsewhere.{cite("lagosSpending")}{" "}
                  <strong className="text-foreground">A customer who is careful with every naira stays with the brand that keeps in touch.</strong>
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {pitch.audit && (
          <Section id="audit" tint>
            <Reveal>
              <Eyebrow>{`What we found on ${brand}`}</Eyebrow>
              <div className="mt-4">
                <H2>{pitch.audit.heading}</H2>
              </div>
              <p className="mt-4 font-body text-sm text-foreground-muted">Checked on {pitch.audit.checkedOn}.</p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {pitch.audit.findings.map((f) => (
                  <div key={f.label} className="overflow-hidden rounded-xl border border-border-hairline bg-white">
                    {f.shot && (
                      <Image
                        src={f.shot.src}
                        alt={f.shot.alt}
                        width={f.shot.width}
                        height={f.shot.height}
                        className="block h-auto w-full border-b border-border-hairline"
                      />
                    )}
                    <div className="p-6">
                      <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">{f.label}</p>
                      <p className="mt-2 font-body text-lg text-foreground text-pretty">{f.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* Chapter 5: the turn */}
        <Section id="after" tint={!pitch.audit}>
          <Reveal>
            <Eyebrow>What changes</Eyebrow>
            <div className="mt-4">
              <H2>Now picture the same business with this running quietly in the background.</H2>
            </div>
            <ol className="mt-12 grid gap-4 md:grid-cols-5">
              {TIMELINE.map((step) => (
                <li key={step.title} className="rounded-xl border border-border-hairline bg-white p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                    <step.icon size={20} weight="duotone" aria-hidden />
                  </span>
                  <p className="mt-4 font-label text-xs uppercase tracking-wide text-foreground-muted">{step.when}</p>
                  <p className="mt-2 font-heading text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 font-body text-sm text-foreground-muted text-pretty">{step.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              <strong className="text-foreground">All of it sends itself.</strong> No one has to remember, no one has to
              chase, and it runs while you are asleep.
            </p>
          </Reveal>
        </Section>

        {/* Chapter 6: life after */}
        <Section id="life">
          <Reveal>
            <Eyebrow>Your week</Eyebrow>
            <div className="mt-4">
              <H2>Same business. A very different Monday.</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border-hairline bg-card p-8">
                <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">Today</p>
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    "Check yesterday's ad results and decide how much more to spend.",
                    "Brief the social media manager on what to post.",
                    "Scroll back through chats to remember who bought last month.",
                    "Message customers one by one and hope they reply.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 font-body text-base text-foreground-muted">
                      <XCircle size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-red-500" />
                      <span className="text-pretty">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-primary bg-white p-8 ring-1 ring-primary/30">
                <p className="font-label text-sm uppercase tracking-wide text-primary-soft">With the system</p>
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    "Open one screen and see which emails brought orders overnight.",
                    "New customers were welcomed, and cart leavers were reminded, without you.",
                    "Last month's buyers got a reorder reminder at the right time.",
                    "You spend the morning on the product, because the list is working.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 font-body text-base text-foreground">
                      <CheckCircle size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-primary-soft" />
                      <span className="text-pretty">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Chapter 7: proof */}
        <Section id="proof" tint>
          <Reveal>
            <Eyebrow>Proof</Eyebrow>
            <div className="mt-4">
              <H2>Real brands, real numbers, from the same kind of system.</H2>
            </div>
            <div className="mt-4 max-w-[680px]">
              <Paragraphs
                text="Two of our clients, in plain arithmetic. **Streaky Academy made $75K from email out of $242K in total revenue, about 31%.** CannonBalm made $32.8K from email out of $96.7K, about 34%. For both, email was roughly a third of all sales."
                className="font-body text-lg text-foreground-muted text-pretty"
              />
            </div>
            <p className="mt-4 max-w-[680px] font-body text-base text-foreground-muted text-pretty">
              These are not Nigerian brands, and we will not pretend they are. The mechanics are the same: a customer who
              bought once, a cart that was left, a buyer who needs a reason to return. Your offers, timing and language
              are what we tune for you.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {proofStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} baseUrl={SITE_URL} />
              ))}
            </div>
            <p className="mt-10 max-w-[680px] font-body text-base text-foreground-muted text-pretty">
              Across the industry, most marketers who track it report that email returns between $10 and $50 for every $1
              spent.{cite("litmusRoi")} That ratio counts the email tool&apos;s fee only, so treat it as a sign of
              direction and not a promise.
            </p>
          </Reveal>
        </Section>

        <section className="border-t border-border-hairline">
          <Wrap className="py-32">
            {splitParagraphs(
              "Customers you already paid for are the cheapest sales you will ever make. Stop letting them walk away in silence.",
              100,
              100,
            ).map((para) => (
              <TaglineReveal
                key={para}
                text={para}
                className="max-w-[680px] font-heading text-4xl font-semibold text-pretty"
              />
            ))}
          </Wrap>
        </section>

        {/* Chapter 8: objections */}
        <Section id="faq" tint>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Questions</Eyebrow>
              <div className="mt-4">
                <H2>What you are probably thinking.</H2>
              </div>
              <div className="mt-8 max-w-[320px] rounded-xl border border-border-hairline bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
                  <ShieldCheck size={20} weight="duotone" aria-hidden />
                </span>
                <p className="mt-4 font-heading text-lg font-semibold">{pitch.risk.heading}</p>
                <p className="mt-2 font-body text-sm text-foreground-muted">{pitch.risk.text}</p>
                <a href="#book" className={`mt-4 w-full ${BUTTON}`}>
                  Book a strategy call
                </a>
              </div>
            </Reveal>
            <Reveal className="flex flex-col gap-3">
              {pitch.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border-hairline bg-white p-6">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold ${FOCUS} [&::-webkit-details-marker]:hidden`}
                  >
                    {f.q}
                    <CaretDown
                      size={20}
                      weight="bold"
                      aria-hidden
                      className={`shrink-0 transition-transform duration-500 ${EASE} group-open:rotate-180`}
                    />
                  </summary>
                  <div className="mt-4">
                    <Paragraphs text={f.a} className="font-body text-base text-foreground-muted text-pretty" />
                    {f.cite && <p className="mt-3 font-body text-sm text-foreground-muted">Source:{cite(f.cite)}</p>}
                  </div>
                </details>
              ))}
            </Reveal>
          </div>
        </Section>

        {/* Chapter 9: the plan and the booking */}
        <Section id="plan">
          <Reveal>
            <Eyebrow>The plan</Eyebrow>
            <div className="mt-4">
              <H2>Two weeks from a quiet list to a system that sells.</H2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                {
                  week: "Week 1",
                  title: "Strategy and build",
                  text: `We look at how ${brand} sells today, capture the emails you already have, and build the welcome, cart reminder, post purchase and win back messages in your brand.`,
                },
                {
                  week: "Week 2",
                  title: "Test and launch",
                  text: "We test every message on real phones, switch it on, and show you where the first orders came from. After that it runs without you.",
                },
              ].map((s) => (
                <div key={s.week} className="rounded-xl border border-border-hairline bg-card p-8">
                  <p className="font-label text-sm uppercase tracking-wide text-primary-soft">{s.week}</p>
                  <p className="mt-3 font-heading text-2xl font-semibold">{s.title}</p>
                  <p className="mt-3 font-body text-base text-foreground-muted text-pretty">{s.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section id="book" tint>
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
              <ShieldCheck size={24} weight="duotone" aria-hidden />
            </span>
            <h2 className="mt-6 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
              {pitch.risk.heading}
            </h2>
            <div className="mt-4 max-w-[680px]">
              <Paragraphs text={pitch.risk.text} className="font-body text-lg text-foreground-muted text-pretty" />
            </div>
            <div className="mt-12">
              <CalendlyEmbed url={pitch.pitcher ? pitch.pitcher.calendlyUrl : CALENDLY_URL} lazy />
            </div>
            <div className="mt-12 flex flex-col items-center text-center">
              {pitch.pitcher ? (
                <Image
                  src={pitch.pitcher.photo.src}
                  alt={pitch.pitcher.name}
                  width={pitch.pitcher.photo.width}
                  height={pitch.pitcher.photo.height}
                  className="h-24 w-24 rounded-full object-cover shadow-[0_0_24px_4px_rgba(0,153,255,0.2)] ring-4 ring-primary/10"
                />
              ) : (
                <Image
                  src={founderAvatar}
                  alt="David Owoeye"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover shadow-[0_0_24px_4px_rgba(0,153,255,0.2)] ring-4 ring-primary/10"
                />
              )}
              <p className="mt-4 font-heading text-lg font-semibold">{pitch.pitcher ? pitch.pitcher.name : "David Owoeye"}</p>
              {pitch.pitcher ? (
                <p className="mt-1 font-body text-base text-foreground-muted">{pitch.pitcher.title}</p>
              ) : (
                <>
                  <p className="mt-1 font-body text-base text-foreground-muted">DTC CRO &amp; Email Retention Specialist</p>
                  <p className="font-body text-base text-foreground-muted">Founder &amp; CEO, Skynosoft Ltd.</p>
                </>
              )}
              {(pitch.pitcher?.socials ?? true) && <SocialLinks className="mt-3" />}
            </div>
          </Reveal>
        </Section>

        {/* Every outside claim, with where it came from */}
        <section id="sources" className="scroll-mt-24 border-t border-border-hairline">
          <Wrap className="py-16">
            <Eyebrow>Sources</Eyebrow>
            <h2 className="mt-4 max-w-[680px] font-heading text-2xl font-semibold text-balance">
              Every number on this page that is not ours, and where it comes from.
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {pitch.sources.map((id, i) => {
                const e = evidence[id];
                return (
                  <li
                    key={id}
                    id={`source-${id}`}
                    className="scroll-mt-24 rounded-xl border border-border-hairline bg-white p-5"
                  >
                    <p className="font-label text-xs uppercase tracking-wide text-foreground-muted">
                      [{i + 1}] {e.basis}
                      {e.published ? `, ${e.published}` : ""}
                    </p>
                    <p className="mt-2 font-body text-base text-foreground text-pretty">{e.claim}</p>
                    {e.caution && <p className="mt-2 font-body text-sm text-foreground-muted text-pretty">{e.caution}</p>}
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-flex items-center gap-1.5 rounded font-body text-sm font-semibold text-primary-soft underline underline-offset-4 ${FOCUS}`}
                    >
                      {e.publisher}: {e.title}
                      <ArrowSquareOut size={14} aria-hidden />
                    </a>
                    {e.checkedOn && (
                      <p className="mt-2 font-body text-xs text-foreground-muted">We read this page on {e.checkedOn}.</p>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 font-body text-sm text-foreground-muted text-pretty">
              Results shown for Skynosoft clients come from their own Klaviyo and store reports. Example numbers in the
              calculator are labelled as examples and are not a forecast.
            </p>
          </Wrap>
        </section>
      </main>
    </>
  );
}
