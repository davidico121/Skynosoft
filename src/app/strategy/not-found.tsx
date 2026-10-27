import { SITE_URL } from "@/lib/content";
import { EASE } from "@/components/ui/page-kit";

export default function StrategyNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-4xl font-semibold text-balance">
        This page isn&rsquo;t available
      </h1>
      <p className="mt-4 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
        The link may have changed or expired. If you were sent it by Skynosoft, reply to that
        message and we will send a fresh one.
      </p>
      <a
        href={SITE_URL}
        className={`mt-8 rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
      >
        Go to skynosoft.net
      </a>
    </main>
  );
}
