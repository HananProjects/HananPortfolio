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

## Adding a New Project — Required Steps

> **Every time a project is added to `src/lib/projects.ts`, do all of the following. Skipping any of these is what caused the FraudGuard bug on 2026-07-18 (added to the data file but invisible on the live site for a week).**

1. **Order newest-first.** Insert the new project object at the **top** of the `PROJECTS` array (right after the `export const PROJECTS: Project[] = [` line) — not appended at the bottom, not inserted alphabetically. The array order *is* the display order, top of the array = top of the page. If a project isn't actually the newest (e.g. backfilling an old one), insert it in the correct chronological slot instead of always at index 0.
2. **Do not hand-maintain the sidebar separately.** `src/app/page.tsx` derives its file-tree sidebar, `ID_TO_FILENAME` map, and scroll-tracking `SECTION_IDS` directly from the `PROJECTS` array (`TREE`, around line 103). As long as you only edit `projects.ts`, the sidebar updates itself — do not reintroduce a second hardcoded project list in `page.tsx`.
3. **Give it a real `github` field if a repo exists**, or leave it `"#"` (hides the button) if it genuinely doesn't — never fabricate a URL.
4. **Run `node_modules/.bin/tsc --noEmit`** before considering it done (see the node_modules executable-bit gotcha below).
5. Follow the rest of this file's Mandatory Update Protocol (this file, the vault page, the log).

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

- **2026-07-18** — Fixed FraudGuard: it was committed to `projects.ts` on a branch that never got merged to `main`/pushed, so it was never actually live — merged and pushed. Then fixed the deeper bug: `page.tsx`'s sidebar (`TREE`), filename map (`ID_TO_FILENAME`), and scroll IDs (`SECTION_IDS`) were a second, hand-maintained project list that never got FraudGuard added, so it was missing from the sidebar even once live. Refactored all three to derive from the `PROJECTS` array instead of duplicating it — see "Adding a New Project" above. Also reordered `PROJECTS` to newest-first (FraudGuard now first) and fixed Autoholic Invoicing's `github` field to point to its real (private) repo. `node_modules/.bin/tsc --noEmit` confirmed clean.
- **2026-06-17** — Added 2 new projects to `src/lib/projects.ts`: NaniStack (project-7) and Autoholic Invoicing + Website (project-8). Placed between the Booth Multiplier and Travel App entries.

---

## Current State / Notes

- 10 total projects in `projects.ts`, displayed in array order (newest first): FraudGuard, NaniStack, Autoholic Invoicing, AI Code Review Pipeline, Horus, ASL Translator, KawaKraft, Microprocessor, Booth Multiplier, Travel App.
- NaniStack has no live URL (local Pi-hosted); github: `https://github.com/HananProjects/NaniStack`
- Autoholic github: `https://github.com/HananProjects/Autoholic-Invoicing` (private repo); live is still `"#"`
- FraudGuard github and live URLs are `"#"` — no GitHub repo exists for it yet (no remote configured locally). Update once it's created and pushed.
- Microprocessor, Booth Multiplier, and Travel App are older academic projects with no git repo anywhere — their `github` field stays `"#"` until/unless one is created.
- **Known environment gotcha:** this repo's `node_modules` (and any other project's, on this Google Drive-synced B:\ drive) can lose the executable bit on `.bin/*` shims when installed elsewhere and re-accessed from this Mac — `next`/`tsc` will report "command not found" despite existing. Fix: `chmod +x node_modules/.bin/*` once per session, or invoke via `node_modules/.bin/<tool>` directly.
- **Known environment gotcha:** on this machine, `next dev` run through the agent's background-task runner hangs silently (no stdout, no port bound) when the project lives on the Google Drive-synced path — likely FUSE mount + file-watching or sandboxed-network interaction. Verify changes via `tsc --noEmit` and direct code reading instead; if you need a real visual check, run `next dev` yourself in a normal terminal.
