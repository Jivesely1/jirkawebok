import { createClient } from "next-sanity"

// Sanity konfigurace - nacita se z env promenych (lokalne .env.local, na Vercelu Project Settings)
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"

// Overeni, ze mame potrebne udaje
if (!projectId) {
  throw new Error(
    "Chybi NEXT_PUBLIC_SANITY_PROJECT_ID - nastavte jej v .env.local nebo ve Vercel Environment Variables."
  )
}

// Sanity klient pro cteni dat
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN = rychlejsi, ale muze mit ~5min delay pri zmenach
})
