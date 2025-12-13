import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import React from "react"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "default",
  title: "Portfolio Jirka Veselý",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Správa obsahu")
          .items([
            // 🎨 Projekty
            S.listItem()
              .title("📁 Projekty")
              .icon(() => "🎨")
              .child(
                S.documentTypeList("project")
                  .title("Všechny projekty")
                  .filter('_type == "project"')
              ),

            S.divider(),

            // ⚙️ Služby
            S.listItem()
              .title("⚙️ Služby")
              .icon(() => "🛠️")
              .child(
                S.documentTypeList("service")
                  .title("Všechny služby")
                  .filter('_type == "service"')
              ),

            S.divider(),

            // 💡 Dovednosti
            S.listItem()
              .title("💡 Dovednosti")
              .icon(() => "⚡")
              .child(
                S.documentTypeList("skill")
                  .title("Všechny dovednosti")
                  .filter('_type == "skill"')
              ),

            S.divider(),

            // 💬 Reference
            S.listItem()
              .title("💬 Reference")
              .icon(() => "⭐")
              .child(
                S.documentTypeList("testimonial")
                  .title("Všechny reference")
                  .filter('_type == "testimonial"')
              ),
          ]),
    }),
    visionTool({
      defaultApiVersion: "2025-01-01",
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // 🎨 Vlastní barevné téma
  theme: {
    colors: {
      primary: {
        base: "#6366f1", // Indigo
        dark: "#4f46e5",
        light: "#818cf8",
      },
    },
  },

})
