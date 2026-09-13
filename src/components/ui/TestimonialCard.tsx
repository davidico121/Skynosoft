import { Testimonial } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-xl border border-border-hairline bg-card p-8">
      <blockquote className="font-heading text-headline-md font-medium leading-snug">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
        {testimonial.name} — {testimonial.role}, {testimonial.brand}
      </figcaption>
    </figure>
  );
}
