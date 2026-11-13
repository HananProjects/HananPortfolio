"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowUpRight, X } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"
import { PROJECTS } from "@/lib/projects"
import { TECH_STACK } from "@/lib/stack"
import { cn } from "@/lib/utils"

const FILTERABLE = TECH_STACK.filter((t) => t.projects.length > 0)
const STATIC_SKILLS = TECH_STACK.filter((t) => t.projects.length === 0)

function shortName(name: string) {
  return name.split(" — ")[0]
}
function subtitle(name: string) {
  return name.split(" — ")[1]
}

export function Archive() {
  const [selected, setSelected] = useState<string[]>([])

  const visible = useMemo(() => {
    if (selected.length === 0) return null
    return new Set(TECH_STACK.filter((t) => selected.includes(t.name)).flatMap((t) => t.projects))
  }, [selected])

  const list = visible ? PROJECTS.filter((p) => visible.has(p.slug)) : PROJECTS
  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <section id="archive" className="bg-ink px-5 pb-24 pt-24 sm:px-8 md:px-10 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
          >
            All projects
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-xl text-sm font-light uppercase tracking-widest text-mist/60 sm:text-base">
            {PROJECTS.length} builds across client work, startups, research and hardware. Pick a technology to filter.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-wrap gap-2">
          {FILTERABLE.map((t) => {
            const on = selected.includes(t.name)
            return (
              <button
                key={t.name}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t.name)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 sm:text-sm",
                  on ? "border-transparent contact-gradient !outline-1 text-white" : "border-line text-mist/70 hover:border-mist/40 hover:text-mist",
                )}
              >
                {t.name}
                <span className={cn("ml-2 tabular-nums", on ? "text-white/70" : "text-mist/35")}>{t.projects.length}</span>
              </button>
            )
          })}
          {STATIC_SKILLS.map((t) => (
            <span
              key={t.name}
              title="Part of my toolkit, not tied to a featured project"
              className="rounded-full border border-dashed border-line px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-mist/35 sm:text-sm"
            >
              {t.name}
            </span>
          ))}
        </FadeIn>

        {selected.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-mist/60">
            <span>
              Showing {list.length} of {PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="inline-flex items-center gap-1 text-mist underline-offset-4 hover:underline"
            >
              <X className="size-4" /> Clear
            </button>
          </div>
        )}

        <ul className="mt-10 border-t border-line">
          {list.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/projects/${p.slug}`}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 transition-[padding] duration-300 hover:pl-4 sm:py-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:h-2/3"
                  style={{ background: p.accent }}
                />
                <span className="min-w-0">
                  <span className="block text-xl font-semibold uppercase leading-tight text-mist sm:text-3xl">{shortName(p.name)}</span>
                  {subtitle(p.name) && (
                    <span className="mt-1 block truncate text-xs font-light uppercase tracking-wider text-mist/45 sm:text-sm">{subtitle(p.name)}</span>
                  )}
                </span>
                <span className="col-span-2 row-start-2 truncate text-xs font-light uppercase tracking-wider text-mist/50 md:col-span-1 md:row-start-auto sm:text-sm">
                  {p.tech.slice(0, 4).join(" · ")}
                </span>
                <span className="hidden text-sm font-light tabular-nums text-mist/50 md:block">{p.period}</span>
                <ArrowUpRight className="col-start-2 row-start-1 size-6 text-mist/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-mist md:col-start-4" />
              </Link>
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-12 text-center text-sm uppercase tracking-widest text-mist/50">No projects match. Try clearing the filter.</li>
          )}
        </ul>
      </div>
    </section>
  )
}
