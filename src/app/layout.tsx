import type { Metadata, Viewport } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/ui/SmoothScroll"

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const description =
  "Hanan Hussain is a Computer Engineering graduate (USask) and founder of Munova, building web platforms, AI voice agents, cloud systems and hardware across Saskatchewan and Alberta."

export const metadata: Metadata = {
  metadataBase: new URL("https://hanan-portfolio-xi.vercel.app"),
  title: "Hanan Hussain — Computer Engineer & Founder",
  description,
  openGraph: {
    title: "Hanan Hussain — Computer Engineer & Founder",
    description,
    type: "website",
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanan Hussain — Computer Engineer & Founder",
    description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={kanit.variable}>
      <body>
        <SmoothScroll />
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  )
}
