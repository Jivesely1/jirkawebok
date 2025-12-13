import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

if (!projectId) {
  throw new Error(
    "Chybi NEXT_PUBLIC_SANITY_PROJECT_ID - nastavte jej v .env.local nebo ve Vercel Environment Variables."
  )
}

export default defineConfig({
  name: "portfolio",
  title: "Portfolio Jirka Vesely",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    deskTool(),
    visionTool(), // GROQ playground pro testovani dotazu
  ],

  schema: {
    types: schemaTypes,
  },
})
