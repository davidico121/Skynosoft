import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Skynosoft`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <section className="border-b border-border-hairline">
        <Container className="py-24 md:py-28">
          <Chip>{post.category}</Chip>
          <h1 className="mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            {post.title}
          </h1>
          <p className="mt-4 font-label text-label-mono text-foreground-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl py-section-gap">
          <p className="font-body text-body-lg text-foreground-muted">
            {post.excerpt}
          </p>
          <p className="mt-6 font-body text-body-lg text-foreground-muted">
            Full article content coming soon — this post will be managed in
            Sanity once the CMS is connected.
          </p>
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="flex flex-col items-center py-section-gap text-center">
          <h2 className="max-w-2xl font-heading text-headline-lg font-semibold">
            Want this applied to your brand?
          </h2>
          <div className="mt-8">
            <Button href="/contact">Book a Call / Audit</Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
