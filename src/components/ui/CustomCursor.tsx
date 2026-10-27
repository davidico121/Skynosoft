"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { EASE } from "@/components/ui/page-kit";

const noopSubscribe = () => () => {};

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, label";

/**
 * Replaces the system cursor with a tight dot plus a lagging ring that grows
 * over interactive elements. Desktop mouse pointers only — gated behind
 * (hover: hover) and (pointer: fine) so touch devices attach no listeners at
 * all, and behind prefers-reduced-motion so it never fights the OS cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = "none";

    let x = 0;
    let y = 0;
    let hovering = false;
    let frame = 0;
    let pending = false;

    const apply = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate3d(${x}px, ${y}px, 1px) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 1px) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      pending = false;
    };

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(apply);
    };

    const onOver = (e: Event) => {
      if (!(e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
      hovering = true;
      apply();
    };
    const onOut = (e: Event) => {
      if (!(e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
      hovering = false;
      apply();
    };

    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] isolate">
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 h-2 w-2 rounded-full bg-primary opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 h-8 w-8 rounded-full border border-primary opacity-0 transition-transform duration-200 ${EASE} will-change-transform`}
      />
    </div>,
    document.body,
  );
}
