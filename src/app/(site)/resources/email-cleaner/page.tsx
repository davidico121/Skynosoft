import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { EmailCleanerTool } from "@/components/tools/EmailCleanerTool";
import { BUTTON, Wrap } from "@/components/ui/page-kit";
import { CTA_LABEL } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Free email list cleaner: fix badly formatted emails — Skynosoft",
  description:
    "Free tool that fixes broken email addresses from verifier and scraper exports: mailto: in front, commas instead of dots, stray characters and typos. Runs in your browser, nothing is uploaded.",
  path: "/resources/email-cleaner",
});

export default function EmailCleanerPage() {
  return (
    <>
      <EmailCleanerTool />
      <section className="border-t border-border-hairline bg-card">
        <Wrap className="flex flex-col items-start gap-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-balance">Clean list. Now make it pay.</h2>
            <p className="mt-2 max-w-[560px] font-body text-base text-foreground-muted text-pretty">
              Skynosoft builds Klaviyo email and SMS systems for ecommerce brands, from welcome flows to Black Friday.
            </p>
          </div>
          <Link href="/contact" className={`px-5 py-3 ${BUTTON}`}>
            {CTA_LABEL}
          </Link>
        </Wrap>
      </section>
    </>
  );
}
