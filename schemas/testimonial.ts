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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      text: "text",
    },
    prepare({ title, subtitle, text }) {
      return {
        title: `⭐ ${title}`,
        subtitle: subtitle || "Reference",
        description: text?.substring(0, 80) + "...",
      }
    },
  },
})
