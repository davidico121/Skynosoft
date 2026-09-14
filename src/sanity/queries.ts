import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type SanityImageWithAlt = Image & { alt?: string };

export type TableBlock = {
  _type: "table";
  _key: string;
  headers: string[];
  rows: { cells: string[]; highlighted?: boolean }[];
};

export type CtaCardBlock = {
  _type: "ctaCard";
  _key: string;
  heading: string;
  body: string;
  linkHref: string;
  linkLabel: string;
};

export type BodyBlock =
  | PortableTextBlock
  | (SanityImageWithAlt & { _type: "image"; _key: string })
  | TableBlock
  | CtaCardBlock;

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  publishedAt: string;
  coverImage: SanityImageWithAlt | null;
};

export type BlogPostDetail = BlogPostSummary & {
  author: string | null;
  body: BodyBlock[] | null;
  coverImage: SanityImageWithAlt | null;
};

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    coverImage
  }
`);

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    author,
    publishedAt,
    body,
    coverImage
  }
`);

export const allBlogSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`);
