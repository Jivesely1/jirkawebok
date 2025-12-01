import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Sparkles,
  Home,
  User,
  Briefcase,
  Star,
  Phone,
  QrCode,
  Layers,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full mt-40 overflow-hidden border-t border-brand-borderDark/40 bg-brand-surfaceDark/60 backdrop-blur-xl">

      {/* SHIMMER LINE – jemná, ne křiklavá */}
      <div className="absolute -top-[1px] left-0 right-0 h-[2px]
        bg-gradient-to-r from-indigo-500/60 via-purple-400/40 to-indigo-500/60">
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-20">

        <div className="flex flex-col md:flex-row justify-between gap-16">

          {/* BRAND */}
          <div className="max-w-sm space-y-5">
            <div className="flex items-center gap-3">

              <svg width="42" height="42" viewBox="0 0 100 100" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="22" fill="url(#grad)" />
                <path d="M30 65 L50 35 L70 65" stroke="white" strokeWidth="8" strokeLinecap="round" />
              </svg>

              <h3 className="text-3xl font-bold text-brand-textDark flex items-center gap-2">
                Jiří Veselý
                <Sparkles className="w-6 h-6 text-indigo-300 animate-pulse-slow" />
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-brand-textMutedDark">
              Tvořím moderní weby pomocí <span className="text-indigo-400 font-medium">Next.js</span>,{" "}
              <span className="text-indigo-400 font-medium">Reactu</span> a{" "}
              <span className="text-indigo-400 font-medium">Sanity</span>.
            </p>
          </div>

          {/* NAVIGACE */}
          <div>
            <h4 className="footer-heading">Navigace</h4>
            <ul className="footer-list">
              <li><a className="footer-link" href="#uvod"><Home className="w-4 h-4"/> Úvod</a></li>
              <li><a className="footer-link" href="#o-mne"><User className="w-4 h-4"/> O mně</a></li>
              <li><a className="footer-link" href="#dovednosti"><Layers className="w-4 h-4"/> Dovednosti</a></li>
              <li><a className="footer-link" href="#portfolio"><Briefcase className="w-4 h-4"/> Portfolio</a></li>
              <li><a className="footer-link" href="#sluzby"><Star className="w-4 h-4"/> Služby</a></li>
              <li><a className="footer-link" href="#reference"><Sparkles className="w-4 h-4"/> Reference</a></li>
              <li><a className="footer-link" href="#kontakt"><Phone className="w-4 h-4"/> Kontakt</a></li>
            </ul>
          </div>

          {/* KONTAKT + QR */}
          <div>
            <h4 className="footer-heading">Spojme se</h4>

            <ul className="footer-list">
              <li><a className="footer-social" href="mailto:vesely.jirka.dev@gmail.com"><Mail className="w-4 h-4"/> vesely.jirka.dev@gmail.com</a></li>
              <li><a className="footer-social" href="https://github.com/Jivesely1"><Github className="w-4 h-4"/> GitHub</a></li>
              <li><a className="footer-social" href="https://linkedin.com"><Linkedin className="w-4 h-4"/> LinkedIn</a></li>
              <li><a className="footer-social" href="https://jirkawebok.vercel.app"><Globe className="w-4 h-4"/> Portfolio</a></li>
            </ul>

            {/* QR s odkazem */}
            <a
              href="https://jirkawebok.vercel.app"
              target="_blank"
              className="block mt-6 p-4 rounded-xl bg-brand-surfaceDark/40 border border-brand-borderDark/40 shadow-inner backdrop-blur-md w-fit hover:scale-105 hover:border-indigo-400/50 transition"
            >
              <QrCode className="w-20 h-20 text-indigo-300" />
            </a>
          </div>
        </div>

        {/* MINI FOOTER */}
        <div className="mt-16 pt-8 border-t border-brand-borderDark/40 text-center">
          <p className="text-xs text-brand-textMutedDark flex justify-center items-center gap-1">
            © 2025 • Vyrobeno s láskou • <span className="text-indigo-400 font-medium">Jiří Veselý</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
