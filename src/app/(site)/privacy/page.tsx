import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy — Skynosoft",
  description:
    "How Skynosoft collects and uses personal data, including for visitors in the UK, the EU and California.",
  path: "/privacy",
});


export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="26 September 2026"
      intro="This policy explains what personal data Skynosoft Ltd collects when you use skynosoft.net, why we collect it, and the choices you have. We keep it short because we collect very little."
    >
      <h2>Who we are</h2>
      <p>
        Skynosoft Ltd (&ldquo;Skynosoft&rdquo;, &ldquo;we&rdquo;) is an ecommerce growth agency
        founded by David Owoeye. We are the controller of the personal data described below. To
        contact us about your data, use the booking page at skynosoft.net/contact and mention
        privacy.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li>
          <strong>Booking a call.</strong> When you book through our Calendly calendar, Calendly
          collects the details you enter, such as your name, email address and answers to any
          questions. We receive them so we can run the call. Our legal basis is taking steps at
          your request before entering into a contract.
        </li>
        <li>
          <strong>Blog comments.</strong> If you post a comment we store your name, your comment
          and, if you give it, your email address. Your email is never published. Comments are
          moderated before they appear. Our legal basis is your consent.
        </li>
        <li>
          <strong>Server logs.</strong> Our hosting provider records technical data such as your IP
          address, browser and the pages requested, to keep the site secure and working. Our legal
          basis is our legitimate interest in running a secure website.
        </li>
      </ul>
      <p>
        We do not use advertising trackers or analytics tools on this website, and we do not sell
        your personal data.
      </p>

      <h2>Cookies</h2>
      <p>
        Skynosoft does not set cookies of its own on this site. The booking calendar is provided by
        Calendly and is only loaded after you choose to load it. Once loaded, Calendly may set its
        own cookies under its own privacy policy. If you would rather not load it, you can open
        Calendly in a separate tab instead.
      </p>

      <h2>Who we share data with</h2>
      <p>
        We use a small number of service providers to run the site: Calendly (scheduling), Sanity
        (content and comments storage) and Vercel (hosting). They process data on our behalf. Some
        of them are based in the United States. Where data leaves the UK or the European Economic
        Area, it is protected by approved safeguards such as standard contractual clauses.
      </p>

      <h2>How long we keep data</h2>
      <p>
        Comments stay until you ask us to remove them or we delete them. Booking details are kept
        for as long as needed to run the conversation and for our legal and accounting
        obligations. Server logs are kept for a short period set by our hosting provider.
      </p>

      <h2>Your rights in the UK and the EU</h2>
      <p>
        You can ask to see the personal data we hold about you, correct it, delete it, restrict or
        object to how we use it, receive a copy in a portable format, and withdraw consent at any
        time. You also have the right to complain to your data protection authority, such as the
        Information Commissioner&rsquo;s Office in the UK.
      </p>

      <h2>Your rights in California</h2>
      <p>
        If you live in California you can ask us what personal information we collect and why,
        request that we delete or correct it, and be free from discrimination for doing so. We do
        not sell personal information or share it for cross context behavioral advertising.
      </p>

      <h2>Children</h2>
      <p>This site is for business owners and is not aimed at anyone under 16.</p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle personal data we will update this page and the date at the top.
      </p>
    </LegalPage>
  );
}
