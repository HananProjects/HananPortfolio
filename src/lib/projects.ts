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
      "In-house, self-hosted AI phone receptionist for a 7-location gym chain, built to replace a third-party AI vendor that shut down mid-contract. Answers a single main line for all clubs — grounded FAQs, live class schedules, warm transfers, lead capture — with a three-layer SIP failover to a human if anything breaks.",
    longDescription:
      "Motion Fitness previously paid a vendor $1,500/month flat for AI call handling; when that vendor shut down, the phone system went dark with it. This project rebuilds it as something the client fully owns — the software, the phone number, and the call data — so no vendor can switch it off again. A single LiveKit Agents voice worker (Python) answers one main line for all seven clubs, loading the full business context (locations, a 33-destination transfer directory, an 8-document knowledge base) from PostgreSQL at startup and asking the caller which club they mean when it matters, the same way the client's own front-desk staff already did. The voice pipeline runs Deepgram Nova-3 for streaming STT, Claude Haiku for reasoning, Cartesia Sonic for TTS, and Silero for VAD, connected to the phone network over a Telnyx SIP trunk into LiveKit's SIP integration, and deployed to a production AWS Lightsail VPS via Docker Compose. Live class schedules are pulled per-call from the gym's own public class-schedule feed rather than kept in the static knowledge base, since schedules change too often to hand-maintain and the two Saskatchewan/Alberta regions don't share a DST rule. A Flask staff dashboard sits alongside the agent with role-based access (front desk sees a missed-calls worklist and a task board; supervisors see everything, including a self-serve knowledge editor so staff can update hours and pricing without a developer) and session-based auth with lockout, audit logging, and live session revocation. Reliability is handled in three stacked layers: a failed named transfer auto-retries through a general fallback destination; a mid-call AI failure (repeated STT/LLM/TTS errors) triggers a live transfer to a human instead of dropping the caller; and a failure before the voice session even exists gets the same treatment, closing a gap found during testing. Conversation latency was treated as a first-class metric, not an afterthought — real per-turn SDK metrics from live production calls were used to separate genuine LLM response time from endpointing delay, prompt-cache-verified cost cuts brought per-call cost from ~5¢ to ~2¢, and a purpose-built SDK filler-speech feature now covers slow live tool calls instead of leaving the caller in silence.",
    highlights: [
      "Single LiveKit Agents voice worker answers one main line for all 7 gym locations — asks which club the caller means, rather than one number/config per club",
      "Full voice pipeline: Telnyx SIP → LiveKit SIP → Deepgram Nova-3 (STT) → Claude Haiku (LLM) → Cartesia Sonic (TTS), with Silero VAD and a local semantic turn-detector for barge-in",
      "Three-layer SIP failover — a failed named transfer, a mid-call AI crash, and a pre-session setup failure all converge on a live transfer to a human instead of a dead line",
      "Grounded, non-hallucinating FAQ answers from a shared PostgreSQL knowledge base, with an explicit no-guessing instruction — unknowns become a message or a transfer",
      "Live, timezone-aware class schedules pulled per-call from the gym's own public schedule feed, after reverse-engineering two dead-end vendor APIs first",
      "Role-based Flask staff dashboard (session auth, CSRF, lockout, audit log, live session revocation) with a self-serve knowledge editor for non-developer staff",
      "Real production-metrics latency investigation: per-turn SDK instrumentation isolated genuine LLM time-to-first-token from endpointing delay and cut typical call cost from ~5¢ to ~2¢ via verified Anthropic prompt caching",
      "Deployed on AWS Lightsail via Docker Compose, cut over live to the client's own cloud accounts during a credentials-handover meeting with zero downtime window",
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
      "Self-hosted agency operating system and Telegram bot that routes tasks to 6 specialized AI agents powered by a local LLM — real-time WebSocket dashboard, client management, and a built-in daily planner.",
    longDescription:
      "NaniStack is a local agency OS built to manage client work through AI agents. A Node.js/Express backend serves a real-time dashboard over WebSockets and simultaneously runs a Telegram bot — any task submitted through either interface is analyzed by a router that selects the most appropriate agent: Invoice-Bot, Data-Sync, Web-Crawler, Report-Gen, Coder, or General. All agents run on a locally-hosted Ollama LLM (qwen3:14b), keeping everything private and free from API costs. The dashboard streams responses token by token, tracks all requests with full history, manages clients with MRR tracking, and includes a daily planner with a mini calendar, task priorities, and time scheduling. Deployed on a Raspberry Pi via systemd for always-on local access.",
    highlights: [
      "6 specialized agents (Invoice-Bot, Data-Sync, Web-Crawler, Report-Gen, Coder, General) with automatic LLM-based routing",
      "Dual interfaces: real-time dashboard UI and Telegram bot — both backed by the same agent system",
      "Fully local LLM via Ollama (qwen3:14b) — no cloud API costs, completely private",
      "Token-level response streaming over WebSocket — output appears live as the model generates it",
      "Built-in daily planner with mini calendar, task priorities, time scheduling, and category tags",
      "Client management with MRR tracking and per-client request history",
      "Deployed on Raspberry Pi via systemd — always-on, accessible over the home network as a PWA",
    ],
    tech: ["Node.js", "Express", "WebSocket", "Ollama", "Telegram Bot API", "Raspberry Pi"],
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
    name: "KawaKraft",
    period: "2025",
    description:
      "Full-stack e-commerce platform with secure REST APIs for product management, authentication, and customer orders. Responsive UI built with Next.js and Tailwind CSS; version-controlled CI workflow via GitHub.",
    longDescription:
      "KawaKraft is a full-stack e-commerce platform built for motorcycle parts and accessories. A Django backend exposes secure REST APIs for product catalogues, JWT-based user authentication, cart management, and order processing — backed by a PostgreSQL database. The frontend is a responsive Next.js application styled with Tailwind CSS, delivering a fast and modern shopping experience with a seamless checkout flow.",
    highlights: [
      "Secure JWT-based authentication with protected API routes and session management",
      "Full product catalogue with category filtering, search, and pagination",
      "Shopping cart with persistent state and complete order checkout flow",
      "Admin panel for product inventory and order management",
      "Django REST Framework for structured, versioned API design",
      "PostgreSQL relational database with optimized query patterns",
      "CI workflow via GitHub Actions for automated linting and testing",
    ],
    tech: ["Django", "Next.js", "PostgreSQL", "Tailwind CSS", "REST API"],
    github: "https://github.com/HananProjects/KawaKraft",
    live: "#",
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
