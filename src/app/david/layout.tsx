import type { Metadata } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "../(site)/globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const title = "David Owoeye — Ecommerce CRO & Email Retention";
const description =
  "I find where ecommerce stores lose sales between a click and a checkout, fix it, and build the email and SMS systems that bring customers back.";

export const metadata: Metadata = {
  metadataBase: new URL("https://david.skynosoft.net"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://david.skynosoft.net",
    siteName: "David Owoeye",
    type: "profile",
    images: [
      {
        url: "/brand/og-default.png",
        width: 1200,
        height: 630,
        alt: "David Owoeye, ecommerce CRO and email retention specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/og-default.png"],
  },
};

export default function DavidLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hanken.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
