import { createClient } from "next-sanity";
import { apiVersion, projectId } from "./env";

const COMMENTS_DATASET = "comments";

/**
 * Server-only client for the private "comments" dataset. Never import this
 * from a "use client" component — the write token must stay off the browser.
 */
export function getCommentsClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN. Required to read/write the private comments dataset."
    );
  }
  return createClient({
    projectId,
    dataset: COMMENTS_DATASET,
    apiVersion,
    token,
    useCdn: false,
  });
}

export type Comment = {
  _id: string;
  name: string;
  body: string;
  createdAt: string;
};
