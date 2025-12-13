import { defineField, defineType } from "sanity"

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
      description: "Hlavní název projektu (např. 'Kavárna Na Růžku')",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "Klikněte na 'Generate' pro automatické vytvoření URL",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Náhledový obrázek",
      type: "image",
      description: "Zobrazí se na kartě v portfoliu (1200x800px doporučeno)",
      options: {
        hotspot: true,
      },
      group: "media",
    }),
    defineField({
      name: "mainImage",
      title: "Hero obrázek (detail)",
      type: "image",
      description: "Velký obrázek na detailní stránce projektu (1600x900px doporučeno)",
      options: {
        hotspot: true,
      },
      group: "media",
    }),
    defineField({
      name: "description",
      title: "Krátký popis",
      type: "text",
      description: "Zobrazí se na kartě v portfoliu (2-3 věty)",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "shortDescription",
      title: "Úvodní popis",
      type: "text",
      description: "Zobrazí se pod názvem na detailu projektu",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "goal",
      title: "Cíl projektu",
      type: "text",
      description: "Jaký byl hlavní cíl a zadání projektu?",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "workflow",
      title: "Proces & workflow",
      type: "array",
      description: "Jednotlivé kroky procesu vývoje (např. 'Analýza požadavků', 'Design prototypu')",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Hlavní přínosy",
      type: "array",
      description: "Co jsem vytvořil / dodal (např. 'Responzivní design', 'SEO optimalizace')",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "results",
      title: "Výsledky & dopad",
      type: "text",
      description: "Jaké byly výsledky projektu? (např. metriky, zpětná vazba)",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      description: "Další obrázky projektu (screenshots, mockupy, atd.)",
      of: [{ type: "image" }],
      group: "media",
    }),
    defineField({
      name: "url",
      title: "Živá URL",
      type: "url",
      description: "Odkaz na fungující web (např. https://kavarnanaruzku.cz)",
      group: "details",
    }),
    defineField({
      name: "client",
      title: "Klient",
      type: "string",
      description: "Pro koho byl projekt vytvořen",
      group: "details",
    }),
    defineField({
      name: "year",
      title: "Rok realizace",
      type: "number",
      description: "Ve kterém roce byl projekt dokončen",
      group: "details",
      validation: (Rule) =>
        Rule.min(2020)
          .max(new Date().getFullYear())
          .warning("Projekt je z minulosti - zkontrolujte datum"),
    }),
    defineField({
      name: "status",
      title: "Stav projektu",
      type: "string",
      description: "Aktuální stav projektu",
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
      description: "Zobrazit tento projekt na hlavní stránce?",
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
    prepare({ title, media, year, status, featured }) {
      const statusEmoji = {
        completed: "✅",
        "in-progress": "🚧",
        paused: "⏸️",
        planned: "🎯",
      }[status] || ""

      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${year || "Bez roku"} ${statusEmoji}`,
        media,
      }
    },
  },
})
