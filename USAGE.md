# Weekly AI Usage Log

## Week 1 (Jun 8, 2026)

### Session: Project Planning via grill-with-docs
**Date**: 2026-06-08  
**Model**: Claude Haiku 4.5  
**Task**: Stress-test the portfolio landing page design plan

**Summary**:
- Grilling session (grill-with-docs) to lock down design decisions
- Clarified requirements: bio, 2 project showcases (satellite imagery comparison + APCEMM contrail model), weekly AI usage log
- Tech stack: Vite + React + TypeScript, deployed to GitHub Pages at `/louis/` via GitHub Actions
- Completed full project build in ~45 minutes: project scaffolding, component structure, styling, workflow setup

**Deliverables**:
1. ✅ Responsive landing page (Home page with bio + 2 project cards)
2. ✅ AI Usage transparency page (dedicated `/usage` route)
3. ✅ GitHub Actions workflow for automatic deployment
4. ✅ Placeholder SVG images (swap with actual GIFs when ready)
5. ✅ CONTEXT.md documenting project scope and structure

**Next steps for user**:
1. **Enable GitHub Pages** (required for deploy):
   - Go to https://github.com/AI-for-engineering-research/louis/settings/pages
   - Set **Source**: GitHub Actions, **Branch**: main
   - Re-run the GitHub Actions workflow
   - Site will be live at: https://AI-for-engineering-research.github.io/louis/ (~2 min after enabling)

2. **Replace placeholder assets**:
   - Replace `public/project1-placeholder.svg` with animated GIF (satellite imagery animation)
   - Replace `public/project2-placeholder.svg` with diagrams (APCEMM 2D cross-section)
   - Commit and push to auto-deploy

3. **Optional refinements**:
   - Refine bio text (currently sourced from MIT LAE profile)

**AI Assistance**: Claude Haiku 4.5 — stress-testing design, rapid prototyping with Vite + React, GitHub Pages configuration, full-stack implementation
