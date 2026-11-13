"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

// Scroll-driven reveal: each character fades from 0.2 to 1 opacity as the
// paragraph scrolls through the viewport. Words are kept as unbreakable
// groups so lines only wrap between words.
export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] })

  const words = text.split(" ")
  const total = text.length
  // Character offset where each word starts (each word + one space).
  const starts = words.map((_, wi) => words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0))

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const start = starts[wi]
        return (
          <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => {
              const i = start + ci
              return <Char key={ci} ch={ch} progress={scrollYProgress} range={[i / total, (i + 1) / total]} />
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        )
      })}
    </p>
  )
}

function Char({ ch, progress, range }: { ch: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="invisible">{ch}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {ch}
      </motion.span>
    </span>
  )
}
