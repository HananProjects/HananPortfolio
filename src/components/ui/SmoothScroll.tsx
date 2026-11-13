"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Lenis smooth scrolling, skipped entirely for reduced-motion users.
// Also makes in-page anchor links (#about, #work…) glide instead of jump.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: 0 } })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
