export default function NotFoundProject() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-3">
      <h1 className="text-2xl font-semibold text-slate-50">
        Projekt nenalezen
      </h1>
      <p className="text-sm text-slate-300">
        Projekt, který hledáš, se nepodařilo najít. Možná byl smazán nebo je
        slug špatně.
      </p>
      <a
        href="/#portfolio"
        className="text-sm text-indigo-300 hover:text-indigo-200"
      >
        ← Zpět na portfolio
      </a>
    </main>
  )
}
