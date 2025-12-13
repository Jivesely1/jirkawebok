// app/projekty/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";  
import { client } from "../../../lib/sanity.client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
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
    workflow[] ,
    results,
    features[],
    gallery[]{ asset->{ url } },
    client,
    year
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
};

type ProjectPageProps = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<Project | null>(query, { slug: params.slug })
      .then((res) => {
        if (!res) notFound();
        setProject(res);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24 text-center text-brand-textMuted dark:text-brand-textMutedDark">
        Načítám projekt...
      </main>
    );
  }

  if (!project) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16 text-brand-text dark:text-brand-textDark">

      {/* ZPĚT */}
      <Link
        href="/#portfolio"
        className="flex items-center gap-2 text-brand-accent hover:text-brand-accentHover transition font-medium"
      >
        <ArrowLeft size={18} /> Zpět na portfolio
      </Link>

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="text-lg text-brand-textMuted dark:text-brand-textMutedDark max-w-2xl">
            {project.shortDescription}
          </p>
        )}

        {/* INFO BAR */}
        <div className="flex flex-wrap gap-6 pt-2 text-sm text-brand-textMuted dark:text-brand-textMutedDark">
          {project.client && (
            <p>
              <strong className="text-brand-text dark:text-brand-textDark">Klient:</strong>{" "}
              {project.client}
            </p>
          )}
          {project.year && (
            <p>
              <strong className="text-brand-text dark:text-brand-textDark">Rok:</strong>{" "}
              {project.year}
            </p>
          )}
        </div>

        {/* HERO IMAGE */}
        {project.mainImage?.asset?.url && (
          <div className="rounded-3xl overflow-hidden shadow-card border border-brand-border dark:border-brand-borderDark">
            <Image
              src={project.mainImage.asset.url}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full object-cover"
              priority
            />
          </div>
        )}
      </section>

      {/* PŘEHLED */}
      {(project.description || project.goal) && (
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Přehled projektu</h2>

