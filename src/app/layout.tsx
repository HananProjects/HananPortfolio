import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Hanan Hussain — Portfolio",
  description: "Computer Engineering student at USask. Building across the full stack — from web apps to real-time embedded systems on Raspberry Pi and FPGA.",
  openGraph: {
    title: "Hanan Hussain — Portfolio",
    description: "Computer Engineering student at USask. Building across the full stack — from web apps to real-time embedded systems on Raspberry Pi and FPGA.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hanan Hussain — Portfolio",
    description: "Computer Engineering student at USask. Building across the full stack — from web apps to real-time embedded systems.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
