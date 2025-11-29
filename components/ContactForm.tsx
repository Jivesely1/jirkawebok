"use client";
import { useState } from "react";

export default function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // antispam otázka
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
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
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
      body: JSON.stringify({ name, email, subject, message, honey }),
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
    <section className="w-full py-28 bg-brand-bg dark:bg-brand-bgDark">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700
        rounded-3xl shadow-2xl px-10 py-12">

        <h2 className="text-center text-3xl font-bold mb-2 text-slate-900 dark:text-white">
          Pojďme to probrat
        </h2>

        <p className="text-center text-slate-500 dark:text-slate-300 mb-10">
          Ozvu se ti do 24 hodin.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="text" name="honey" className="hidden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Jméno*</label>
              <input
                name="name"
                className="input w-full mt-1"
                placeholder="Např. Pavel Novák"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">E-mail*</label>
              <input
                name="email"
                type="email"
                className="input w-full mt-1"
                placeholder="např. email@domena.cz"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Předmět zprávy*</label>
            <input
              name="subject"
              className="input w-full mt-1"
              placeholder="Např. Potřebuji nový web"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Zpráva*</label>
            <textarea
              name="message"
              rows={5}
              className="input w-full mt-1"
              placeholder="Napiš mi stručně o čem tvůj projekt je"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Opiš výsledek: {questionA} + {questionB} =
            </label>
            <input
              name="spamCheck"
              type="number"
              className="input w-full mt-1"
              placeholder="Odpověď"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold 
             hover:bg-indigo-500 transition shadow-xl"
          >
            {loading ? "Odesílání..." : "Odeslat zprávu"}
          </button>

          {success && (
            <p className="text-green-500 text-center mt-3 text-sm">
              Zpráva byla odeslána. Děkuji! ✅
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
