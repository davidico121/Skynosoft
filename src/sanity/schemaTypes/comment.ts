import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "postSlug",
      title: "Blog post slug",
      type: "string",
      description: "The blog post this comment belongs to (matches the post's slug on the main site).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "email",
      title: "Email (private, never shown publicly)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Comment",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(2000),
    }),
    defineField({
      name: "approved",
      title: "Approved (visible on the site)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Submitted at",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "body", approved: "approved" },
    prepare: ({ title, subtitle, approved }) => ({
      title: `${approved ? "✅" : "⏳"} ${title}`,
      subtitle,
    }),
  },
});
