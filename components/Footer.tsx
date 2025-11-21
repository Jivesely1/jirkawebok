export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-xs text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Jiří Veselý – Portfolio.</span>
        <span className="text-slate-500">
          Postaveno na Next.js &amp; Sanity.
        </span>
      </div>
    </footer>
  )
}
