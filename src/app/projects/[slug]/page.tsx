import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getProjectBySlug, PROJECTS } from "@/lib/projects"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.name} — Hanan Hussain` }
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="font-mono text-sm font-bold text-[oklch(0.65_0.18_220)]">{"//"}</span>
      <span className="font-mono text-sm font-semibold text-[oklch(0.82_0.04_220)] tracking-wide">{label}</span>
      <div className="flex-1 h-px bg-[oklch(0.30_0.02_220)] ml-1" />
    </div>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const hasImages = project.images && project.images.length > 0
  const isGithubLink = project.github !== "#"

  return (
    <div className="min-h-screen bg-[oklch(0.11_0.01_220)] text-[oklch(0.90_0.02_220)] p-4 md:p-10">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-8 font-mono text-xs flex items-center gap-2 text-[oklch(0.48_0.03_220)]">
          <Link
            href="/"
            className="hover:text-[oklch(0.90_0.02_220)] transition-colors duration-150 flex items-center gap-1.5"
          >
            <span>←</span>
            <span>back</span>
          </Link>
          <span className="text-[oklch(0.22_0.02_220)]">/</span>
          <span>projects</span>
          <span className="text-[oklch(0.22_0.02_220)]">/</span>
          <span className="text-[oklch(0.65_0.18_220)]">{project.filename}</span>
        </div>

        {/* Window chrome card */}
        <div className="rounded-lg border border-[oklch(0.22_0.02_220)] overflow-hidden bg-[oklch(0.12_0.01_220)]">

          {/* Title bar */}
          <div className="flex items-center px-4 py-2.5 border-b border-[oklch(0.22_0.02_220)] bg-[oklch(0.10_0.01_220)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.20_25)]" />
              <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.18_85)]" />
              <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.18_150)]" />
            </div>
            <span className="text-xs text-[oklch(0.48_0.03_220)] font-mono ml-3">{project.filename}</span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-8">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-mono font-semibold text-xl text-[oklch(0.90_0.02_220)] leading-tight">
                  {project.name}
                </h1>
                <span className="text-xs font-mono text-[oklch(0.48_0.03_220)]/70 mt-1 block">
                  {project.period}
                </span>
              </div>
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0 mt-2"
                style={{ background: project.accent }}
              />
            </div>

            {/* Metadata as code block */}
            <div className="bg-[oklch(0.09_0.01_220)] rounded-md px-5 py-4 font-mono text-xs border border-[oklch(0.22_0.02_220)]/60 leading-6">
              <div className="text-[oklch(0.35_0.02_220)] mb-0.5">{`// ${project.filename}`}</div>
              <div>
                <span className="text-[#ff7b72]">const </span>
                <span className="text-[#ffa657]">project</span>
                <span className="text-[#e6edf3]"> = {"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#79c0ff]">"name"</span>
                <span className="text-[#e6edf3]">:    </span>
                <span className="text-[#a5d6ff]">&quot;{project.name}&quot;</span>
                <span className="text-[#e6edf3]">,</span>
              </div>
              <div className="pl-4">
                <span className="text-[#79c0ff]">"period"</span>
                <span className="text-[#e6edf3]">:  </span>
                <span className="text-[#a5d6ff]">&quot;{project.period}&quot;</span>
                <span className="text-[#e6edf3]">,</span>
              </div>
              <div className="pl-4 flex flex-wrap gap-x-0">
                <span className="text-[#79c0ff]">"stack"</span>
                <span className="text-[#e6edf3]">:   [</span>
                {project.tech.map((t, i) => (
                  <span key={t}>
                    <span className="text-[#a5d6ff]">&quot;{t}&quot;</span>
                    {i < project.tech.length - 1 && (
                      <span className="text-[#e6edf3]">, </span>
                    )}
                  </span>
                ))}
                <span className="text-[#e6edf3]">],</span>
              </div>
              <div>
                <span className="text-[#e6edf3]">{"}"}</span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <SectionDivider label="overview" />
              <p className="text-sm text-[oklch(0.48_0.03_220)] leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <SectionDivider label="highlights" />
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[oklch(0.48_0.03_220)]">
                    <span className="font-mono text-[oklch(0.65_0.18_220)]/60 shrink-0 leading-relaxed select-none">
                      ›
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Images */}
            {hasImages && (
              <div>
                <SectionDivider label="gallery" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.images!.map((src, i) => (
                    <div
                      key={i}
                      className="rounded-md overflow-hidden border border-[oklch(0.22_0.02_220)] bg-[oklch(0.09_0.01_220)]"
                    >
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="w-full h-auto"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div>
              <SectionDivider label="tech_stack" />
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded border border-[oklch(0.22_0.02_220)] text-[oklch(0.48_0.03_220)] bg-[oklch(0.09_0.01_220)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[oklch(0.22_0.02_220)]/40">
              {isGithubLink && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-md border border-[oklch(0.35_0.02_220)] bg-[oklch(0.14_0.01_220)] text-[oklch(0.90_0.02_220)] hover:border-[oklch(0.65_0.18_220)] hover:bg-[oklch(0.17_0.02_220)] transition-all duration-150 text-sm font-mono"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://cdn.simpleicons.org/github/e6edf3"
                    alt=""
                    className="w-4 h-4"
                  />
                  <span>View on GitHub</span>
                  <span className="text-[oklch(0.48_0.03_220)]">→</span>
                </a>
              )}
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-[oklch(0.65_0.18_220)]/40 bg-[oklch(0.65_0.18_220)]/10 text-[oklch(0.65_0.18_220)] hover:bg-[oklch(0.65_0.18_220)]/20 transition-all duration-150 text-sm font-mono"
                >
                  <span>Live Demo</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
