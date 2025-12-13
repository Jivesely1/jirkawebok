import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { client } from "../../../lib/sanity";

type Project = {
  title: string;
  shortDescription?: string;
  goal?: string;
  workflow?: string[];
  features?: string[];
  results?: string;
  gallery?: { asset?: { url?: string } }[];
  url?: string;
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project: Project | null = await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0]{
      title,
      shortDescription,
      goal,
      workflow,
      features,
      results,
      gallery[]{
        asset->{url}
      },
      url
    }
  `,
    { slug: params.slug }
  );

  if (!project) {
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16 text-slate-900">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{project.title}</h1>

        {project.shortDescription && (
          <p className="text-lg text-slate-600">
            {project.shortDescription}
          </p>
        )}
      </header>

      {/* GOAL */}
      {project.goal && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Cíl projektu</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {project.goal}
          </p>
        </section>
      )}

      {/* WORKFLOW */}
      {project.workflow && project.workflow.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Proces &amp; workflow</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {project.workflow.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FEATURES */}
      {project.features && project.features.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Co jsem vytvořil / hlavní přínosy
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* RESULTS – OPRAVENÝ DESIGN */}
      {project.results && (
        <section className="bg-white border-l-4 border-indigo-500 p-8 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-2xl font-semibold">Výsledky</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {project.results}
          </p>
        </section>
      )}

      {/* GALERIE */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ukázky &amp; galerie</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img, index) =>
              img.asset?.url ? (
                <Image
                  key={index}
                  src={img.asset.url}
                  alt={`${project.title} – obrázek ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-sm object-cover"
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="flex flex-wrap gap-4 pt-6">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm flex items-center gap-2 transition"
          >
            <ExternalLink size={18} />
            Otevřít projekt
          </a>
        )}

        <Link
          href="/#kontakt"
          className="px-6 py-3 rounded-full border border-slate-300 text-slate-900 text-sm hover:bg-slate-100 transition"
        >
          Chci podobný web
        </Link>
      </section>
    </main>
  );
}

