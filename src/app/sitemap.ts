import type { MetadataRoute } from "next";
import { blogPosts, caseStudies, SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/work", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const workRoutes = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/work/${caseStudy.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
