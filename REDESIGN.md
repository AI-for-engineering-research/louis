# REDESIGN — Clarity look + content reorg

Handoff artifact for the site redesign. Captures the agreed plan, the decisions
behind it, and the current implementation status. Work happens on the
`redesign-clarity` branch and merges to `main` only after review.

## Goal

Restyle the existing **React + Vite + TypeScript** site to look like the
[Clarity template](https://shikun.io/projects/clarity) and reorganize it from a
`useState` page-switcher into a real four-route site: a homepage hub, a project
page, the interactive 3D sim, and a research log with **one page per session**.

## Key decisions (from the grill-me session)

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Keep React/Vite; port Clarity's *look*** (not a static rewrite) | Preserves the react-three-fiber 3D sim and the working GitHub Pages deploy. |
| 2 | **Each log entry is a React route** (Model A), styled with Clarity CSS | Consistent styling for free; raw `logs/*.html` transcripts stay as linked artifacts. |
| 3 | **HashRouter / hash URLs** (`…/louis/#/log/<slug>`) | Bulletproof on GitHub Pages — no `404.html` redirect hack. Trade-off accepted: no per-entry link previews. |
| 4 | **APCEMM project dropped** | Placeholder only; no real asset. |
| 5 | **3D sim stays its own page** in the header nav | May fold into the project page later. |
| 6 | **Log entries per session, no week grouping** | Flat list; exact per-session dates instead of week ranges. |
| 7 | **Newest-first index, `date · title` rows** | Scannable, trivial to append to. |
| 8 | **Light theme + sky-blue accent** | Clean academic Clarity look. |
| 9 | **Home hero = Clarity cover** using `sky_contrail_flyer…jpg` | On-theme visual punch without a perf-heavy full-page background. |
| 10 | **Mental-model gallery dropped**; links shown as **cards** | Keep the homepage a lightweight hub. |

## Sitemap / routes

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home (hub) | Clarity hero cover + purpose + bio placeholder + 3 link cards |
| `/project` | Project — *Satellite vs. Synthetic Contrails* | Promoted from the old card→modal |
| `/sim` | Contrail simulation | Existing 3D page, lazy-loaded, kept |
| `/log` | Research Log index | Flat list, newest-first, `date · title` |
| `/log/:slug` | Research Log entry | One per session |

Nav (persistent top bar): **Louis Robion** (logo → Home) · `Home · Project ·
Contrail simulation · Research log`, active route highlighted.

## Design system

- **Theme:** light (Clarity body: white bg, dark text). Sim canvas + raw
  transcripts stay dark internally.
- **Fonts:** Charter (serif body, vendored) + Poppins + Fira Code (Google
  Fonts `@import`, as Clarity ships).
- **Accent:** sky-blue (`--accent`) on nav-active, card hover, buttons,
  artifact links, log rows.
- **Icons:** inline SVG (small set) instead of vendoring the full FontAwesome
  Free webfonts — keeps the bundle lean. Swap in FontAwesome later if a broader
  icon set is needed. *(Deviation from the original plan, flagged here.)*
- **Footer** (every page): copyright + required Clarity attribution linking
  `https://shikun.io/projects/clarity` (CC BY-SA 4.0).

## Content migration (old `Usage.tsx` → 5 entries)

| slug | title | date | model | artifacts |
|------|-------|------|-------|-----------|
| `portfolio-landing-page` | Portfolio Landing Page Setup | 2026-06-10 *(TODO: exact)* | Haiku 4.5 | — |
| `interactive-3d-sim` | Interactive 3D Contrail Simulation | 2026-06-11 *(TODO: exact)* | Opus 4.8 | → `/sim` |
| `crtm-pipeline-fixes` | CRTM Pipeline Fixes (#18/19/21/22) | 2026-06-15 | Opus 4.8 | `crtm-2026-06-15.html` |
| `crtm-architecture-refactor` | Architecture Refactoring for CRTM | 2026-06-18 *(TODO: exact)* | Opus 4.8 | `make_crtm_input_flowchart.html` |
| `crtm-effr-parametrizations` | CRTM #20 + Effective-Radius Parametrizations | 2026-06-22 | Opus 4.8 | `crtm-effr-2026-06-22.html`, `crtm-effr-ash-compare-2026-06-22.html` |

All existing prose/lists preserved verbatim. Bottom "Summary" block dropped.

### Adding a new entry later

1. Add `src/pages/log/entries/<slug>.tsx` exporting `meta` + `Body`.
2. Register it in `src/pages/log/entries/index.ts`.
   The index list and the `/log/:slug` route pick it up automatically (sorted
   newest-first by `meta.date`).

## File map

- **New:** `src/components/{Nav,Footer,LinkCard,ScrollToTop,Icon}.tsx`,
  `src/pages/{Project,ContrailSim}.tsx` (Project new), `src/pages/log/*`,
  `src/styles/{clarity.css,site.css}`, `src/assets/fonts/Charter/*.woff2`.
- **Modified:** `App.tsx` (HashRouter + shell), `Home.tsx` (rewrite),
  `ContrailSim.tsx` (Clarity shell only), `index.html`, `main.tsx`, `index.css`.
- **Deleted:** `ProjectCard.*`, `ProjectModal.*`, `ContrailGallery.*`,
  `Usage.*`, `Home.css`; assets `project1/2-placeholder.svg`,
  `early/medium/old-contrail.jpg`.
- **Unchanged:** `vite.config.ts` (`base:'/louis/'`), GitHub Actions deploy,
  `public/logs/*`, `public/synthetic_images.png`, spare sky photos.

## Placeholders for Louis to fill in

- Homepage **purpose** text (drafted) + **About me** bio.
- Exact **dates** for the 3 entries marked *TODO* above.
- Project page **Overview / Approach / Results** body.
- *(Later)* real-satellite image + Clarity before/after comparison slider.

## Build order

1. Branch + `react-router-dom`.
2. Vendor Clarity CSS/fonts; base styles.
3. `App.tsx` → HashRouter + Nav + Footer shell.
4. Home. 5. Project. 6. Sim shell pass. 7. Log index + layout + 5 entries.
8. Delete orphaned code/assets. 9. `npm run build` + `preview` smoke-check.
