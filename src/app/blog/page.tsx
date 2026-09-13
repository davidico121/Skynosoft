import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Skynosoft",
  description:
    "CRO, ecommerce website design, and email marketing insights from Skynosoft.",
};

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-border-hairline">
        <Container className="py-24 text-center md:py-28">
          <Chip>Blog</Chip>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            Notes on ecommerce growth.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-foreground-muted">
            CRO, website design, and email marketing insights from the
            campaigns and rebuilds we run every day.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-section-gap">
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col rounded-xl border border-border-hairline bg-card p-8 transition-colors hover:border-border-hairline-strong"
              >
                <p className="font-label text-label-mono uppercase tracking-wide text-primary-soft">
                  {post.category}
                </p>
                <h2 className="mt-4 font-heading text-headline-md font-semibold">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 font-body text-body-md text-foreground-muted">
                  {post.excerpt}
                </p>
                <p className="mt-6 font-label text-label-mono text-foreground-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {post.readTime}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
