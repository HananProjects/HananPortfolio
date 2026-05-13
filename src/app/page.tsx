"use client"

import { motion, type Variants, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileTree, type FileNode } from "@/components/FileTree"
import { PROJECTS } from "@/lib/projects"

// ─── Data ────────────────────────────────────────────────────────────────────

const CODE_LINES = [
  [
    { text: "from", color: "#ff7b72" },
    { text: " pathlib ", color: "#e6edf3" },
    { text: "import", color: "#ff7b72" },
    { text: " Path", color: "#ffa657" },
  ],
  [],
  [
    { text: "developer", color: "#e6edf3" },
    { text: " = {", color: "#e6edf3" },
  ],
  [
    { text: '    "name"', color: "#79c0ff" },
    { text: ':  "', color: "#e6edf3" },
    { text: "Hanan Hussain", color: "#a5d6ff" },
    { text: '",', color: "#e6edf3" },
  ],
  [
    { text: '    "role"', color: "#79c0ff" },
    { text: ':  "', color: "#e6edf3" },
    { text: "Computer Engineer", color: "#a5d6ff" },
    { text: '",', color: "#e6edf3" },
  ],
  [
    { text: '    "location"', color: "#79c0ff" },
    { text: ': "', color: "#e6edf3" },
    { text: "Saskatoon, SK", color: "#a5d6ff" },
    { text: '",', color: "#e6edf3" },
  ],
  [
    { text: '    "degree"', color: "#79c0ff" },
    { text: ':  "', color: "#e6edf3" },
    { text: "B.Sc. Computer Engineering", color: "#a5d6ff" },
    { text: '",', color: "#e6edf3" },
  ],
  [
    { text: '    "available"', color: "#79c0ff" },
    { text: ": ", color: "#e6edf3" },
    { text: "True", color: "#d2a8ff" },
    { text: ",", color: "#e6edf3" },
  ],
  [{ text: "}", color: "#e6edf3" }],
  [],
  [
    { text: "about", color: "#e6edf3" },
    { text: " = ", color: "#e6edf3" },
    { text: "Path", color: "#ffa657" },
    { text: '("', color: "#e6edf3" },
    { text: "about.md", color: "#a5d6ff" },
    { text: '")', color: "#e6edf3" },
    { text: ".read_text", color: "#d2a8ff" },
    { text: "()", color: "#e6edf3" },
  ],
  [
    { text: "print", color: "#d2a8ff" },
    { text: "(about)", color: "#e6edf3" },
  ],
] as { text: string; color: string }[][]

const TECH_STACK = [
  // Languages
  { name: "C",             color: "oklch(0.65 0.15 255)", icon: "c",           href: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  { name: "C++",           color: "oklch(0.62 0.16 250)", icon: "cplusplus",   href: "https://isocpp.org" },
  { name: "Python",        color: "oklch(0.72 0.15 250)", icon: "python",      href: "https://python.org" },
  { name: "Java",          color: "oklch(0.65 0.18 35)",  icon: "java",        href: "https://java.com" },
  { name: "JavaScript",    color: "oklch(0.80 0.18 90)",  icon: "javascript",  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Verilog",       color: "oklch(0.65 0.16 290)",                      href: "https://en.wikipedia.org/wiki/Verilog" },
  { name: "HTML/CSS",      color: "oklch(0.65 0.18 30)",  icon: "html5",       href: "https://developer.mozilla.org/en-US/docs/Web" },
  { name: "SQL",           color: "oklch(0.60 0.12 230)",                      href: "https://en.wikipedia.org/wiki/SQL" },
  // Frameworks & Tools
  { name: "React",         color: "oklch(0.65 0.18 200)", icon: "react",       href: "https://react.dev" },
  { name: "Node.js",       color: "oklch(0.65 0.18 150)", icon: "nodedotjs",   href: "https://nodejs.org" },
  { name: "Next.js",       color: "oklch(0.82 0.02 0)",   icon: "nextdotjs",   href: "https://nextjs.org",         iconColor: "e2e8f0" },
  { name: "Django",        color: "oklch(0.60 0.15 150)", icon: "django",      href: "https://djangoproject.com",  iconColor: "44b78b" },
  { name: "Tailwind CSS",  color: "oklch(0.65 0.20 200)", icon: "tailwindcss", href: "https://tailwindcss.com" },
  { name: "PostgreSQL",    color: "oklch(0.55 0.15 240)", icon: "postgresql",  href: "https://postgresql.org" },
  { name: "Bash",          color: "oklch(0.70 0.10 150)", icon: "gnubash",     href: "https://gnu.org/software/bash/" },
  { name: "Git",           color: "oklch(0.65 0.20 25)",  icon: "git",         href: "https://git-scm.com" },
  { name: "Linux",         color: "oklch(0.72 0.14 75)",  icon: "linux",       href: "https://kernel.org" },
  { name: "MATLAB",        color: "oklch(0.72 0.18 45)",  icon: "matlab",      href: "https://mathworks.com/products/matlab.html" },
  { name: "Quartus",       color: "oklch(0.60 0.15 210)",                      href: "https://www.intel.com/content/www/us/en/products/details/fpga/development-tools/quartus-prime.html" },
  { name: "ModelSim",      color: "oklch(0.62 0.12 210)",                      href: "https://eda.sw.siemens.com/en-US/ic/modelsim/" },
  // Hardware & Embedded
  { name: "Raspberry Pi",  color: "oklch(0.62 0.20 15)",  icon: "raspberrypi", href: "https://raspberrypi.com" },
  { name: "Arduino",       color: "oklch(0.60 0.16 180)", icon: "arduino",     href: "https://arduino.cc" },
  { name: "ARM MCUs",      color: "oklch(0.65 0.15 220)", icon: "arm",         href: "https://arm.com" },
  { name: "FPGA (Intel)",  color: "oklch(0.60 0.18 310)", icon: "intel",       href: "https://www.intel.com/content/www/us/en/products/details/fpga.html" },
]


const TREE: FileNode[] = [
  {
    name: "portfolio",
    type: "folder",
    children: [
      { name: "developer.py",     type: "file", extension: "py",  id: "hero"      },
      { name: "tech_stack.ts",   type: "file", extension: "ts",  id: "stack"     },
      {
        name: "projects",
        type: "folder",
        children: [
          { name: "review_pipeline.py",  type: "file", extension: "py",  id: "project-5" },
          { name: "asl-translator.py",   type: "file", extension: "py",  id: "project-0" },
          { name: "kawakraft.tsx",        type: "file", extension: "tsx", id: "project-1" },
          { name: "microprocessor.v",     type: "file", extension: "v",   id: "project-2" },
          { name: "booth-multiplier.v",   type: "file", extension: "v",   id: "project-4" },
          { name: "travel-app.py",        type: "file", extension: "py",  id: "project-3" },
        ],
      },
    ],
  },
]

const ID_TO_FILENAME: Record<string, string> = {
  "hero":      "developer.py",
  "stack":     "tech_stack.ts",
  "project-5": "review_pipeline.py",
  "project-0": "asl-translator.py",
  "project-1": "kawakraft.tsx",
  "project-2": "microprocessor.v",
  "project-4": "booth-multiplier.v",
  "project-3": "travel-app.py",
}

const SECTION_IDS = ["hero", "stack", "project-5", "project-0", "project-1", "project-2", "project-4", "project-3"]

// ─── Primitives ───────────────────────────────────────────────────────────────

function WindowChrome({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden bg-[oklch(0.12_0.01_220)]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[oklch(0.10_0.01_220)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.20_25)]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.18_85)]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.18_150)]" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-1">{title}</span>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <span className="font-mono text-sm font-bold text-primary">{"//"}</span>
      <span className="font-mono text-sm font-semibold text-foreground/85 tracking-wide">{label}</span>
      <div className="flex-1 h-px bg-border ml-1" />
    </div>
  )
}

// ─── Run output ──────────────────────────────────────────────────────────────

type RunState = "idle" | "running" | "done"

const OUTPUT_LINES: { text: string; color: string; bold?: boolean; pulse?: boolean; size?: string; href?: string; iconSrc?: string; type?: "image"; src?: string }[] = [
  { text: "",                                                          color: "" },
  { text: "Reading about.md  ✓",                                      color: "#3fb950" },
  { text: "",                                                          color: "" },
  { text: "─".repeat(48),                                             color: "#21262d" },
  { text: " 📄 about.md",                                             color: "#8b949e" },
  { text: "─".repeat(48),                                             color: "#21262d" },
  { text: "",                                                          color: "" },
  { type: "image", src: "/profile.jpg", text: "", color: "" },
  { text: " Hanan Hussain",                                           color: "#e6edf3", size: "text-4xl font-bold leading-none tracking-tight" },
  { text: "",                                                          color: "" },
  { text: " Computer Engineer  ·  B.Sc. USask '26",                  color: "#79c0ff", size: "text-sm leading-relaxed" },
  { text: "",                                                          color: "" },
  { text: " Computer Engineering student at the University of",       color: "#8b949e" },
  { text: " Saskatchewan, graduating June 2026. I build across",      color: "#8b949e" },
  { text: " the full stack — from web apps to real-time embedded",    color: "#8b949e" },
  { text: " systems on Raspberry Pi and FPGA.",                       color: "#8b949e" },
  { text: "",                                                          color: "" },
  { text: " Capstone: bidirectional ASL ↔ English translator on",    color: "#8b949e" },
  { text: " Raspberry Pi 5 — fully offline, under 2s latency.",      color: "#8b949e" },
  { text: "",                                                          color: "" },
  { text: " hanan.hussain@usask.ca",                                color: "#a5d6ff", href: "mailto:hanan.hussain@usask.ca",          iconSrc: "email" },
  { text: " linkedin.com/in/hananhussain1",                              color: "#79c0ff", href: "https://linkedin.com/in/hananhussain1", iconSrc: "https://cdn.simpleicons.org/linkedin/79c0ff" },
  { text: " 306-444-1025",                                           color: "#8b949e", href: "tel:3064441025" },
  { text: "",                                                          color: "" },
  { text: " ●  available for opportunities",                          color: "#3fb950", pulse: true },
  { text: "",                                                          color: "" },
  { text: "─".repeat(48),                                             color: "#21262d" },
  { text: "",                                                          color: "" },
  { text: "Process exited with code 0",                               color: "#484f58" },
]

function RunningDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.25, ease: "easeInOut" }}
        >
          .
        </motion.span>
      ))}
    </>
  )
}

function RunButton({ state, onClick }: { state: RunState; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={state === "running"}
      whileHover={state !== "running" ? { scale: 1.05 } : undefined}
      whileTap={state !== "running" ? { scale: 0.95 } : undefined}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-colors duration-150",
        state === "idle"    && "text-[#3fb950] border-[#3fb950]/40 hover:bg-[#3fb950]/10",
        state === "running" && "text-muted-foreground border-border/50 cursor-not-allowed opacity-60",
        state === "done"    && "text-primary border-primary/40 hover:bg-primary/10",
      )}
    >
      {state === "idle"    && <><span>▶</span><span>run</span></>}
      {state === "running" && <><span>◌</span><span>running</span><RunningDots /></>}
      {state === "done"    && <><span>↺</span><span>reset</span></>}
    </motion.button>
  )
}

function OutputPanel({ state }: { state: RunState }) {
  return (
    <div className="px-5 pt-3 pb-5 font-mono text-xs bg-[oklch(0.09_0.01_220)] border-t border-border">
      <p style={{ color: "#8b949e" }}>&gt; python3 developer.py</p>

      {state === "running" ? (
        <p className="mt-0.5" style={{ color: "#3fb950" }}>
          Running<RunningDots />
        </p>
      ) : (
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.055 } } }}
          initial="hidden"
          animate="show"
        >
          {OUTPUT_LINES.map((line, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, x: -6 },
                show: { opacity: 1, x: 0, transition: { duration: 0.18 } },
              }}
              className={cn(
                line.type === "image" ? "py-1" : (line.size ?? "text-xs leading-5"),
                !line.size && line.bold && "font-semibold",
              )}
              style={{
                color: line.type === "image" ? undefined : (line.color || "transparent"),
                minHeight: line.type === "image" ? undefined : (line.size ? undefined : "1.25rem"),
              }}
            >
              {line.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={line.src}
                  alt="Hanan Hussain"
                  className="w-28 h-28 rounded-full object-cover border-2 border-border ml-1"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                />
              ) : line.pulse ? (
                <>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ color: "#3fb950" }}
                  >
                    ●
                  </motion.span>
                  {line.text.slice(1)}
                </>
              ) : line.href ? (
                <a
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 hover:underline underline-offset-2 cursor-pointer"
                >
                  {line.iconSrc === "email" ? (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ) : line.iconSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={line.iconSrc} alt="" className="w-3.5 h-3.5 shrink-0" />
                  ) : null}
                  {line.text}
                </a>
              ) : (
                line.text || " "
              )}
            </motion.p>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [runState, setRunState] = useState<RunState>("idle")

  const handleRun = () => {
    if (runState === "done") {
      setRunState("idle")
      return
    }
    setRunState("running")
    setTimeout(() => setRunState("done"), 750)
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
  }
  const line: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <WindowChrome title="developer.py" action={<RunButton state={runState} onClick={handleRun} />}>
          <div className="p-5 font-mono text-sm leading-6">
            <motion.div variants={container} initial="hidden" animate="show">
              {CODE_LINES.map((tokens, i) => (
                <motion.div key={i} variants={line} className="flex gap-4">
                  <span className="select-none text-[oklch(0.35_0.02_220)] w-4 text-right shrink-0 text-xs leading-6">
                    {i + 1}
                  </span>
                  <span>
                    {tokens.length === 0 ? (
                      <>&nbsp;</>
                    ) : (
                      tokens.map((token, j) => (
                        <span key={j} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))
                    )}
                    {i === CODE_LINES.length - 1 && runState === "idle" && (
                      <motion.span
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.5, 1] }}
                        className="inline-block w-[2px] h-[14px] bg-primary align-middle ml-0.5 mb-px"
                      />
                    )}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {runState !== "idle" && (
              <motion.div
                key="output"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <OutputPanel state={runState} />
              </motion.div>
            )}
          </AnimatePresence>
        </WindowChrome>

        <AnimatePresence>
          {runState === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="flex gap-3 mt-6 font-mono text-sm"
            >
              <button
                onClick={() => onNavigate("project-0")}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors duration-150"
              >
                <span className="text-primary/50 select-none">$</span>
                view_projects
              </button>
              <button
                onClick={() => onNavigate("stack")}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors duration-150"
              >
                <span className="text-muted-foreground/50 select-none">$</span>
                tech_stack
              </button>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors duration-150"
              >
                <span className="text-muted-foreground/50 select-none">↓</span>
                resume.pdf
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}


function TechStackSection() {
  return (
    <section id="stack" className="px-6 py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader label="tech_stack.ts" />
        </motion.div>
        <motion.div
          className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-2"
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TECH_STACK.map((tech) => (
            <motion.a
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-[oklch(0.12_0.01_220)] font-mono text-sm cursor-pointer hover:border-border/80 hover:text-foreground transition-colors duration-150"
            >
              {tech.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}${tech.iconColor ? `/${tech.iconColor}` : ""}`}
                  alt=""
                  className="w-4 h-4 shrink-0"
                />
              ) : (
                <span style={{ color: tech.color }}>◆</span>
              )}
              <span className="text-muted-foreground">{tech.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const router = useRouter()

  return (
    <section className="px-6 py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader label="projects/" />
        </motion.div>
        <div className="space-y-4">
          {PROJECTS.map((project, i) => (
            <div key={project.id} id={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                onClick={() => router.push(`/projects/${project.slug}`)}
                className="cursor-pointer group"
              >
                <WindowChrome title={project.filename}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-mono font-medium text-foreground">{project.name}</h3>
                        <span className="text-xs font-mono text-muted-foreground/60">{project.period}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-primary/0 group-hover:text-primary/50 transition-colors duration-150 select-none">
                          view →
                        </span>
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: project.accent }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-xs font-mono shrink-0 ml-4">
                        {project.github !== "#" && (
                          <a
                            href={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                          >
                            github →
                          </a>
                        )}
                        {project.live !== "#" && (
                          <a
                            href={project.live}
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary hover:text-primary/70 transition-colors duration-150"
                          >
                            live →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </WindowChrome>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 px-6">
      <div className="max-w-2xl mx-auto font-mono text-xs text-muted-foreground flex items-center justify-center gap-3">
        <span>built with Next.js & Framer Motion</span>
        <span className="text-border">·</span>
        <span className="text-primary">Hanan Hussain</span>
        <span className="text-border">·</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeId, setActiveId] = useState("hero")
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const observers = SECTION_IDS.map((id) => {
      const el = main.querySelector(`#${id}`)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { root: main, threshold: 0.2 },
      )
      obs.observe(el)
      return obs
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const handleFileClick = (id: string) => {
    const el = mainRef.current?.querySelector(`#${id}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setActiveId(id)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex bg-background p-3 gap-3">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex w-56 shrink-0 rounded-xl border border-border bg-[oklch(0.09_0.01_220)] flex-col overflow-hidden shadow-lg shadow-black/30"
      >
        <div className="h-9 flex items-center px-4 border-b border-border/40 shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 select-none">
            Explorer
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-1 px-1">
          <FileTree data={TREE} activeId={activeId} onFileClick={handleFileClick} />
        </div>

        <div className="border-t border-border/40 px-2 py-1.5 shrink-0">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-2 py-1 rounded text-[11px] font-mono text-muted-foreground/60 hover:text-foreground hover:bg-[oklch(0.15_0.01_220)] transition-colors duration-150 w-full"
          >
            <span className="text-primary/70">↓</span>
            <span>resume.pdf</span>
          </a>
        </div>

        <div className="h-6 border-t border-border/40 flex items-center px-3 shrink-0">
          <span className="text-[10px] font-mono text-muted-foreground/35 truncate">
            {ID_TO_FILENAME[activeId] ?? activeId}
          </span>
        </div>
      </motion.aside>

      {/* Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto rounded-xl border border-border/40 bg-[oklch(0.10_0.01_220)] shadow-lg shadow-black/20">
        <HeroSection onNavigate={handleFileClick} />
        <TechStackSection />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  )
}
