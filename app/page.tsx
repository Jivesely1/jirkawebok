'use client';

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type MouseEvent,
} from "react";
import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

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

// Navigace
const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#dovednosti", label: "Dovednosti" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#sluzby", label: "Služby" },
  { href: "#reference", label: "Reference" },
  { href: "#kontakt", label: "Kontakt" },
];

const SCROLL_OFFSET = 120;

const fadeInSection: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("uvod");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  // Inicializace tématu (dark/light)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Uložení tématu
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Smooth scroll
  const handleSmoothScroll = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const targetId = e.currentTarget.getAttribute("href")?.replace("#", "");
      const el = targetId ? document.getElementById(targetId) : null;
      if (!el) return;

      e.preventDefault();
      window.scrollTo({
        top: el.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    },
    []
  );

  // Aktivní sekce podle scrollu
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const onScroll = () => {
      let currentId = "";
      const y = window.scrollY + SCROLL_OFFSET + 10;

      sections.forEach((el) => {
        if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          currentId = el.id;
        }
      });

      setActiveSection(currentId || "uvod");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Styl mobilního menu
  const mobileMenuStyles = useMemo(
    (): CSSProperties => ({
      height: isMenuOpen ? "auto" : "0",
      opacity: isMenuOpen ? 1 : 0,
      pointerEvents: isMenuOpen ? "auto" : "none",
    }),
    [isMenuOpen]
  );

  const rootClass =
    theme === "dark"
      ? "min-h-screen bg-slate-950 text-slate-100"
      : "min-h-screen bg-slate-50 text-slate-900";

  const cardBg =
    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const sectionAltBg = theme === "dark" ? "bg-slate-900" : "bg-white";
  const sectionMainBg = theme === "dark" ? "bg-slate-950" : "bg-slate-50";

  return (
    <div className={rootClass}>
      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[100] text-white text-3xl md:text-4xl font-extrabold">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            Jirka Veselý 💻
          </motion.span>
        </div>
      )}

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
          theme === "dark"
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 h-16">
          <a
            href="#uvod"
            onClick={handleSmoothScroll}
            className="text-xl sm:text-2xl font-extrabold text-indigo-500"
          >
            &lt;JirkaVeselý /&gt;
          </a>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
              className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900 text-slate-100 hover:border-indigo-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"
              }`}
            >
              {theme === "dark" ? "☀️ Světlý režim" : "🌙 Tmavý režim"}
            </button>

            {/* Mobilní — burger */}
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="md:hidden text-3xl p-2"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>

            {/* Desktop navigace */}
            <nav className="hidden md:flex gap-5 text-sm items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className={`transition ${
                    activeSection === link.href.slice(1)
                      ? "text-indigo-400 font-semibold"
                      : "hover:text-indigo-300"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={handleSmoothScroll}
                className="px-5 py-2 rounded-full bg-indigo-500 text-slate-50 font-semibold hover:bg-indigo-400 transition shadow-lg"
              >
                Spolupracujme
              </a>
            </nav>
          </div>
        </div>

        {/* Mobilní menu */}
        <nav
          style={mobileMenuStyles}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            theme === "dark" ? "bg-slate-950 border-t border-slate-800" : "bg-white border-t border-slate-200"
          }`}
        >
          <div className="flex flex-col px-4 pt-2 pb-4 gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
              className={`mb-2 inline-flex items-center justify-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900 text-slate-100"
                  : "border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              {theme === "dark" ? "☀️ Světlý režim" : "🌙 Tmavý režim"}
            </button>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={`block py-2 px-2 rounded-lg ${
                  activeSection === link.href.slice(1)
                    ? "bg-indigo-500/10 text-indigo-300 font-semibold"
                    : "hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className="mt-2 block text-center px-4 py-2 rounded-full bg-indigo-500 text-slate-50 font-semibold"
            >
              Mám zájem o web
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* ÚVOD */}
        <motion.section
          id="uvod"
          className={`${sectionMainBg} min-h-[70vh] flex items-center py-16 md:py-24`}
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-400">
                Ahoj, jsem Jirka
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Váš{" "}
                <span className="text-indigo-400">
                  Full-Stack partner
                </span>{" "}
                pro moderní weby a aplikace
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                Stavím weby v Next.js, napojuji je na Sanity CMS a řeším i
                nasazení, infrastrukturu a dlouhodobý rozvoj.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="#kontakt"
                  onClick={handleSmoothScroll}
                  className="inline-flex items-center rounded-full bg-indigo-500 px-6 py-2 font-semibold text-slate-950 hover:bg-indigo-400"
                >
                  Mám zájem o web
                </a>
                <a
                  href="#portfolio"
                  onClick={handleSmoothScroll}
                  className="inline-flex items-center rounded-full border border-slate-600 px-6 py-2 text-slate-200 hover:border-indigo-400 hover:text-indigo-200"
                >
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
                src="https://placehold.co/640x460/4f46e5/ffffff?text=Next.js+%2B+Sanity"
                alt="Notebook s kódem"
                width={640}
                height={460}
                className="w-full max-w-md rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* O MNĚ */}
        <motion.section
          id="o-mne"
          className={`${sectionAltBg} py-16 md:py-20`}
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400">
                Kdo jsem a jak pracuji?
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Jmenuji se Jiří Veselý. Spojuji moderní frontend (React / Next.js)
                s rozumnou architekturou, integracemi a DevOpsem.
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Místo “na koleni” raději stavím řešení, která můžeš rozvíjet:
                Sanity jako headless CMS, nasazení na Vercel a čistý kód
                připravený na další funkce.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }}>
              <Image
                src="https://placehold.co/220x220/020617/ffffff?text=JV"
                alt="Jirka Veselý"
                width={220}
                height={220}
                className="rounded-full mx-auto border-4 border-indigo-500 shadow-xl object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* DOVEDNOSTI */}
        <section
          id="dovednosti"
          className={`${sectionMainBg} py-16 md:py-20 text-center`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-8 sm:mb-10">
            Tech stack & dovednosti 🛠️
          </h2>
          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
            {skills.length === 0 && !loading ? (
              <p className="text-slate-400 text-sm">
                Zatím nemáš ve studiu žádné dovednosti – přidej dokumenty typu{" "}
                <strong>skill</strong>.
              </p>
            ) : skills.length === 0 ? (
              <p className="text-slate-400 text-sm">Načítám dovednosti…</p>
            ) : (
              skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm ${
                    theme === "dark"
                      ? "border-indigo-500/60 bg-slate-900 text-indigo-200"
                      : "border-indigo-500/60 bg-white text-indigo-700"
                  }`}
                >
                  <span className="text-lg">
                    {(skill as any).emoji ?? "💡"}
                  </span>
                  <span>{skill.name}</span>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section
          id="portfolio"
          className={`${sectionAltBg} py-18 md:py-20`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-8 sm:mb-10">
              Vybrané projekty 🏆
            </h2>

            {projects.length === 0 && !loading ? (
              <p className="text-center text-slate-400 text-sm">
                Zatím nemáš ve studiu žádné projekty – přidej dokumenty typu{" "}
                <strong>project</strong>.
              </p>
            ) : projects.length === 0 ? (
              <p className="text-center text-slate-400 text-sm">
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
                      className={`rounded-2xl border shadow-xl overflow-hidden group ${cardBg}`}
                    >
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
                          <h3 className="text-lg sm:text-xl font-semibold text-indigo-300 mb-2 hover:underline">
                            {p.title}
                          </h3>
                        </Link>
                        {p.description && (
                          <p className="text-sm text-slate-300 line-clamp-3">
                            {p.description}
                          </p>
                        )}
                        <Link
                          href={href}
                          className="inline-flex items-center mt-4 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
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

        {/* SLUŽBY */}
        <section
          id="sluzby"
          className={`${sectionMainBg} py-18 md:py-20`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-8 sm:mb-10">
              S čím ti můžu pomoct?
            </h2>

            {services.length === 0 && !loading ? (
              <p className="text-center text-slate-400 text-sm">
                Přidej dokumenty typu <strong>service</strong> a zobrazí se tady
                jako nabídka služeb.
              </p>
            ) : services.length === 0 ? (
              <p className="text-center text-slate-400 text-sm">
                Načítám služby…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {services.map((s) => (
                  <motion.article
                    key={s._id}
                    whileHover={{ y: -6 }}
                    className={`p-6 sm:p-7 rounded-2xl border shadow-xl text-left ${cardBg}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">
                        {(s as any).icon ?? "🛠️"}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-indigo-300">
                        {s.title}
                      </h3>
                    </div>
                    {(s as any).shortDescription && (
                      <p className="text-sm text-slate-300">
                        {(s as any).shortDescription}
                      </p>
                    )}
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* REFERENCE */}
        <section
          id="reference"
          className={`${sectionAltBg} py-18 md:py-20`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-8 sm:mb-10">
              Co o mně říkají klienti 🗣️
            </h2>

            {references.length === 0 && !loading ? (
              <p className="text-center text-slate-400 text-sm">
                Až přidáš do studia dokumenty typu <strong>reference</strong>,
                zobrazí se tady doporučení a testimonialy.
              </p>
            ) : references.length === 0 ? (
              <p className="text-center text-slate-400 text-sm">
                Načítám reference…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {references.map((r) => (
                  <motion.figure
                    key={r._id}
                    whileHover={{ y: -4 }}
                    className={`p-6 sm:p-7 rounded-2xl border shadow-lg text-left ${cardBg}`}
                  >
                    <blockquote className="text-sm sm:text-base text-slate-200 italic mb-3">
                      „{r.quote}“
                    </blockquote>
                    <figcaption className="text-xs sm:text-sm text-slate-400">
                      <span className="font-semibold text-indigo-300">
                        {r.name}
                      </span>
                      {r.company && <> · {r.company}</>}
                      {r.role && <> – {r.role}</>}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* KONTAKT */}
        <section
          id="kontakt"
          className="py-18 md:py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-center text-white"
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10">
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
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/60"
                />
                <input
                  type="email"
                  placeholder="E-mail *"
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/60"
                />
                <textarea
                  placeholder="Stručně popiš svůj projekt *"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/60 resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-white text-indigo-700 font-semibold py-2.5 text-sm hover:bg-indigo-50"
                >
                  Odeslat zprávu
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
