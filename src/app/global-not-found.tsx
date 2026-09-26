import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import "./(site)/globals.css";
import logo from "../../public/brand/skynosoft-logo-horizontal.png";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found — Skynosoft",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hanken.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <header className="flex justify-center px-4 pt-6">
          <Link href="/" aria-label="Skynosoft home">
            <Image src={logo} alt="Skynosoft" height={32} className="w-auto" priority />
          </Link>
        </header>
        <main id="main">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
