import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi" // fallback pro lokální vývoj
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn(
    "Používá se fallback NEXT_PUBLIC_SANITY_PROJECT_ID (sjl39asi). Nastavte vlastní ID v .env.local nebo ve Vercel Environment Variables."
  )
}

export default defineConfig({
  name: "portfolio",
  title: "Portfolio Jirka Veselý",

  projectId,
  dataset,

  basePath: "/studio", // Studio bude na /studio route

  plugins: [
    deskTool(),
    visionTool(), // GROQ playground pro testování queries
  ],

  schema: {
    types: schemaTypes,
  },
})
