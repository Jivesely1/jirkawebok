import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { dashboardTool } from "@sanity/dashboard"
import { schemaTypes } from "./schemas"
import { dashboardConfig } from "./plugins/dashboard"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "default",
  title: "🎨 Portfolio Jirka Veselý",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    dashboardTool({
      widgets: [dashboardConfig],
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title("Správa obsahu")
          .items([
            // 🎨 Projekty
            S.listItem()
              .title("🎨 Projekty")
              .icon(() => "🎨")
              .child(
                S.documentTypeList("project")
                  .title("Všechny projekty")
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: "year", direction: "desc" }])
                  .menuItems([
                    S.orderingMenuItem({ title: "Nejnovější", by: [{ field: "year", direction: "desc" }] }),
                    S.orderingMenuItem({ title: "Nejstarší", by: [{ field: "year", direction: "asc" }] }),
                    S.orderingMenuItem({ title: "Název A-Z", by: [{ field: "title", direction: "asc" }] }),
                  ])
              ),

            S.divider(),

            // 🛠️ Služby
            S.listItem()
              .title("🛠️ Služby")
              .icon(() => "🛠️")
              .child(
                S.documentTypeList("service")
                  .title("Všechny služby")
                  .filter('_type == "service"')
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
              ),

            S.divider(),

            // ⚡ Dovednosti
            S.listItem()
              .title("⚡ Dovednosti")
              .icon(() => "⚡")
              .child(
                S.documentTypeList("skill")
                  .title("Všechny dovednosti")
                  .filter('_type == "skill"')
                  .defaultOrdering([{ field: "name", direction: "asc" }])
              ),

            S.divider(),

            // ⭐ Reference
            S.listItem()
              .title("⭐ Reference")
              .icon(() => "⭐")
              .child(
                S.documentTypeList("testimonial")
                  .title("Všechny reference")
                  .filter('_type == "testimonial"')
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
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
})
