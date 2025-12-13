import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Služby",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název služby",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikona (emoji)",
      type: "string",
      description: "Např. 🛠️, 💻, 🎨",
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Krátký popis (volitelné)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
  },
})
