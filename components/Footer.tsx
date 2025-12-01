export default function Footer() {
  return (
    <footer className="w-full py-8 mt-16 bg-slate-100/70 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200/40 dark:border-slate-700/40">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Jiří Veselý — Full-Stack Developer</p>

        <div className="mt-2 flex items-center justify-center gap-4 text-indigo-600 dark:text-indigo-400 font-medium">
          <a href="https://github.com/Jivesely1" target="_blank">GitHub</a>
          <span>•</span>
          <a href="https://www.linkedin.com" target="_blank">LinkedIn</a>
          <span>•</span>
          <a href="https://jirkawebok.vercel.app" target="_blank">Portfolio</a>
        </div>

        <p className="mt-3 text-[11px] opacity-70">
          Postaveno pomocí Next.js · React · Tailwind · Vercel
        </p>
      </div>
    </footer>
  );
}
