import {
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Briefcase,
  Star,
  Phone,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full mt-40 bg-[#0d1117] border-t border-white/10 text-white">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="flex flex-col md:flex-row justify-between gap-16">

          {/* BRAND */}
          <div className="max-w-sm space-y-5">

            <div className="flex items-center gap-3">
              {/* LOGO */}
              <svg width="42" height="42" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="22" fill="url(#grad)" />
                <path
                  d="M30 65 L50 35 L70 65"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>

              <h3 className="text-2xl font-bold flex items-center gap-2">
                Jiří Veselý
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Tvořím moderní weby pomocí Next.js, React a Sanity.
              Zaměřuji se na čistý design, rychlost a uživatelskou přívětivost.
            </p>

          </div>

          {/* NAVIGACE */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-slate-500 mb-4">Navigace</h4>
            <ul className="space-y-2 text-sm text-slate-400">

              <li><a href="#uvod" className="hover:text-indigo-400 flex items-center gap-2"><Home className="w-4 h-4"/> Úvod</a></li>
              <li><a href="#o-mne" className="hover:text-indigo-400 flex items-center gap-2"><User className="w-4 h-4"/> O mně</a></li>
              <li><a href="#dovednosti" className="hover:text-indigo-400 flex items-center gap-2"><Layers className="w-4 h-4"/> Dovednosti</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-400 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Portfolio</a></li>
              <li><a href="#sluzby" className="hover:text-indigo-400 flex items-center gap-2"><Star className="w-4 h-4"/> Služby</a></li>
              <li><a href="#reference" className="hover:text-indigo-400 flex items-center gap-2"><Sparkles className="w-4 h-4"/> Reference</a></li>
              <li><a href="#kontakt" className="hover:text-indigo-400 flex items-center gap-2"><Phone className="w-4 h-4"/> Kontakt</a></li>

            </ul>
          </div>

          {/* SPOJENÍ + QR */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-slate-500 mb-4">Spojme se</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="mailto:vesely.jirka.dev@gmail.com" className="hover:text-indigo-400 flex items-center gap-2"><Mail className="w-4 h-4"/> vesely.jirka.dev@gmail.com</a></li>
              <li><a href="https://github.com/Jivesely1" className="hover:text-indigo-400 flex items-center gap-2"><Github className="w-4 h-4"/> GitHub</a></li>
              <li><a href="https://linkedin.com" className="hover:text-indigo-400 flex items-center gap-2"><Linkedin className="w-4 h-4"/> LinkedIn</a></li>
            </ul>

            {/* QR — neklikací, skenovatelný */}
            <div className="mt-6 p-4 rounded-xl bg-[#0f131a] border border-slate-700 w-fit">
              <img
                src="/qr.png"
                alt="QR kód – Portfolio Jiří Veselý"
                className="w-20 h-20"
              />
            </div>
          </div>

        </div>

        {/* spodní linka */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            © 2025 – Vyrobeno s láskou • Jiří Veselý
          </p>
        </div>

      </div>

    </footer>
  );
}
