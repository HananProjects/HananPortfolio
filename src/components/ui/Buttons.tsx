import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type LinkButtonProps = {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  download?: boolean
}

function linkProps(href: string, external?: boolean, download?: boolean) {
  const isExternal = external ?? /^https?:/.test(href)
  return {
    href,
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    ...(download ? { download: true } : {}),
  }
}

export function ContactButton({ href = "#contact", children = "Contact Me", className, external, download }: Partial<LinkButtonProps>) {
  return (
    <a
      {...linkProps(href, external, download)}
      className={cn(
        "contact-gradient group inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap",
        "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4",
        "text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white",
        "transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]",
        "focus-visible:outline-offset-2",
        className,
      )}
    >
      {children}
    </a>
  )
}

export function GhostButton({ href, children, className, external, download }: LinkButtonProps) {
  return (
    <a
      {...linkProps(href, external, download)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border-2 border-mist whitespace-nowrap",
        "px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-mist",
        "transition-colors duration-200 hover:bg-mist/10",
        className,
      )}
    >
      {children}
    </a>
  )
}
