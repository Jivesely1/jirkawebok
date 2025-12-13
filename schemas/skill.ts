import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Dovednosti",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Název dovednosti",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Ikona (emoji)",
      type: "string",
      description: "Např. ⚛️, 🚀, 💡",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "emoji",
    },
  },
})
