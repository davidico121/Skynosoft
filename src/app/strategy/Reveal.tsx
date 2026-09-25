"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/**
 * Fades an element up (translate, blur, opacity) as it enters the viewport.
 * Content is fully visible until the client mounts, so nothing is hidden without JS,
 * and anything already on screen never animates.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${EASE} motion-reduce:transition-none ${
        hidden ? "translate-y-16 opacity-0 blur-md" : "translate-y-0 opacity-100 blur-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A large statement whose words move from a muted tone to full colour, one at a time,
 * as they cross a trigger line about 60% of the way down the viewport.
 */
export function TaglineReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState<Set<number>>(new Set());
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            const passed = entry.boundingClientRect.top < 0;
            if (entry.isIntersecting || passed) next.add(index);
            else next.delete(index);
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    el.querySelectorAll("span[data-index]").forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-index={i}
          className={`transition-colors duration-700 ${EASE} motion-reduce:transition-none ${
            !armed || active.has(i) ? "text-foreground" : "text-foreground/30"
          }`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
