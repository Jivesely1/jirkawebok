import { defineField, defineType } from "sanity"

type ServicePrice =
  | "low"
  | "medium"
  | "high"
  | "premium"
  | "custom"

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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      initialValue: "🛠️",
    }),

    defineField({
      name: "description",
      title: "Popis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Cenová úroveň",
      type: "string",
      options: {
        list: [
          { title: "💵 Nízká", value: "low" },
          { title: "💳 Střední", value: "medium" },
          { title: "💎 Vysoká", value: "high" },
          { title: "👑 Premium", value: "premium" },
          { title: "🤝 Dle domluvy", value: "custom" },
        ],
      },
    }),

    defineField({
      name: "active",
      title: "Aktivní",
      type: "boolean",
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

    prepare({
      title,
      icon,
      description,
      active,
      price,
    }: {
      title?: string
      icon?: string
      description?: string
      active?: boolean
      price?: ServicePrice
    }) {
      const priceEmoji: Record<ServicePrice, string> = {
        low: "💵",
        medium: "💳",
        high: "💎",
        premium: "👑",
        custom: "🤝",
      }

      return {
        title: `${icon ?? "🛠️"} ${title ?? "Bez názvu"}${
          active === false ? " (Neaktivní)" : ""
        }`,
        subtitle: `${price ? priceEmoji[price] : ""} ${
          description ? description.slice(0, 60) + "…" : ""
        }`,
      }
    },
  },
})

