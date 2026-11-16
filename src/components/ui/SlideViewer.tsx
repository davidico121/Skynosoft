"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import {
  ArrowsOut,
  CaretLeft,
  CaretRight,
  DownloadSimple,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { BUTTON, BUTTON_SECONDARY, FOCUS } from "@/components/ui/page-kit";

export type Slide = { src: string; alt: string };

const ICON_BUTTON = `h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 ${FOCUS}`;

export function SlideViewer({
  slides,
  downloadHref,
  downloadLabel = "Download the PPTX",
}: {
  slides: Slide[];
  downloadHref: string;
  downloadLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;

  const go = useCallback(
    (to: number) => setIndex(Math.max(0, Math.min(last, to))),
    [last],
  );

  const open = (at = 0) => {
    setIndex(at);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "Home") go(0);
      if (e.key === "End") go(last);
    };
    // Native <dialog> closes on Escape and keeps focus inside; lock page scroll while open.
    const onClose = () => document.documentElement.style.removeProperty("overflow");
    const observer = new MutationObserver(() => {
      if (dialog.open) document.documentElement.style.overflow = "hidden";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    window.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
      observer.disconnect();
    };
  }, [go, index, last]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const slide = slides[index];

  return (
    <div>
      {/* Cover preview: opens the presenter */}
      <button
        type="button"
        onClick={() => open(0)}
        className={`group relative block w-full overflow-hidden rounded-xl border border-border-hairline-strong bg-card shadow-lg ${FOCUS}`}
        aria-label={`Open the presentation, ${slides.length} slides`}
      >
        <Image
          src={slides[0].src}
          alt={slides[0].alt}
          width={1920}
          height={1080}
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
          priority={false}
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-black/0 to-black/0 p-6 opacity-100 transition-opacity md:items-center md:bg-black/30 md:opacity-0 md:group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-body text-base font-semibold text-foreground shadow-lg">
            <ArrowsOut size={20} weight="bold" aria-hidden />
            Open the presentation
          </span>
        </span>
      </button>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => open(0)} className={`gap-2 px-5 py-3 ${BUTTON}`}>
          <ArrowsOut size={20} weight="bold" aria-hidden />
          View all {slides.length} slides
        </button>
        <a href={downloadHref} download className={`gap-2 px-5 py-3 ${BUTTON_SECONDARY}`}>
          <DownloadSimple size={20} weight="bold" aria-hidden />
          {downloadLabel}
        </a>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Proposal presentation"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#0f0b0c] p-0 text-white backdrop:bg-black/80"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <p className="font-body text-sm text-white/70" aria-live="polite">
              Slide {index + 1} of {slides.length}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={downloadHref}
                download
                className={`hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:inline-flex ${FOCUS}`}
              >
                <DownloadSimple size={18} weight="bold" aria-hidden />
                PPTX
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className={`inline-flex ${ICON_BUTTON}`}
                aria-label="Close the presentation"
                autoFocus
              >
                <X size={22} weight="bold" aria-hidden />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20">
            <div className="relative aspect-video max-h-full w-full max-w-[min(100%,calc((100dvh-160px)*16/9))]">
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
                priority
              />
            </div>
            {/* Preload the next slide so paging feels instant */}
            {index < last && (
              <Image
                src={slides[index + 1].src}
                alt=""
                width={1920}
                height={1080}
                sizes="100vw"
                className="hidden"
                aria-hidden
              />
            )}
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className={`absolute left-2 top-1/2 hidden -translate-y-1/2 md:inline-flex ${ICON_BUTTON}`}
              aria-label="Previous slide"
            >
              <CaretLeft size={24} weight="bold" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === last}
              className={`absolute right-2 top-1/2 hidden -translate-y-1/2 md:inline-flex ${ICON_BUTTON}`}
              aria-label="Next slide"
            >
              <CaretRight size={24} weight="bold" aria-hidden />
            </button>
          </div>

          <p className="px-4 text-center font-body text-xs text-white/50 landscape:hidden md:hidden">
            Turn your phone sideways for a bigger view.
          </p>
          <div className="flex items-center justify-center gap-3 px-4 py-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className={`inline-flex md:hidden ${ICON_BUTTON}`}
              aria-label="Previous slide"
            >
              <CaretLeft size={22} weight="bold" aria-hidden />
            </button>
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto py-1" role="group" aria-label="Jump to slide">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-2 shrink-0 rounded-full transition-all ${FOCUS} ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === last}
              className={`inline-flex md:hidden ${ICON_BUTTON}`}
              aria-label="Next slide"
            >
              <CaretRight size={22} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
