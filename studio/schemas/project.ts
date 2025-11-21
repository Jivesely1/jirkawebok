import { defineField, defineType } from "sanity"

export default defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Stručný popis",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Detailní popis",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Hlavní obrázek",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "URL projektu",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Pořadí",
      type: "number",
      description: "Nižší číslo = zobrazí se výše v seznamu",
    }),
  ],
})
