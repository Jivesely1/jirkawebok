import { createClient } from "next-sanity"

// 🔧 Sanity konfigurace - funguje lokálně i na Vercelu
// Lokálně: načítá z .env.local
// Vercel: načítá z Environment Variables v nastavení projektu
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi"
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"

// ⚠️ Ověření, že máme potřebné údaje
if (!projectId) {
  console.error("❌ Chybí NEXT_PUBLIC_SANITY_PROJECT_ID - zkontrolujte .env.local")
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
}

// 📡 Sanity klient pro čtení dat
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN = rychlejší, ale může mít 5min delay při změnách
})
