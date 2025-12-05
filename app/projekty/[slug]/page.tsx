// app/projekty/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { client } from "../../../lib/sanity.client";
import { groq } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

const query = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage{ asset->{ url } },
    shortDescription,
    description,
    url,
    goal,
    workflow[],
    results,
    features[],
    gallery[]{ asset->{ url } },
    client,
    year,
    order
  }
`;

type SanityImageRef = {
  asset?: { url?: string };
};

type Project = {
  _id: string;
  title: string;
  slug?: { current?: string };
  mainImage?: SanityImageRef;
  shortDescription?: string;
  description?: string;
  url?: string;
  goal?: string;
  workflow?: string[];
  results?: string;
  features?: string[];
  gallery?: SanityImageRef[];
  client?: string;
  year?: number;
  order?: number;
};

export default function ProjectDetailPage({ params }: { params: { slug: string | string[] } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Slug fix — už nikdy žádné chyby
  const safeSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug ?? "";

  useEffect(() => {
    client
      .fetch<Project | null>(query, { slug: safeSlug })
      .then((res) => {
        if (!res) notFound();
        setProject(res);
      })
      .finally(() => setLoading(false));
  }, [safeSlug]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24 text-center text-slate-500">
        Načítám projekt...
      </main>
    );
  }

  if (!project) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">

      <a href="/#portfolio" className="flex items-center gap-2 text-indigo-500 hover:underline">
        <ArrowLeft size={18} /> Zpět na portfolio
      </a>

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

        {project.shortDescription && (
          <p className="text-xl text-slate-400 max-w-2xl">{project.shortDescription}</p>
        )}

        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          {project.client && <p><strong className="text-slate-200">Klient:</strong> {project.client}</p>}
          {project.year && <p><strong className="text-slate-200">Rok:</strong> {project.year}</p>}
        </div>

        {project.mainImage?.asset?.url && (
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <Image
              src={project.mainImage.asset.url}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full object-cover"
            />
          </div>
        )}
      </section>

      {/* POPIS */}
      {project.description && (
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Přehled projektu</h2>
          <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </section>
      )}

      {/* CÍL */}
      {project.goal && (
        <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h2 className="text-2xl font-semibold">Cíl projektu</h2>
          <p className="text-slate-300 whitespace-pre-line">{project.goal}</p>
        </section>
      )}

      {/* WORKFLOW */}
      {project.workflow?.length ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Proces & workflow</h2>
          <ul className="space-y-4">
            {project.workflow.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-indigo-500 mt-1" size={20} />
                <span className="text-slate-300">{step}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* FEATURES */}
      {project.features?.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Co jsem vytvořil / přínosy</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* RESULTS */}
      {project.results && (
        <section className="bg-indigo-600/10 border border-indigo-700/20 p-8 rounded-2xl space-y-4">
          <h2 className="text-2xl font-semibold">Výsledky</h2>
          <p className="text-slate-300 whitespace-pre-line">{project.results}</p>
        </section>
      )}

      {/* GALERIE */}
      {project.gallery?.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ukázky & galerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img, i) =>
              img.asset?.url ? (
                <Image
                  key={i}
                  src={img.asset.url}
                  alt={`${project.title} – obrázek ${i}`}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-lg object-cover"
                />
              ) : null
            )}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="flex gap-4 pt-6">
        {project.url && (
          <a
            href={project.url}
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2"
            target="_blank"
          >
            <ExternalLink size={18} /> Otevřít projekt
          </a>
        )}

        <a
          href="/#kontakt"
          className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-300"
        >
          Chci podobný web
        </a>
      </section>
    </main>
  );
}
