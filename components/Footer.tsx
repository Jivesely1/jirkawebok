export default function Footer() {
  return (
    <footer className="w-full bg-brand-bgDark dark:bg-black/70 backdrop-blur-xl border-t border-slate-800 pt-14 pb-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEVÝ BLOK */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Jiří Veselý
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Full-stack vývoj webů v Next.js · React · Sanity.  
            Tvořím čistá, rychlá a škálovatelná řešení.
          </p>
        </div>

        {/* STŘED – NAVIGACE */}
        <div className="text-center md:text-left">
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Navigace
          </h4>
          <ul className="space-y-1 text-slate-400 text-sm">
            <li><a href="#uvod" className="hover:text-indigo-400 transition">Úvod</a></li>
            <li><a href="#o-mne" className="hover:text-indigo-400 transition">O mně</a></li>
            <li><a href="#portfolio" className="hover:text-indigo-400 transition">Portfolio</a></li>
            <li><a href="#sluzby" className="hover:text-indigo-400 transition">Služby</a></li>
            <li><a href="#kontakt" className="hover:text-indigo-400 transition">Kontakt</a></li>
          </ul>
        </div>

        {/* PRAVÝ BLOK – SOCIAL IKONY */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Sítě & odkazy
          </h4>

          <div className="flex items-center gap-4 text-slate-400 text-lg">
            <a href="https://github.com/Jivesely1" target="_blank" className="hover:text-indigo-400 transition">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" className="hover:text-indigo-400 transition">LinkedIn</a>
            <a href="https://www.upwork.com" target="_blank" className="hover:text-indigo-400 transition">Upwork</a>
            <a href="mailto:vesely.jirka.dev@gmail.com" className="hover:text-indigo-400 transition">Email</a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-xs text-slate-600 mt-12">
        © {new Date().getFullYear()} Jiří Veselý · Next.js · React · Vercel
      </div>
    </footer>
  );
}
