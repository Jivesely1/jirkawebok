"use client"

import { useState } from "react"

export default function ContactForm() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setSent(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    console.log("Kontakt formulář:", data)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      form.reset()
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm text-slate-200 mb-1">Jméno</label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-200 mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-200 mb-1">Zpráva</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-60"
      >
        {sending ? "Odesílám..." : "Odeslat zprávu"}
      </button>
      {sent && (
        <p className="text-xs text-emerald-400 mt-1">
          Děkuji, ozvu se co nejdřív. 🙌
        </p>
      )}
    </form>
  )
}
