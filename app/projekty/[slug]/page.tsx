import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { client } from "@/lib/sanity";

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await client.fetch(
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
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16 text-brand-text dark:text-brand-textDark">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="text-lg text-slate-600">
            {project.shortDescription}
          </p>
        )}
      </header>

      {/* GOAL */}
      {project.goal && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Cíl projektu
          </h2>
          <p className="text-slate-700 whitespace-pre-line leading-relaxed">
            {project.goal}
          </p>
        </section>
      )}

      {/* WORKFLOW */}
      {project.workflow && project.workflow.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Proces &amp; workflow
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {project.workflow.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FEATURES */}
      {project.features && project.features.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Co jsem vytvořil / hlavní přínosy
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {project.features.map((feature: string, i: number) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* RESULTS */}
      {project.results && (
        <section className="
          bg-white
          border-l-4 border-brand-accent
          p-8
          rounded-2xl
          space-y-4
          shadow-soft
        ">
          <h2 className="text-2xl font-semibold text-slate-900">
            Výsledky
          </h2>
          <p className="text-slate-700 whitespace-pre-line leading-relaxed">
            {project.results}
          </p>
        </section>
      )}

      {/* GALERIE */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Ukázky &amp; galerie
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img: any, index: number) =>
              img.asset?.url ? (
                <Image
                  key={index}
                  src={img.asset.url}
                  alt={`${project.title} – obrázek ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-soft object-cover"
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
            className="
              px-6 py-3
              rounded-full
              bg-brand-accent
              hover:bg-brand-accentHover
              text-white
              text-sm
              flex
              items-center
              gap-2
              shadow-soft
              transition
            "
          >
            <ExternalLink size={18} />
            Otevřít projekt
          </a>
        )}

        <Link
          href="/#kontakt"
          className="
            px-6 py-3
            rounded-full
            border border-slate-300
            text-slate-900
            text-sm
            hover:bg-slate-100
            transition
          "
        >
          Chci podobný web
        </Link>
      </section>
    </main>
  );
}
