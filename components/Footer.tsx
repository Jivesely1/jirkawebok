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
    <footer className="relative w-full mt-40 overflow-hidden border-t border-brand-border/40 dark:border-brand-borderDark/40">

      {/* DARK MODE AURORA */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div className="absolute -top-40 left-1/2 w-[150%] h-[200%] -translate-x-1/2
          animate-aurora
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
          from-indigo-600/20 via-purple-500/10 to-transparent
          blur-3xl opacity-60">
        </div>
      </div>

      {/* LIGHT MODE SOFT SURFACE */}
      <div className="absolute inset-0 pointer-events-none block dark:hidden">
        <div className="absolute inset-0 bg-brand-surface/60 blur-xl opacity-60"></div>
      </div>

      {/* SHIMMER LINE */}
      <div className="absolute -top-[1px] left-0 right-0 h-[2px]
        bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 opacity-70">
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-20">

        <div className="flex flex-col md:flex-row justify-between gap-16">
          
          {/* BRAND BLOCK */}
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

              <h3 className="text-3xl font-bold text-brand-text dark:text-brand-textDark flex items-center gap-2">
                Jiří Veselý
                <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse-slow" />
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-brand-textMuted dark:text-brand-textMutedDark">
              Tvořím moderní weby pomocí <span className="text-indigo-400 font-medium">Next.js</span>,
              <span className="text-indigo-400 font-medium"> React</span> a 
              <span className="text-indigo-400 font-medium"> Sanity</span>.
            </p>
          </div>

          {/* NAVIGACE */}
          <div>
            <h4 className="footer-heading">Navigace</h4>
            <ul className="footer-list">
              <li><a href="#uvod" className="footer-link"><Home className="w-4 h-4" /> Úvod</a></li>
              <li><a href="#o-mne" className="footer-link"><User className="w-4 h-4" /> O mně</a></li>
              <li><a href="#dovednosti" className="footer-link"><Layers className="w-4 h-4" /> Dovednosti</a></li>
              <li><a href="#portfolio" className="footer-link"><Briefcase className="w-4 h-4" /> Portfolio</a></li>
              <li><a href="#sluzby" className="footer-link"><Star className="w-4 h-4" /> Služby</a></li>
              <li><a href="#reference" className="footer-link"><Sparkles className="w-4 h-4" /> Reference</a></li>
              <li><a href="#kontakt" className="footer-link"><Phone className="w-4 h-4" /> Kontakt</a></li>
            </ul>
          </div>

          {/* KONTAKT + QR */}
          <div>
            <h4 className="footer-heading">Spojme se</h4>
            <ul className="footer-list">
              <li><a href="mailto:vesely.jirka.dev@gmail.com" className="footer-social"><Mail className="w-4 h-4" /> vesely.jirka.dev@gmail.com</a></li>
              <li><a href="https://github.com/Jivesely1" className="footer-social"><Github className="w-4 h-4" /> GitHub</a></li>
              <li><a href="https://linkedin.com" className="footer-social"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
              <li><a href="https://jirkawebok.vercel.app" className="footer-social"><Globe className="w-4 h-4" /> Portfolio</a></li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-brand-surface/40 dark:bg-brand-surfaceDark/40 
                border border-brand-border/30 dark:border-brand-borderDark/30
                shadow-inner backdrop-blur-md w-fit">
              <QrCode className="w-20 h-20 text-indigo-300" />
            </div>
          </div>
        </div>

        {/* MINI FOOTER */}
        <div className="mt-16 pt-8 border-t border-brand-border/40 dark:border-brand-borderDark/30 text-center">
          <p className="text-xs text-brand-textMuted dark:text-brand-textMutedDark flex justify-center items-center gap-1">
            © 2025 • Vyrobeno s láskou • 
            <span className="text-indigo-400 font-medium">Jiří Veselý</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
