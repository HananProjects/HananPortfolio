// `projects` lists slugs (from PROJECTS in ./projects) that actually use this
// tech. It drives the click-to-filter chips in the "All projects" archive.
// Keep it honest: only list a slug if that project's `tech` array names the
// technology (or an unambiguous grouping of it, e.g. "Azure" for FraudGuard's
// Azure services). Entries with an empty list are real skills that aren't tied
// to a featured project; they render as non-interactive chips.
export type Tech = {
  name: string
  group: "Languages" | "Frameworks" | "Data & Cloud" | "AI" | "Systems"
  projects: string[]
}

export const TECH_STACK: Tech[] = [
  // Languages
  { name: "TypeScript", group: "Languages", projects: ["munova", "evergreen-essence", "kawakraft", "fraudguard", "autoholic-invoicing", "autoholic-website"] },
  { name: "Python", group: "Languages", projects: ["motion-fitness-ai-caller", "motion-fitness-accounting-dashboard", "horus", "ai-code-review-pipeline", "asl-translator", "travel-app"] },
  { name: "C++", group: "Languages", projects: ["lobengine"] },
  { name: "Go", group: "Languages", projects: ["fraudguard"] },
  { name: "JavaScript", group: "Languages", projects: ["nanistack"] },
  { name: "Verilog", group: "Languages", projects: ["microprocessor", "booth-multiplier"] },
  { name: "SQL", group: "Languages", projects: ["travel-app"] },
  { name: "C", group: "Languages", projects: [] },
  { name: "Java", group: "Languages", projects: [] },
  // Frameworks & web
  { name: "Next.js", group: "Frameworks", projects: ["munova", "evergreen-essence", "fraudguard", "autoholic-invoicing", "autoholic-website", "kawakraft"] },
  { name: "React", group: "Frameworks", projects: ["horus"] },
  { name: "Tailwind CSS", group: "Frameworks", projects: ["munova", "evergreen-essence", "autoholic-website", "kawakraft"] },
  { name: "Node.js", group: "Frameworks", projects: ["nanistack"] },
  { name: "Express", group: "Frameworks", projects: ["nanistack"] },
  { name: "FastAPI", group: "Frameworks", projects: ["horus", "ai-code-review-pipeline"] },
  { name: "Flask", group: "Frameworks", projects: ["motion-fitness-ai-caller", "motion-fitness-accounting-dashboard"] },
  { name: "Django", group: "Frameworks", projects: ["kawakraft", "travel-app"] },
  { name: "Three.js", group: "Frameworks", projects: ["autoholic-website", "horus", "nanistack"] },
  { name: "React Three Fiber", group: "Frameworks", projects: ["autoholic-website"] },
  { name: "GSAP", group: "Frameworks", projects: ["autoholic-website"] },
  { name: "Framer Motion", group: "Frameworks", projects: ["evergreen-essence"] },
  { name: "WebSockets", group: "Frameworks", projects: ["nanistack", "horus"] },
  // Data & cloud
  { name: "PostgreSQL", group: "Data & Cloud", projects: ["motion-fitness-ai-caller", "kawakraft"] },
  { name: "SQLite", group: "Data & Cloud", projects: ["autoholic-invoicing", "motion-fitness-accounting-dashboard", "kawakraft"] },
  { name: "Supabase", group: "Data & Cloud", projects: [] },
  { name: "Docker", group: "Data & Cloud", projects: ["motion-fitness-ai-caller", "ai-code-review-pipeline"] },
  { name: "Terraform", group: "Data & Cloud", projects: ["fraudguard"] },
  { name: "GitHub Actions", group: "Data & Cloud", projects: ["fraudguard"] },
  { name: "Azure", group: "Data & Cloud", projects: ["fraudguard"] },
  { name: "GCP Cloud Run", group: "Data & Cloud", projects: ["ai-code-review-pipeline"] },
  { name: "AWS Lightsail", group: "Data & Cloud", projects: ["motion-fitness-ai-caller"] },
  { name: "Vercel", group: "Data & Cloud", projects: ["munova", "evergreen-essence", "autoholic-website"] },
  { name: "Railway", group: "Data & Cloud", projects: ["autoholic-invoicing"] },
  // AI
  { name: "Claude API", group: "AI", projects: ["motion-fitness-ai-caller", "motion-fitness-accounting-dashboard", "nanistack", "horus", "ai-code-review-pipeline"] },
  { name: "LiveKit Agents", group: "AI", projects: ["motion-fitness-ai-caller"] },
  { name: "MCP", group: "AI", projects: ["nanistack"] },
  { name: "Ollama", group: "AI", projects: ["nanistack"] },
  { name: "CrewAI", group: "AI", projects: ["ai-code-review-pipeline"] },
  { name: "OpenAI Whisper", group: "AI", projects: ["horus"] },
  { name: "ChromaDB", group: "AI", projects: ["horus"] },
  { name: "MediaPipe", group: "AI", projects: ["asl-translator"] },
  // Systems & hardware
  { name: "Linux", group: "Systems", projects: ["lobengine"] },
  { name: "CMake", group: "Systems", projects: ["lobengine"] },
  { name: "GoogleTest", group: "Systems", projects: ["lobengine"] },
  { name: "Raspberry Pi", group: "Systems", projects: ["nanistack", "asl-translator"] },
  { name: "FPGA (Intel)", group: "Systems", projects: ["microprocessor", "booth-multiplier"] },
  { name: "Quartus", group: "Systems", projects: ["microprocessor", "booth-multiplier"] },
  { name: "ModelSim", group: "Systems", projects: ["microprocessor", "booth-multiplier"] },
  { name: "Arduino", group: "Systems", projects: [] },
  { name: "ARM MCUs", group: "Systems", projects: [] },
  { name: "Git", group: "Systems", projects: [] },
  { name: "Bash", group: "Systems", projects: [] },
  { name: "MATLAB", group: "Systems", projects: [] },
]
