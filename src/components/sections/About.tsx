import { FadeIn } from "@/components/ui/FadeIn"
import { AnimatedText } from "@/components/ui/AnimatedText"
import { ContactButton, GhostButton } from "@/components/ui/Buttons"
import { ABOUT_BADGES, ABOUT_TEXT, PROFILE } from "@/lib/site"

const CORNERS = [
  { pos: "top-[6%] left-[2%] xl:left-[5%]", x: -80, delay: 0.1, tilt: "-rotate-6" },
  { pos: "top-[6%] right-[2%] xl:right-[5%]", x: 80, delay: 0.15, tilt: "rotate-6" },
  { pos: "bottom-[10%] left-[4%] xl:left-[9%]", x: -80, delay: 0.25, tilt: "rotate-3" },
  { pos: "bottom-[10%] right-[4%] xl:right-[9%]", x: 80, delay: 0.3, tilt: "-rotate-3" },
]

function Badge({ kicker, title, className }: { kicker: string; title: string; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-line bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-5 backdrop-blur-sm ${className ?? ""}`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist/55">{kicker}</p>
      <p className="hero-heading mt-1 text-2xl font-extrabold uppercase leading-tight tracking-tight xl:text-3xl">{title}</p>
    </div>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
      style={{ overflowX: "clip" }}
    >
      {ABOUT_BADGES.map((b, i) => (
        <FadeIn
          key={b.title}
          x={CORNERS[i].x}
          y={0}
          delay={CORNERS[i].delay}
          duration={0.9}
          className={`absolute hidden lg:block ${CORNERS[i].pos}`}
        >
          <div className={`float-y ${CORNERS[i].tilt}`} style={{ animationDelay: `${i * -1.4}s` }}>
            <Badge kicker={b.kicker} title={b.title} />
          </div>
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[580px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-mist"
        />
      </div>

      <div className="relative z-10 grid w-full max-w-md grid-cols-2 gap-3 lg:hidden">
        {ABOUT_BADGES.map((b) => (
          <Badge key={b.title} kicker={b.kicker} title={b.title} className="!px-4 !py-4 [&_p:last-child]:text-lg" />
        ))}
      </div>

      <FadeIn className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        <ContactButton />
        <GhostButton href={PROFILE.resume} external>
          Resume
        </GhostButton>
      </FadeIn>
    </section>
  )
}
