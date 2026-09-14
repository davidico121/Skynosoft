import fs from "node:fs";
import crypto from "node:crypto";
import { getWriteClient } from "../src/sanity/writeClient";
import { SITE_URL } from "../src/lib/content";

// Recursively ensures every object inside every array has a _key, since
// Sanity requires one on each array item (blocks, spans, table rows, etc).
function withKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const withNestedKeys = withKeys(item);
      if (withNestedKeys && typeof withNestedKeys === "object") {
        const obj = withNestedKeys as Record<string, unknown>;
        return { _key: (obj._key as string) || crypto.randomUUID(), ...obj };
      }
      return withNestedKeys;
    }) as T;
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = withKeys(val);
    }
    return result as T;
  }
  return value;
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
    author: post.author || "The Skynosoft Team",
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
