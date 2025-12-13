import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "default",
  title: "Portfolio Jirka Veselý",

  projectId,
  dataset,

  basePath: "/studio", // Studio bude na /studio route

  plugins: [
    structureTool(), // Správný název v Sanity v3
    visionTool(), // GROQ playground pro testování queries
  ],

  schema: {
    types: schemaTypes,
  },
})
