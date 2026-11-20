"use client";

import { useEffect, useRef, useState } from "react";
import { EASE } from "@/components/ui/page-kit";

/** A thin bar under the top of the screen that fills as the reader moves down the page. */
export function ReadProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-primary" />
    </div>
  );
}

const FIELD =
  "w-full rounded-xl border border-border-hairline bg-white px-4 py-3 font-body text-base outline-none focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-US");
}

function num(value: string) {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

type Start = { newCustomers: number; orderValue: number; costToWin: number; repeatPercent: number };

/**
 * Lets the reader put in their own numbers. Starts filled with clearly labelled
 * example values so the first view shows what it does. Nothing is saved or sent.
 */
export function LeakCalculator({ start }: { start: Start }) {
  const [customers, setCustomers] = useState(String(start.newCustomers));
  const [order, setOrder] = useState(String(start.orderValue));
  const [cost, setCost] = useState(String(start.costToWin));
  const [repeat, setRepeat] = useState(String(start.repeatPercent));
  const [edited, setEdited] = useState(false);

  const n = num(customers);
  const aov = num(order);
  const cac = num(cost);
  const r = Math.min(100, num(repeat));

  const quiet = n * (1 - r / 100);
  const paidFor = quiet * cac;
  const extraOrders = n * 0.1;
  const extraMonthly = extraOrders * aov;

  const touch = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value);
    setEdited(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-5 rounded-xl border border-border-hairline bg-white p-6 md:p-8">
        <p className="font-label text-sm uppercase tracking-wide text-primary-soft">
          {edited ? "Your numbers" : "Example numbers, change them to yours"}
        </p>
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          New customers you win each month
          <input inputMode="numeric" value={customers} onChange={touch(setCustomers)} className={FIELD} />
        </label>
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          Average order value (₦)
          <input inputMode="numeric" value={order} onChange={touch(setOrder)} className={FIELD} />
        </label>
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          What it costs to win one customer (₦)
          <input inputMode="numeric" value={cost} onChange={touch(setCost)} className={FIELD} />
          <span className="font-normal text-foreground-muted">Ad spend and manager costs, divided by new customers.</span>
        </label>
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          Out of 100 first time buyers, how many order again?
          <input inputMode="numeric" value={repeat} onChange={touch(setRepeat)} className={FIELD} />
          <span className="font-normal text-foreground-muted">An honest guess is fine.</span>
        </label>
        <p className="font-body text-sm text-foreground-muted">Nothing you type here is saved or sent anywhere.</p>
      </div>

      <div
        className="flex flex-col justify-between gap-8 rounded-xl border border-border-hairline-strong bg-card p-6 md:p-8"
        aria-live="polite"
      >
        <div>
          <p className="font-label text-sm uppercase tracking-wide text-foreground-muted">Every month</p>
          <p className="mt-3 font-heading text-5xl font-semibold tabular-nums">
            {Math.round(quiet).toLocaleString("en-US")}
          </p>
          <p className="mt-2 font-body text-lg text-foreground-muted text-pretty">
            customers buy once, then never hear from you again.
          </p>
        </div>
        <div>
          <p className="font-heading text-3xl font-semibold tabular-nums">{naira(paidFor)}</p>
          <p className="mt-2 font-body text-base text-foreground-muted text-pretty">
            is what it cost to win them. <strong className="text-foreground">That is money spent once, with nothing built on top of it.</strong>
          </p>
        </div>
        <div className={`rounded-xl border border-primary/30 bg-white p-5 transition-opacity duration-500 ${EASE}`}>
          <p className="font-body text-base text-foreground-muted text-pretty">
            What if just 10 more of every 100 first time buyers ordered a second time?
          </p>
          <p className="mt-2 font-heading text-3xl font-semibold tabular-nums text-primary-soft">
            +{naira(extraMonthly)} a month
          </p>
          <p className="mt-1 font-body text-sm text-foreground-muted tabular-nums">
            about {naira(extraMonthly * 12)} over a year, with no extra ad spend.
          </p>
        </div>
      </div>
    </div>
  );
}
