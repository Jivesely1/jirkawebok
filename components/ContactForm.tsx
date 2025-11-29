"use client";
import { useState } from "react";

export default function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // jednoduchý antispam příklad
  const questionA = 4;
  const questionB = 3;
  const solution = questionA + questionB;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const honey = (form.elements.namedItem("honey") as HTMLInputElement).value;
    const spamCheck = (form.elements.namedItem("spamCheck") as HTMLInputElement).value;

    if (parseInt(spamCheck) !== solution) {
      setLoading(false);
      setError("Neplatná odpověď na antispamovou otázku.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, honey }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setSuccess(true);
      form.reset();
    } else {
      setError(data.error || "Něco se pokazilo.");
    }
  }

  return (
    <section className="w-full py-24 bg-brand-bg dark:bg-brand-bgDark">
      <div className="max-w-xl mx-auto p-8 bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">
        
        <h2 className="text-center text-3xl font-bold mb-4 text-brand-text dark:text-white">
          Pojďme to probrat
        </h2>

        <p className="text-center text-brand-textMuted dark:text-slate-300 mb-10">
          Napiš mi pár věcí o projektu a ozvu se ti do 24 hodin.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input type="text" name="honey" className="hidden" />

          <input name="name" placeholder="Jméno*" className="input" required />
          <input name="email" placeholder="E-mail*" type="email" className="input" required />
          <textarea
            name="message"
            placeholder="Stručně popiš svůj projekt*"
            className="input h-32"
            required
          />

          {/* Antispam */}
          <div>
            <label className="text-slate-300 text-sm">
              Opiš výsledek: <strong>{questionA} + {questionB} = ?</strong>
            </label>
            <input
              name="spamCheck"
              placeholder="Odpověď"
              className="input mt-1"
              required
              type="number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-accent text-white text-lg font-semibold hover:bg-brand-accentHover transition shadow-md"
          >
            {loading ? "Odesílání..." : "Odeslat zprávu"}
          </button>

          {success && (
            <p className="text-green-400 text-center mt-2">
              Zpráva byla odeslána ✅
            </p>
          )}

          {error && (
            <p className="text-red-400 text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
