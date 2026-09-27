import { FOCUS } from "@/components/ui/page-kit";

export function CalendlyEmbed({ url, height = 700 }: { url: string; height?: number }) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border-hairline bg-card">
        <iframe
          src={url}
          width="100%"
          height={height}
          className="block"
          title="Book a call with Skynosoft"
        />
      </div>
      <p className="mt-6 font-body text-sm text-foreground-muted">
        Trouble loading the calendar?{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded text-primary-soft underline underline-offset-4 ${FOCUS}`}
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
