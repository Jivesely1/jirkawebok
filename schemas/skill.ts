import { defineField, defineType } from "sanity"

/**
 * Kategorie dovedností
 */
type SkillCategory =
  | "frontend"
  | "backend"
  | "design"
  | "database"
  | "devops"
  | "mobile"
  | "tools"

/**
 * Úroveň znalosti
 */
type SkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert"

export default defineType({
  name: "skill",
  title: "Dovednosti",
  type: "document",
  icon: () => "⚡",

  fields: [
    defineField({
      name: "name",
      title: "Název technologie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "emoji",
      title: "Ikona",
      type: "string",
      initialValue: "💡",
    }),

    defineField({
      name: "category",
      title: "🏷️ Kategorie",
      type: "string",
      options: {
        list: [
          { title: "⚛️ Frontend", value: "frontend" },
          { title: "🔧 Backend", value: "backend" },
          { title: "🎨 Design", value: "design" },
          { title: "🗄️ Database", value: "database" },
          { title: "☁️ Cloud/DevOps", value: "devops" },
          { title: "📱 Mobile", value: "mobile" },
          { title: "🛠️ Nástroje", value: "tools" },
        ],
      },
    }),

    defineField({
      name: "level",
      title: "📊 Úroveň znalosti",
      type: "string",
      options: {
        list: [
          { title: "⭐ Začátečník", value: "beginner" },
          { title: "⭐⭐ Středně pokročilý", value: "intermediate" },
          { title: "⭐⭐⭐ Pokročilý", value: "advanced" },
          { title: "⭐⭐⭐⭐ Expert", value: "expert" },
        ],
        layout: "radio",
      },
      initialValue: "intermediate",
    }),
  ],

  preview: {
    select: {
      title: "name",
      emoji: "emoji",
      category: "category",
      level: "level",
    },

    prepare({
      title,
      emoji,
      category,
      level,
    }: {
      title?: string
      emoji?: string
      category?: SkillCategory
      level?: SkillLevel
    }) {
      const categoryEmoji: Record<SkillCategory, string> = {
        frontend: "⚛️",
        backend: "🔧",
        design: "🎨",
        database: "🗄️",
        devops: "☁️",
        mobile: "📱",
        tools: "🛠️",
      }

      const levelStars: Record<SkillLevel, string> = {
        beginner: "⭐",
        intermediate: "⭐⭐",
        advanced: "⭐⭐⭐",
        expert: "⭐⭐⭐⭐",
      }

      return {
        title: `${emoji ?? "💡"} ${title ?? "Bez názvu"}`,
        subtitle: `${category ? categoryEmoji[category] : ""} ${
          level ? levelStars[level] : ""
        }`,
      }
    },
  },
})

