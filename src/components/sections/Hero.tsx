import { FadeIn } from "@/components/ui/FadeIn"
import { ContactButton } from "@/components/ui/Buttons"
import { HERO_TAGLINE, PROFILE } from "@/lib/site"

const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: PROFILE.resume, external: true },
  { label: "Contact", href: "#contact" },
]

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[560px] flex-col" style={{ overflowX: "clip" }}>
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm font-medium uppercase tracking-wider text-mist transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {item.label}
          </a>
        ))}
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14.6vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-3 lg:text-[15.3vw]">
            Hi, i&apos;m {PROFILE.firstName}
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            {HERO_TAGLINE}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[340px] sm:translate-y-0 md:w-[400px] lg:w-[460px]">
        <FadeIn delay={0.6} y={30}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROFILE.portrait}
            alt={`Portrait of ${PROFILE.name}`}
            width={864}
            height={1152}
            fetchPriority="high"
            className="portrait-mask pointer-events-none h-auto w-full select-none"
          />
        </FadeIn>
      </div>
    </section>
  )
}
