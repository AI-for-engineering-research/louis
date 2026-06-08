# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`louis` — AI experiments for contrails (per `README.md`). The goal is experimentation with AI/ML approaches to contrails (aircraft condensation trails), a topic relevant to aviation climate impact.

## Current state

This is a **greenfield repository**. As of this writing it contains only `README.md` and a `.gitignore`; there is no source code, build configuration, dependency manifest, or tests yet. The sections below are intentionally sparse and should be filled in as the project takes shape.

## Language & tooling

**Frontend**: TypeScript, React, Vite. Builds to GitHub Pages at https://AI-for-engineering-research.github.io/louis/

### Setup & development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Deployment
Automatic via GitHub Actions on push to `main`. Workflow defined in `.github/workflows/deploy.yml`.

### Assets
- Project showcases use animated GIFs/diagrams stored in `public/`
- Placeholders in place; swap in actual `.gif` files when ready

### Project structure
- `src/pages/` — Page components (Home, Usage log)
- `src/components/` — Reusable components (ProjectCard)
- `src/App.tsx` — Main app with simple nav routing
- `public/` — Static assets (GIFs, images)
- `vite.config.ts` — Configured with `/louis/` base path for org pages
