"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"
import { FEATURED, type Featured, type Tile } from "@/lib/site"
import { getProjectBySlug } from "@/lib/projects"
import { cn } from "@/lib/utils"

export function Work() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] })
  const total = FEATURED.length

  return (
    <section
      id="work"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-4 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mx-auto mt-6 max-w-md text-center text-sm font-light uppercase tracking-widest text-mist/60 sm:text-base">
          Five builds I&apos;m proudest of. The full list is further down.
        </p>
      </FadeIn>

      <div ref={container} className="mx-auto mt-12 max-w-6xl sm:mt-16">
        {FEATURED.map((f, i) => (
          <Card
            key={f.slug}
            feature={f}
            index={i}
            progress={scrollYProgress}
            range={[i / total, 1]}
            targetScale={1 - (total - 1 - i) * 0.03}
          />
        ))}
      </div>
    </section>
  )
}

function Card({
  feature,
  index,
  progress,
  range,
  targetScale,
}: {
  feature: Featured
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const project = getProjectBySlug(feature.slug)
  const scale = useTransform(progress, range, [1, targetScale])
  if (!project) return null
  const [a, b, c] = feature.tiles

  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.article
        style={{ scale, top: index * 28 }}
        className="relative origin-top rounded-[40px] border-2 border-mist bg-ink p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex flex-col gap-4 px-2 sm:mb-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hero-heading font-black leading-none tabular-nums" style={{ fontSize: "clamp(2.75rem, 7vw, 100px)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist/55 sm:text-sm">{feature.category}</p>
              <h3 className="text-xl font-semibold uppercase leading-tight text-mist sm:text-2xl md:text-[2rem]">{feature.title}</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-mist px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-8 sm:py-3 sm:text-sm"
            >
              Case study <ArrowUpRight className="size-4" />
            </Link>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mist px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-ink transition-opacity duration-200 hover:opacity-80 sm:px-8 sm:py-3 sm:text-sm"
              >
                Live project <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Phones: two tiles side by side, tall tile full width below.
            sm+: two stacked tiles (40%) beside one tall tile (60%). */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[2fr_3fr] sm:gap-4">
          <TileView tile={a} accent={project.accent} className="h-[150px] sm:h-[clamp(120px,14vw,210px)]" />
          <TileView tile={b} accent={project.accent} className="h-[150px] sm:col-start-1 sm:row-start-2 sm:h-[clamp(150px,19vw,300px)]" />
          {/* Absolute so a tall image can't grow the row; the left column sets the height. */}
          <div className="relative col-span-2 h-[230px] sm:col-span-1 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:h-auto">
            <TileView tile={c} accent={project.accent} className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

const tileRadius = "rounded-[28px] sm:rounded-[40px] md:rounded-[50px]"

function TileView({ tile, accent, className }: { tile: Tile; accent: string; className?: string }) {
  if (tile.kind === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={tile.src}
        alt={tile.alt}
        loading="lazy"
        decoding="async"
        className={cn(tileRadius, "min-h-0 object-cover", tile.position === "top" ? "object-top" : "object-center", className)}
      />
    )
  }

  const glow = { background: `radial-gradient(120% 90% at 0% 0%, color-mix(in oklch, ${accent} 30%, transparent), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))` }

  if (tile.kind === "stat") {
    return (
      <div className={cn(tileRadius, "flex flex-col justify-end overflow-hidden border border-line p-5 sm:p-7 md:p-9", className)} style={glow}>
        <p
          className="hero-heading whitespace-nowrap font-black leading-none tracking-tight"
          style={{ fontSize: tile.value.length > 4 ? "clamp(1.1rem, 3.4vw, 3.2rem)" : "clamp(1.9rem, 5.2vw, 4.6rem)" }}
        >
          {tile.value}
        </p>
        <p className="mt-2 max-w-[22ch] text-[11px] font-light uppercase leading-snug tracking-wider text-mist/70 sm:text-sm">{tile.label}</p>
      </div>
    )
  }

  return (
    <div className={cn(tileRadius, "flex flex-col overflow-hidden border border-line p-5 sm:p-8 md:p-10", className)} style={glow}>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-mist/55 sm:text-sm">{tile.title}</p>
      <ol className="mt-4 flex flex-1 flex-col justify-between gap-1.5 sm:mt-6">
        {tile.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3 sm:gap-4">
            <span
              className="grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-ink sm:size-8 sm:text-xs"
              style={{ background: i === tile.steps.length - 1 ? "#D7E2EA" : accent }}
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium uppercase leading-tight tracking-wide text-mist sm:text-lg md:text-xl">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
