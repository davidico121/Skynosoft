import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  name: "content",
  title: "Skynosoft — Content",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});
