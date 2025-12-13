"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
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

import ContactSection from "../components/ContactForm";
import Footer from "../components/Footer";

// Jemnější a rychlejší animace
const fadeInSection: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [services, setServices] = useState<SanityService[]>([]);
  const [references, setReferences] = useState<SanityReference[]>([]);
  const [skills, setSkills] = useState<SanitySkill[]>([]);

  // 🚀 Optimalizované načítání dat
  useEffect(() => {
    (async () => {
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 📌 Profesionální smooth scroll pro #kontakt při přechodu z detailu
  const scrollToHash = useCallback(() => {
    if (window.location.hash === "#kontakt") {
      const target = document.getElementById("kontakt");
      if (!target) return;

      // malý delay – zabrání problémům při server fetchi a layout shiftu
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text dark:bg-brand-bgDark dark:text-brand-textDark">

      {/* Global Loader (neblokuje animaci celé stránky) */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white text-3xl md:text-4xl font-extrabold">
          <motion.span
            initial={{ opacity: 0.4, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Jirka Veselý 💻
          </motion.span>
        </div>
      )}

      <main>

        {/* ÚVOD */}
        <motion.section
          id="uvod"
          className="min-h-[70vh] flex items-center py-20 bg-gradient-to-b from-brand-bg via-brand-surface to-brand-bg dark:from-brand-bgDark dark:via-brand-surfaceDark dark:to-brand-bgDark"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-wider text-indigo-500">
                Ahoj, jsem Jirka
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Full-stack{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  partner
                </span>{" "}
                pro moderní weby a aplikace
              </h1>

              <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark max-w-md">
                Specializuji se na Next.js, Sanity CMS, rychlé weby a profesionální vývoj.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="#kontakt"
                  className="rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Mám zájem o web
                </Link>

                <Link
                  href="#portfolio"
                  className="rounded-full border border-brand-border dark:border-brand-borderDark px-6 py-2 hover:border-brand-accent hover:text-brand-accent transition"
                >
                  Zobrazit projekty
                </Link>
              </div>
            </div>

            {/* Obrázek */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
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

        {/* O MNĚ */}
        <motion.section
          id="o-mne"
          className="py-20 bg-brand-surface dark:bg-brand-surfaceDark shadow-soft"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                Kdo jsem a jak pracuji?
              </h2>

              <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                Jsem Jiří Veselý – web developer kombinující moderní technologie,
                čistý kód a reálné výsledky.
              </p>

              <p className="text-xs text-brand-textMuted dark:text-brand-textMutedDark">
                Nejčastěji používám Next.js + Sanity CMS + Vercel. Zaměřuji se na
                dlouhodobou udržitelnost, rychlost a škálovatelnost.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/jirka.png"
                alt="Jirka Veselý"
                width={240}
                height={240}
                className="rounded-full mx-auto border-4 border-indigo-500 shadow-xl object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* DOVEDNOSTI */}
        <section
          id="dovednosti"
          className="py-20 text-center bg-brand-bg dark:bg-brand-bgDark"
        >
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-10">
            Tech stack & dovednosti 🛠️
          </h2>

          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
            {skills.length === 0 && !loading && (
              <p className="text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Zatím nemáš přidané dovednosti.
              </p>
            )}

            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full border text-sm font-semibold shadow-sm border-brand-accent/60 bg-brand-surface dark:bg-brand-surfaceDark"
              >
                <span className="mr-1">{(skill as any).emoji ?? "💡"}</span>
                {skill.name}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section
          id="portfolio"
          className="py-20 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-10">
              Vybrané projekty 🏆
            </h2>

            {projects.length === 0 && !loading && (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Zatím nemáš žádné projekty.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {projects.map((p) => {
                const slug = p.slug?.current;
                const href = slug ? `/projekty/${slug}` : "#";

                return (
                  <motion.article
                    key={p._id}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl border shadow-card bg-brand-surface dark:bg-brand-surfaceDark overflow-hidden"
                  >
                    {p.imageUrl && (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        width={1200}
                        height={800}
                        className="w-full h-44 object-cover"
                      />
                    )}

                    <div className="p-6">
                      <Link href={href}>
                        <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 hover:underline">
                          {p.title}
                        </h3>
                      </Link>

                      {p.description && (
                        <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark line-clamp-3 mt-2">
                          {p.description}
                        </p>
                      )}

                      <Link
                        href={href}
                        className="inline-flex items-center mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-500"
                      >
                        Zobrazit více →
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <section id="sluzby" className="py-20 bg-brand-bg dark:bg-brand-bgDark">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-12">
              S čím ti můžu pomoct?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {services.map((s) => (
                <motion.article
                  key={s._id}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-2xl shadow-xl bg-brand-bg dark:bg-brand-surfaceDark border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{(s as any).icon ?? "🛠️"}</span>
                    <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                    {(s as any).shortDescription ?? s.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* REFERENCE */}
        <section
          id="reference"
          className="py-20 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-12">
              Co o mně říkají klienti 🗣️
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {references.map((r) => (
                <motion.figure
                  key={r._id}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-2xl border shadow-lg bg-brand-bg dark:bg-brand-surfaceDark border-slate-200 dark:border-slate-800"
                >
                  <blockquote className="text-sm italic mb-3 text-slate-700 dark:text-slate-200">
                    „{(r as any).text ?? r.quote ?? ""}“
                  </blockquote>

                  <figcaption className="text-xs text-brand-textMuted dark:text-brand-textMutedDark">
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                      {r.name}
                    </span>
                    {(r as any).company && ` · ${(r as any).company}`}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAKT */}
        <section
          id="kontakt"
          className="py-20 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-10">
              Kontakt
            </h2>

            <ContactSection />
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
