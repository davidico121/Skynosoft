import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use — Skynosoft",
  description:
    "The terms for using the Skynosoft website.",
  path: "/terms",
});


export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="26 September 2026"
      intro="These terms cover your use of skynosoft.net. Work we do for clients is covered by a separate written agreement."
    >
      <h2>Using this website</h2>
      <p>
        You may browse this site and share links to it. Please do not misuse it, try to break or
        overload it, or copy its content in a way that suggests it is yours.
      </p>

      <h2>Case studies and results</h2>
      <p>
        The case studies and figures on this site describe results for specific clients in specific
        circumstances. They are examples of past work, not a promise or forecast of what any other
        business will achieve.
      </p>

      <h2>Content and ownership</h2>
      <p>
        The text, design and images we created belong to Skynosoft Ltd. Brand names, logos and
        screenshots of client sites belong to their respective owners and are shown to illustrate
        our work.
      </p>

      <h2>Blog</h2>
      <p>
        Blog posts are general information, not professional advice for your particular business.
      </p>

      <h2>Third party services and links</h2>
      <p>
        This site links to and embeds services we do not control, such as Calendly. Their terms and
        privacy policies apply when you use them.
      </p>

      <h2>Limits on our liability</h2>
      <p>
        We work to keep this site accurate and available, but it is provided as it is. To the
        extent the law allows, Skynosoft Ltd is not liable for losses that come from relying on the
        content of this website.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent through the booking page at skynosoft.net/contact.</p>
    </LegalPage>
  );
}
