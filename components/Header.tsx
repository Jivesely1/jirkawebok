"use client"

import Link from "next/link"
import { useState } from "react"

const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#dovednosti", label: "Dovednosti" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#sluzby", label: "Služby" },
  { href: "#reference", label: "Reference" },
  { href: "#kontakt", label: "Kontakt" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#uvod" className="text-slate-50 font-semibold tracking-tight">
          Jirka&nbsp;<span className="text-indigo-400">Portfolio</span>
        </Link>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-100"
          onClick={() => setOpen(!open)}
        >
          {open ? "Zavřít" : "Menu"}
        </button>

        <ul className="hidden md:flex gap-6 text-sm text-slate-200">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-indigo-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <ul className="flex flex-col px-4 py-2 text-sm text-slate-100 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
