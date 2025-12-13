import { defineField, defineType } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Reference",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Jméno klienta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Firma (volitelné)",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Recenze / Reference",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Citát (alternativní pole)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
    },
  },
})
