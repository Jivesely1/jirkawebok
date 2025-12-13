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
    defineField({
      name: "price",
      title: "💰 Cenové rozpětí",
      type: "string",
      description: "Orientační cena služby (např. 'Od 15 000 Kč', 'Dle domluvy')",
      options: {
        list: [
          { title: "💵 Do 10 000 Kč", value: "low" },
          { title: "💳 10 000 - 30 000 Kč", value: "medium" },
          { title: "💎 30 000 - 60 000 Kč", value: "high" },
          { title: "👑 Nad 60 000 Kč", value: "premium" },
          { title: "🤝 Dle domluvy", value: "custom" },
        ],
      },
    }),
    defineField({
      name: "active",
      title: "✅ Aktivní nabídka",
      type: "boolean",
      description: "Nabízíte tuto službu aktuálně?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
      description: "description",
      active: "active",
      price: "price",
    },
    prepare({ title, icon, description, active, price }) {
      const priceEmoji = {
        low: "💵",
        medium: "💳",
        high: "💎",
        premium: "👑",
        custom: "🤝",
      }[price] || ""

      return {
        title: `${icon || "🛠️"} ${title} ${!active ? "(Neaktivní)" : ""}`,
        subtitle: `${priceEmoji} ${description?.substring(0, 60)}...`,
      }
    },
  },
})
