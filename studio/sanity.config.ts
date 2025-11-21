import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

export default defineConfig({
  name: "default",
  title: "Portfolio Jirka CMS",

  projectId: "sjl39asi",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === "project" && document.slug?.current) {
        return `https://portfolio-jirka-frontend.vercel.app/projekty/${document.slug.current}`
      }
      return prev
    },
  },
})
