export type Project = {
  id: string
  slug: string
  filename: string
  name: string
  period: string
  description: string
  longDescription: string
  highlights: string[]
  tech: string[]
  images?: string[]
  paper?: string
  results?: { value: string; label: string }[]
  resultsNote?: string
  github: string
  live: string
  accent: string
}

export const PROJECTS: Project[] = [
  {
    id: "project-15",
    slug: "munova",
    filename: "munova.tsx",
    name: "Munova — Software Design Business & Website",
    period: "2026",
    description:
      "The business I run client software work through, and its public website: a motion-driven Next.js marketing site for custom software, AI automation, AI phone agents, dashboards and support, with a full SEO build and a working contact form. Live at munovasolutions.ca.",
    longDescription:
      "Munova is the software design business I build and bill client work through: web apps, AI-powered automation, AI phone agents, business dashboards and ongoing support. The website is a Next.js 16 and Tailwind v4 site with a full-screen logo hero whose accent triangle flips on a timer, Lenis smooth scrolling, and a scroll-linked process timeline where a coral marker rides a gradient rail and each of four steps lights up with its own CSS mini-scene. A looping illustrated phone-call demo, clearly labelled as an example, shows what an AI receptionist call looks like without making any client claims. Search was planned as a build, not an afterthought: a services hub plus five service pages driven from one content file, per-page canonical and Open Graph metadata, ProfessionalService, Service and BreadcrumbList JSON-LD, a generated Open Graph image from the real logo, a sitemap, and a permanent redirect from www to the apex domain after finding www was serving a duplicate site. The contact form is a server action that validates input, silently drops honeypot hits, and sends the enquiry through Resend over plain fetch with a domain-verified sender, storing nothing on the site. Every animation honours prefers-reduced-motion, content is visible without JavaScript, and the site was checked at desktop and 390px mobile widths for overflow and console errors.",
    highlights: [
      "Live at munovasolutions.ca on Vercel with GitHub auto-deploy, custom domain, and a Google Workspace mailbox on the same domain",
      "Scroll-linked process timeline with per-step CSS mini-scenes, plus a looping illustrated AI phone-call demo labelled as an example",
      "SEO built in: services hub and five service pages from one content file, JSON-LD structured data, generated Open Graph image, sitemap, canonical URLs, www-to-apex redirect",
      "Contact form as a Next.js server action: validation, honeypot spam guard, and Resend delivery with a verified domain; nothing stored on the site",
      "Accessibility and resilience: prefers-reduced-motion respected throughout, content visible without JavaScript, no horizontal overflow at 390px",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Lenis", "Resend", "Vercel"],
    github: "#",
    live: "https://munovasolutions.ca",
    accent: "oklch(0.72 0.14 160)",
  },
  {
    id: "project-17",
    slug: "qazifleet",
    filename: "qazifleet.tsx",
    name: "QaziFleet — Family Vehicle & Maintenance Tracker",
    period: "2026",
    description:
      "Private vehicle and maintenance tracker for my family, running on a Raspberry Pi on the home network: service reminders by kilometres and months, fuel log, to-dos, and a requests inbox with optional phone push notifications.",
    longDescription:
      "QaziFleet is a self-hosted Next.js app that replaces a mix of reminders and memory for keeping the family's vehicles maintained. Each vehicle has maintenance records checked against per-service-type intervals in both kilometres and months, a to-do list, a fuel log, and a requests panel where family members can ask for something to be looked at; new requests can push a notification through ntfy.sh with no account needed. A dashboard surfaces a Needs Attention list of overdue and upcoming items. Data lives in a single SQLite file accessed with raw SQL through better-sqlite3 and no ORM, and there is deliberately no login because the app is only reachable on the trusted home network. It runs as an always-on systemd service on a Raspberry Pi. Two real deployment problems shaped it: better-sqlite3 13.x segfaulted on the Pi's ARM64 Node 20, so it is pinned to 12.11.1, and a header-encoding bug in the ntfy push was found and fixed after it broke live notifications. The interface is a deliberate dark-first dashboard with a single accent colour kept separate from the status colours, monospaced figures for odometer and cost data, and Framer Motion for animated tab and nav indicators.",
    highlights: [
      "Maintenance reminders computed from per-service-type intervals in both kilometres and months, with a dashboard Needs Attention list",
      "Per-vehicle tabs for maintenance, to-dos, requests and fuel, plus a shared family roster",
      "Optional push notifications through ntfy.sh when a family member submits a request",
      "Raw SQL on SQLite with better-sqlite3 and no ORM; pinned to 12.11.1 after 13.x segfaulted on the Pi's ARM64 Node 20",
      "Always-on systemd service on a Raspberry Pi, LAN-only by design with no accounts",
      "Dark-first design system: single accent colour separate from status colours, monospaced numerics, Framer Motion layout animations",
    ],
    tech: ["Next.js 16", "TypeScript", "SQLite", "Tailwind CSS", "Framer Motion", "Raspberry Pi", "systemd"],
    github: "#",
    live: "#",
    accent: "oklch(0.65 0.17 285)",
  },
  {
    id: "project-16",
    slug: "evergreen-essence",
    filename: "evergreen-essence.tsx",
    name: "Evergreen Essence",
    period: "2026",
    description:
      "Marketing site for a Saskatoon yard work and snow removal business, built from the client's own flyer and live on its own domain: a dual-season design, scroll-driven motion and a single config file for all business content.",
    longDescription:
      "Evergreen Essence is a one-page marketing site for a local yard work and snow removal business, built from a promo flyer and a website mockup the client supplied. The brand needed to cover both seasons, so the design splits forest green for summer from ice blue for winter, with one gold call-to-action colour. The client's real flyer is the hero image, rendered with next/image as the largest-contentful-paint element, with a screen-reader-only heading so the page still has a correct heading structure without duplicating the flyer's text. Every piece of business information and the service and stat content lives in a single site-config file, so copy changes never touch components. Motion is Framer Motion: scroll reveals, cursor-tracking spotlight cards, count-up stats and the mobile menu, wrapped in a MotionConfig so reduced-motion preferences are respected for JavaScript-driven animation as well as CSS. An accessibility and design audit pass fixed the issues it found. The site is deployed on Vercel from GitHub with a purchased .ca domain and DNS configured at the registrar.",
    highlights: [
      "Live on its own .ca domain via Vercel, with DNS set up at the registrar and www as the canonical host",
      "Dual-season design system: forest green and ice blue with a single gold CTA colour, taken from the client's flyer",
      "Client's flyer used directly as the hero (LCP) image with an sr-only h1 to keep heading semantics correct",
      "All business content in one site-config file, so copy and service changes never touch components",
      "Framer Motion scroll reveals, spotlight cards and count-up stats, with reduced-motion respected through MotionConfig",
      "Pure frontend with no database or auth, checked on desktop and mobile including the mobile menu",
    ],
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    github: "#",
    live: "https://www.evergreenessence.ca",
    accent: "oklch(0.68 0.15 150)",
  },
  {
    id: "project-12",
    slug: "lobengine",
    filename: "lobengine.cpp",
    name: "LOBEngine — Low-Latency Limit Order Book & Matching Engine",
    period: "2026",
    description:
      "C++20 limit order book and matching engine built to production-grade low-latency standards — zero-allocation hot path, a TSan-verified lock-free ring buffer, and a full simulated exchange wired together over real loopback UDP with measured, honestly-reported latency.",
    longDescription:
      "LOBEngine is a systems-programming portfolio project built for quantitative trading and market-making firm applications, implementing a price-time-priority limit order book and matching engine from scratch in C++20. The order book and matcher run on a zero-allocation hot path backed by a custom ObjectPool, with a lock-free SPSC ring buffer verified race-free under ThreadSanitizer for inter-thread order flow. On top of the core engine sits a full simulated exchange — a gateway, a matching loop, a market-data publisher, and a market-maker client — each running as a real OS thread and communicating over real loopback UDP using hand-rolled FIX-lite and ITCH-lite wire protocols, rather than being simulated in-process. The project is backed by 70 tests under GoogleTest plus ASan/UBSan/TSan sanitizer builds across a CMake + Ninja build system, and reports real measured latency numbers rather than idealized ones: ~230-280ns p50 for an in-process order-to-match, and ~84-92μs p50 wire-to-fill end-to-end through the full exchange stack. Originally started on Apple Silicon, it also builds on Windows via a WSL2 Ubuntu 24.04 toolchain, which is where the current latency numbers were measured.",
    highlights: [
      "Price-time-priority limit order book and matching engine, implemented from scratch in C++20",
      "Zero-allocation hot path via a custom ObjectPool — no heap allocation while matching orders",
      "Lock-free SPSC ring buffer for inter-thread order flow, verified race-free under ThreadSanitizer",
      "Hand-rolled FIX-lite and ITCH-lite wire protocols for order entry and market-data dissemination",
      "Full simulated exchange — gateway, matching loop, market-data publisher, and market-maker client — running as real threads over real loopback UDP, not simulated in-process",
      "70 tests under GoogleTest, plus ASan/UBSan/TSan sanitizer builds across a CMake + Ninja build system",
      "Real measured latency, honestly reported: ~230-280ns p50 in-process order-to-match, ~84-92μs p50 wire-to-fill end-to-end",
      "Cross-platform: originally built on Apple Silicon, also builds on Windows via a WSL2 Ubuntu 24.04 toolchain",
    ],
    tech: ["C++20", "CMake", "Ninja", "GoogleTest", "Lock-Free SPSC", "UDP Networking", "Linux"],
    github: "https://github.com/HananProjects/LOBEngine",
    live: "#",
    accent: "oklch(0.65 0.17 175)",
  },
  {
    id: "project-13",
    slug: "motion-fitness-ai-caller",
    filename: "motion_fitness_agent.py",
    name: "Motion Fitness AI Caller — Self-Hosted AI Phone Receptionist",
    period: "2026",
    description:
      "In-house, self-hosted AI phone receptionist for a 7-location gym chain, built to replace a third-party AI vendor that shut down mid-contract. Answers a single main line for all clubs — grounded FAQs, live class schedules, warm transfers, lead capture — with a three-layer SIP failover to a human if anything breaks. It has since grown to place timed outbound calls to trial-pass members and to run as a monitored production system.",
    longDescription:
      "Motion Fitness previously paid a vendor $1,500/month flat for AI call handling; when that vendor shut down, the phone system went dark with it. This project rebuilds it as something the client fully owns — the software, the phone number, and the call data — so no vendor can switch it off again. A single LiveKit Agents voice worker (Python) answers one main line for all seven clubs, loading the full business context (locations, a 33-destination transfer directory, an 8-document knowledge base) from PostgreSQL at startup and asking the caller which club they mean when it matters, the same way the client's own front-desk staff already did. The voice pipeline runs Deepgram Nova-3 for streaming STT, Claude Haiku for reasoning, Cartesia Sonic for TTS, and Silero for VAD, connected to the phone network over a Telnyx SIP trunk into LiveKit's SIP integration, and deployed to a production AWS Lightsail VPS via Docker Compose. Live class schedules are pulled per-call from the gym's own public class-schedule feed rather than kept in the static knowledge base, since schedules change too often to hand-maintain and the two Saskatchewan/Alberta regions don't share a DST rule. A Flask staff dashboard sits alongside the agent with role-based access (front desk sees a missed-calls worklist and a task board; supervisors see everything, including a self-serve knowledge editor so staff can update hours and pricing without a developer) and session-based auth with lockout, audit logging, and live session revocation. Reliability is handled in three stacked layers: a failed named transfer auto-retries through a general fallback destination; a mid-call AI failure (repeated STT/LLM/TTS errors) triggers a live transfer to a human instead of dropping the caller; and a failure before the voice session even exists gets the same treatment, closing a gap found during testing. Conversation latency was treated as a first-class metric, not an afterthought — real per-turn SDK metrics from live production calls were used to separate genuine LLM response time from endpointing delay, prompt-cache-verified cost cuts brought per-call cost from ~5¢ to ~2¢, and a purpose-built SDK filler-speech feature now covers slow live tool calls instead of leaving the caller in silence. Since go-live the project has grown into a full operations platform. An outbound agent calls members on a 7-day trial pass at set points in their trial, working from prospects pulled out of the gym's member-management system (876 real trial-pass prospects across all seven locations on the first pull), with a dashboard test-call page and an evaluation harness for the outbound prompts. Hardening followed real incidents: prompt-injection and abuse guardrails, a network watchdog on the VPS, a public health endpoint with a dead-air check for the uptime monitor, HTTPS in front of the dashboard, a flagged-answer review loop for staff, and per-vendor cost tracking that syncs spend from the Telnyx, Deepgram and Cartesia billing APIs. The codebase is now being refactored into a multi-client platform, where each business is a configured client with its own prompts, knowledge base and deployment rather than a fork.",
    highlights: [
      "Single LiveKit Agents voice worker answers one main line for all 7 gym locations — asks which club the caller means, rather than one number/config per club",
      "Full voice pipeline: Telnyx SIP → LiveKit SIP → Deepgram Nova-3 (STT) → Claude Haiku (LLM) → Cartesia Sonic (TTS), with Silero VAD and a local semantic turn-detector for barge-in",
      "Three-layer SIP failover — a failed named transfer, a mid-call AI crash, and a pre-session setup failure all converge on a live transfer to a human instead of a dead line",
      "Grounded, non-hallucinating FAQ answers from a shared PostgreSQL knowledge base, with an explicit no-guessing instruction — unknowns become a message or a transfer",
      "Live, timezone-aware class schedules pulled per-call from the gym's own public schedule feed, after reverse-engineering two dead-end vendor APIs first",
      "Role-based Flask staff dashboard (session auth, CSRF, lockout, audit log, live session revocation) with a self-serve knowledge editor for non-developer staff",
      "Real production-metrics latency investigation: per-turn SDK instrumentation isolated genuine LLM time-to-first-token from endpointing delay and cut typical call cost from ~5¢ to ~2¢ via verified Anthropic prompt caching",
      "Deployed on AWS Lightsail via Docker Compose, cut over live to the client's own cloud accounts during a credentials-handover meeting with zero downtime window",
      "Outbound trial-pass agent: timed mid-trial and final-day calls driven by prospects pulled from the gym's member system, with a dashboard test-call page and an eval harness for the outbound prompts",
      "Production hardening from real incidents: abuse and prompt-injection guardrails, VPS network watchdog, public health endpoint with dead-air detection, HTTPS-fronted dashboard",
      "Operations tooling for the client: flagged-answer review loop, caller memory by phone number, and vendor cost tracking synced from Telnyx, Deepgram and Cartesia billing APIs",
      "In progress: refactoring into a multi-client platform where each business is a configured client with its own prompts, knowledge base and deployment",
    ],
    tech: ["Python", "LiveKit Agents", "Deepgram Nova-3", "Anthropic Claude Haiku", "Cartesia Sonic", "PostgreSQL", "Flask", "Telnyx", "Docker", "AWS Lightsail"],
    github: "#",
    live: "#",
    accent: "oklch(0.68 0.19 220)",
  },
  {
    id: "project-14",
    slug: "motion-fitness-accounting-dashboard",
    filename: "motion_fitness_accounting.py",
    name: "Motion Fitness Accounting Dashboard",
    period: "2026",
    description:
      "PDF-to-dashboard bookkeeping tool for a 7-location gym chain's accountant — parses RBC bank statement PDFs per location, auto-categorizes transactions against verified accounting rules, and replaces manual Excel entry with a batch-upload web dashboard and a Sage 50-ready GL export.",
    longDescription:
      "Motion Fitness's accountant was manually transcribing debit transactions from RBC bank statement PDFs into Excel for each of the chain's gym locations and back-office accounts every month. This tool automates that end to end: a Python CLI extracts every transaction from a statement PDF and applies per-location YAML categorization rules, never guessing — anything that doesn't match a confident rule is routed to a Needs Review queue instead of silently mis-categorized. A v2 Flask/SQLite dashboard sits on top, letting the accountant drag in a batch of statements at once; each PDF is matched to its gym location from the account number printed on the statement itself, then shown in a confirm-before-save card so nothing touches the database until reviewed. Each location gets its own page with KPI tiles, category and trend charts (hand-rolled SVG, no charting library), an inline Needs Review panel, and a GL/Sage 50 prep export. Verifying the tool's output against the accountant's own manually-entered spreadsheet surfaced two real, pre-existing bugs in that spreadsheet itself — a fixed-size SUM range that silently undercounted high-transaction months by up to $97,000, and broken #REF! formulas feeding the Sage 50 export — both sidestepped by computing everything fresh from the source PDFs. An optional AI-assisted categorization feature suggests a category for Needs Review items via a few-shot-prompted Claude Haiku call, suggestion-only and never auto-applied, backed by a held-out accuracy eval against the accountant's own verified ground-truth categorizations.",
    highlights: [
      "Parses RBC bank statement PDFs per gym location, applying per-location YAML categorization rules with zero guessing — unmatched transactions go to a Needs Review queue",
      "Found two real, pre-existing bugs in the accountant's own live spreadsheet — a formula undercounting one location's transfers by ~$97,000, and broken GL export formulas — by verifying category totals to the penny against it",
      "v2 Flask/SQLite dashboard: batch PDF upload with automatic per-location matching from the statement's own account number, confirm-before-save so nothing is written until reviewed",
      "Per-location KPI tiles, category/trend charts, and a GL/Sage 50 prep export, all computed fresh from parsed PDFs rather than trusting a pre-existing spreadsheet's formulas",
      "Optional AI category-suggestion feature (few-shot Claude Haiku), suggestion-only with a required manual Apply, backed by a held-out accuracy eval against verified ground truth",
      "Caught and fixed a real race condition in the dashboard's chart-loading logic using a request-id token, found from actual interactive use, not code review",
    ],
    tech: ["Python", "Flask", "SQLite", "pdfplumber", "Anthropic Claude Haiku", "Vanilla JS"],
    github: "https://github.com/HananProjects/MFAccountingSoftware",
    live: "#",
    accent: "oklch(0.70 0.15 145)",
  },
  {
    id: "project-10",
    slug: "keytrus",
    filename: "keytrus.sql",
    name: "Keytrus — Multi-Tenant Property Management Platform",
    period: "2026",
    description:
      "Co-founded and built a multi-tenant SaaS property management platform — landlords, tenants, and vendors on one system, with tenant isolation enforced entirely at the database layer via Postgres Row-Level Security. Deployed live on Vercel.",
    longDescription:
      "Keytrus is a full-stack property management platform, co-founded and built with a fellow University of Saskatchewan Computer Engineering student. Every organization's data — properties, leases, tenants, payments, maintenance requests — is isolated by Postgres Row-Level Security policies keyed off org membership, not application-level filtering, so the database itself is the security boundary. On top of the core landlord workflow (properties, units, tenants, leases, rent payments, expenses, financial reporting) sits a maintenance and vendor-quote system, a tenant portal with messaging and document sharing, and a platform admin panel with cross-org visibility, user/org suspension, and audit logging — all still gated by the same RLS policies rather than a separate admin-only code path. Owner-facing billing enforces plan limits and handles upgrades/downgrades through a service-role client, the one deliberate exception where RLS is bypassed for a table that's revoked from every client role by design. Team members can be invited with per-key permission overrides on top of role defaults, built on a general invitation-acceptance flow. Backed by an automated test suite that exercises real RLS policies and RPCs under different Postgres roles, not just application logic.",
    highlights: [
      "Multi-tenant isolation enforced by Postgres Row-Level Security, not app-level filtering — the database itself decides what each request can see",
      "Full landlord workflow: properties, units, tenants, leases (auto-generated rent schedules), payments, expenses, and financial reporting",
      "Maintenance request + vendor quote system, plus a tenant portal with messaging and document sharing",
      "Platform admin panel — cross-org visibility, user/organization suspension, vendor verification, audit logs — built on the same RLS policies as every other role",
      "Owner-facing billing: plan upgrade/downgrade with usage-limit checks, via a service-role client scoped to the one table RLS deliberately locks out of every client role",
      "Team member invitations with per-permission overrides layered on role defaults",
      "Automated test suite (vitest) exercising real RLS policies and RPCs under different Postgres roles against a live database",
      "Deployed on Vercel with a hosted Supabase/Postgres backend",
    ],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS", "Vercel"],
    github: "https://github.com/HananProjects/Keytrus",
    live: "https://key-trus.vercel.app",
    accent: "oklch(0.65 0.19 340)",
  },
  {
    id: "project-9",
    slug: "fraudguard",
    filename: "fraudguard.go",
    name: "FraudGuard — Real-Time Fraud Detection",
    period: "2026",
    description:
      "Event-driven fraud/anomaly detection pipeline on Azure — a Go scoring microservice consumes a live transaction stream from Event Hubs and flags amount, velocity, and geo-velocity anomalies in real time on a Next.js dashboard.",
    longDescription:
      "FraudGuard is an event-driven fraud-detection system designed to mirror production Azure architecture end-to-end. A Go-based generator streams synthetic transactions — with injectable fraud patterns (amount outliers, velocity bursts, impossible-travel geo pairs) — through Azure Event Hubs into a Go scoring microservice running on Azure Container Apps, autoscaling via KEDA on consumer lag. The scoring service keeps rolling per-account statistics and combines an amount z-score check, a transaction-velocity check, and a geo-velocity (\"impossible travel\") check into a single weighted risk score, benchmarked against injected ground-truth labels for measurable precision/recall. Scored transactions land in Cosmos DB, whose change feed drives real-time updates to a Next.js dashboard through an Azure Function and Azure SignalR Service — no client-side polling. The full environment is defined in Terraform and deployed via GitHub Actions with OIDC-based Azure authentication, including a scripted spin-up/tear-down workflow so the one continuously-billed resource (Event Hubs) doesn't run between demos.",
    highlights: [
      "Event-driven microservice architecture: Go scoring service on Azure Container Apps, autoscaling via KEDA on Event Hubs consumer lag, scaling to zero when idle",
      "Rules-based fraud scoring: rolling per-account amount z-score, transaction-velocity, and geo-velocity (\"impossible travel\") checks combined into a weighted 0-100 risk score",
      "Synthetic transaction generator with injectable fraud patterns (amount outliers, velocity bursts, impossible-travel pairs) for measuring precision/recall against ground-truth labels",
      "Real-time dashboard updates via Cosmos DB change feed → Azure Function → Azure SignalR Service — no client-side polling",
      "Infrastructure-as-Code in Terraform across Event Hubs, Cosmos DB, Container Apps, and SignalR, deployed via GitHub Actions with OIDC-based Azure authentication (no stored secrets)",
      "Cost-aware architecture: scripted spin-up/tear-down pipeline keeps the one always-billing resource (Event Hubs) off between demos",
      "NextAuth-gated Next.js dashboard with a live risk-scored transaction feed and color-coded severity badges",
    ],
    tech: ["Go", "Next.js", "TypeScript", "Terraform", "Azure Event Hubs", "Azure Cosmos DB", "Azure Container Apps", "Azure SignalR", "GitHub Actions"],
    github: "https://github.com/HananProjects/FraudGuard",
    live: "#",
    accent: "oklch(0.62 0.20 15)",
  },
  {
    id: "project-7",
    slug: "nanistack",
    filename: "nanistack.js",
    name: "NaniStack — Agency OS",
    period: "2026",
    description:
      "Self-hosted operating system for running an agency with AI agents: a real-time dashboard and Telegram bot, a JARVIS-style 3D agent HUD with voice dispatch, an Obsidian-vault second brain, and a business cluster that scouts leads and drafts outreach for my company, Munova, with a human approving every send.",
    longDescription:
      "NaniStack started as a local agency dashboard and has grown into the control room for my work. A Node.js/Express backend serves a real-time WebSocket dashboard and a Telegram bot, and routes each task to the right agent. Agents are split by what each model is good at: General, Research and Coder run on the Claude API (Haiku and Sonnet) because they need reliable multi-step tool use, while routing, email drafting and embeddings stay on a local Ollama model, after a local 8B model failed at multi-step tool recovery. A five-agent Business Cluster (CEO, Lead Scout, Outreach, Ops Manager, Finance) runs the agency itself, with its own shared memory, a CEO that delegates to the specialists, keyless web search for finding prospects, and an approval pipeline so outreach is drafted for review, not sent unseen. The centrepiece is an Agent HUD: a Three.js particle-sphere core with ring effects around working agents, zoom and pan, a window manager that snaps panels across multiple monitors, an Obsidian vault rendered as a knowledge graph, per-project code maps, and a wake-word voice dispatch. An MCP server lets external agents such as Claude Code register on the HUD and claim dispatched tasks. It runs on a Raspberry Pi under systemd, reachable over HTTPS through Tailscale Funnel with authentication, and installs as a PWA.",
    highlights: [
      "Four general-purpose agents plus a five-agent Business Cluster (CEO, Lead Scout, Outreach, Ops Manager, Finance) with shared memory and CEO-to-specialist delegation",
      "Agents split by capability: Claude Haiku and Sonnet for multi-step tool use, local Ollama for routing, email drafting and embeddings, with the email agent falling back to Claude if Ollama is down",
      "Lead-to-outreach pipeline: scouts prospects on the web, drafts emails as Munova, and holds them for human approval before anything is sent",
      "3D Agent HUD in Three.js: particle-sphere core, ring effects on working agents, multi-monitor window manager, and an Obsidian vault shown as a live knowledge graph",
      "Wake-word voice dispatch and a Telegram bot, both feeding the same request pipeline as the dashboard",
      "MCP server so external agents like Claude Code appear on the HUD and pick up dispatched tasks",
      "Token-level response streaming over WebSocket, a daily planner, and client management with MRR tracking",
      "Deployed on a Raspberry Pi via systemd, served over HTTPS with Tailscale Funnel and authentication, installable as a PWA",
    ],
    tech: ["Node.js", "Express", "WebSocket", "Claude API", "Ollama", "Three.js", "MCP", "Telegram Bot API", "Raspberry Pi", "Tailscale"],
    github: "https://github.com/HananProjects/NaniStack",
    live: "#",
    accent: "oklch(0.65 0.18 275)",
  },
  {
    id: "project-8",
    slug: "autoholic-invoicing",
    filename: "autoholic-invoicing.ts",
    name: "Autoholic Invoicing",
    period: "2026",
    description:
      "Production invoicing system built for a real auto repair and towing business — managing clients, vehicles, invoices, and expenses with Canadian GST/PST tax handling. Deployed on Railway and actively in use.",
    longDescription:
      "A full-stack invoicing application built and deployed for Autoholic Auto Care and Towing. The app manages the complete billing workflow: client and vehicle records, service-based invoice creation with line items, expense tracking, and automated Canadian tax calculations (GST/PST). Built with Next.js 15 and TypeScript on the frontend and raw SQL SQLite on the backend — no ORM, handwritten queries for full control. Deployed live on Railway and used daily by the business. The same codebase was also independently deployed for a second client, Verified Auto.",
    highlights: [
      "Full invoice lifecycle: create, edit, send, mark paid, and track payment status per client",
      "Canadian GST/PST tax model with automatic calculation on all line items",
      "Client and vehicle management with full service history per vehicle",
      "Expense tracking module for business cost management and reporting",
      "Raw SQL with SQLite — no ORM, handwritten queries for full schema control",
      "Deployed live on Railway; in daily production use by a real business",
      "Codebase forked and independently deployed for a second client (Verified Auto)",
    ],
    tech: ["Next.js 15", "TypeScript", "SQLite", "Railway"],
    github: "https://github.com/HananProjects/Autoholic-Invoicing",
    live: "#",
    accent: "oklch(0.70 0.18 35)",
  },
  {
    id: "project-11",
    slug: "autoholic-website",
    filename: "autoholic-website.tsx",
    name: "Autoholic Website",
    period: "2026",
    description:
      "Public marketing site for Autoholic Auto Care and Towing — a scroll-driven 3D interactive car model built with Three.js and React Three Fiber, animated with GSAP. Deployed live on Vercel.",
    longDescription:
      "The public-facing marketing website for Autoholic Auto Care and Towing, built as a single-page experience centered on a scroll-driven 3D car model. React Three Fiber renders the model while GSAP ScrollTrigger choreographs its rotation and camera movement against the page scroll, alongside sections for services, stats, about, and contact. There's no database or authentication — a pure frontend/SSR site optimized for fast loads and a polished first impression for a real local business. Built and shipped alongside the same client's Autoholic Invoicing system.",
    highlights: [
      "Scroll-driven 3D car model built with Three.js / React Three Fiber, choreographed via GSAP ScrollTrigger",
      "Single-page marketing site: hero, services, stats, about, and contact sections",
      "Pure frontend/SSR — no database or authentication required",
      "Deployed live on Vercel; custom domain (autoholicautocare.ca) pending final DNS cutover",
      "Responsive tuning for both the desktop scroll experience and mobile",
      "Built and shipped for the same real client as Autoholic Invoicing",
    ],
    tech: ["Next.js 16", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS"],
    github: "https://github.com/HananProjects/Autoholic-Website",
    live: "https://autoholic-website.vercel.app",
    accent: "oklch(0.62 0.21 30)",
  },
  {
    id: "project-5",
    slug: "ai-code-review-pipeline",
    filename: "ai-code-review-pipeline.py",
    name: "AI Code Review Pipeline",
    period: "2026",
    description:
      "Autonomous multi-agent system that reviews GitHub Pull Requests in real time, posting inline comments on specific lines of code — like CodeRabbit, built from scratch.",
    longDescription:
      "A production-deployed multi-agent system that hooks into GitHub's PR workflow and runs three specialized AI reviewers — Security, Performance, and Style — in parallel using CrewAI and Claude Sonnet. When a PR is opened or updated, GitHub fires a webhook at a FastAPI server on GCP Cloud Run. The server verifies the HMAC signature, returns 202 immediately so GitHub never times out, and kicks off the review in the background. Each agent analyzes the diff independently and their findings are posted as inline GitHub Review comments pinned to the exact lines of code that triggered them.",
    highlights: [
      "Three agents (Security, Performance, Style) run in parallel — not sequentially — so review time doesn't scale with agent count",
      "Inline line-level comments posted via the GitHub Review API, pinned to specific diff lines like CodeRabbit",
      "Returns HTTP 202 immediately on webhook receipt; full review runs async in the background",
      "HMAC-SHA256 webhook signature verification on every incoming request",
      "Deployed on GCP Cloud Run with Docker — live URL, not just a local demo",
      "Agents powered by Claude Sonnet via the Anthropic API, orchestrated with CrewAI",
    ],
    tech: ["Python", "CrewAI", "Claude API", "FastAPI", "GitHub API", "GCP Cloud Run", "Docker"],
    github: "https://github.com/HananProjects/ai-code-review-pipeline",
    live: "#",
    accent: "oklch(0.62 0.18 200)",
  },
  {
    id: "project-6",
    slug: "horus",
    filename: "horus.py",
    name: "Horus — AI Desktop Assistant",
    period: "2025 – 2026",
    description:
      "Agentic desktop AI assistant with an Iron Man HUD-style interface. Combines real-time voice I/O, persistent vector memory, and computer control — all running locally with Claude as the reasoning core.",
    longDescription:
      "Horus is a personal agentic AI assistant built around a fully local voice pipeline and a React dashboard styled as a HUD. Spoken input is transcribed offline via OpenAI Whisper, routed through Claude for reasoning, and replied to with synthesized speech — all under 2 seconds end-to-end. A FastAPI backend manages real-time bidirectional communication over WebSockets, while ChromaDB stores and retrieves memories as vector embeddings so Horus remembers past conversations. The computer-control layer lets Horus take actions on the desktop — clicking, typing, screenshotting — using the Anthropic Computer Use API. A Three.js animated HUD and live logs for conversation, memory, and actions are surfaced in the React frontend.",
    highlights: [
      "Full voice pipeline: offline Whisper STT → Claude reasoning → pyttsx3 TTS with under 2s latency",
      "Persistent vector memory via ChromaDB — Horus recalls context across sessions",
      "Computer control using Anthropic Computer Use API: click, type, screenshot autonomously",
      "Real-time HUD dashboard in React with Three.js 3D visualizations and live action logs",
      "FastAPI backend with WebSocket streaming for low-latency bidirectional communication",
      "Obsidian vault and Gmail integrations for personal knowledge and inbox access",
      "Fully local operation — no cloud dependency beyond the Claude and Whisper APIs",
    ],
    tech: ["Python", "FastAPI", "React", "Three.js", "Claude API", "OpenAI Whisper", "ChromaDB", "WebSockets"],
    github: "https://github.com/HananProjects/Horus",
    live: "#",
    accent: "oklch(0.72 0.20 55)",
  },
  {
    id: "project-0",
    slug: "asl-translator",
    filename: "asl-translator.py",
    name: "Portable English-ASL Translator",
    period: "Sept 2025 – Apr 2026",
    description:
      "Two-way offline translation system on Raspberry Pi 5 enabling real-time communication between ASL users and English speakers. Housed in a custom portable enclosure with battery-powered operation — no cloud dependency.",
    longDescription:
      "A two-way offline translation system designed on Raspberry Pi 5 to support communication between ASL users and English speakers. The system handles both directions: spoken English is transcribed and converted to on-screen sign guidance, while ASL gestures are recognized and spoken aloud. Built for real-world accessibility and portability, the entire system runs locally inside a custom-built handheld enclosure with battery power — no internet connection required at any point.",
    highlights: [
      "Two-way translation: ASL → English (gesture recognition + speech output) and English → ASL (speech-to-text + sign display)",
      "Fully offline — all processing runs locally on Raspberry Pi 5, no cloud dependency",
      "Custom-built portable handheld enclosure with battery-powered operation",
      "VOSK for offline speech-to-text and local text-to-speech output",
      "MediaPipe landmark extraction paired with a lightweight gesture classifier",
      "Multi-threaded pipeline managing camera, microphone, display, and speaker subsystems concurrently",
      "End-to-end latency under 2 seconds for real-time usability",
      "Dedicated UI interface for sign recognition and translation output",
    ],
    tech: ["Python", "Raspberry Pi 5", "MediaPipe", "VOSK"],
    images: [
      "/projects/asl-translator/620263E8-11D1-4002-A836-79034154EC8C_1_105_c.jpeg",
      "/projects/asl-translator/8DF5400D-FD8F-4ADF-8FF4-B703B379999C_1_105_c.jpeg",
      "/projects/asl-translator/C6E9DA3B-CA52-40E0-85CB-CFEECBEA6CD6_1_105_c.jpeg",
      "/projects/asl-translator/D70B7284-73EA-4412-B8B1-FBFD84705499_1_105_c.jpeg",
      "/projects/asl-translator/DCEE07FA-4E29-46F5-82B7-884383FB4110_1_105_c.jpeg",
      "/projects/asl-translator/060B4B03-E01B-42EC-881C-7F7B5D3BAB25_1_105_c.jpeg",
      "/projects/asl-translator/35B7D337-356B-4618-A31A-6F5B90E189B9_1_105_c.jpeg"
    ],
    github: "https://github.com/HananProjects/English-to-ASL-Translator",
    live: "#",
    accent: "oklch(0.72 0.15 250)",
  },
  {
    id: "project-1",
    slug: "kawakraft",
    filename: "kawakraft.tsx",
    name: "KawaKraft — Brand Site & Shop Invoicing",
    period: "2025 – 2026",
    description:
      "Website and back-office tooling for KawaKraft, a custom laser-engraved leather goods business: a dark-luxury brand site with a product catalogue, live at kawakraft.ca, plus a separate private invoicing and inventory app built for the shop's made-to-order workflow.",
    longDescription:
      "KawaKraft makes custom laser-engraved leather goods — wallets, keychains, sleeves, patches, cardholders — to order. The public site is a Next.js and Tailwind brand experience in a dark-luxury style (near-black stone with a gold accent, Cormorant and Montserrat type), with a 12-product catalogue and category filter, glare-and-tilt product cards, FAQ, privacy and terms pages, and the SEO basics (metadata, sitemap, robots, 404). It started in 2025 as a Django and PostgreSQL e-commerce project; the Django backend is still in the repo as a scaffold, but the live site is a frontend-only brand site and the two are not yet integrated. In September 2026 I built a second, separate app for the business: KawaKraft Invoicing, a private Next.js and SQLite tool for invoices, quotes, product inventory and purchase-order receiving. It was adapted from the Autoholic Invoicing codebase and reworked for retail, with a per-line personalization field for custom engraving requests that carries through to the invoice editor, print pages and emailed invoices.",
    highlights: [
      "Live brand site at kawakraft.ca: dark-luxury design, 12-product catalogue with category filtering, FAQ, privacy and terms, sitemap and metadata",
      "Separate private invoicing and inventory app for the shop: invoices, quotes, products with stock levels and reorder points, and purchase-order receiving that updates stock",
      "Made-to-order domain modelling: a personalization field on each invoice line for custom engraving text, shown on the editor, print pages and emails",
      "Adapted from the Autoholic Invoicing codebase and reworked from auto repair to retail: vehicles and labour/parts removed, product catalogue and SKU snapshots on invoice lines added",
      "Canadian GST/PST handling with the discount applied before tax",
      "Original 2025 Django and PostgreSQL backend remains as a scaffold; not yet wired to the storefront",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SQLite", "Django", "PostgreSQL"],
    github: "https://github.com/HananProjects/KawaKraft",
    live: "https://kawakraft.ca",
    accent: "oklch(0.60 0.15 150)",
  },
  {
    id: "project-2",
    slug: "microprocessor",
    filename: "microprocessor.v",
    name: "8-bit Microprocessor",
    period: "2024",
    description:
      "Modular 8-bit microprocessor in Verilog HDL with sequencer, instruction decoder, and ALU. Validated on Intel FPGA using Quartus synthesis and ModelSim functional simulation.",
    longDescription:
      "A modular 8-bit microprocessor implemented in Verilog HDL from the ground up. The design follows a classical von Neumann architecture with a clearly separated datapath and control unit. The processor supports a custom instruction set and is structured into discrete, testable modules — a program counter, instruction register, instruction decoder, ALU, register file, and sequencer. The design was synthesized and deployed onto an Intel FPGA development board using Quartus Prime.",
    highlights: [
      "Custom 8-bit instruction set architecture (ISA) with arithmetic, logic, load/store, and branch instructions",
      "Modular Verilog design: PC, IR, decoder, ALU, register file, and sequencer as separate testable modules",
      "Multi-cycle execution with a finite state machine (FSM) based control unit",
      "ALU supporting ADD, SUB, AND, OR, NOT, and shift operations",
      "Functional simulation and verification in ModelSim with custom testbenches",
      "Synthesis and FPGA implementation via Intel Quartus Prime",
      "Hardware validated on Intel DE-series FPGA development board",
    ],
    tech: ["Verilog", "Intel FPGA", "Quartus", "ModelSim"],
    github: "#",
    live: "#",
    accent: "oklch(0.65 0.16 290)",
  },
  {
    id: "project-4",
    slug: "booth-multiplier",
    filename: "booth-multiplier.v",
    name: "Approximate Radix-4 Booth Multiplier",
    period: "2024",
    description:
      "8-bit Verilog HDL multiplier designed to accelerate DNN workloads by approximating the least significant partial product columns — achieving ~12% area and ~11% power reduction with 95% last-layer inference accuracy.",
    longDescription:
      "An 8-bit approximate multiplier implemented in Verilog HDL, targeting efficient multiply-accumulate (MAC) operations in deep neural network inference. The design leverages the error-tolerance of DNN workloads: the five least significant partial product columns — where small numerical deviations have minimal impact on inference results — are replaced with a fixed '10000' pattern, significantly reducing hardware complexity. Upper bit precision is preserved to maintain acceptable accuracy.",
    highlights: [
      "Radix-4 Booth encoding for reduced partial product count compared to standard binary multiplication",
      "Approximate lower partial product columns replaced with a fixed '10000' pattern to cut hardware",
      "~12% area reduction and ~11% power reduction versus the exact baseline",
      "95% last-layer accuracy and 84% overall sample accuracy on DNN inference benchmarks",
      "Targets multiply-accumulate operations common in deep learning accelerators",
      "Balances hardware efficiency with acceptable numerical error for inference-tolerant applications",
    ],
    tech: ["Verilog", "Quartus", "ModelSim"],
    results: [
      { value: "~12%", label: "Area savings" },
      { value: "~11%", label: "Power savings" },
      { value: "95%",  label: "Last-layer accuracy" },
      { value: "84%",  label: "Overall sample accuracy" },
    ],
    resultsNote: "The design reduces area and power compared to exact Booth multiplication, while keeping the product accurate enough for inference-tolerant workloads.",
    paper: "/projects/booth-multiplier/Approximate-Radix-4-Booth-Multiplier.pdf",
    github: "#",
    live: "#",
    accent: "oklch(0.68 0.17 310)",
  },
  {
    id: "project-3",
    slug: "travel-app",
    filename: "travel-app.py",
    name: "Travel Planning App",
    period: "2024",
    description:
      "Django-based collaborative travel planning application with booking and reservation management backed by a relational database.",
    longDescription:
      "A collaborative travel planning web application built with Django. Users can create and manage travel itineraries, browse destinations, and coordinate bookings and reservations with travel companions. The application uses a normalized relational database to manage users, trips, destinations, and bookings — with Django's ORM providing clean, maintainable database access patterns throughout.",
    highlights: [
      "User authentication and profile management with role-based trip access control",
      "Itinerary builder with day-by-day trip planning and activity scheduling",
      "Booking and reservation management for flights, hotels, and activities",
      "Collaborative trip sharing — invite members and plan together in real time",
      "Django ORM with normalized relational database schema",
      "Form validation and error handling for all user-facing inputs",
      "Responsive UI with Django templates and custom CSS",
    ],
    tech: ["Django", "Python", "SQL"],
    github: "#",
    live: "#",
    accent: "oklch(0.75 0.18 85)",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
