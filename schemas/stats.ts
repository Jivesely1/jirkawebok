import { defineType } from "sanity"

export default defineType({
  name: "stats",
  title: "Statistiky",
  type: "document",
  icon: () => "📊",
  fields: [
    {
      name: "title",
      title: "Název",
      type: "string",
      initialValue: "Portfolio Dashboard",
      readOnly: true,
    },
    {
      name: "description",
      title: "Popis",
      type: "text",
      rows: 3,
      initialValue:
        "Toto je váš hlavní dashboard pro správu portfolia. Zde najdete přehled všech vašich projektů, služeb, dovedností a referencí.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "📊 Portfolio Dashboard",
        subtitle: "Přehled a statistiky",
      }
    },
  },
})
