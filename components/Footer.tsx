import { Github, Linkedin, Mail, Globe, SmilePlus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* LEVÁ STRANA */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Jiří Veselý
              <SmilePlus className="w-6 h-6 text-indigo-400" />
            </h3>

            <p className="max-w-sm text-sm text-slate-400">
              Full-stack developer specializující se na Next.js, React a Sanity.
              Tvořím čisté, rychlé a škálovatelné weby připravené na budoucnost.
            </p>
          </div>

          {/* NAV */}
          <div>
            <h4 className="font-semibold uppercase text-xs text-slate-400 tracking-wide mb-3">
              Navigace
            </h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#uvod" className="hover:text-indigo-400 transition">Úvod</a></li>
              <li><a href="#o-mne" className="hover:text-indigo-400 transition">O mně</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-400 transition">Portfolio</a></li>
              <li><a href="#sluzby" className="hover:text-indigo-400 transition">Služby</a></li>
              <li><a href="#kontakt" className="hover:text-indigo-400 transition">Kontakt</a></li>
            </ul>
          </div>

          {/* SOCIAL + KONTAKTY */}
          <div>
            <h4 className="font-semibold uppercase text-xs text-slate-400 tracking-wide mb-3">
              Spojme se
            </h4>

            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:vesely.jirka.dev@gmail.com" className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Mail className="w-4 h-4" /> vesely.jirka.dev@gmail.com
              </a>
              <a href="https://github.com/Jivesely1" target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://jirkawebok.vercel.app" target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Globe className="w-4 h-4" /> Moje portfolio
              </a>
            </div>
          </div>

        </div>

        {/* SPODNÍ ČÁRA */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          Vyrobeno v roce 2025 • S láskou ke kódu • <span className="text-indigo-400">Jirka Veselý</span>
        </div>

      </div>
    </footer>
  );
}
