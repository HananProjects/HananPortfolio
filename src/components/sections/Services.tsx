import { FadeIn } from "@/components/ui/FadeIn"
import { SERVICES } from "@/lib/site"

export function Services() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-paper px-5 pb-32 pt-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:pb-36 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pb-44 md:pt-32"
    >
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          What I build
        </h2>
      </FadeIn>

      <ul className="mx-auto max-w-5xl">
        {SERVICES.map((s, i) => (
          <FadeIn
            as="li"
            key={s.name}
            delay={i * 0.1}
            className="group flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{ borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : undefined, borderBottom: "1px solid rgba(12,12,12,0.15)" }}
          >
            <span
              className="shrink-0 font-black leading-none tabular-nums transition-colors duration-300 group-hover:text-[#B600A8]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {s.name}
              </h3>
              <p className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                {s.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  )
}
