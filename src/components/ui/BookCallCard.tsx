import Image from "next/image";
import Link from "next/link";
import { BUTTON } from "@/components/ui/page-kit";
import { CTA_LABEL } from "@/lib/content";

export function BookCallCard({ className = "bg-card" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-border-hairline p-6 ${className}`}>
      <Image
        src="/brand/skynosoft-icon.png"
        alt="Skynosoft"
        width={40}
        height={40}
        className="rounded-md"
      />
      <p className="mt-4 font-heading text-2xl font-semibold text-balance">
        Want results like this for your brand?
      </p>
      <p className="mt-3 font-body text-base text-foreground-muted text-pretty">
        We look at your store and your emails together and show you where revenue is leaking. It
        is free, and you leave with a plan.
      </p>
      <Link href="/contact" className={`mt-6 w-full ${BUTTON}`}>
        {CTA_LABEL}
      </Link>
    </div>
  );
}
