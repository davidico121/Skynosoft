import type { Metadata } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/content";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const defaultDescription =
  "Skynosoft is an ecommerce growth agency combining high-converting website design, CRO, and email marketing to scale DTC brands to 7 figures and beyond.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Skynosoft — ...where brands fly",
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Skynosoft — ...where brands fly",
    description: defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/brand/skynosoft-logo.jpg", width: 500, height: 500 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Skynosoft — ...where brands fly",
    description: defaultDescription,
    images: ["/brand/skynosoft-logo.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Skynosoft is an ecommerce growth agency combining high-converting website design, CRO, and email marketing to scale DTC brands to 7 figures and beyond.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hanken.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
