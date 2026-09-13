type Tone = "primary" | "growth";
type Size = "sm" | "lg";

const toneClass: Record<Tone, string> = {
  primary: "text-primary-soft",
  growth: "text-growth-green",
};

const sizeClass: Record<Size, string> = {
  sm: "text-2xl md:text-3xl font-bold tracking-tight",
  lg: "text-metric-display",
};

export function MetricStat({
  value,
  label,
  tone = "growth",
  size = "lg",
}: {
  value: string;
  label: string;
  tone?: Tone;
  size?: Size;
}) {
  return (
    <div>
      <div className={`font-heading ${sizeClass[size]} ${toneClass[tone]}`}>
        {value}
      </div>
      <div className="mt-1 font-label text-label-mono uppercase tracking-wide text-foreground-muted">
        {label}
      </div>
    </div>
  );
}
