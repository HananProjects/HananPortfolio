// Personal details and homepage copy. Project data lives in ./projects.

export const PROFILE = {
  name: "Hanan Hussain",
  firstName: "Hanan",
  role: "Computer Engineer & Founder",
  location: "Saskatoon, SK",
  email: "hanan@hananhussain.com",
  phone: "306-444-1025",
  phoneHref: "tel:3064441025",
  linkedin: "https://linkedin.com/in/hananhussain1",
  linkedinLabel: "linkedin.com/in/hananhussain1",
  github: "https://github.com/HananProjects",
  resume: "/resume.pdf",
  portrait: "/profile.jpg",
}

export const HERO_TAGLINE =
  "a computer engineer and founder building software, ai and hardware that people actually use"

export const ABOUT_TEXT =
  "I'm a Computer Engineering graduate from the University of Saskatchewan and the founder of Munova, a Saskatoon company building custom software and AI for businesses. I work across the whole stack, from web platforms and AI phone agents to low-latency C++ and offline hardware, and I care most about software that real people rely on every day. Let's build something that lasts."

export const ABOUT_BADGES = [
  { kicker: "Founder", title: "Munova Solutions" },
  { kicker: "Specialty", title: "AI Voice Agents" },
  { kicker: "B.Sc. Computer Eng.", title: "USask, 2026" },
  { kicker: "Based in", title: "Saskatoon, SK" },
]

export const SERVICES = [
  {
    name: "Web Apps & Platforms",
    description:
      "Full-stack products with real auth, data and billing: invoicing systems in daily use, bookkeeping tools, and dashboards shaped around how a business actually works.",
  },
  {
    name: "AI Agents & Voice",
    description:
      "AI phone receptionists, outbound callers and agent systems on Claude, LiveKit and local models, with guardrails, failover to a human, and per-call costs that are measured rather than guessed.",
  },
  {
    name: "Cloud & Infrastructure",
    description:
      "Event-driven systems on Azure, GCP and AWS, defined in Terraform and shipped through GitHub Actions, with Docker deployments that stay monitored after launch.",
  },
  {
    name: "Systems & Hardware",
    description:
      "Low-latency C++, Verilog on FPGA, and offline embedded builds on Raspberry Pi, where every microsecond and every milliwatt gets counted.",
  },
  {
    name: "Websites for Businesses",
    description:
      "Fast, motion-rich marketing sites for local businesses with SEO, accessibility and a contact flow that works, live on the client's own domain.",
  },
]

// Images for the scroll-driven marquee: screenshots of live client sites
// (taken 2026-11-13) plus photos of the ASL translator capstone build.
const ASL = "/projects/asl-translator"
export const MARQUEE_IMAGES = [
  { src: "/work/munova-hero.webp", alt: "Munova Solutions website hero" },
  { src: `${ASL}/620263E8-11D1-4002-A836-79034154EC8C_1_105_c.jpeg`, alt: "ASL translator handheld device" },
  { src: "/work/kawakraft-hero.webp", alt: "KawaKraft website hero" },
  { src: "/work/evergreen-mid.webp", alt: "Evergreen Essence services section" },
  { src: `${ASL}/D70B7284-73EA-4412-B8B1-FBFD84705499_1_105_c.jpeg`, alt: "ASL translator internals" },
  { src: "/work/autoholic-hero.webp", alt: "Autoholic website hero" },
  { src: "/work/munova-mid.webp", alt: "Munova Solutions services section" },
  { src: `${ASL}/DCEE07FA-4E29-46F5-82B7-884383FB4110_1_105_c.jpeg`, alt: "ASL translator enclosure" },
  { src: "/work/evergreen-hero.webp", alt: "Evergreen Essence website hero" },
  { src: "/work/kawakraft-mid.webp", alt: "KawaKraft process section" },
  { src: "/work/autoholic-mid.webp", alt: "Autoholic services section" },
  { src: `${ASL}/060B4B03-E01B-42EC-881C-7F7B5D3BAB25_1_105_c.jpeg`, alt: "ASL translator battery pack and display" },
]

export const MARQUEE_WORDS = [
  "AI Voice Agents", "Next.js", "C++20", "Claude API", "PostgreSQL RLS", "Terraform",
  "LiveKit", "Go", "Raspberry Pi", "FPGA", "Three.js", "Azure", "Docker", "Python",
]

// ─── Featured work (sticky stacking cards) ──────────────────────────────────
// Each card shows three tiles: two stacked on the left, one tall on the right.
// Projects without screenshots get stat / flow tiles built from facts already
// stated in projects.ts, so nothing here is invented.

export type Tile =
  | { kind: "image"; src: string; alt: string; position?: string }
  | { kind: "stat"; value: string; label: string }
  | { kind: "flow"; title: string; steps: string[] }

export type Featured = {
  slug: string
  category: string
  title: string
  tiles: [Tile, Tile, Tile]
}

export const FEATURED: Featured[] = [
  {
    slug: "motion-fitness-ai-caller",
    category: "Client · AI Voice",
    title: "Motion Fitness AI Caller",
    tiles: [
      { kind: "stat", value: "7", label: "gym locations answered by one AI line" },
      { kind: "stat", value: "~2¢", label: "per call, down from ~5¢ with verified prompt caching" },
      {
        kind: "flow",
        title: "Voice pipeline",
        steps: ["Telnyx SIP", "LiveKit Agents", "Deepgram Nova-3", "Claude Haiku", "Cartesia Sonic", "Human failover"],
      },
    ],
  },
  {
    slug: "munova",
    category: "Founder · Company",
    title: "Munova Solutions",
    tiles: [
      { kind: "image", src: "/work/munova-hero.webp", alt: "Munova website hero" },
      { kind: "image", src: "/work/munova-mid.webp", alt: "Munova AI receptionist demo section" },
      { kind: "image", src: "/work/munova-mobile.webp", alt: "Munova website on mobile" },
    ],
  },
  {
    slug: "lobengine",
    category: "Systems · C++20",
    title: "LOBEngine",
    tiles: [
      { kind: "stat", value: "230–280ns", label: "p50 in-process order-to-match, measured" },
      { kind: "stat", value: "70", label: "GoogleTest tests plus ASan, UBSan and TSan builds" },
      {
        kind: "flow",
        title: "Simulated exchange",
        steps: ["Gateway · FIX-lite", "Lock-free SPSC ring", "Matching engine", "Market data · ITCH-lite", "Market-maker client"],
      },
    ],
  },
  {
    slug: "asl-translator",
    category: "Capstone · Hardware",
    title: "English–ASL Translator",
    tiles: [
      { kind: "image", src: `${ASL}/620263E8-11D1-4002-A836-79034154EC8C_1_105_c.jpeg`, alt: "Handheld ASL translator" },
      { kind: "image", src: `${ASL}/D70B7284-73EA-4412-B8B1-FBFD84705499_1_105_c.jpeg`, alt: "ASL translator internals" },
      { kind: "image", src: `${ASL}/35B7D337-356B-4618-A31A-6F5B90E189B9_1_105_c.jpeg`, alt: "Capstone team with the device" },
    ],
  },
]
