import { notFound } from "next/navigation"
import { client } from "../../../lib/sanity.client"
import { groq } from "next-sanity"
import type { SanityProject } from "../../../lib/types"

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    shortDescription,
    description,
    mainImage,
    url,
    order
  }
`

type Params = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    groq`*[_type == "project" && defined(slug.current)]{ slug }`
  )
  return slugs.map((p) => ({ slug: p.slug.current }))
}

export default async function ProjectDetailPage({ params }: Params) {
  const project = (await client.fetch(projectBySlugQuery, {
    slug: params.slug,
  })) as SanityProject | null

  if (!project) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <a
        href="/#portfolio"
        className="text-xs text-slate-400 hover:text-indigo-300"
      >
        ← Zpět na portfolio
      </a>
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
        {project.title}
      </h1>
      {project.shortDescription && (
        <p className="text-sm text-slate-300">{project.shortDescription}</p>
      )}
      {project.description && (
        <p className="text-sm text-slate-200 whitespace-pre-line">
          {project.description}
        </p>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
        >
          Otevřít projekt →
        </a>
      )}
    </main>
  )
}
