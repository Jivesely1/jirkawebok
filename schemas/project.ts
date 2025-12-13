import { defineField, defineType } from "sanity"

export default defineType({
  name: "project",
  title: "Projekty",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hlavní obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Detailní hero obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Krátký popis (pro kartu)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "shortDescription",
      title: "Stručný popis (detail)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "goal",
      title: "Cíl projektu",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "workflow",
      title: "Proces & workflow",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      title: "Hlavní přínosy / Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "results",
      title: "Výsledky",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Galerie obrázků",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "url",
      title: "URL projektu",
      type: "url",
    }),
    defineField({
      name: "client",
      title: "Klient",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Rok",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
})
