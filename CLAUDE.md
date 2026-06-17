# Portfolio — CLAUDE.md

## Mandatory Update Protocol

> **After every request, always:**
> 1. Update this `CLAUDE.md` with any new context, changes made, decisions taken, or current project state.
> 2. Update the Obsidian vault note at `B:\Obsidian Vault\Projects\Portfolio.md` to reflect the latest state.
> 3. Append an entry to `B:\Obsidian Vault\log.md` using format: `## [YYYY-MM-DD] project | Portfolio — description`

---

## Git Branch Workflow

> **Before doing any work on a request:**
> 1. Create a new branch from `main` named after the feature/fix being worked on (e.g. `feature/new-project`, `fix/card-layout`, `chore/update-deps`).
> 2. Do all work on that branch — never commit directly to `main`.
> 3. When the work is complete, summarize what the branch contains so it's ready to review and merge.
>
> Branch naming: `feature/<short-name>`, `fix/<short-name>`, or `chore/<short-name>`.

---

## Project Overview

**Portfolio** is Hanan's personal developer portfolio website, built with Next.js and deployed on Vercel.

- **Owner:** Hanan (hananqazi21@gmail.com)
- **Location:** `B:\Portfolio\`
- **Live URL:** `hanan-portfolio-xi.vercel.app`
- **Status:** Active / deployed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Directory Structure

```
B:\Portfolio\
├── src/
│   ├── app/           ← Next.js App Router pages
│   ├── components/    ← UI components
│   └── lib/
│       └── projects.ts  ← All project data lives here
├── public/
├── next.config.ts
└── package.json
```

**Key file:** `src/lib/projects.ts` — add/edit projects here, it drives all project cards on the site.

---

## How to Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploy is automatic via Vercel on push to main.

---

## Obsidian Vault Note

`B:\Obsidian Vault\Projects\Portfolio.md`

---

## Recent Changes

- **2026-06-17** — Added 2 new projects to `src/lib/projects.ts`: NaniStack (project-7) and Autoholic Invoicing + Website (project-8). Placed between the Booth Multiplier and Travel App entries.

---

## Current State / Notes

- 9 total projects in `projects.ts` (IDs project-0 through project-8; display order does not follow ID order)
- NaniStack has no live URL (local Pi-hosted); github: `https://github.com/HananProjects/NaniStack`
- Autoholic github and live URLs are `"#"` — update when available
