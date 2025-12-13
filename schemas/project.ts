import { defineField, defineType } from "sanity"

/**
 * Povolené stavy projektu
 * (musí odpovídat options.list value)
 */
type ProjectStatus =
  | "completed"
  | "in-progress"
  | "paused"
  | "planned"

export default defineType({
  name: "project",
  title: "Projekty",
  type: "document",
  icon: () => "🎨",

  groups: [
    { name: "content", title: "📝 Obsah", default: true },
    { name: "media", title: "🖼️ Média" },
    { name: "details", title: "ℹ️ Detaily" },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "image",
      title: "Náhledový obrázek",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),

    defineField({
      name: "mainImage",
      title: "Hero obrázek (detail)",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),

    defineField({
      name: "description",
      title: "Krátký popis",
      type: "text",
      rows: 3,
      group: "content",
    }),

    defineField({
      name: "shortDescription",
      title: "Úvodní popis",
      type: "text",
      rows: 2,
      group: "content",
    }),

    defineField({
      name: "goal",
      title: "Cíl projektu",
      type: "text",
      rows: 4,
      group: "content",
    }),

    defineField({
      name: "workflow",
      title: "Proces & workflow",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),

    defineField({
      name: "features",
      title: "Hlavní přínosy",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),

    defineField({
      name: "results",
      title: "Výsledky & dopad",
      type: "text",
      rows: 4,
      group: "content",
    }),

    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image" }],
      group: "media",
    }),

    defineField({
      name: "url",
      title: "Živá URL",
      type: "url",
      group: "details",
    }),

    defineField({
      name: "client",
      title: "Klient",
      type: "string",
      group: "details",
    }),

    defineField({
      name: "year",
      title: "Rok realizace",
      type: "number",
      validation: (Rule) =>
        Rule.min(2020)
          .max(new Date().getFullYear())
          .warning("Zkontrolujte rok realizace"),
      group: "details",
    }),

    defineField({
      name: "status",
      title: "Stav projektu",
      type: "string",
      options: {
        list: [
          { title: "✅ Hotovo", value: "completed" },
          { title: "🚧 V procesu", value: "in-progress" },
          { title: "⏸️ Pozastaveno", value: "paused" },
          { title: "🎯 Plánováno", value: "planned" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      group: "details",
    }),

    defineField({
      name: "featured",
      title: "⭐ Zvýrazněný projekt",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      year: "year",
      status: "status",
      featured: "featured",
    },

    prepare({
      title,
      media,
      year,
      status,
      featured,
    }: {
      title?: string
      media?: any
      year?: number
      status?: ProjectStatus
      featured?: boolean
    }) {
      const statusEmoji: Record<ProjectStatus, string> = {
        completed: "✅",
        "in-progress": "🚧",
        paused: "⏸️",
        planned: "🎯",
      }

      return {
        title: `${featured ? "⭐ " : ""}${title ?? "Bez názvu"}`,
        subtitle: `${year ?? "Bez roku"} ${status ? statusEmoji[status] : ""}`,
        media,
      }
    },
  },
})
