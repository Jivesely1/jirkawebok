import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Služby",
  type: "document",
  icon: () => "🛠️",
  fields: [
    defineField({
      name: "title",
      title: "Název služby",
      type: "string",
      description: "Např. 'Tvorba webů na míru', 'E-shop řešení'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      description: "Vyberte emoji ikonu (např. 🛠️, 💻, 🎨, 🚀)",
      initialValue: "🛠️",
    }),
    defineField({
      name: "description",
      title: "Hlavní popis",
      type: "text",
      description: "Detailní popis služby co nabízíte",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Stručný popis",
      type: "text",
      description: "Kratší verze (pokud chcete odlišnou)",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
      description: "description",
    },
    prepare({ title, subtitle, description }) {
      return {
        title: `${subtitle || "🛠️"} ${title}`,
        subtitle: description?.substring(0, 60) + "...",
      }
    },
  },
})
