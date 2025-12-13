# 🎨 Sanity CMS - Kompletní návod

## 📋 Co je Sanity a jak to funguje?

**Sanity** je headless CMS (Content Management System), kde:
- **Studio** běží na `sanity.io` (nebo lokálně) - tam upravujete obsah
- **Frontend** (tento Next.js projekt) načítá data přes API

---

## 🔧 Jak to funguje lokálně vs. na Vercelu?

### **Lokálně** (váš počítač)
1. Projekt načítá přihlašovací údaje z `.env.local` souboru
2. Tento soubor **NENÍ** v Gitu (bezpečnost!)
3. Musíte ho vytvořit ručně

### **Na Vercelu** (produkce)
1. Vercel načítá údaje z **Environment Variables** v nastavení projektu
2. Tyto proměnné nastavíte přímo na Vercel.com
3. Při nasazení se automaticky použijí

---

## ⚙️ Nastavení lokálně (krok za krokem)

### 1. Zkopírujte `.env.local.example` → `.env.local`

```bash
cp env.local.example .env.local
```

### 2. Vyplňte správné hodnoty v `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=sjl39asi
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# Pro kontaktní formulář (volitelné)
EMAIL_USER=vas-email@gmail.com
EMAIL_PASS=vase-heslo-aplikace
EMAIL_TO=kam-poslat-zpravy@gmail.com
```

### 3. Spusťte Next.js dev server

```bash
npm run dev
```

Projekt teď poběží na `http://localhost:3000` a bude načítat data z vašeho Sanity CMS.

---

## 🚀 Nastavení na Vercelu

### 1. Přejděte na Vercel Dashboard
`https://vercel.com/your-username/your-project/settings/environment-variables`

### 2. Přidejte tyto proměnné:

| Název                              | Hodnota           |
|------------------------------------|-------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`    | `sjl39asi`        |
| `NEXT_PUBLIC_SANITY_DATASET`       | `production`      |
| `NEXT_PUBLIC_SANITY_API_VERSION`   | `2025-01-01`      |

### 3. Redeploy projektu
Po přidání proměnných musíte projekt znovu nasadit (Vercel to často udělá automaticky).

---

## 🔍 Kde najít své Sanity údaje?

### **Project ID**
1. Jděte na `https://sanity.io/manage`
2. Klikněte na váš projekt
3. V URL vidíte: `sanity.io/manage/project/sjl39asi` ← toto je váš **Project ID**

### **Dataset**
- Obvykle `production` (výchozí)
- Pokud máte více datasetů (dev, staging, production), zvolte správný

### **API Version**
- Používejte aktuální datum ve formátu `YYYY-MM-DD`
- Příklad: `2025-01-01`

---

## 🛠️ Jak to celé funguje v kódu?

### **lib/sanity.client.ts** - Sdílený klient
```typescript
export const client = createClient({
  projectId: "sjl39asi",           // Odkud načítat data
  dataset: "production",           // Který dataset použít
  apiVersion: "2025-01-01",        // Verze API
  useCdn: true,                    // Rychlejší načítání (5min cache)
})
```

### **lib/sanity.ts** - Funkce pro načítání dat
```typescript
export async function getProjects() {
  return await client.fetch(`*[_type == "project"]`)
}
```

### **app/page.tsx** - Použití v komponentě
```typescript
const projects = await getProjects()
```

---

## ❓ Často kladené otázky

### Q: Proč je v kódu hardcoded `sjl39asi`?
A: Je to **fallback hodnota** - pokud `.env.local` neexistuje, použije se tato. Je to vaše Project ID, takže je to v pořádku.

### Q: Jak aktualizovat obsah?
A: Jděte na `https://yourproject.sanity.studio` nebo spusťte Sanity Studio lokálně.

### Q: Proč se změny neprojevují okamžitě?
A: Pokud máte `useCdn: true`, může být **až 5min prodleva**. Pro development můžete nastavit `useCdn: false`.

### Q: Musím mít Sanity Studio lokálně?
A: **NE** - Studio můžete používat pouze online na `sanity.io`. Lokální studio je volitelné.

---

## 🎯 Shrnutí

✅ **Lokálně:** Potřebujete `.env.local` soubor
✅ **Vercel:** Nastavte Environment Variables
✅ **Fallback:** Hardcoded hodnoty v kódu slouží jako záloha
✅ **Bezpečnost:** `.env.local` je v `.gitignore` a nepublikuje se

🔥 **Nyní by vše mělo fungovat jak lokálně, tak na Vercelu!**
