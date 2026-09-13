import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "brand" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Client logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Fashion", "Skincare", "Home Decor", "Supplements"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "challenge",
      title: "The challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "What we did",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "gallery",
      title: "Project images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "brand", subtitle: "category" },
  },
});
