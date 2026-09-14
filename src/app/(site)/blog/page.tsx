import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog — Skynosoft",
  description:
    "CRO, ecommerce website design, and email marketing insights from Skynosoft.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);

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
          {posts.length === 0 ? (
            <p className="text-center font-body text-body-lg text-foreground-muted">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-border-hairline bg-card transition-colors hover:border-border-hairline-strong"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={urlForImage(post.coverImage)
                          .width(800)
                          .height(450)
                          .fit("crop")
                          .url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-8">
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
                      {post.publishedAt &&
                        new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
