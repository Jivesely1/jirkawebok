import { defineField, defineType } from "sanity"

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
      description: "Např. 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Ikona",
      type: "string",
      description: "Emoji ikona technologie (např. ⚛️ React, 🔺 Vercel, 💡 JavaScript)",
      initialValue: "💡",
    }),
    defineField({
      name: "category",
      title: "🏷️ Kategorie",
      type: "string",
      description: "Typ technologie",
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
        layout: "dropdown",
      },
    }),
    defineField({
      name: "level",
      title: "📊 Úroveň znalosti",
      type: "string",
      description: "Jak dobře ovládáte tuto technologii?",
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
    prepare({ title, emoji, category, level }) {
      const categoryEmoji = {
        frontend: "⚛️",
        backend: "🔧",
        design: "🎨",
        database: "🗄️",
        devops: "☁️",
        mobile: "📱",
        tools: "🛠️",
      }[category] || ""

      const levelStars = {
        beginner: "⭐",
        intermediate: "⭐⭐",
        advanced: "⭐⭐⭐",
        expert: "⭐⭐⭐⭐",
      }[level] || ""

      return {
        title: `${emoji || "💡"} ${title}`,
        subtitle: `${categoryEmoji} ${levelStars}`,
      }
    },
  },
})
