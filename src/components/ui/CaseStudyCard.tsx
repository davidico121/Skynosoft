import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CaseStudy } from "@/lib/content";
import { Chip } from "@/components/ui/Chip";
import { MetricStat } from "@/components/ui/MetricStat";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

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
      className="group flex h-full flex-col rounded-xl border border-border-hairline bg-card p-8 transition-colors hover:border-border-hairline-strong"
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-high font-heading text-2xl font-semibold text-foreground-muted">
            {caseStudy.logoInitial}
          </div>
        )}
      </div>

      <h3 className="mt-6 font-heading text-3xl font-semibold text-balance">
        {caseStudy.brand}
      </h3>
      <p className="mt-1 font-label text-sm uppercase tracking-wide text-foreground-muted">
        {caseStudy.category}
      </p>
      <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
        {caseStudy.summary}
      </p>

      {caseStudy.metrics.length > 0 && (
        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-border-hairline pt-8">
          {caseStudy.metrics.slice(0, 3).map((m) => (
            <MetricStat key={m.label} value={m.value} label={m.label} size="sm" />
          ))}
        </div>
      )}

      <span
        className={`mt-6 inline-flex items-center gap-1.5 font-label text-sm uppercase tracking-wide text-primary-soft transition-transform duration-300 ${EASE} group-hover:translate-x-1`}
      >
        View case study
        <ArrowRight size={16} weight="bold" aria-hidden />
      </span>
    </Link>
  );
}
