"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Type, MessageCircle, CheckCircle2, X } from "lucide-react";

export default function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔢 Dynamická antispam otázka – při každém reloadu jiné číslo
  const { questionA, questionB, solution } = useMemo(() => {
    const a = Math.floor(Math.random() * 6) + 2; // 2–7
    const b = Math.floor(Math.random() * 6) + 2; // 2–7
    return { questionA: a, questionB: b, solution: a + b };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const spamCheck = (form.elements.namedItem("spamCheck") as HTMLInputElement).value;
    const honey = (form.elements.namedItem("honey") as HTMLInputElement).value;

    // Honeypot: pokud to bot vyplní, tváříme se, že je vše OK, ale nic neposíláme
    if (honey.trim() !== "") {
      setLoading(false);
      setSuccess(true);
      form.reset();
      return;
    }

    // Kontrola antispamu
    if (parseInt(spamCheck) !== solution) {
      setLoading(false);
      setError("Špatná odpověď na kontrolní otázku.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message, honey }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setSuccess(true);
      form.reset();
    } else {
      setError(data.error || "Něco se nepovedlo. Zkus to prosím znovu.");
    }
  }

  return (
    <>
      <section className="w-full py-28 bg-slate-100 dark:bg-slate-950 transition-colors">
        <div className="mx-auto max-w-5xl px-4">
          {/* Gradient rámeček kolem skleněné karty */}
          <div className="rounded-[32px] p-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-violet-500 shadow-2xl">
            <div className="rounded-[30px] bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-white/40 dark:border-slate-700 px-8 md:px-12 py-10 md:py-14">
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mb-2">
                  Kontakt
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Pojďme to probrat
                </h2>
                <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Napiš mi pár informací o projektu a ozvu se ti do 24 hodin s dalším postupem.
                </p>
              </div>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <input type="text" name="honey" className="hidden" />

                {/* Jméno + E-mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingInput
                    name="name"
                    label="Jméno *"
                    placeholder="Např. Jan Novák"
                    icon={<User className="w-4 h-4" />}
                    type="text"
                    required
                  />
                  <FloatingInput
                    name="email"
                    label="E-mail *"
                    placeholder="email@domena.cz"
                    icon={<Mail className="w-4 h-4" />}
                    type="email"
                    required
                  />
                </div>

                {/* Předmět */}
                <FloatingInput
                  name="subject"
                  label="Předmět zprávy *"
                  placeholder="Např. Potřebujeme nový firemní web"
                  icon={<Type className="w-4 h-4" />}
                  type="text"
                  required
                />

                {/* Zpráva */}
                <FloatingTextarea
                  name="message"
                  label="Zpráva *"
                  placeholder="Popiš stručně svůj projekt, cíle a rozpočet…"
                  icon={<MessageCircle className="w-4 h-4" />}
                  required
                />

                {/* Antispam */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 items-end">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Malá kontrola, že nejsi robot:
                    </p>
                    <p className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 text-xs font-medium text-slate-700 dark:text-slate-200">
                      Výsledek příkladu{" "}
                      <span className="mx-1 font-semibold">
                        {questionA} + {questionB}
                      </span>
                      ?
                    </p>
                  </div>
                  <FloatingInput
                    name="spamCheck"
                    label="Odpověď *"
                    placeholder="Sem napiš výsledek"
                    icon={null}
                    type="number"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-lg font-semibold 
                    shadow-lg shadow-indigo-500/40 hover:bg-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Odesílám…" : "Odeslat zprávu"}
                </motion.button>

                {error && (
                  <p className="text-center text-sm text-red-500 mt-2">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Success modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 shadow-2xl relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Zpráva byla úspěšně odeslána 📩
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Díky za důvěru. Jakmile to projdu, ozvu se ti s návrhem dalšího postupu.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-3 inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
                >
                  Zavřít
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Pomocné komponenty pro plovoucí labely ───────────── */

type FloatingInputProps = {
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode | null;
  type?: string;
  required?: boolean;
};

function FloatingInput({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  required,
}: FloatingInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-slate-400 dark:text-slate-500 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className={`w-full peer rounded-2xl border border-slate-300 dark:border-slate-700 
        bg-white/80 dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 
        shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
        px-3 ${icon ? "pl-10" : "pl-3"} pt-5 pb-2 text-sm`}
      />
      <label
        className={`pointer-events-none absolute text-xs text-slate-500 dark:text-slate-400 
        top-2 ${icon ? "left-10" : "left-3"} 
        transition-all duration-200 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
        peer-placeholder-shown:text-slate-500 peer-focus:top-1 
        peer-focus:text-[11px] peer-focus:text-indigo-500`}
      >
        {label}
      </label>
      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{placeholder}</p>
    </div>
  );
}

type FloatingTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode | null;
  required?: boolean;
};

function FloatingTextarea({
  name,
  label,
  placeholder,
  icon,
  required,
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-slate-400 dark:text-slate-500 pointer-events-none">
          {icon}
        </span>
      )}
      <textarea
        name={name}
        required={required}
        placeholder=" "
        rows={5}
        className={`w-full peer rounded-2xl border border-slate-300 dark:border-slate-700 
        bg-white/80 dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 
        shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
        px-3 ${icon ? "pl-10" : "pl-3"} pt-5 pb-3 text-sm resize-vertical`}
      />
      <label
        className={`pointer-events-none absolute text-xs text-slate-500 dark:text-slate-400 
        top-2 ${icon ? "left-10" : "left-3"} 
        transition-all duration-200 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
        peer-placeholder-shown:text-slate-500 peer-focus:top-1 
        peer-focus:text-[11px] peer-focus:text-indigo-500`}
      >
        {label}
      </label>
      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{placeholder}</p>
    </div>
  );
}
