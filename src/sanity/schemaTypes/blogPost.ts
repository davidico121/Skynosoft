import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["CRO", "Website Design", "Email Marketing", "Strategy"] },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "The Skynosoft Team",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for search engines and screen readers.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                type: "object",
                name: "link",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "string",
                    description: "A path on this site (e.g. /services) or a full https:// URL.",
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              description: "Describe the image for search engines and screen readers. Not shown visually.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional. Shown visually beneath the image on the page.",
            }),
          ],
        },
        {
          type: "object",
          name: "table",
          title: "Comparison table",
          fields: [
            defineField({
              name: "headers",
              title: "Column headers",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "tableRow",
                  fields: [
                    defineField({
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [{ type: "string" }],
                      validation: (rule) => rule.required().min(1),
                    }),
                    defineField({
                      name: "highlighted",
                      title: "Highlight this row (e.g. the recommended option)",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: { cells: "cells" },
                    prepare: ({ cells }: { cells?: string[] }) => ({
                      title: cells?.join(" / ") || "Row",
                    }),
                  },
                },
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { headers: "headers" },
            prepare: ({ headers }: { headers?: string[] }) => ({
              title: `Table: ${headers?.join(", ") || "untitled"}`,
            }),
          },
        },
        {
          type: "object",
          name: "ctaCard",
          title: "Inline CTA card",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "linkHref",
              title: "Link URL",
              type: "string",
              description:
                "Must be a real path on the site: /services, /work/<case-study-slug>, or /contact.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "linkLabel",
              title: "Button label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "linkHref" },
          },
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
