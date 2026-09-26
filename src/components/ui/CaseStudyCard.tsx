import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/lib/content";
import { Chip } from "@/components/ui/Chip";
import { MetricStat } from "@/components/ui/MetricStat";

export function CaseStudyCard({
  caseStudy,
  baseUrl = "",
}: {
  caseStudy: CaseStudy;
  /** Prefix for the link, for pages served from another host. */
  baseUrl?: string;
}) {
  return (
    <Link
      href={`${baseUrl}/case-studies/${caseStudy.slug}`}
      className="group flex flex-col rounded-xl border border-border-hairline bg-card p-8 transition-colors hover:border-border-hairline-strong"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {caseStudy.services.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        {caseStudy.logo ? (
          <div className="h-8 w-28 shrink-0">
            <Image
              src={caseStudy.logo.src}
              alt={`${caseStudy.brand} logo`}
              width={caseStudy.logo.width}
              height={caseStudy.logo.height}
              unoptimized={caseStudy.logo.src.endsWith(".svg")}
              className="h-full w-full object-contain object-right"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-container-high font-heading text-headline-md text-foreground-muted">
            {caseStudy.logoInitial}
          </div>
        )}
      </div>

      <h3 className="mt-6 font-heading text-headline-md font-semibold">
        {caseStudy.brand}
      </h3>
      <p className="mt-1 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
        {caseStudy.category}
      </p>
      <p className="mt-4 font-body text-body-md text-foreground-muted">
        {caseStudy.summary}
      </p>

      {caseStudy.metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border-hairline pt-6">
          {caseStudy.metrics.slice(0, 3).map((m) => (
            <MetricStat key={m.label} value={m.value} label={m.label} size="sm" />
          ))}
        </div>
      )}
    </Link>
  );
}
