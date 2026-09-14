import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type SanityImageWithAlt = Image & { alt?: string };

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
  body: PortableTextBlock[] | null;
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
    publishedAt,
    body,
    coverImage
  }
`);

export const allBlogSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`);
