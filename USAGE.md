# Weekly AI Usage Log

## Week 1 (Jun 8–11, 2026)

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
1. **Enable GitHub Pages** (requires org admin):
   - Ask the org admin (or whoever set up the class's working GitHub Pages example) to enable Pages for this repo
   - Configure it to build from GitHub Actions
   - Once enabled, the workflow will auto-deploy on next push
   - Site will be live at: https://AI-for-engineering-research.github.io/louis/ (~2 min after enabling)

2. **Replace placeholder assets**:
   - Replace `public/project1-placeholder.svg` with animated GIF (satellite imagery animation)
   - Replace `public/project2-placeholder.svg` with diagrams (APCEMM 2D cross-section)
   - Commit and push to auto-deploy

3. **Optional refinements**:
   - Refine bio text (currently sourced from MIT LAE profile)

**AI Assistance**: Claude Haiku 4.5 — stress-testing design, rapid prototyping with Vite + React, GitHub Pages configuration, full-stack implementation

---

### Session: Design refinement, performance optimization, and feature expansion
**Date**: 2026-06-08 (continued)  
**Model**: Claude Haiku 4.5  
**Task**: Enhance UI/UX, optimize performance, add interactive features

**Work Completed**:

1. **Design Enhancement**
   - Added rotating background image animations (later optimized to static)
   - Implemented glassmorphic cards with semi-transparent backgrounds and blur effects (later simplified for performance)
   - Increased font sizes across all pages (36-48px headings, 16-20px body text)
   - Made all fonts thicker/bolder (font-weight 500-800)
   - Improved opacity of card backgrounds from 0.15 to 0.3+ for better readability

2. **Responsiveness & Accessibility**
   - Added comprehensive responsive breakpoints (1024px, 768px, 480px)
   - Optimized typography, padding, and spacing for all screen sizes
   - Made navbar responsive with scaled buttons on mobile
   - Tested on desktop, tablet, and mobile viewports

3. **Interactive Features**
   - Created expandable project modal: click any project card to expand into full-screen view
   - Modal displays project image, title, description, and placeholder sections for gallery/details
   - Added smooth fade-in and slide-up animations for modal
   - Click outside or close button (×) to dismiss modal
   - Fully scrollable modal content area

4. **Performance Optimization** (major focus due to lag issues)
   - Removed animated background keyframes (was loading 3 large images in rotation)
   - Switched from rotating backgrounds to single static 134KB image
   - Identified and removed large 1.6MB image from rotation
   - Reduced backdrop-filter blur from 10px → 5px → 2px → removed entirely
   - Eliminated GPU-intensive blur effects, replaced with solid semi-transparent backgrounds
   - Removed background-attachment: fixed (was causing heavy scroll repaints)
   - Added hardware acceleration hints (transform: translateZ, will-change)
   - Result: scrolling performance went from sluggish to buttery smooth

5. **Contrail Gallery Feature**
   - Created new ContrailGallery component showing 3 contrail lifecycle stages
   - Displays: Early, Medium, Mature contrail images side-by-side
   - Added detailed explanatory text about contrail visual transformation
   - Positioned between bio section and project cards
   - Responsive grid: 3 columns → 2 → 1 based on viewport

6. **Developer Experience**
   - Fixed file sync issues: deleted old compiled .js files that were overriding .tsx files
   - Configured Vite for proper WSL2 networking (host: 0.0.0.0)
   - Verified TypeScript compilation with zero errors
   - Updated GitHub Actions workflow to match working class example

**Key Learnings**:
- Backdrop-filter blur is extremely GPU-intensive; removed entirely for performance
- Large image files in animations compound performance issues significantly
- Static semi-transparent backgrounds achieve similar visual effect with 10x better performance
- Hard refresh (Ctrl+Shift+R) often needed when clearing CSS/JS file changes

**Deliverables**:
1. ✅ Fully functional expandable project modals with smooth animations
2. ✅ Contrail evolution gallery with 3 lifecycle stages
3. ✅ Optimized scroll performance (removed all blur effects)
4. ✅ Responsive design across all breakpoints
5. ✅ Bigger, bolder, more readable typography
6. ✅ Clean dark backgrounds instead of glassmorphism

**AI Assistance**: Claude Haiku 4.5 — performance profiling & debugging, CSS optimization, React component architecture, responsive design, animation implementation

---

### Session: Interactive 3D contrail simulation
**Date**: 2026-06-11  
**Model**: Claude Opus 4.8 (1M context)  
**Task**: Design and build an interactive 3D + satellite-view contrail visualization for the portfolio

**Summary**:
- Planned the feature with a grill-me session, resolving the full design tree (render engine, placement, scene composition, contrail parametrization, timeline, satellite view, interactivity) before writing any code
- Built a new lazy-loaded "Contrail simulation" page with react-three-fiber (Three.js), code-split so the ~290 KB 3D bundle never touches the Home page load
- Implemented in reviewable phases with checkpoints between each

**Work Completed**:

1. **3D scene** — NWP grid (wireframe box, faint gridlines, labeled lon/lat/pressure axes), a translucent ice-supersaturated region (ISSR) slab, and a stylized primitive aircraft on a cruise path; light-gray studio backdrop; orbit camera with idle auto-rotate
2. **Contrail model** — a row of aging Gaussian puffs that spread into a thin sheared sheet, slowly sink, and shear with the wind; rendered as translucent ellipsoids
3. **Timeline & physics** — play / pause / scrub / loop over a 60-minute timeline plus live sliders for wind shear, sink rate, and humidity (RHi); a non-reactive clock keeps the 60 fps animation off the React render path
4. **Persistence** — puffs survive only while their center is inside the ISSR, dissipating a few timesteps after the center leaves (born in dry air, or sunk out of the humid layer)
5. **Advection** — puffs carried northward by a 40 m/s wind whose value at altitude is derived from the shear, integrated over each puff's lifetime
6. **Synthetic-IR satellite view** — a top-down 2D render derived live from the same puffs: optical depth → brightness-temperature colormap with a Kelvin colorbar, lon/lat axes, ISSR footprint, aircraft marker, and faint background cirrus; a segmented toggle switches views with shared timeline state
7. **Polish & correctness** — an orange centerline through the puff centers in both views to visualize the advection, leading-edge clipping so no contrail renders ahead of the aircraft, and lookup-table optimization of the satellite render for smooth playback
8. **Deployment** — merged to main and deployed to GitHub Pages; modernized the deploy workflow to current (non-deprecated) action versions

**Key Learnings**:
- Code-splitting the Three.js bundle via React.lazy keeps the heavy 3D page from slowing the rest of the site
- Driving 60 fps animation imperatively (mutating meshes in a frame loop) instead of via React state is essential for smoothness with dozens of objects
- Tying the synthetic satellite image directly to the 3D model state keeps the two views consistent by construction
- Per-pixel exp()/colormap work in the 2D satellite render needed lookup tables to stay smooth

**Deliverables**:
1. ✅ Interactive 3D contrail simulation page (lazy-loaded)
2. ✅ Aging Gaussian-plume contrail with spread / sink / shear / advection
3. ✅ Timeline controls and live physics sliders
4. ✅ ISSR-based persistence and leading-edge clipping
5. ✅ Synthetic-IR satellite view with a 3D/satellite toggle
6. ✅ Deployed to GitHub Pages; modernized the deploy workflow

**AI Assistance**: Claude Opus 4.8 (1M context) — design stress-testing (grill-me), react-three-fiber scene construction, cartoon physics modeling, performance optimization, GitHub Actions maintenance
