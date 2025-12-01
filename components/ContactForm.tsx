"use client";

import { useEffect, useState, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Type, MessageCircle, CheckCircle2, X } from "lucide-react";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [questionA, setQuestionA] = useState<number | null>(null);
  const [questionB, setQuestionB] = useState<number | null>(null);
  const solution = useMemo(() => {
    if (questionA !== null && questionB !== null) {
      return questionA + questionB;
    }
    return null;
  }, [questionA, questionB]);

  useEffect(() => {
    const a = Math.floor(Math.random() * 6) + 2;
    const b = Math.floor(Math.random() * 6) + 2;
    setQuestionA(a);
    setQuestionB(b);
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

    if (honey.trim() !== "") {
      setLoading(false);
      setSuccess(true);
      form.reset();
      return;
    }

    if (solution === null || parseInt(spamCheck) !== solution) {
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
      setError("Něco se nepovedlo. Zkus to prosím znovu.");
    }
  }

  return (
    <>
      <section className="w-full py-10 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mt-4 rounded-[28px] bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-8 md:p-10 border border-white/40 dark:border-slate-700">

              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  Pojďme to probrat
                </h2>
                <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm">
                  Napiš mi pár informací o projektu a ozvu se ti do 24 hodin.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="text" name="honey" className="hidden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatingInput name="name" label="Jméno" placeholder="Např. Jan Novák" icon={<User className="w-4 h-4" />} required />
                  <FloatingInput name="email" label="E-mail" placeholder="email@domena.cz" icon={<Mail className="w-4 h-4" />} type="email" required />
                </div>

                <FloatingInput name="subject" label="Předmět zprávy" placeholder="Např. Nový web" icon={<Type className="w-4 h-4" />} required />

                <FloatingTextarea name="message" label="Zpráva" placeholder="Popiš stručně svůj projekt…" icon={<MessageCircle className="w-4 h-4" />} required />

                {solution !== null && (
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-300">
                      Kontrolní otázka: <strong>{questionA} + {questionB}</strong> =
                    </label>
                    <FloatingInput name="spamCheck" label="" placeholder="Výsledek" icon={null} type="number" required />
                  </div>
                )}

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Odesílám…" : "Odeslat zprávu"}
                </motion.button>

                {error && (
                  <p className="text-center text-sm text-red-500 mt-1">{error}</p>
                )}
              </form>
            </div>
          </div>
      
      </section>

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
                  Zpráva byla úspěšně odeslána!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Ozvu se ti co nejdříve. Díky za důvěru.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── FLOATING INPUT ───────────── */

type FloatingInputProps = {
  name: string;
  label?: string;
  placeholder: string;
  icon?: ReactNode | null;
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
      {icon && <span className="absolute left-3 top-3 text-slate-400 dark:text-slate-500">{icon}</span>}
      <input
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className={`w-full peer rounded-xl border border-slate-300 dark:border-slate-700 
        bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 
        focus:ring-indigo-500 outline-none px-3 ${icon ? "pl-10" : "pl-3"} pt-5 pb-2 text-sm`}
      />
      {label && (
        <label
          className={`absolute text-xs text-slate-600 dark:text-slate-400 top-2 
          ${icon ? "left-10" : "left-3"} 
          transition-all duration-200 
          peer-focus:top-1 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm`}
        >
          {label}
        </label>
      )}
      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{placeholder}</p>
    </div>
  );
}

/* ───────────── FLOATING TEXTAREA ───────────── */

type FloatingTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  icon?: ReactNode | null;
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
      {icon && <span className="absolute left-3 top-3 text-slate-400 dark:text-slate-500">{icon}</span>}
      <textarea
        name={name}
        required={required}
        placeholder=" "
        rows={5}
        className={`w-full peer rounded-xl border border-slate-300 dark:border-slate-700 
        bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 
        focus:ring-indigo-500 outline-none px-3 ${icon ? "pl-10" : "pl-3"} pt-5 pb-3 text-sm resize-vertical`}
      />
      <label
        className={`absolute text-xs text-slate-600 dark:text-slate-400 top-2 
        ${icon ? "left-10" : "left-3"} transition-all duration-200 
        peer-focus:top-1 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 
        peer-placeholder-shown:text-sm`}
      >
        {label}
      </label>
      <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{placeholder}</p>
    </div>
  );
}
