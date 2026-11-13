import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-ink px-6 text-center text-mist">
      <h1 className="hero-heading font-black leading-none tracking-tight" style={{ fontSize: "clamp(6rem, 30vw, 360px)" }}>
        404
      </h1>
      <p className="max-w-sm text-base font-light uppercase tracking-widest text-mist/70">
        This page doesn&apos;t exist. It might have moved, or never shipped.
      </p>
      <Link
        href="/"
        className="contact-gradient inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-medium uppercase tracking-widest text-white"
      >
        <ArrowLeft className="size-4" /> Back home
      </Link>
    </main>
  )
}
