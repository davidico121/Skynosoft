import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { BUTTON, EASE, Eyebrow, FOCUS, Section, Wrap } from "@/components/ui/page-kit";
import { FinalCta } from "@/components/ui/sections";
import { CTA_LABEL } from "@/lib/content";
import { urlForImage } from "@/sanity/image";
import { client } from "@/sanity/client";
import { allBlogPostsQuery, type BlogPostSummary } from "@/sanity/queries";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Skynosoft",
  description:
    "CRO, ecommerce website design and email marketing notes from the campaigns and rebuilds Skynosoft runs every day.",
  path: "/blog",
});


export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostSummary[]>(allBlogPostsQuery);
  const latest = posts[0];

  return (
    <>
      <section>
        <Wrap className="pb-24 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,680px)_1fr]">
            <Reveal>
              <Eyebrow>Blog</Eyebrow>
              <h1 className="mt-6 bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text font-heading text-4xl font-bold text-balance text-transparent md:text-5xl">
                Notes on ecommerce growth.
              </h1>
              <p className="mt-6 max-w-[680px] font-body text-lg text-foreground-muted text-pretty">
                CRO, website design and email marketing notes from the campaigns and rebuilds we
                run every day.
              </p>
              <Link href="/contact" className={`mt-8 ${BUTTON}`}>
                {CTA_LABEL}
              </Link>
            </Reveal>

            {latest && (
              <Reveal delay={150}>
                <Link
                  href={`/blog/${latest.slug?.current}`}
                  className={`group block overflow-hidden rounded-xl border border-border-hairline-strong bg-white shadow-lg transition-all duration-300 ${EASE} hover:-translate-y-1 active:scale-[0.99] ${FOCUS}`}
                >
                  {latest.coverImage && (
                    <div className="relative aspect-[5/2] w-full">
                      <Image
                        src={urlForImage(latest.coverImage).width(1200).height(675).fit("crop").url()}
                        alt={latest.coverImage.alt || latest.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 420px, 100vw"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-label text-xs uppercase tracking-wide text-white">
                        Latest
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-label text-sm uppercase tracking-wide text-primary-soft">
                      {latest.category}
                    </p>
                    <h2 className="mt-2 font-heading text-lg font-semibold text-balance">
                      {latest.title}
                    </h2>
                    <p className="mt-3 font-body text-base font-semibold text-primary-soft">
                      Read the post →
                    </p>
                  </div>
                </Link>
              </Reveal>
            )}
          </div>
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
