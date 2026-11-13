import { ArrowUpRight, FileText, Mail, MapPin, Phone } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"
import { ContactButton, GhostButton } from "@/components/ui/Buttons"
import { PROFILE } from "@/lib/site"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  )
}

const LINKS = [
  { label: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: Mail },
  { label: PROFILE.linkedinLabel, href: PROFILE.linkedin, Icon: LinkedInIcon },
  { label: "github.com/HananProjects", href: PROFILE.github, Icon: GitHubIcon },
  { label: PROFILE.phone, href: PROFILE.phoneHref, Icon: Phone },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-5 pb-10 pt-24 sm:px-8 md:px-10 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] h-[60vw] max-h-[700px] w-[90vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "linear-gradient(123deg, #B600A8 10%, #7621B0 55%, #BE4C00 100%)" }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <FadeIn>
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-mist/70">
            <span className="pulse-dot size-2 rounded-full bg-[#3fb950]" />
            Available for opportunities
          </p>
        </FadeIn>
        <FadeIn delay={0.1} y={40}>
          <h2
            className="hero-heading mt-6 font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 13vw, 190px)" }}
          >
            Let&apos;s build
            <br />
            together
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-mist/75 sm:text-lg">
            Hiring, starting a project, or want to talk shop about AI agents, systems or hardware? My inbox is open.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ContactButton href={`mailto:${PROFILE.email}`}>
            Email me <ArrowUpRight className="size-4" />
          </ContactButton>
          <GhostButton href={PROFILE.resume} external>
            <FileText className="size-4" /> Resume
          </GhostButton>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-16 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-3 rounded-[24px] border border-line bg-white/[0.03] px-5 py-4 text-left text-sm text-mist/80 backdrop-blur-sm transition-colors duration-200 hover:border-mist/40 hover:text-mist"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 opacity-40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          ))}
        </FadeIn>
      </div>

      <footer className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-8 text-xs font-light uppercase tracking-widest text-mist/45 sm:flex-row">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" /> {PROFILE.location}
        </span>
        <a href="#top" className="transition-colors hover:text-mist">
          Back to top ↑
        </a>
      </footer>
    </section>
  )
}
