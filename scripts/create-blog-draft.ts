import fs from "node:fs";
import crypto from "node:crypto";
import { getWriteClient } from "../src/sanity/writeClient";
import { SITE_URL } from "../src/lib/content";

type BodyItem = Record<string, unknown> & { _key?: string; children?: unknown[] };

function withKeys(body: BodyItem[]): BodyItem[] {
  return body.map((item) => {
    const key = item._key || crypto.randomUUID();
    const children = Array.isArray(item.children)
      ? item.children.map((child) => ({
          _key: (child as Record<string, unknown>)._key || crypto.randomUUID(),
          ...(child as Record<string, unknown>),
        }))
      : undefined;
    return { ...item, _key: key, ...(children ? { children } : {}) };
  });
}

async function main() {
  const [jsonPath] = process.argv.slice(2);
  if (!jsonPath) {
    console.error("Usage: npx tsx scripts/create-blog-draft.ts <post.json>");
    process.exit(1);
  }

  const post = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const required = ["slug", "title", "category", "excerpt", "body", "publishedAt"];
  for (const field of required) {
    if (!post[field]) {
      console.error(`Missing required field: ${field}`);
      process.exit(1);
    }
  }

  const client = getWriteClient();
  const draftId = `drafts.${post.slug}`;

  const doc = {
    _id: draftId,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    category: post.category,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    ...(post.coverImage ? { coverImage: post.coverImage } : {}),
    body: withKeys(post.body),
  };

  await client.createOrReplace(doc);

  console.log(`Draft created: ${post.title}`);
  console.log(`Review at: ${SITE_URL}/studio/structure/blogPost;${post.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
