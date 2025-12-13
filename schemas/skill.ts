import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Dovednosti",
  type: "document",
  icon: () => "⚡",
  fields: [
    defineField({
      name: "name",
      title: "Název technologie",
      type: "string",
      description: "Např. 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Ikona",
      type: "string",
      description: "Emoji ikona technologie (např. ⚛️ React, 🔺 Vercel, 💡 JavaScript)",
      initialValue: "💡",
    }),
  ],
  preview: {
    select: {
      title: "name",
      emoji: "emoji",
    },
    prepare({ title, emoji }) {
      return {
        title: `${emoji || "💡"} ${title}`,
      }
    },
  },
})
