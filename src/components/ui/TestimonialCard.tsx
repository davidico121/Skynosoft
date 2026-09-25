import { Testimonial } from "@/lib/content";
import { Paragraphs } from "./Paragraphs";
import { QuoteBadge } from "./QuoteBadge";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-xl bg-[#f7f6f3] p-8">
      <QuoteBadge />
      <blockquote className="mt-6">
        <Paragraphs
          quote
          text={testimonial.quote}
          className="font-heading text-headline-md font-medium leading-snug"
        />
      </blockquote>
      <figcaption className="mt-8 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
        {testimonial.name} — {testimonial.role}, {testimonial.brand}
      </figcaption>
    </figure>
  );
}
