import { Hero } from "@/components/sections/Hero"
import { Marquee } from "@/components/sections/Marquee"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Work } from "@/components/sections/Work"
import { Archive } from "@/components/sections/Archive"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <main id="top" className="bg-ink" style={{ overflowX: "clip" }}>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Archive />
      <Contact />
    </main>
  )
}
