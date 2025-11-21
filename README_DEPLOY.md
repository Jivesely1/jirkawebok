# Portfolio Jirka – Next.js + Sanity

Tento balíček je upravený tak, aby šel jednoduše nasadit na **Vercel**.
- Kořen projektu (tato složka) = **frontend (Next.js 14)**
- Složka `studio/` = **Sanity Studio 3**, které se nasazuje zvlášť přes Sanity na adresu `*.sanity.studio`.

## 1. Nasazení frontendu na Vercel

1. Nahraj tuto složku jako nový Git repozitář (např. na GitHub: `portfolio-jirka-vercel`).
2. Na Vercelu vytvoř nový projekt a připoj tento repozitář.
3. Build settings:
   - Framework: automaticky rozpozná Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next` (default)
4. Do `Environment Variables` přidej (pokud chceš použít vlastní hodnoty):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` – ID tvého Sanity projektu
   - `NEXT_PUBLIC_SANITY_DATASET` – název datasetu (např. `production`)

Pokud tyto proměnné nenastavíš, použijí se výchozí hodnoty z `lib/sanity.ts`.

## 2. Nasazení Sanity Studiia na `*.sanity.studio`

1. Otevři složku `studio/` v terminálu:
   ```bash
   cd studio
   npm install
   ```
2. Přihlaš se do Sanity (pokud ještě nejsi):
   ```bash
   npx sanity login
   ```
3. Ověř / uprav projektové údaje v `sanity.config.ts` (projectId, dataset).
4. Nasazení studia:
   ```bash
   npx sanity deploy
   ```

Sanity ti vrátí URL ve tvaru `https://něco.sanity.studio`, kde poběží celé CMS.

Frontend na Vercelu bude číst obsah přímo z tohoto Sanity projektu přes API, takže Vercel nic o Studiu vědět nepotřebuje.
