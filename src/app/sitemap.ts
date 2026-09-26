import type { MetadataRoute } from "next";
import { caseStudies, SITE_URL } from "@/lib/content";
import { client } from "@/sanity/client";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/services", "/case-studies", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const workRoutes = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    lastModified: new Date(),
  }));

  const posts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);
  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug?.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
