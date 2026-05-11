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
