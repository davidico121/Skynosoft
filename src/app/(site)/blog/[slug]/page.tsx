import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { BlogCard } from "@/components/blog/BlogCard";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import {
  BUTTON,
  EASE,
  Eyebrow,
  FOCUS,
  Section,
  Wrap,
} from "@/components/ui/page-kit";
import { FinalCta } from "@/components/ui/sections";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { CTA_LABEL, SITE_NAME, SITE_URL, caseStudies } from "@/lib/content";
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

const caseSlugsByCategory: Record<string, string[]> = {
  CRO: ["medgear", "afrocenchix"],
  "Website Design": ["afrocenchix", "thyvita"],
  "Email Marketing": ["novaya", "bwll"],
  Strategy: ["thyvita", "novaya"],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getBlockText(block: unknown): string {
  const children = (block as { children?: unknown[] })?.children || [];
  return children
    .map((child) => (child as { text?: string })?.text || "")
    .join("");
}

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-xl border border-border-hairline bg-card p-6 font-body text-base text-foreground not-italic">
        {children}
      </blockquote>
    ),
    h2: ({ children, value }) => (
      <h2 id={slugify(getBlockText(value))} className="scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugify(getBlockText(value))} className="scroll-mt-24">
        {children}
      </h3>
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
        <span className="relative block aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={urlForImage(value).width(1600).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </span>
        {value.caption && (
          <figcaption className="mt-3 text-center font-body text-base text-foreground-muted">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    table: ({ value }: { value: TableBlock }) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-border-hairline">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-hairline bg-card">
              {value.headers.map((header, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-3 font-label text-sm uppercase tracking-wide text-foreground-muted"
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
                  <td
                    key={j}
                    className="px-4 py-3 font-body text-base text-foreground"
                  >
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
          <p className="font-heading text-lg font-semibold text-foreground">{value.heading}</p>
          <p className="mt-1 font-body text-base text-foreground-muted">
            {value.body}
          </p>
        </div>
        <Link href={value.linkHref} data-button className={`shrink-0 no-underline ${BUTTON}`}>
          {value.linkLabel}
        </Link>
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
          url: urlForImage(post.coverImage)
            .width(1200)
            .height(630)
            .fit("crop")
            .url(),
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
      siteName: SITE_NAME,
      images: ogImages ?? [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: (ogImages ?? [DEFAULT_OG_IMAGE]).map((image) => image.url),
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
    { slug },
  );

  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1600).height(900).fit("crop").url()
    : undefined;

  const headings = (post.body || [])
    .map((block) => block as { _type?: string; style?: string })
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3"),
    )
    .map((block) => ({
      level: block.style as "h2" | "h3",
      text: getBlockText(block),
      id: slugify(getBlockText(block)),
    }))
    .filter((h) => h.text.length > 0);

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

  const featuredCases = (caseSlugsByCategory[post.category] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c) => c !== undefined);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section>
        <Wrap className="pb-12 pt-16">
          <Reveal className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className={`rounded font-label text-sm uppercase tracking-wide text-primary-soft hover:underline ${FOCUS}`}
            >
              ← Blog
            </Link>
            <div className="mt-6">
              <Chip>{post.category}</Chip>
            </div>
            <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 font-label text-sm text-foreground-muted">
              {post.author && <>By {post.author} · </>}
              {post.publishedAt &&
                new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </Reveal>
        </Wrap>
      </section>

      {coverImageUrl && (
        <Wrap className="pb-12">
          <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden rounded-xl border border-border-hairline">
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        </Wrap>
      )}

      <section>
        <Wrap className="pb-24">
          <div className="mx-auto max-w-3xl">
            {headings.length >= 2 && (
              <details
                open
                className="group mb-12 rounded-xl border border-border-hairline bg-card p-6"
              >
                <summary
                  className={`cursor-pointer rounded font-heading text-lg font-semibold ${FOCUS}`}
                >
                  In this article
                </summary>
                <ul className="mt-4 flex flex-col gap-2">
                  {headings.map((h) => (
                    <li
                      key={h.id}
                      className={h.level === "h3" ? "ml-5" : undefined}
                    >
                      <a
                        href={`#${h.id}`}
                        className={`rounded font-body text-base text-primary-soft transition-colors duration-300 ${EASE} hover:underline ${FOCUS}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {post.body ? (
              <div className="prose-blog font-body text-lg text-foreground-muted">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="font-body text-lg text-foreground-muted">
                {post.excerpt}
              </p>
            )}
            <div className="mt-12 flex flex-col gap-4 rounded-xl border border-border-hairline bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-heading text-xl font-semibold text-balance">
                Want this applied to your brand?
              </p>
              <Link href="/contact" className={`shrink-0 ${BUTTON}`}>
                {CTA_LABEL}
              </Link>
            </div>
          </div>
        </Wrap>
      </section>

      {featuredCases.length > 0 && (
        <Section tint>
          <Reveal>
            <Eyebrow>See it in practice</Eyebrow>
            <h2 className="mt-4 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
              The same ideas, on real stores
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {featuredCases.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold text-balance">
            Comments {comments.length > 0 && `(${comments.length})`}
          </h2>

          {comments.length > 0 && (
            <div className="mt-8 flex flex-col gap-6">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="rounded-xl border border-border-hairline bg-card p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-heading text-base font-semibold">
                      {c.name}
                    </p>
                    <p className="font-label text-sm text-foreground-muted">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="mt-2 font-body text-base text-foreground-muted">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <CommentForm postSlug={slug} />
          </div>
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section tint>
          <Reveal>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="mt-4 max-w-[680px] font-heading text-3xl font-semibold text-balance md:text-4xl">
              Related articles
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related._id} post={related} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <FinalCta tint={relatedPosts.length === 0} />
    </article>
  );
}
