import Image from "next/image";
import Link from "next/link";
import { EASE, FOCUS } from "@/components/ui/page-kit";
import { urlForImage } from "@/sanity/image";
import type { BlogPostSummary } from "@/sanity/queries";

export function BlogCard({ post, showDate = false }: { post: BlogPostSummary; showDate?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-border-hairline bg-card transition-all duration-300 ${EASE} hover:-translate-y-1 hover:border-border-hairline-strong active:scale-[0.99] ${FOCUS}`}
    >
      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={urlForImage(post.coverImage).width(800).height(450).fit("crop").url()}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-label text-sm uppercase tracking-wide text-primary-soft">
          {post.category}
        </p>
        <h3 className="mt-3 font-heading text-lg font-semibold text-balance">{post.title}</h3>
        <p className="mt-2 flex-1 font-body text-base text-foreground-muted text-pretty">
          {post.excerpt}
        </p>
        {showDate && post.publishedAt && (
          <p className="mt-6 font-label text-sm text-foreground-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
