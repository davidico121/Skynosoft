import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON, Eyebrow, Section, Wrap } from "@/components/ui/page-kit";
import { FinalCta } from "@/components/ui/sections";
import { CTA_LABEL } from "@/lib/content";
import { client } from "@/sanity/client";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog — Skynosoft",
  description:
    "CRO, ecommerce website design and email marketing notes from the campaigns and rebuilds Skynosoft runs every day.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);

  return (
    <>
      <section>
        <Wrap className="pb-24 pt-16">
          <Reveal>
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-6 max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
              Notes on ecommerce growth.
            </h1>
            <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
              CRO, website design and email marketing notes from the campaigns and rebuilds we run
              every day.
            </p>
            <Link href="/contact" className={`mt-8 ${BUTTON}`}>
              {CTA_LABEL}
            </Link>
          </Reveal>
        </Wrap>
      </section>

      <Section tint>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-[680px] rounded-xl border border-border-hairline bg-white p-8 text-center">
            <h2 className="font-heading text-2xl font-semibold">New posts are on the way</h2>
            <p className="mt-4 font-body text-base text-foreground-muted text-pretty">
              Nothing is published yet. In the meantime, the case studies show the work behind the
              advice.
            </p>
            <Link href="/case-studies" className={`mt-6 ${BUTTON}`}>
              See case studies
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Reveal key={post._id}>
                <BlogCard post={post} showDate />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <FinalCta tint={false} />
    </>
  );
}
