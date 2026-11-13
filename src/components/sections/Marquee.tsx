"use client"

import { useEffect, useRef } from "react"
import { MARQUEE_IMAGES, MARQUEE_WORDS } from "@/lib/site"

// Two rows driven by page scroll: images drift right, words drift left.
// Transforms are written straight to the DOM in a rAF so scrolling never
// re-renders React.
export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowA = useRef<HTMLDivElement>(null)
  const rowB = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - top + window.innerHeight) * 0.3
      if (rowA.current) rowA.current.style.transform = `translate3d(${offset - 200}px,0,0)`
      if (rowB.current) rowB.current.style.transform = `translate3d(${-(offset - 200)}px,0,0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const images = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES]
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS]

  return (
    <section
      ref={sectionRef}
      aria-label="Selected visuals from my work"
      className="flex flex-col gap-3 bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: "clip" }}
    >
      <div ref={rowA} className="flex w-max gap-3" style={{ willChange: "transform", marginLeft: "-40vw" }}>
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={i < MARQUEE_IMAGES.length ? img.alt : ""}
            aria-hidden={i >= MARQUEE_IMAGES.length}
            loading="lazy"
            decoding="async"
            className="h-[200px] w-[310px] shrink-0 rounded-2xl object-cover sm:h-[270px] sm:w-[420px]"
          />
        ))}
      </div>
      <div ref={rowB} className="flex w-max items-center gap-3" style={{ willChange: "transform", marginLeft: "-60vw" }}>
        {words.map((w, i) => (
          <span
            key={i}
            aria-hidden={i >= MARQUEE_WORDS.length}
            className="flex h-[88px] shrink-0 items-center gap-3 rounded-2xl border border-line px-8 text-[2.2rem] font-black uppercase leading-none tracking-tight sm:h-[120px] sm:px-10 sm:text-[3.4rem]"
          >
            <span className={i % 2 ? "text-outline" : "hero-heading"}>{w}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
