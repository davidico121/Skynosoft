import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SITE_NAME, SITE_URL } from "@/lib/content";
import { client } from "@/sanity/client";
import { getCommentsClient, type Comment } from "@/sanity/commentsClient";
import { urlForImage } from "@/sanity/image";
import { CommentForm } from "@/components/blog/CommentForm";
import {
  allBlogPostsQuery,
  allBlogSlugsQuery,
  blogPostBySlugQuery,
  type BlogPostDetail,
  type BlogPostSummary,
  type CtaCardBlock,
  type SanityImageWithAlt,
  type TableBlock,
} from "@/sanity/queries";

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-lg border-l-4 border-primary bg-card px-6 py-4 font-body text-body-md text-foreground not-italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value?.href as string) || "#";
      if (href.startsWith("http")) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={href}>{children}</Link>;
    },
  },
  types: {
    image: ({ value }: { value: SanityImageWithAlt }) => (
      <figure className="my-8">
        <span className="relative block aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={urlForImage(value).width(1600).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </span>
        {value.caption && (
          <figcaption className="mt-3 text-center font-body text-body-md italic text-foreground-muted">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    table: ({ value }: { value: TableBlock }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-border-hairline">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-hairline bg-card">
              {value.headers.map((header, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-3 font-label text-label-mono uppercase tracking-wide text-foreground-muted"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, i) => (
              <tr
                key={i}
                className={
                  row.highlighted
                    ? "bg-primary/10"
                    : i % 2 === 1
                      ? "bg-card/50"
                      : undefined
                }
              >
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-4 py-3 font-body text-body-md text-foreground">
                    {row.highlighted && j === 0 ? `★ ${cell}` : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    ctaCard: ({ value }: { value: CtaCardBlock }) => (
      <div className="my-8 flex flex-col gap-4 rounded-xl border border-border-hairline-strong bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-body-lg font-semibold">{value.heading}</p>
          <p className="mt-1 font-body text-body-md text-foreground-muted">{value.body}</p>
        </div>
        <Button href={value.linkHref} className="shrink-0">
          {value.linkLabel}
        </Button>
      </div>
    ),
  },
};

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

  const ogImages = post.coverImage
    ? [
        {
          url: urlForImage(post.coverImage).width(1200).height(630).fit("crop").url(),
          width: 1200,
          height: 630,
          alt: post.coverImage.alt || post.title,
        },
      ]
    : undefined;

  return {
    title: `${post.title} — Skynosoft`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImages?.map((image) => image.url),
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

  const comments = await getCommentsClient().fetch<Comment[]>(
    `*[_type == "comment" && postSlug == $slug && approved == true] | order(createdAt asc){_id, name, body, createdAt}`,
    { slug }
  );

  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1600).height(900).fit("crop").url()
    : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    ...(coverImageUrl && { image: coverImageUrl }),
    author: {
      "@type": "Organization",
      name: post.author || SITE_NAME,
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
            {post.author && <>By {post.author} · </>}
            {post.publishedAt &&
              new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </Container>
      </section>

      {coverImageUrl && (
        <Container className="max-w-3xl pt-section-gap">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        </Container>
      )}

      <section>
        <Container className="max-w-3xl py-section-gap">
          {post.body ? (
            <div className="prose-blog font-body text-body-lg text-foreground-muted">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          ) : (
            <p className="font-body text-body-lg text-foreground-muted">
              {post.excerpt}
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-border-hairline">
        <Container className="max-w-3xl py-section-gap">
          <h2 className="font-heading text-headline-md font-semibold">
            Comments {comments.length > 0 && `(${comments.length})`}
          </h2>

          {comments.length > 0 && (
            <div className="mt-8 flex flex-col gap-6">
              {comments.map((c) => (
                <div key={c._id} className="rounded-lg border border-border-hairline bg-card p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-heading text-body-md font-semibold">{c.name}</p>
                    <p className="font-label text-label-mono text-foreground-muted">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="mt-2 font-body text-body-md text-foreground-muted">{c.body}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <CommentForm postSlug={slug} />
          </div>
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
