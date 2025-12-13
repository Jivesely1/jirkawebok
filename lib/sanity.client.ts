import { createClient } from "next-sanity"

// Sanity konfigurace - nacita se z env promenych (lokalne .env.local, na Vercelu Project Settings)
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi" // fallback kvuli lokalnimu vyvoji
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  // varovani pro pripad, ze chybi vlastni ID v env
  console.warn(
    "Pouziva se fallback NEXT_PUBLIC_SANITY_PROJECT_ID (sjl39asi). Nastavte vlastni ID v .env.local nebo ve Vercel Environment Variables."
  )
}

// Sanity klient pro cteni dat
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN = rychlejsi, ale muze mit ~5min delay pri zmenach
})
