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
3. **Give it a real `github` field if a repo exists**, or leave it `"#"` (hides the button) if it genuinely doesn't — never fabricate a URL. Same rule for `live`: only a real, reachable URL, or `"#"`.
4. **`filename` must be recognizable as the project.** It renders as the sidebar/file-tree name and the window-chrome title (`page.tsx`'s `TREE`/`ID_TO_FILENAME`), so it must let a reader tell which project it is at a glance — either the slug itself with a language extension (`kawakraft.tsx`, `horus.py`) or a term that visibly shares a word with the project name (`autoholic-invoicing.ts`). Don't use a purely thematic filename with no textual link to the name (this is what caused `rls.sql` for Keyhold and `invoices.ts`/`scoring.go`/`server.js` for others — fixed 2026-08-04).
5. **If a project bundles two genuinely separate deployed things** (e.g. a backend tool + a public marketing site, different repos/URLs), give them separate entries rather than cramming two `live`/`github` targets into one — the description/highlights should always match what the `live` link actually shows.
6. **Run `node_modules/.bin/tsc --noEmit`** before considering it done (see the node_modules executable-bit gotcha below).
7. Follow the rest of this file's Mandatory Update Protocol (this file, the vault page, the log).

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

- **2026-08-06** — Swapped the downloadable resume (`public/resume.pdf`, branch `chore/update-resume-august-2026`) for Hanan's latest master resume, `HHR_August2026.pdf` from `B:\Job Applier\resume\` (his ResumeTailor v2 project's master copy, newer than the previous 134006-byte file from 2026-08-04). Copied it in once (180114 bytes), then Hanan updated the master file again himself and dropped the new copy straight into `public/resume.pdf` outside this session; caught it as an unstaged diff on the still-unmerged branch and re-committed the final version (180002 bytes, MD5-verified identical to the current `B:\Job Applier\resume\HHR_August2026.pdf`) via `git commit --amend`, since the prior commit hadn't been merged or pushed yet. Straight file swap, no code changes; the site already serves whatever's at `public/resume.pdf` under a stable filename so no other file needed touching.
- **2026-08-06** — Added LOBEngine (project-12, top of the array — newest) to `projects.ts`: C++20 low-latency limit order book/matching engine, `github` → real repo `HananProjects/LOBEngine` (pushed 2026-08-05), `live` stays `"#"` (no deployable demo for a systems project). Separately, overhauled `page.tsx`'s `TECH_STACK` (branch `feature/lobengine-tech-stack-filter`) — it had drifted badly from `projects.ts` (missing TypeScript, Go, Docker, Terraform, Azure, Claude API, and ~15 others actually used across projects) and was a dead-end list of external links with no connection to project data. Rebuilt it with a `projects: string[]` field per tech (slugs into `PROJECTS`) and turned the whole section interactive: clicking a tech chip (or several) filters `ProjectsSection` to the projects that use it, OR-combined, with a "showing N of M · filtered by ... clear" bar. Chips with no associated featured project (e.g. Java, MATLAB, Bash, Git — real skills, just not tied to a specific project here) render dimmed/non-interactive rather than filtering to nothing. Project cards stay mounted and are hidden via a CSS class (not unmounted) so the sidebar's IntersectionObserver-based active-file tracking and scroll-to-project don't break when a filter is toggled; clicking a project in the sidebar while filtered clears the filter first so the target is actually visible before scrolling. Verified visually with a scripted Puppeteer pass (chip filtering, count math, LOBEngine's detail page) — see `chrome-devtools` skill — not just `tsc`. `node_modules/.bin/tsc --noEmit` (via full `npm run build`) clean. Merged to `main` and pushed at Hanan's request — Vercel auto-deploys. Left the pre-existing unrelated uncommitted stuff in the working tree alone (the stale Keyhold-era `Current State/Notes` below got corrected as part of this pass since it was directly adjacent and factually wrong, not because it was in scope).
- **2026-08-04** — Updated the downloadable resume PDF (`public/resume.pdf`, branch `chore/update-resume-pdf`, merged to `main`, pushed). Hanan had already replaced the file's contents in the working tree (172568 → 134006 bytes) outside this session; this just committed and deployed it — it was sitting uncommitted since. Note: an unrelated pre-existing uncommitted deletion of `public/Hanan_Hussain_Resume_May2026.pdf` is still sitting in the working tree — left alone, not part of this change.
- **2026-08-04** — Removed the live demo link just added to Autoholic Invoicing (branch `fix/remove-autoholic-invoicing-live-link`, merged to `main`, pushed) — Hanan flagged it as private business data (real client/financial records behind the login) that shouldn't be publicly linked from the portfolio, even though the app itself is login-gated. `live` reverted to `"#"`; `github` field untouched. Autoholic Website's live link (public marketing site, no sensitive data) is unaffected.
- **2026-08-04** — Fixed sidebar filenames that didn't relate to their project, and added missing live demo links (branch `fix/project-filenames-and-live-links`, merged to `main`, pushed). Renamed `filename` fields so every one is now recognizable from the project name: `rls.sql` → `keyhold.sql`, `scoring.go` → `fraudguard.go`, `server.js` → `nanistack.js`, `review_pipeline.py` → `ai-code-review-pipeline.py`, `invoices.ts` → `autoholic-invoicing.ts`. Also split the old conflated "Autoholic Invoicing + Website" entry (project-8) into two accurate projects — the description/highlights had only ever covered the invoicing app, so its `live` field pointing at the marketing site would have been misleading. **Autoholic Invoicing** (project-8) keeps the invoicing content, `live` now points at the real Railway production URL (`autoholic-invoicing-production.up.railway.app`, confirmed reachable). New **Autoholic Website** (project-11) covers the actual Three.js/GSAP marketing site, `github` → `HananProjects/Autoholic-Website`, `live` → `https://autoholic-website.vercel.app`. `node node_modules/typescript/bin/tsc --noEmit` clean. Not click-tested live (known `next dev` hang on this Drive-synced path, see gotcha below) — worth a manual click-through next session. Left the same pre-existing unrelated uncommitted changes in the working tree alone (`.claude/skills/ui-ux-pro-max/*`, a few other pages) — not part of this request.
- **2026-08-03** — Added Keyhold (project-10) to `projects.ts` — top of the array, newest-first — after Hanan finished building and deploying it (multi-tenant property management SaaS, Postgres RLS-based tenant isolation, co-founded with a classmate). `github` points at his real private fork (`HananProjects/KeyHold`), `live` at the actual deployed `key-hold.vercel.app`. Also added a co-founder mention to `page.tsx`'s hero (`"cofounder": "Keyhold"` in the fake-terminal intro dict) and the about.md prose block. Worked on branch `feature/keyhold-cofounder`, merged to `main`, pushed — Vercel auto-deploys on push to main. Left several pre-existing unrelated uncommitted changes in the working tree alone (`.claude/skills/ui-ux-pro-max/*` data files, a few other pages) rather than bundling them into this commit — they were already there before this request and weren't part of it.
- **2026-07-18** — FraudGuard's GitHub repo now exists (`github.com/HananProjects/FraudGuard`, private) — pushed `main` plus both local feature branches (`feature/phase-1-mvp`, `feature/phase-2-realtime`) from `B:\FraudGuard\`, then updated its `github` field in `projects.ts` off `"#"` so the portfolio card shows a real button.
- **2026-07-18** — Fixed FraudGuard: it was committed to `projects.ts` on a branch that never got merged to `main`/pushed, so it was never actually live — merged and pushed. Then fixed the deeper bug: `page.tsx`'s sidebar (`TREE`), filename map (`ID_TO_FILENAME`), and scroll IDs (`SECTION_IDS`) were a second, hand-maintained project list that never got FraudGuard added, so it was missing from the sidebar even once live. Refactored all three to derive from the `PROJECTS` array instead of duplicating it — see "Adding a New Project" above. Also reordered `PROJECTS` to newest-first (FraudGuard now first) and fixed Autoholic Invoicing's `github` field to point to its real (private) repo. `node_modules/.bin/tsc --noEmit` confirmed clean.
- **2026-06-17** — Added 2 new projects to `src/lib/projects.ts`: NaniStack (project-7) and Autoholic Invoicing + Website (project-8). Placed between the Booth Multiplier and Travel App entries.

---

## Current State / Notes

- 13 total projects in `projects.ts`, displayed in array order (newest first): LOBEngine, Keytrus, FraudGuard, NaniStack, Autoholic Invoicing, Autoholic Website, AI Code Review Pipeline, Horus, ASL Translator, KawaKraft, Microprocessor, Booth Multiplier, Travel App. (Keyhold was renamed to Keytrus after the note below was originally written — `github` → `HananProjects/Keytrus`, `live` → `https://key-trus.vercel.app`; see git log, not this file, for the rename commits.)
- LOBEngine (project-12, added 2026-08-06): github `https://github.com/HananProjects/LOBEngine` (real, pushed 2026-08-05); `live` is `"#"` — it's a CLI/systems project (C++ order book + matching engine), nothing to deploy.
- `page.tsx`'s `TECH_STACK` (around line 78) is a separate hand-maintained array from `projects.ts` — it is **not** derived automatically. Each entry has a `projects: string[]` field (slugs into `PROJECTS`) that must be kept honest: only list a project there if its `tech` array in `projects.ts` actually names that technology (or an unambiguous grouping of it, e.g. "Azure" grouping FraudGuard's various `Azure *` entries). When adding a new project to `projects.ts`, also check whether any of its `tech` entries are missing from `TECH_STACK` and add them (with correct `projects` associations) — this is what caused the stack to silently drift out of date before 2026-08-06.
- NaniStack has no live URL (local Pi-hosted at `172.16.1.83:3000`, not publicly reachable); github: `https://github.com/HananProjects/NaniStack`
- Autoholic Invoicing github: `https://github.com/HananProjects/Autoholic-Invoicing` (private repo); live is `"#"` again — briefly set to the real Railway URL on 2026-08-04, then removed same day at Hanan's request since it's a real business's private client/financial data behind the login and shouldn't be publicly linked from the portfolio, even login-gated. **Do not re-add a live link for this project without checking first.**
- Autoholic Website (project-11, added 2026-08-04): github `https://github.com/HananProjects/Autoholic-Website`; live `https://autoholic-website.vercel.app` — separate entry from Autoholic Invoicing since they're different repos/deploys (was wrongly conflated into one "Autoholic Invoicing + Website" entry before)
- FraudGuard github: `https://github.com/HananProjects/FraudGuard` (private); live is still `"#"` — no live Azure environment applied yet
- Microprocessor, Booth Multiplier, and Travel App are older academic projects with no git repo anywhere — their `github` field stays `"#"` until/unless one is created.
- **Known environment gotcha:** this repo's `node_modules` (and any other project's, on this Google Drive-synced B:\ drive) can lose the executable bit on `.bin/*` shims when installed elsewhere and re-accessed from this Mac — `next`/`tsc` will report "command not found" despite existing. Fix: `chmod +x node_modules/.bin/*` once per session, or invoke via `node_modules/.bin/<tool>` directly.
- **Known environment gotcha:** on this machine, `next dev` run through the agent's background-task runner hangs silently (no stdout, no port bound) when the project lives on the Google Drive-synced path — likely FUSE mount + file-watching or sandboxed-network interaction. Verify changes via `tsc --noEmit` and direct code reading instead; if you need a real visual check, run `next dev` yourself in a normal terminal.
