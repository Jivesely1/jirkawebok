import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Header from "../components/Header";
import { Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "../components/CookieConsent";

import AnalyticsGA from "../components/Analytics"; // ← tvoje Google Analytics (už máš)
import { Analytics } from "@vercel/analytics/next"; // ← Vercel Analytics

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Portfolio Jirka Veselý",
  description: "Full-stack vývojář",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <CookieConsent />
          <main className="pt-4">{children}</main>
        </ThemeProvider>

        {/* Google Analytics */}
        <AnalyticsGA />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
