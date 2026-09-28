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
        Find your revenue leak
      </p>
      <Link href="/contact" className={`mt-6 w-full ${BUTTON}`}>
        {CTA_LABEL}
      </Link>
    </div>
  );
}
