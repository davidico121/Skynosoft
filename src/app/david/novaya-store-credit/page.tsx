import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON, BUTTON_SECONDARY, EASE, Eyebrow, FOCUS, Wrap } from "@/components/ui/page-kit";

const UPWORK_URL = "https://www.upwork.com/freelancers/~017a87b019f1f7020a";

const title = "The $50 relabel that outsold the original offer — David Owoeye";
const description =
  "A real Novaya campaign breakdown: the exact same $50 offer, repackaged from a free gift into store credit, sent to the brand's most fatigued segment, and it still out-earned the original.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/novaya-store-credit" },
  openGraph: { title, description, url: "https://david.skynosoft.net/novaya-store-credit" },
  twitter: { card: "summary_large_image", title, description },
};

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border-hairline bg-card p-6">
      <p className="font-heading text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 font-body text-sm text-foreground-muted">{label}</p>
    </div>
  );
}

function CompareRow({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border-hairline py-4 last:border-b-0 sm:gap-8">
      <p className="font-body text-sm text-foreground-muted sm:text-base">{label}</p>
      <p className="w-20 text-right font-heading text-base text-foreground-muted sm:w-28 sm:text-lg">
        {before}
      </p>
      <p className="w-20 text-right font-heading text-base font-semibold text-primary sm:w-28 sm:text-lg">
        {after}
      </p>
    </div>
  );
}

export default function NovayaStoreCreditPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mt-6 flex justify-center px-4">
        <nav
          aria-label="Page"
          className="flex w-max items-center gap-2 rounded-full border border-border-hairline bg-white/80 py-2 pl-3 pr-5 shadow-sm backdrop-blur-xl"
        >
          <Link
            href="/david"
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-sm text-foreground-muted transition-colors duration-300 ${EASE} hover:text-foreground ${FOCUS}`}
          >
            <ArrowLeft size={16} weight="bold" aria-hidden />
            David Owoeye
          </Link>
        </nav>
      </header>

      <main id="main">
        <section>
          <Wrap className="pb-20 pt-40">
            <Reveal>
              <Eyebrow>Campaign I&rsquo;m proud of &middot; Novaya, September 2026</Eyebrow>
              <h1 className="mt-6 max-w-[780px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
                I didn&rsquo;t create a new offer. I renamed the one that stopped working.
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                Same $50 value. Same product. Same margin. I changed one thing, free gift became
                store credit, sent it to the list&rsquo;s most fatigued segment, and it earned 2.4x
                more per recipient than the original offer had on a healthier one.
              </p>
            </Reveal>
          </Wrap>
        </section>

        <section className="border-t border-border-hairline bg-card">
          <Wrap className="py-16">
            <Reveal>
              <div className="grid gap-6 sm:grid-cols-3">
                <StatCard value="$7,221" label="Combined revenue from 2 emails, 3 days" />
                <StatCard value="79.8%" label="Open rate on the reframed send" />
                <StatCard value="2.4x" label="Revenue per recipient vs. the original framing" />
              </div>
            </Reveal>
          </Wrap>
        </section>

        <section>
          <Wrap className="py-20">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
              <Reveal>
                <Eyebrow>The situation</Eyebrow>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-balance md:text-3xl">
                  A good offer, run into the ground
                </h2>
                <div className="mt-6 flex flex-col gap-4 font-body text-base text-foreground-muted text-pretty">
                  <p>
                    Novaya is a Quebec DTC apparel brand I run email for. For most of September
                    their standing offer was simple: order the Cargo pants ($60) and get the
                    Comfort+ t-shirt free.
                  </p>
                  <p>
                    It worked, until it didn&rsquo;t. By late September the list had seen it
                    enough times that it stopped converting. A straight urgency push of the exact
                    same offer (&ldquo;C&rsquo;est maintenant ou jamais&rdquo;) to a healthy,
                    recently-engaged segment of 14,880 people only pulled a 0.87% click rate and
                    $2,329 in revenue, $0.16 per recipient.
                  </p>
                  <p>
                    The easy fixes were both bad ones: stack a bigger discount on top (eats the
                    brand&rsquo;s margin for no real reason, the offer wasn&rsquo;t broken) or let
                    that segment go cold (leaves real revenue on the table from people who&rsquo;d
                    already shown intent).
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <Eyebrow>The reframe</Eyebrow>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-balance md:text-3xl">
                  Zero cost. Different frame.
                </h2>
                <div className="mt-6 flex flex-col gap-4 font-body text-base text-foreground-muted text-pretty">
                  <p>
                    The $50 the t-shirt was worth didn&rsquo;t change. What changed is what I
                    called it. Instead of &ldquo;free t-shirt with your order,&rdquo; the email
                    told people they had a $50 store credit sitting on their account, tied to the
                    same Cargo + Comfort+ bundle, same math: $60 out of $110.
                  </p>
                  <p>
                    A gift reads as a marketing tactic people have learned to tune out. A credit
                    reads as money that&rsquo;s already theirs and about to expire. I sent it from
                    a real name (Charlotte), in plain text, no banner, no discount code, just an
                    explanation of what the credit was and how to use it.
                  </p>
                  <p>
                    I sent it to Novaya&rsquo;s Post-Campaign Recovery Segment, specifically the
                    people who&rsquo;d already seen the free-gift version and not converted. The
                    harder audience, on purpose, to see if the reframe alone could move people the
                    original framing couldn&rsquo;t.
                  </p>
                </div>
              </Reveal>
            </div>
          </Wrap>
        </section>

        <section className="border-t border-border-hairline bg-card">
          <Wrap className="py-20">
            <Reveal>
              <Eyebrow>The two sends</Eyebrow>
              <h2 className="mt-4 max-w-[680px] font-heading text-2xl font-semibold text-balance md:text-3xl">
                What actually went out, real subject lines and all
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <Reveal delay={100}>
                <figure className="mx-auto max-w-[420px] overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg">
                  <Image
                    src="/portfolio/novaya-store-credit/charlotte-email.png"
                    alt="The Sept 27 Novaya campaign email, subject 'Ton Crédit De 50$ Est Encore Dans Le Système', sent from Charlotte de Novaya, explaining the $50 credit still active on the recipient's account"
                    width={1280}
                    height={2326}
                    className="block h-auto w-full"
                  />
                </figure>
                <figcaption className="mx-auto mt-4 max-w-[420px] font-body text-sm text-foreground-muted">
                  Sept 27 &middot; &ldquo;Your $50 credit is still in the system&rdquo; &middot;
                  sent to the fatigued recovery segment &middot; 10,879 recipients
                </figcaption>
              </Reveal>
              <Reveal delay={200}>
                <figure className="mx-auto max-w-[420px] overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg">
                  <Image
                    src="/portfolio/novaya-store-credit/hugo-email.png"
                    alt="The Sept 30 Novaya campaign email, subject 'Ton Crédit De 50$ Expire Ce Soir', sent from Hugo de Novaya, as a final-call reminder that the credit expires that night"
                    width={1280}
                    height={1602}
                    className="block h-auto w-full"
                  />
                </figure>
                <figcaption className="mx-auto mt-4 max-w-[420px] font-body text-sm text-foreground-muted">
                  Sept 30 &middot; &ldquo;Your $50 credit expires tonight&rdquo; &middot; the
                  follow-up, 72 hours later &middot; 14,261 recipients
                </figcaption>
              </Reveal>
            </div>
          </Wrap>
        </section>

        <section>
          <Wrap className="py-20">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
              <Reveal>
                <Eyebrow>The numbers</Eyebrow>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-balance md:text-3xl">
                  Reframe vs. the original offer
                </h2>
                <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
                  Same offer, same discount value, two different framings, pulled straight from
                  the Klaviyo campaign report. The reframed send also went to the weaker,
                  already-unresponsive segment.
                </p>
                <div className="mt-8 rounded-xl border border-border-hairline bg-card p-6">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border-hairline-strong pb-3 sm:gap-8">
                    <span />
                    <span className="w-20 text-right font-label text-xs uppercase tracking-wide text-foreground-muted sm:w-28">
                      &ldquo;Free gift&rdquo;
                    </span>
                    <span className="w-20 text-right font-label text-xs uppercase tracking-wide text-primary sm:w-28">
                      &ldquo;Store credit&rdquo;
                    </span>
                  </div>
                  <CompareRow label="Open rate" before="57.1%" after="79.8%" />
                  <CompareRow label="Click rate" before="0.87%" after="3.36%" />
                  <CompareRow label="Revenue / recipient" before="$0.16" after="$0.37" />
                  <CompareRow label="Revenue" before="$2,329" after="$4,071" />
                </div>
              </Reveal>
              <Reveal delay={150}>
                <Eyebrow>The outcome</Eyebrow>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-balance md:text-3xl">
                  $7,221 from two emails, zero discounting
                </h2>
                <div className="mt-6 flex flex-col gap-4 font-body text-base text-foreground-muted text-pretty">
                  <p>
                    The Sept 27 reframe alone brought in $4,071.34 from a segment that had already
                    ignored the same offer once. The Sept 30 follow-up, a plain expiry reminder
                    sent by Hugo, added another $3,150.05. $7,221.39 combined, in 72 hours, from a
                    program that hadn&rsquo;t introduced a single new discount or touched the
                    brand&rsquo;s margin.
                  </p>
                  <p>
                    No new offer, no new creative budget, no A/B test needed to prove it, the
                    reframe alone was the lever. That&rsquo;s the part I&rsquo;m proud of here,
                    not the copy or the design, the read on why a working offer had stopped
                    working, and what to change instead of what to add.
                  </p>
                </div>
              </Reveal>
            </div>
          </Wrap>
        </section>

        <section className="border-t border-border-hairline bg-card">
          <Reveal className="flex flex-col items-center py-20 text-center">
            <Wrap className="flex flex-col items-center">
              <h2 className="max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
                This is the kind of thinking I bring to every list I run
              </h2>
              <p className="mt-4 max-w-[600px] font-body text-lg text-foreground-muted text-pretty">
                Strategy first, design second. See the rest of the work, or get in touch.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/david#work" className={BUTTON}>
                  See more case studies
                </Link>
                <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                  Hire me on Upwork
                  <ArrowSquareOut size={18} weight="bold" className="ml-2" aria-hidden />
                </a>
              </div>
            </Wrap>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border-hairline">
        <Wrap className="flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-body text-sm text-foreground-muted">
            © {new Date().getFullYear()} David Owoeye
          </p>
          <Link
            href="/david"
            className={`font-body text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary-soft ${FOCUS}`}
          >
            Back to the full portfolio
          </Link>
        </Wrap>
      </footer>
    </>
  );
}
