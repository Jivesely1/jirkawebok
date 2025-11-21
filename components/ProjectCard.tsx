import type { SanityProject } from "../lib/types"
import Image from "next/image"

interface Props {
  project: SanityProject
}

export default function ProjectCard({ project }: Props) {
  const imageUrl =
    (project.mainImage && (project.mainImage as any).asset?._ref) || null

  return (
    <article className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-3 hover:border-indigo-500/70 hover:bg-slate-900 transition-colors">
      <div className="flex-1">
        <h3 className="text-slate-50 font-semibold text-base mb-1">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="text-sm text-slate-300 line-clamp-3">
            {project.shortDescription}
          </p>
        )}
      </div>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-indigo-300 hover:text-indigo-200"
        >
          Otevřít projekt →
        </a>
      )}
    </article>
  )
}
