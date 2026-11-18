# Portfolio — CLAUDE.md

## Mandatory Update Protocol

> **After every request, always:**
> 1. Update this `CLAUDE.md` with any new context, changes made, decisions taken, or current project state.
> 2. Update the Obsidian vault note at `A:\Obsidian Vault\Projects\Portfolio.md` to reflect the latest state.
> 3. Update the interview note at `A:\Obsidian Vault\Interviews\Portfolio.md` (see Interview Note Template in the global CLAUDE.md) if this request changed the tech stack, architecture, features, challenges solved, or anything else worth mentioning in an interview. Skip only if the change is truly interview-irrelevant (e.g. typo fix, formatting).
> 4. Append an entry to `A:\Obsidian Vault\log.md` using format: `## [YYYY-MM-DD] project | Portfolio — description`

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
- **Location:** `A:\Portfolio\`
- **Live URL:** `hanan-portfolio-xi.vercel.app`
- **Status:** Active / deployed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, Kanit (next/font) |
| Motion | Framer Motion, Lenis smooth scroll |
| Icons | lucide-react (brand icons are inline SVGs; lucide 1.x has none) |
| Deployment | Vercel |

---

## Directory Structure

```
A:\Portfolio\
├── src/
│   ├── app/                 ← page.tsx (composes sections), projects/[slug], not-found, layout
│   ├── components/
│   │   ├── sections/        ← Hero, Marquee, About, Services, Work, Archive, Contact
│   │   └── ui/              ← FadeIn, Magnet, AnimatedText, Buttons, SmoothScroll
│   └── lib/
│       ├── projects.ts      ← All project data (drives archive + detail pages)
│       ├── site.ts          ← Profile/contact, homepage copy, marquee images, FEATURED cards
│       └── stack.ts         ← TECH_STACK with per-tech project slugs (archive filter chips)
├── public/work/             ← Screenshots of live client sites (marquee + featured cards)
├── public/
├── next.config.ts
└── package.json
```

**Key file:** `src/lib/projects.ts` — add/edit projects here; it drives the "All projects" archive and every `/projects/[slug]` page. The five sticky "Projects" cards on the homepage are a separate curated list, `FEATURED` in `src/lib/site.ts` (slug + category + three tiles); each `slug` must exist in `PROJECTS`, and stat/flow tile text must only restate facts already in that project's entry.

---

## Adding a New Project — Required Steps

> **Every time a project is added to `src/lib/projects.ts`, do all of the following. Skipping any of these is what caused the FraudGuard bug on 2026-07-18 (added to the data file but invisible on the live site for a week).**

1. **Order newest-first.** Insert the new project object at the **top** of the `PROJECTS` array (right after the `export const PROJECTS: Project[] = [` line) — not appended at the bottom, not inserted alphabetically. The array order *is* the display order, top of the array = top of the page. If a project isn't actually the newest (e.g. backfilling an old one), insert it in the correct chronological slot instead of always at index 0.
2. **Do not hand-maintain a second project list.** The archive (`src/components/sections/Archive.tsx`) and the detail pages read `PROJECTS` directly. Only `FEATURED` in `site.ts` is curated by hand, and only if the new project should be one of the five homepage cards. Check `src/lib/stack.ts` too: add the project's slug to every `TECH_STACK` entry it actually uses, and add missing technologies.
3. **Give it a real `github` field if a repo exists**, or leave it `"#"` (hides the button) if it genuinely doesn't — never fabricate a URL. Same rule for `live`: only a real, reachable URL, or `"#"`.
4. **`filename` must be recognizable as the project.** (Since the 2026-11-13 redesign it is no longer rendered anywhere, but keep it sensible in case a code-style view returns.) It used to render as the sidebar/file-tree name, so it must let a reader tell which project it is at a glance — either the slug itself with a language extension (`kawakraft.tsx`, `horus.py`) or a term that visibly shares a word with the project name (`autoholic-invoicing.ts`). Don't use a purely thematic filename with no textual link to the name (this is what caused `rls.sql` for Keyhold and `invoices.ts`/`scoring.go`/`server.js` for others — fixed 2026-08-04).
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

`A:\Obsidian Vault\Projects\Portfolio.md`

---

## Interview Note

`A:\Obsidian Vault\Interviews\Portfolio.md`

---

## Recent Changes

- **2026-11-17** — **Hero portrait made static, AI copy made provider-neutral, location widened** (branch `chore/hero-copy-location`, merged to `main` as 9a094e0, pushed). Removed the `<Magnet>` wrapper from the Hero portrait (Hanan didn't want it following the cursor; `components/ui/Magnet.tsx` is now unused). "AI Agents & Voice" service copy no longer names Claude ("built on hosted and local LLMs with real-time speech pipelines"), so the portfolio doesn't read as Claude-only. `PROFILE.location` → "Saskatchewan & Alberta, Canada", About badge → "Working across / SK & AB, Canada", layout meta description → "across Saskatchewan and Alberta". Gotcha: git refused to run here ("dubious ownership", folder owned by an old SID); fixed with `git config --global --add safe.directory A:/Portfolio`.
- **2026-11-16** — **Hero portrait swapped to Hanan's stylised 3D avatar** (branch `feature/3d-avatar`, merged to `main` as e97aa79, pushed, verified live). New `public/avatar.webp` (864x1152, transparent background): Hanan supplied a 1152x1536 render on a flat grey backdrop; the backdrop was cut out with a numpy/scipy script (mid-grey low-chroma pixels connected to the image border = background, then a median filter smooths the shoulder line below the neck). `pip install rembg` was blocked by the permission classifier, which is why it's hand-rolled. `PROFILE.portrait` now points at `/avatar.webp`; Hero `<img>` width/height set to 864x1152. `.portrait-mask` no longer needs the radial/top fade (that existed to hide the old photo's backdrop and would now fade the hair); it's a bottom fade plus a 14% side fade so the cut-off shoulders melt into the page. `public/profile.jpg` kept: `layout.tsx` still uses it as the OpenGraph image (a transparent PNG/webp makes a poor share card). Verified: `tsc`, `next build`, and Edge screenshots of the production build at 1440px and 390px with no console errors. Gotcha: Playwright's bundled Chromium isn't installed on this PC; use `chromium.launch(channel="msedge")`. Also stop any old `next start` before rebuilding or it serves 500s.
- **2026-11-13 (deployed)** — **Swapped `public/resume.pdf` to `HHR_Nov2026.pdf`** from `A:\Job Applieresume\` (MD5 `9ac30c32…` verified; it already uses hanan@hananhussain.com and has no Keytrus) and **merged `feature/premium-redesign` to `main` (merge 7fe3dc3), pushed, live on Vercel**. Verified live: new homepage, resume MD5 matches, `/projects/keytrus` 404, screenshots under `/work/` serve. Gotcha: `git fetch` fails with `bad object refs/heads/feature/keyhold-cofounder` (a local ref left broken by the old Google Drive corruption); worked around it by comparing `git ls-remote origin refs/heads/main` with local `main` (identical) and running git with `-c gc.auto=0 -c maintenance.auto=false`. The broken ref is still there; deleting it needs Hanan's OK.
- **2026-11-13 (later)** — **Removed Keytrus at Hanan's request and changed the contact email to `hanan@hananhussain.com`** (same branch `feature/premium-redesign`). Keytrus is gone from `projects.ts`, `FEATURED` (homepage now shows four stacking cards; copy says "Four builds"), every `TECH_STACK` list (Supabase is now a non-filterable skill chip), and the About badges (replaced with "Specialty / AI Voice Agents"). The "Web Apps & Platforms" service line no longer mentions multi-tenant RLS SaaS, since that described Keytrus. `/projects/keytrus` now 404s. **Do not re-add Keytrus without asking.** `PROFILE.email` in `site.ts` is the single place the email lives. Hanan will supply a background-removed portrait later; `PROFILE.portrait` points at `/profile.jpg` with a CSS mask until then. The resume PDF was not checked or changed.

_Older entries: see `docs/HISTORY.md` → "Older Recent Changes"._

## Current State / Notes

- 16 total projects in `projects.ts` since Keytrus was removed 2026-11-13 (the list that follows is from before that, ignore Keytrus in it); originally 17, displayed in array order (newest first): Munova, Evergreen Essence, LOBEngine, Motion Fitness AI Caller, Motion Fitness Accounting Dashboard, Keytrus, FraudGuard, NaniStack, Autoholic Invoicing, Autoholic Website, AI Code Review Pipeline, Horus, ASL Translator, KawaKraft, Microprocessor, Booth Multiplier, Travel App. (Keyhold was renamed to Keytrus after the note below was originally written — `github` → `HananProjects/Keytrus`, `live` → `https://key-trus.vercel.app`; see git log, not this file, for the rename commits.)
- Motion Fitness AI Caller (project-13, added 2026-09-08): `github`/`live` both `"#"` deliberately — self-hosted, client-owned production code answering a real phone line, not a public repo or a link that's safe to expose. Motion Fitness Accounting Dashboard (project-14, added 2026-09-08): `github` → real repo `https://github.com/HananProjects/MFAccountingSoftware`; `live` stays `"#"` (local-only Flask/SQLite tool, nothing deployed). Branch `feature/motion-fitness-portfolio-entries` not yet merged to `main` — pending Hanan's review.
- LOBEngine (project-12, added 2026-08-06): github `https://github.com/HananProjects/LOBEngine` (real, pushed 2026-08-05); `live` is `"#"` — it's a CLI/systems project (C++ order book + matching engine), nothing to deploy.
- `src/lib/stack.ts`'s `TECH_STACK` (moved out of `page.tsx` on 2026-11-13) is a separate hand-maintained array from `projects.ts` — it is **not** derived automatically. Each entry has a `projects: string[]` field (slugs into `PROJECTS`) that must be kept honest: only list a project there if its `tech` array in `projects.ts` actually names that technology (or an unambiguous grouping of it, e.g. "Azure" grouping FraudGuard's various `Azure *` entries). When adding a new project to `projects.ts`, also check whether any of its `tech` entries are missing from `TECH_STACK` and add them (with correct `projects` associations) — this is what caused the stack to silently drift out of date before 2026-08-06.
- NaniStack has no live URL (local Pi-hosted at `172.16.1.83:3000`, not publicly reachable); github: `https://github.com/HananProjects/NaniStack`
- Autoholic Invoicing github: `https://github.com/HananProjects/Autoholic-Invoicing` (private repo); live is `"#"` again — briefly set to the real Railway URL on 2026-08-04, then removed same day at Hanan's request since it's a real business's private client/financial data behind the login and shouldn't be publicly linked from the portfolio, even login-gated. **Do not re-add a live link for this project without checking first.**
- Autoholic Website (project-11, added 2026-08-04): github `https://github.com/HananProjects/Autoholic-Website`; live `https://autoholic-website.vercel.app` — separate entry from Autoholic Invoicing since they're different repos/deploys (was wrongly conflated into one "Autoholic Invoicing + Website" entry before)
- FraudGuard github: `https://github.com/HananProjects/FraudGuard` (private); live is still `"#"` — no live Azure environment applied yet
- Microprocessor, Booth Multiplier, and Travel App are older academic projects with no git repo anywhere — their `github` field stays `"#"` until/unless one is created.
- **Known environment gotcha:** this repo's `node_modules` (and any other project's, on this Google Drive-synced A:\ drive) can lose the executable bit on `.bin/*` shims when installed elsewhere and re-accessed from this Mac — `next`/`tsc` will report "command not found" despite existing. Fix: `chmod +x node_modules/.bin/*` once per session, or invoke via `node_modules/.bin/<tool>` directly.
- **Known environment gotcha:** on this machine, `next dev` run through the agent's background-task runner hangs silently (no stdout, no port bound) when the project lives on the Google Drive-synced path — likely FUSE mount + file-watching or sandboxed-network interaction. Verify changes via `tsc --noEmit` and direct code reading instead; if you need a real visual check, run `next dev` yourself in a normal terminal.

## History and detailed write-ups (read on demand)

To keep this file small, past feature write-ups and older change entries live in `docs/HISTORY.md`, copied word for word. Grep or read that file when a task touches one of these:

- Older Recent Changes
