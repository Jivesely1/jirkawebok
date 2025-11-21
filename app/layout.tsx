import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Portfolio Jiřího Veselého",
  description: "Osobní portfolio – vývoj, weby, konzultace.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className="bg-slate-950 text-slate-50">
      <body className="min-h-screen antialiased bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        {children}
      </body>
    </html>
  )
}
