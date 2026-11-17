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

- **2026-11-16** — **Hero portrait swapped to Hanan's stylised 3D avatar** (branch `feature/3d-avatar`, not merged yet). New `public/avatar.webp` (864x1152, transparent background): Hanan supplied a 1152x1536 render on a flat grey backdrop; the backdrop was cut out with a numpy/scipy script (mid-grey low-chroma pixels connected to the image border = background, then a median filter smooths the shoulder line below the neck). `pip install rembg` was blocked by the permission classifier, which is why it's hand-rolled. `PROFILE.portrait` now points at `/avatar.webp`; Hero `<img>` width/height set to 864x1152. `.portrait-mask` no longer needs the radial/top fade (that existed to hide the old photo's backdrop and would now fade the hair); it's a bottom fade plus a 14% side fade so the cut-off shoulders melt into the page. `public/profile.jpg` kept: `layout.tsx` still uses it as the OpenGraph image (a transparent PNG/webp makes a poor share card). Verified: `tsc`, `next build`, and Edge screenshots of the production build at 1440px and 390px with no console errors. Gotcha: Playwright's bundled Chromium isn't installed on this PC; use `chromium.launch(channel="msedge")`. Also stop any old `next start` before rebuilding or it serves 500s.
- **2026-11-13 (deployed)** — **Swapped `public/resume.pdf` to `HHR_Nov2026.pdf`** from `A:\Job Applieresume\` (MD5 `9ac30c32…` verified; it already uses hanan@hananhussain.com and has no Keytrus) and **merged `feature/premium-redesign` to `main` (merge 7fe3dc3), pushed, live on Vercel**. Verified live: new homepage, resume MD5 matches, `/projects/keytrus` 404, screenshots under `/work/` serve. Gotcha: `git fetch` fails with `bad object refs/heads/feature/keyhold-cofounder` (a local ref left broken by the old Google Drive corruption); worked around it by comparing `git ls-remote origin refs/heads/main` with local `main` (identical) and running git with `-c gc.auto=0 -c maintenance.auto=false`. The broken ref is still there; deleting it needs Hanan's OK.
- **2026-11-13 (later)** — **Removed Keytrus at Hanan's request and changed the contact email to `hanan@hananhussain.com`** (same branch `feature/premium-redesign`). Keytrus is gone from `projects.ts`, `FEATURED` (homepage now shows four stacking cards; copy says "Four builds"), every `TECH_STACK` list (Supabase is now a non-filterable skill chip), and the About badges (replaced with "Specialty / AI Voice Agents"). The "Web Apps & Platforms" service line no longer mentions multi-tenant RLS SaaS, since that described Keytrus. `/projects/keytrus` now 404s. **Do not re-add Keytrus without asking.** `PROFILE.email` in `site.ts` is the single place the email lives. Hanan will supply a background-removed portrait later; `PROFILE.portrait` points at `/profile.jpg` with a CSS mask until then. The resume PDF was not checked or changed.
- **2026-11-13** — Full premium redesign (branch `feature/premium-redesign`, merged and deployed later the same day). Replaced the IDE/file-tree layout with a dark editorial single page modelled on a template Hanan supplied: #0C0C0C, Kanit 300-900, steel gradient `.hero-heading` text. Sections in order: Hero (giant "HI, I'M HANAN", nav About/Work/Resume/Contact, portrait in a `Magnet` with a CSS mask fading the photo backdrop, gradient Contact pill), scroll-driven two-row Marquee (screenshots + ASL photos / tech words), About (character-by-character scroll reveal + four floating badge cards: Munova, Keytrus, USask 2026, Saskatoon), white rounded "What I build" services list, "Projects" sticky stacking cards (5 `FEATURED` entries, scale down as you scroll), "All projects" archive with the tech filter chips (multi-select OR, same semantics as the old TECH_STACK filter), and a Contact/footer section. Detail pages and 404 restyled to match. The template's own "Jack" assets (Figma renders, motionsites.ai GIFs, CloudFront images) were deliberately NOT used — they're someone else's; visuals are Hanan's own: screenshots of his live sites taken 2026-11-13 with Playwright (`public/work/*.webp`) and the ASL capstone photos. Deleted `src/components/FileTree.tsx`; `TECH_STACK` moved from `page.tsx` to `src/lib/stack.ts` (simpleicons logos dropped). Added deps `lucide-react`, `lenis`. Gotcha found: in Tailwind v4 an unlayered `* { margin:0; padding:0 }` reset overrides every spacing utility, so the reset must live in `@layer base`. Verified with `tsc`, `eslint`, `next build`, and Playwright screenshots of the production build at 1440px and 390px (no console errors, no horizontal overflow). **Found:** `key-trus.vercel.app` was serving Vercel's `503 DEPLOYMENT_PAUSED` page; Hanan chose to remove Keytrus (see entry above).

- **2026-10-08 (later)** — Removed QaziFleet (personal family project, Hanan did not want it shown) and fixed Munova's description: it is NOT a "software design business"; its own site calls it Munova Solutions, a Saskatoon company building custom software and AI (web apps, internal tools, AI phone agents, automation). Added an optional `logo` field to the `Project` type; when set, `projects/[slug]/page.tsx` shows it in a panel at the top of the overview. Munova uses `public/projects/munova/logo.png` (copied from `A:\Munova\publicrand\munova-logo-sage-coral.png`). Branch `chore/remove-qazifleet-munova-copy`. `tsc` and `npm run build` clean; logo not yet eyeballed in a browser.
- **2026-10-08** — Full portfolio refresh after a month of unrecorded work (branch `chore/update-portfolio-oct-2026`, `tsc` and `npm run build` clean). **Added** three projects at the top of `projects.ts`: Munova (project-15, the software design business and its site, live `https://munovasolutions.ca`, repo private so `github` is `"#"`), QaziFleet (project-17, family vehicle tracker on the Pi, LAN-only so no live link), Evergreen Essence (project-16, client site, live `https://www.evergreenessence.ca`). **Rewrote** three stale entries: Motion Fitness AI Caller (added outbound trial-pass agent, hardening, vendor cost tracking, multi-client refactor marked in progress; only features merged to `main` are claimed, the sales-agent Phase 4 work is on an unmerged branch so it is NOT mentioned), NaniStack (was still `6 agents on local Ollama, no API costs`; now Claude API split, Business Cluster, 3D HUD, voice dispatch, MCP), and KawaKraft (was described as a motorcycle-parts store with JWT, cart and checkout, none of which exist: the Django backend is a scaffold with no models or views and the live site is a frontend brand site; now describes the leather goods brand site at `https://kawakraft.ca` plus the private KawaKraft Invoicing app). `page.tsx`: hero terminal gained `founder: Munova` and a Munova paragraph; `TECH_STACK` slug associations updated for all new/changed projects, added Flask, Framer Motion, AWS Lightsail, LiveKit Agents and MCP chips, and removed KawaKraft from GitHub Actions (no workflow exists). **Deliberately not added:** SMB Technology (unsigned pitch work, per its own CLAUDE.md), Samson Medical Clinic (unsigned prospect, confidential, no code), Golden Hour Hunt (personal gift), ScratchMap (personal toy, no repo), Chardon (stalled since June), Verified Auto (fork of Autoholic Invoicing, already mentioned there), Job Applier/ResumeTailor (personal tooling). Left the `hanan.hussain@usask.ca` contact email alone, flagged to Hanan as possibly stale now that `hanan@munovasolutions.ca` exists.
- **2026-09-08** — Swapped the downloadable resume (`public/resume.pdf`) for `HHR_Sept2026.pdf` from `A:\Job Applier\resume\` (MD5-verified match, 182249 bytes). The working tree had a stale, uncommitted, different resume.pdf sitting there from an earlier session (never matched what was committed either) — replaced it outright rather than layering another swap on top. Branch `chore/update-resume-sept2026`, merged to `main`, pushed — Vercel auto-deploys. Left the pre-existing unrelated uncommitted deletion of `public/Hanan_Hussain_Resume_May2026.pdf` untouched, not part of this request.
- **2026-09-08** — Added two Motion Fitness client projects to `projects.ts` (project-13 Motion Fitness AI Caller, project-14 Motion Fitness Accounting Dashboard), inserted right after LOBEngine. AI Caller (`github`/`live` both `"#"` — self-hosted client-owned code, not a public repo, no public demo of live phone infra) covers the self-hosted AI phone receptionist (LiveKit Agents, Deepgram, Claude Haiku, Cartesia, Telnyx, deployed on AWS Lightsail). Accounting Dashboard (`github` → real repo `HananProjects/MFAccountingSoftware`) covers the separate bank-statement-parsing/bookkeeping tool for the same client. Did not add a third entry for Motion Fitness Task Board since it was superseded and merged into the AI Caller's dashboard in an earlier session — no standalone deliverable left to show. Branch `feature/motion-fitness-portfolio-entries`, `tsc --noEmit` clean, left uncommitted for review before merging to `main` (left two pre-existing unrelated uncommitted resume file changes in the working tree untouched, not part of this request).
- **2026-08-12** — Fixed outdated "student" status in the hero bio and page metadata (branch `fix/graduate-status-text`, merged to `main`, pushed). `src/app/layout.tsx`'s title/OG/Twitter `description` fields and `src/app/page.tsx`'s hero prose both still said "Computer Engineering student at USask... graduating June 2026" — Hanan graduated in June 2026 and has been working full-time since (Keytrus, Motion Fitness, Autoholic), so this was stale. Changed to "Computer Engineering graduate (USask)" / "graduate of the University of Saskatchewan (June 2026)". Caught mid-conversation while updating Motion Fitness's resume bullets — also prompted adding step 5 to the Universal Mandatory Update Protocol in the A:\ master `CLAUDE.md`: any resume-worthy project/milestone or status change (graduation, new role, etc.) should trigger a portfolio check. Also fixed real local git corruption found in the process: Google Drive sync had duplicated several `.git/objects/*` paths with `" (1)"` suffixes, which left `refs/heads/main`'s HEAD commit object unreadable (`bad object HEAD`, `git status`/`git log` failing entirely) — `git fetch origin` re-pulled the missing object from GitHub cleanly, then the redundant `" (1)"` duplicate files/dirs (confirmed byte-identical to their correctly-named counterparts) were deleted; `git fsck --full` clean afterward. Note for next session: this working tree's line endings are CRLF while git history is LF (no `.gitattributes`, no `core.autocrlf` set) — every file in the repo shows as modified in `git status` as a result. Only normalized the two files touched here (`perl -pi -e 's/\r\n/\n/g'`) to keep the diff to the actual content change (7 lines) rather than a whole-file rewrite; the rest of the pre-existing CRLF drift (and the several other pre-existing uncommitted files — `ui-ux-pro-max` data/scripts, `public/resume.pdf`, deleted `Hanan_Hussain_Resume_May2026.pdf`, `icon.svg`, `not-found.tsx`, `projects/[slug]/page.tsx`, `FileTree.tsx`, `projects.ts`) was left untouched, not part of this request.
- **2026-08-06** — Swapped the downloadable resume (`public/resume.pdf`, branch `chore/update-resume-august-2026`) for Hanan's latest master resume, `HHR_August2026.pdf` from `A:\Job Applier\resume\` (his ResumeTailor v2 project's master copy, newer than the previous 134006-byte file from 2026-08-04). Copied it in once (180114 bytes), then Hanan updated the master file again himself and dropped the new copy straight into `public/resume.pdf` outside this session; caught it as an unstaged diff on the still-unmerged branch and re-committed the final version (180002 bytes, MD5-verified identical to the current `A:\Job Applier\resume\HHR_August2026.pdf`) via `git commit --amend`, since the prior commit hadn't been merged or pushed yet. Straight file swap, no code changes; the site already serves whatever's at `public/resume.pdf` under a stable filename so no other file needed touching.
- **2026-08-06** — Added LOBEngine (project-12, top of the array — newest) to `projects.ts`: C++20 low-latency limit order book/matching engine, `github` → real repo `HananProjects/LOBEngine` (pushed 2026-08-05), `live` stays `"#"` (no deployable demo for a systems project). Separately, overhauled `page.tsx`'s `TECH_STACK` (branch `feature/lobengine-tech-stack-filter`) — it had drifted badly from `projects.ts` (missing TypeScript, Go, Docker, Terraform, Azure, Claude API, and ~15 others actually used across projects) and was a dead-end list of external links with no connection to project data. Rebuilt it with a `projects: string[]` field per tech (slugs into `PROJECTS`) and turned the whole section interactive: clicking a tech chip (or several) filters `ProjectsSection` to the projects that use it, OR-combined, with a "showing N of M · filtered by ... clear" bar. Chips with no associated featured project (e.g. Java, MATLAB, Bash, Git — real skills, just not tied to a specific project here) render dimmed/non-interactive rather than filtering to nothing. Project cards stay mounted and are hidden via a CSS class (not unmounted) so the sidebar's IntersectionObserver-based active-file tracking and scroll-to-project don't break when a filter is toggled; clicking a project in the sidebar while filtered clears the filter first so the target is actually visible before scrolling. Verified visually with a scripted Puppeteer pass (chip filtering, count math, LOBEngine's detail page) — see `chrome-devtools` skill — not just `tsc`. `node_modules/.bin/tsc --noEmit` (via full `npm run build`) clean. Merged to `main` and pushed at Hanan's request — Vercel auto-deploys. Left the pre-existing unrelated uncommitted stuff in the working tree alone (the stale Keyhold-era `Current State/Notes` below got corrected as part of this pass since it was directly adjacent and factually wrong, not because it was in scope).
- **2026-08-04** — Updated the downloadable resume PDF (`public/resume.pdf`, branch `chore/update-resume-pdf`, merged to `main`, pushed). Hanan had already replaced the file's contents in the working tree (172568 → 134006 bytes) outside this session; this just committed and deployed it — it was sitting uncommitted since. Note: an unrelated pre-existing uncommitted deletion of `public/Hanan_Hussain_Resume_May2026.pdf` is still sitting in the working tree — left alone, not part of this change.
- **2026-08-04** — Removed the live demo link just added to Autoholic Invoicing (branch `fix/remove-autoholic-invoicing-live-link`, merged to `main`, pushed) — Hanan flagged it as private business data (real client/financial records behind the login) that shouldn't be publicly linked from the portfolio, even though the app itself is login-gated. `live` reverted to `"#"`; `github` field untouched. Autoholic Website's live link (public marketing site, no sensitive data) is unaffected.
- **2026-08-04** — Fixed sidebar filenames that didn't relate to their project, and added missing live demo links (branch `fix/project-filenames-and-live-links`, merged to `main`, pushed). Renamed `filename` fields so every one is now recognizable from the project name: `rls.sql` → `keyhold.sql`, `scoring.go` → `fraudguard.go`, `server.js` → `nanistack.js`, `review_pipeline.py` → `ai-code-review-pipeline.py`, `invoices.ts` → `autoholic-invoicing.ts`. Also split the old conflated "Autoholic Invoicing + Website" entry (project-8) into two accurate projects — the description/highlights had only ever covered the invoicing app, so its `live` field pointing at the marketing site would have been misleading. **Autoholic Invoicing** (project-8) keeps the invoicing content, `live` now points at the real Railway production URL (`autoholic-invoicing-production.up.railway.app`, confirmed reachable). New **Autoholic Website** (project-11) covers the actual Three.js/GSAP marketing site, `github` → `HananProjects/Autoholic-Website`, `live` → `https://autoholic-website.vercel.app`. `node node_modules/typescript/bin/tsc --noEmit` clean. Not click-tested live (known `next dev` hang on this Drive-synced path, see gotcha below) — worth a manual click-through next session. Left the same pre-existing unrelated uncommitted changes in the working tree alone (`.claude/skills/ui-ux-pro-max/*`, a few other pages) — not part of this request.
- **2026-08-03** — Added Keyhold (project-10) to `projects.ts` — top of the array, newest-first — after Hanan finished building and deploying it (multi-tenant property management SaaS, Postgres RLS-based tenant isolation, co-founded with a classmate). `github` points at his real private fork (`HananProjects/KeyHold`), `live` at the actual deployed `key-hold.vercel.app`. Also added a co-founder mention to `page.tsx`'s hero (`"cofounder": "Keyhold"` in the fake-terminal intro dict) and the about.md prose block. Worked on branch `feature/keyhold-cofounder`, merged to `main`, pushed — Vercel auto-deploys on push to main. Left several pre-existing unrelated uncommitted changes in the working tree alone (`.claude/skills/ui-ux-pro-max/*` data files, a few other pages) rather than bundling them into this commit — they were already there before this request and weren't part of it.
- **2026-07-18** — FraudGuard's GitHub repo now exists (`github.com/HananProjects/FraudGuard`, private) — pushed `main` plus both local feature branches (`feature/phase-1-mvp`, `feature/phase-2-realtime`) from `A:\FraudGuard\`, then updated its `github` field in `projects.ts` off `"#"` so the portfolio card shows a real button.
- **2026-07-18** — Fixed FraudGuard: it was committed to `projects.ts` on a branch that never got merged to `main`/pushed, so it was never actually live — merged and pushed. Then fixed the deeper bug: `page.tsx`'s sidebar (`TREE`), filename map (`ID_TO_FILENAME`), and scroll IDs (`SECTION_IDS`) were a second, hand-maintained project list that never got FraudGuard added, so it was missing from the sidebar even once live. Refactored all three to derive from the `PROJECTS` array instead of duplicating it — see "Adding a New Project" above. Also reordered `PROJECTS` to newest-first (FraudGuard now first) and fixed Autoholic Invoicing's `github` field to point to its real (private) repo. `node_modules/.bin/tsc --noEmit` confirmed clean.
- **2026-06-17** — Added 2 new projects to `src/lib/projects.ts`: NaniStack (project-7) and Autoholic Invoicing + Website (project-8). Placed between the Booth Multiplier and Travel App entries.

---

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
