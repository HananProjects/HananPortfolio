import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react"
import { getProjectBySlug, PROJECTS } from "@/lib/projects"
import { FadeIn } from "@/components/ui/FadeIn"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.name} — Hanan Hussain`, description: project.description }
}

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-mist/50 sm:text-sm">{children}</h2>
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const [title, subtitle] = project.name.split(" — ")
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const pill =
    "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium uppercase tracking-widest transition-colors duration-200"

  return (
    <main className="relative min-h-screen bg-ink text-mist" style={{ overflowX: "clip" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[90vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[120px]"
        style={{ background: project.accent }}
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8 md:px-10">
        <nav className="flex items-center justify-between text-sm font-medium uppercase tracking-wider">
          <Link href="/#work" className="inline-flex items-center gap-2 transition-opacity hover:opacity-70">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <span className="text-mist/45">{project.period}</span>
        </nav>

        <header className="pt-16 sm:pt-24">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-mist/50 sm:text-sm">
              Project {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} y={40}>
            <h1
              className="hero-heading mt-4 font-black uppercase leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 9vw, 120px)" }}
            >
              {title}
            </h1>
          </FadeIn>
          {subtitle && (
            <FadeIn delay={0.2}>
              <p className="mt-5 max-w-3xl text-lg font-light uppercase leading-snug tracking-wide text-mist/80 sm:text-2xl">{subtitle}</p>
            </FadeIn>
          )}
          <FadeIn delay={0.3} className="mt-10 flex flex-wrap gap-3">
            {project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${pill} contact-gradient text-white`}>
                Live project <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${pill} border-2 border-mist hover:bg-mist/10`}>
                GitHub <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.paper && (
              <a href={project.paper} target="_blank" rel="noopener noreferrer" className={`${pill} border-2 border-mist hover:bg-mist/10`}>
                <FileText className="size-4" /> Paper
              </a>
            )}
          </FadeIn>
        </header>

        <FadeIn className="mt-14 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-line px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-mist/70 sm:text-sm">
              {t}
            </span>
          ))}
        </FadeIn>

        <section className="mt-20 grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <FadeIn>
            <Label>Overview</Label>
            {project.logo && (
              <div className="mb-8 flex items-center justify-center rounded-[32px] border border-line bg-white/[0.03] px-6 py-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.logo} alt={`${title} logo`} className="h-10 w-auto max-w-full sm:h-14" />
              </div>
            )}
            <p className="text-xl font-light leading-relaxed text-mist sm:text-2xl">{project.description}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Label>The build</Label>
            <p className="text-base font-light leading-relaxed text-mist/70 sm:text-lg">{project.longDescription}</p>
          </FadeIn>
        </section>

        {project.results && project.results.length > 0 && (
          <section className="mt-20">
            <Label>Results</Label>
            {project.resultsNote && <p className="mb-8 max-w-2xl font-light leading-relaxed text-mist/70">{project.resultsNote}</p>}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.results.map((r, i) => (
                <FadeIn key={r.label} delay={i * 0.08} className="rounded-[28px] border border-line bg-white/[0.03] p-6">
                  <p className="hero-heading text-4xl font-black leading-none sm:text-5xl">{r.value}</p>
                  <p className="mt-3 text-xs font-light uppercase tracking-wider text-mist/60">{r.label}</p>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20">
          <Label>Highlights</Label>
          <ul className="border-t border-line">
            {project.highlights.map((h, i) => (
              <FadeIn as="li" key={i} delay={Math.min(i * 0.05, 0.3)} className="flex gap-6 border-b border-line py-6 sm:gap-10">
                <span className="hero-heading shrink-0 text-2xl font-black tabular-nums sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="pt-1 font-light leading-relaxed text-mist/80 sm:text-lg">{h}</span>
              </FadeIn>
            ))}
          </ul>
        </section>

        {project.images && project.images.length > 0 && (
          <section className="mt-20">
            <Label>Gallery</Label>
            <div className="columns-1 gap-3 sm:columns-2 [&>*]:mb-3">
              {project.images.map((src, i) => (
                <FadeIn key={src} delay={Math.min(i * 0.05, 0.3)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${title} photo ${i + 1}`} loading="lazy" className="w-full rounded-[32px] border border-line" />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-28 block rounded-[40px] border-2 border-mist p-8 transition-colors duration-300 hover:bg-mist/5 sm:rounded-[50px] sm:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-mist/50 sm:text-sm">Next project</p>
          <div className="mt-3 flex items-center justify-between gap-6">
            <p className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 6vw, 80px)" }}>
              {next.name.split(" — ")[0]}
            </p>
            <ArrowUpRight className="size-10 shrink-0 transition-transform duration-300 group-hover:rotate-45 sm:size-14" />
          </div>
        </Link>
      </div>
    </main>
  )
}
