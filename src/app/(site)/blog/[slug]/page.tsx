import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SITE_NAME, SITE_URL } from "@/lib/content";
import { client } from "@/sanity/client";
import {
  allBlogPostsQuery,
  allBlogSlugsQuery,
  blogPostBySlugQuery,
  type BlogPostDetail,
  type BlogPostSummary,
} from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allBlogSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPostDetail | null>(blogPostBySlugQuery, {
    slug,
  });
  if (!post) return {};
  return {
    title: `${post.title} — Skynosoft`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<BlogPostDetail | null>(blogPostBySlugQuery, {
    slug,
  });
  if (!post) notFound();

  const allPosts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);
  const relatedPosts = allPosts
    .filter((p) => p.slug?.current !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section className="border-b border-border-hairline">
        <Container className="py-24 md:py-28">
          <Chip>{post.category}</Chip>
          <h1 className="mt-6 max-w-3xl font-heading text-display-xl-mobile font-bold tracking-tight md:text-headline-lg">
            {post.title}
          </h1>
          <p className="mt-4 font-label text-label-mono text-foreground-muted">
            {post.publishedAt &&
              new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl py-section-gap">
          {post.body ? (
            <div className="prose-blog font-body text-body-lg text-foreground-muted">
              <PortableText value={post.body} />
            </div>
          ) : (
            <p className="font-body text-body-lg text-foreground-muted">
              {post.excerpt}
            </p>
          )}
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border-hairline">
          <Container className="py-section-gap">
            <h2 className="font-heading text-headline-md font-semibold">
              Related Articles
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug?.current}`}
                  className="group flex flex-col gap-2"
                >
                  <span className="font-label text-label-mono uppercase tracking-wide text-foreground-muted">
                    {related.category}
                  </span>
                  <span className="font-heading text-body-lg font-semibold group-hover:underline">
                    {related.title}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

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
