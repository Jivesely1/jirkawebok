import { defineField, defineType } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Reference",
  type: "document",
  icon: () => "⭐",
  fields: [
    defineField({
      name: "name",
      title: "Jméno klienta",
      type: "string",
      description: "Celé jméno osoby (např. 'Jan Novák')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Firma / Pozice",
      type: "string",
      description: "Např. 'Majitel kavárny' nebo 'CEO, TechStart s.r.o.'",
    }),
    defineField({
      name: "text",
      title: "Text reference",
      type: "text",
      description: "Co o vaší práci říkají? Buďte konkrétní a autentičtí.",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).warning("Reference by měla mít alespoň 50 znaků"),
    }),
    defineField({
      name: "quote",
      title: "Zkrácený citát",
      type: "text",
      description: "Kratší verze pro jiné účely (volitelné)",
      rows: 3,
    }),
    defineField({
      name: "rating",
      title: "⭐ Hodnocení",
      type: "number",
      description: "Kolik hvězdiček od 1 do 5",
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
      options: {
        list: [
          { title: "⭐ (1)", value: 1 },
          { title: "⭐⭐ (2)", value: 2 },
          { title: "⭐⭐⭐ (3)", value: 3 },
          { title: "⭐⭐⭐⭐ (4)", value: 4 },
          { title: "⭐⭐⭐⭐⭐ (5)", value: 5 },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "🌟 Zvýrazněná reference",
      type: "boolean",
      description: "Zobrazit na hlavní stránce?",
      initialValue: false,
    }),
    defineField({
      name: "projectLink",
      title: "🔗 Odkaz na projekt",
      type: "reference",
      to: [{ type: "project" }],
      description: "Propojte s projektem z portfolia",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      text: "text",
      rating: "rating",
      featured: "featured",
    },
    prepare({ title, subtitle, text, rating, featured }) {
      const stars = "⭐".repeat(rating || 5)

      return {
        title: `${featured ? "🌟 " : ""}${title}`,
        subtitle: `${subtitle || "Reference"} • ${stars}`,
        description: text?.substring(0, 80) + "...",
      }
    },
  },
})
