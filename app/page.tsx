"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm"
import ProjectCard from "../components/ProjectCard"
import {
  getProjects,
  getServices,
  getReferences,
  getSkills,
} from "../lib/sanity.queries"
import type {
  SanityProject,
  SanityService,
  SanityReference,
  SanitySkill,
} from "../lib/types"

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [services, setServices] = useState<SanityService[]>([])
  const [references, setReferences] = useState<SanityReference[]>([])
  const [skills, setSkills] = useState<SanitySkill[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [p, s, r, sk] = await Promise.all([
          getProjects(),
          getServices(),
          getReferences(),
          getSkills(),
        ])
        setProjects(p)
        setServices(s)
        setReferences(r)
        setSkills(sk)
      } catch (e) {
        console.error("Chyba při načítání dat ze Sanity:", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-10 pb-20 space-y-24">
        {/* Úvod */}
        <section id="uvod" className="grid gap-8 md:grid-cols-[2fr,1.4fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300 mb-3">
              Ahoj, jsem Jirka
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 mb-4">
              Tvořím weby, aplikace a digitální řešení, která dávají smysl.
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-6 max-w-xl">
              Specializuji se na React / Next.js, práci s headless CMS (Sanity)
              a moderní frontend. Pomůžu ti s prezentací, která bude vypadat
              profesionálně a zároveň se bude dobře spravovat.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="#kontakt"
                className="inline-flex items-center rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-400"
              >
                Domluvit konzultaci
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:border-indigo-400 hover:text-indigo-200"
              >
                Zobrazit projekty
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-200 space-y-3 shadow-xl shadow-slate-950/60">
            <h2 className="text-sm font-semibold text-slate-50 mb-2">
              Co ti můžu nabídnout
            </h2>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>• Moderní webové aplikace v Next.js</li>
              <li>• Napojení na Sanity CMS – obsah zvládneš upravovat sám</li>
              <li>• Konzultace ohledně architektury, hostingu a nasazení</li>
              <li>• Postupný rozvoj projektu podle tvého rozpočtu</li>
            </ul>
          </div>
        </section>

        {/* O mně */}
        <section id="o-mne" className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">O mně</h2>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl">
            Jmenuji se Jiří Veselý, rád spojuji technickou stránku vývoje s
            praktickým pohledem na to, co opravdu dává byznysově smysl. Kromě
            programování řeším i infrastrukturní věci kolem hostingu,
            nasazování a automatizace.
          </p>
        </section>

        {/* Dovednosti */}
        <section id="dovednosti" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Dovednosti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.length === 0 && !loading && (
              <p className="text-sm text-slate-400 col-span-full">
                Zatím nemáš ve studiu žádné dovednosti – přidej dokumenty typu
                <strong> skill</strong>.
              </p>
            )}
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs flex items-center gap-2"
              >
                <span className="text-lg">{skill.emoji || "💡"}</span>
                <span className="text-slate-100">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Vybrané projekty</h2>
          {projects.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Zatím nemáš ve studiu žádné projekty – přidej dokumenty typu
              <strong> project</strong>.
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        {/* Služby */}
        <section id="sluzby" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Služby</h2>
          {services.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Přidej dokumenty typu <strong>service</strong> a zobrazí se tady
              jako nabídka služeb.
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <article
                key={service._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {(service as any).icon || "🛠️"}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {service.title}
                  </h3>
                </div>
                {service.shortDescription && (
                  <p className="text-xs text-slate-300">
                    {service.shortDescription}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Reference */}
        <section id="reference" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Reference</h2>
          {references.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Až přidáš do studia dokumenty typu <strong>reference</strong>,
              zobrazí se tady doporučení a testimonialy.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <figure
                key={ref._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2"
              >
                <blockquote className="text-sm text-slate-200">
                  „{ref.quote}“
                </blockquote>
                <figcaption className="text-xs text-slate-400">
                  {ref.name}
                  {ref.company && <> · {ref.company}</>}
                  {ref.role && <> – {ref.role}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Ozvi se</h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Máš projekt, který bys chtěl konzultovat nebo rozjet? Nech mi na
            sebe kontakt a krátce popiš, o co jde. Ozvu se ti s návrhem
            dalšího postupu.
          </p>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
