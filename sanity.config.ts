import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { comment } from "@/sanity/schemaTypes/comment";

export default defineConfig([
  {
    basePath: "/studio",
    name: "content",
    title: "Skynosoft — Content",
    projectId,
    dataset,
    schema: {
      types: schemaTypes,
    },
    plugins: [structureTool()],
  },
  {
    basePath: "/studio/comments",
    name: "comments",
    title: "Skynosoft — Comments",
    projectId,
    dataset: "comments",
    schema: {
      types: [comment],
    },
    plugins: [structureTool()],
  },
]);
