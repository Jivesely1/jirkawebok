"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";




import {
  getProjects,
  getServices,
  getReferences,
  getSkills,
} from "../lib/sanity";
import type {
  SanityProject,
  SanityService,
  SanityReference,
  SanitySkill,
} from "../lib/types";

const fadeInSection: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [services, setServices] = useState<SanityService[]>([]);
  const [references, setReferences] = useState<SanityReference[]>([]);
  const [skills, setSkills] = useState<SanitySkill[]>([]);

  // Načtení dat ze Sanity
  useEffect(() => {
    async function load() {
      try {
        const [p, s, r, sk] = await Promise.all([
          getProjects(),
          getServices(),
          getReferences(),
          getSkills(),
        ]);
        setProjects(p);
        setServices(s);
        setReferences(r);
        setSkills(sk);
      } catch (e) {
        console.error("Chyba při načítání dat ze Sanity:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
  <div className="min-h-screen bg-brand-bg text-brand-text dark:bg-brand-bgDark dark:text-brand-textDark">
      {/* LOADER přes celou obrazovku */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white text-3xl md:text-4xl font-extrabold">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            Jirka Veselý 💻
          </motion.span>
        </div>
      )}

      <main>
        {/* ÚVOD – tmavší sekce */}
        <motion.section
  id="uvod"
  className="min-h-[70vh] flex items-center py-16 md:py-24
             bg-gradient-to-b from-brand-bg via-brand-surface to-brand-bg
             dark:bg-gradient-to-b dark:from-brand-bgDark dark:via-brand-surfaceDark dark:to-brand-bgDark
             text-brand-text dark:text-brand-textDark"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Ahoj, jsem Jirka
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Váš{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  full-stack partner
                </span>{" "}
                pro moderní weby a aplikace
              </h1>
              <p className="text-xs sm:text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                Stavím weby v Next.js, napojuji je na Sanity CMS a řeším i
                nasazení, infrastrukturu a dlouhodobý rozvoj.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="#kontakt"
                  className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Mám zájem o web
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center rounded-full border border-brand-border dark:border-brand-borderDark
           px-6 py-2 text-brand-text dark:text-brand-textDark
           hover:border-brand-accent hover:text-brand-accent dark:hover:text-brand-accentHover transition">
                  Zobrazit projekty
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <Image
                src="/code-laptop.jpg"
                alt="Notebook s kódem"
                width={640}
                height={460}
                className="w-full max-w-md rounded-3xl shadow-2xl border border-white/10 dark:border-slate-800"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* O MNĚ – světlá / neutrální sekce */}
        <motion.section
  id="o-mne"
  className="py-16 md:py-20 bg-brand-surface text-brand-text
             dark:bg-brand-surfaceDark dark:text-brand-textDark shadow-soft"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                Kdo jsem a jak pracuji?
              </h2>
              <p className="text-sm sm:text-base text-brand-textMuted dark:text-brand-textMutedDark">
                Jmenuji se Jiří Veselý. Spojuji moderní frontend (React / Next.js)
                s rozumnou architekturou, integracemi a DevOpsem.
              </p>
              <p className="text-xs sm:text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                Místo “na koleni” raději stavím řešení, která můžeš rozvíjet:
                Sanity jako headless CMS, nasazení na Vercel a čistý kód
                připravený na další funkce.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }}>
              <Image
                src="/jirka.png"
                alt="Jirka Veselý"
                width={220}
                height={220}
                className="rounded-full mx-auto border-4 border-indigo-500 shadow-xl object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* DOVEDNOSTI – tmavší sekce */}
        <section
  id="dovednosti"
  className="py-16 md:py-20 text-center bg-brand-bg dark:bg-brand-bgDark">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 sm:mb-10">
            Tech stack & dovednosti 🛠️
          </h2>
          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
            {skills.length === 0 && !loading ? (
              <p className="text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Zatím nemáš ve studiu žádné dovednosti – přidej dokumenty typu{" "}
                <strong>skill</strong>.
              </p>
            ) : skills.length === 0 ? (
              <p className="text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám dovednosti…
              </p>
            ) : (
              skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 sm:px-5 py-2 sm:py-3 rounded-full border text-xs sm:text-sm font-semibold
           flex items-center gap-2 shadow-sm
           border-brand-accent/60 bg-brand-surface text-brand-text
           dark:bg-brand-surfaceDark dark:text-brand-textDark">
                  <span className="text-lg">
                    {(skill as any).emoji ?? "💡"}
                  </span>
                  <span>{skill.name}</span>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* PORTFOLIO – světlá / přechodová sekce */}
        <section
  id="portfolio"
  className="py-18 md:py-20 bg-brand-surface dark:bg-brand-surfaceDark"
>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8 sm:mb-10">
              Vybrané projekty 🏆
            </h2>

            {projects.length === 0 && !loading ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Zatím nemáš ve studiu žádné projekty – přidej dokumenty typu{" "}
                <strong>project</strong>.
              </p>
            ) : projects.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám projekty…
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {projects.map((p) => {
                  const projectSlug = p.slug?.current;
                  const href = projectSlug ? `/projekty/${projectSlug}` : "#";
                  return (
                    <motion.article
                      key={p._id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="rounded-2xl border shadow-card overflow-hidden group
           bg-brand-surface border-brand-border
           dark:bg-brand-surfaceDark dark:border-brand-borderDark">
                      {p.imageUrl && (
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={p.imageUrl}
                            alt={p.title}
                            width={1200}
                            height={800}
                            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </motion.div>
                      )}

                      <div className="p-5 sm:p-6">
                        <Link href={href}>
                          <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2 hover:underline">
                            {p.title}
                          </h3>
                        </Link>
                        {p.description && (
                          <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark line-clamp-3">
                            {p.description}
                          </p>
                        )}
                        <Link
                          href={href}
                          className="inline-flex items-center mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-200"
                        >
                          Zobrazit více
                          <span className="ml-1 text-lg">→</span>
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SLUŽBY – tmavší sekce */}
        <section
          id="sluzby"
          className="py-18 md:py-20 bg-brand-bg dark:bg-brand-bgDark"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8 sm:mb-10">
              S čím ti můžu pomoct?
            </h2>

            {services.length === 0 && !loading ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Přidej dokumenty typu <strong>service</strong> a zobrazí se tady
                jako nabídka služeb.
              </p>
            ) : services.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám služby…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {services.map((s) => (
                  <motion.article
                    key={s._id}
                    whileHover={{ y: -6 }}
                    className="p-6 sm:p-7 rounded-2xl border shadow-xl text-left bg-brand-bg border-slate-200 dark:bg-brand-surfaceDark dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{(s as any).icon ?? "🛠️"}</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                        {s.title}
                      </h3>
                    </div>
                    {(s as any).shortDescription && (
                      <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                        {(s as any).shortDescription}
                      </p>
                    )}
                    {s.description && !(s as any).shortDescription && (
                      <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                        {s.description}
                      </p>
                    )}
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* REFERENCE – světlá / card sekce */}
        <section
          id="reference"
          className="py-18 md:py-20 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8 sm:mb-10">
              Co o mně říkají klienti 🗣️
            </h2>

            {references.length === 0 && !loading ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Až přidáš do studia dokumenty typu <strong>reference</strong>,
                zobrazí se tady doporučení a testimonialy.
              </p>
            ) : references.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám reference…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {references.map((r) => (
                  <motion.figure
                    key={r._id}
                    whileHover={{ y: -4 }}
                    className="p-6 sm:p-7 rounded-2xl border shadow-lg text-left bg-brand-bg border-slate-200 dark:bg-brand-surfaceDark dark:border-slate-800"
                  >
                    <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic mb-3">
                      {/* přizpůsob si podle svého schématu – text / quote */}
                      „{(r as any).text ?? (r as any).quote ?? ""}“
                    </blockquote>
                    <figcaption className="text-xs sm:text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                      <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                        {r.name}
                      </span>
                      {(r as any).company && <> · {(r as any).company}</>}
                      {(r as any).role && <> – {(r as any).role}</>}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 
        <section
          id="kontakt"
          className="py-18 md:py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-center text-white"
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-brand-surface/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Pojďme to probrat
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 mb-6">
                Napiš mi pár vět o projektu a do 24 hodin se ti ozvu s návrhem
                dalšího postupu.
              </p>
              <form className="space-y-4 text-left">
                <input
                  type="text"
                  placeholder="Jméno *"
                  required
                  className="w-full rounded-lg border border-white/20 bg-brand-surface/5 px-4 py-2.5 text-sm outline-none focus:border-white/60"
                />
                <input
                  type="email"
                  placeholder="E-mail *"
                  required
                  className="w-full rounded-lg border border-white/20 bg-brand-surface/5 px-4 py-2.5 text-sm outline-none focus:border-white/60"
                />
                <textarea
                  placeholder="Stručně popiš svůj projekt *"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-white/20 bg-brand-surface/5 px-4 py-2.5 text-sm outline-none focus:border-white/60 resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-surface text-indigo-700 font-semibold py-2.5 text-sm hover:bg-indigo-50"
                >
                  Odeslat zprávu
                </button>
              </form>
            </div>
          </div>
        </section>


       */}
      <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>

    </div>

      </main>
    </div>
  );
}
