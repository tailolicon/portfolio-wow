# PRISM / LAB Portfolio

A deliberately high-impact static portfolio/showcase for non-technical clients. The homepage itself is the portfolio piece: realtime visuals, five switchable art directions, kinetic typography, responsive interaction, 3D/perspective cards, procedural artwork and five complete premium brand websites.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal.

## Production checks

```bash
npm run typecheck
npm run build
npm run preview
```

The production output is `dist/`. There is no backend, database, server process or VPS requirement.

## Deploy without a VPS

### Vercel

Import the Git repository. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### Cloudflare Pages

Connect the repository. Build command: `npm run build`. Build output directory: `dist`.

### GitHub Pages

A ready-to-use workflow is included at `.github/workflows/pages.yml`.

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The Vite build uses relative asset URLs with `base: "./"`, so the same production bundle can run from a GitHub project Pages sub-path without hard-coding a repository name.

## What the visitor can experience

The **Brand websites** section shows five complete, multi-page websites for fictional premium brands. Each can be scrolled in the embedded browser frame or opened fullscreen (`?view=lab&site=<id>&page=<page>` links straight to a page):

- **Maison Orvel** (`luxury`): Paris fine jewelry house. Collections, product page, maison, private appointments.
- **Veyra** (`saas`): AI analytics platform. Product tour with live UI components, pricing, customer stories, demo request.
- **Oyelaran Hart** (`architecture`): London architecture practice. Project index, case pages with drawings, studio, contact.
- **Wren & Volt** (`agency`): Brooklyn brand and motion studio. Work index, case studies, services, project brief.
- **Kova One** (`product`): headphone launch. Story page, tech specs, model comparison, support, configurator.

Each site keeps its design tokens in `src/lab/<id>/DESIGN.md`. ThreeUI scenes load through `ThreeCanvas` (`src/lab/shared.tsx`), which mounts WebGL only near the viewport and falls back to a still image when WebGL fails or reduced motion is preferred.

## Editing the site

- Homepage composition and content: `src/App.tsx`
- Homepage visual system: `src/styles.css`
- Brand websites: `src/lab/<id>/`, registry in `src/LabSites.tsx`, fullscreen viewer in `src/LabViewer.tsx`, section styles in `src/lab.css`
- Small business demos: `src/demos/<id>/`, studio in `src/BusinessStudio.tsx`
- ThreeUI global styles + app entry: `src/main.tsx`
- Metadata: `index.html`
- Brand/OG assets: `public/`
- GitHub Pages deployment: `.github/workflows/pages.yml`

The email address in the final CTA is intentionally a placeholder: replace `hello@example.com` before publishing.

## ThreeUI / performance strategy

This is a real `@designcodeio/threeui` integration.

- The immersive system is itself lazy-loaded, so its React/CSS code is absent from the initial interaction path.
- Heavy ThreeUI effects remain split into independent dynamic chunks.
- Only the currently selected immersive world mounts its heavy ThreeUI scene.
- Closing an immersive world unmounts that scene.
- Every immersive shader has a static/Suspense fallback.
- `prefers-reduced-motion` swaps animated ThreeUI backgrounds for static procedural art and disables automated showreel timing.
- No stock photos, remote video payloads or required external media are used.

## Accessibility

- Fullscreen experiences use dialog semantics and `aria-modal`.
- Opening a world locks background scrolling.
- Escape closes the experience.
- Left/Right arrows navigate scenes.
- Focus is moved into the fullscreen experience and trapped while it is open.
- Focus-visible states are provided.
- Drag interactions work with pointer/touch input.
- Reduced-motion visitors get the same information and art direction without continuous motion.


## Small Business Studio

The Creative Lab remains the experimental flagship. `PRISM / BUSINESS` is a separate, lazy-loaded client path for practical projects below roughly $2k.

Showroom:

```text
https://tailolicon.github.io/portfolio-wow/?view=business
```

Each industry is now a separate complete React page, not a shared template with swapped colors/content:

- **Restaurant** — editorial dining identity, menu with real prices, visit details and an interactive reservation-time selection.
- **Café / Drinks** — playful sticker-driven identity, menu board, location block and interactive loyalty-pass state.
- **Salon / Beauty** — quiet-luxury treatment catalogue with duration/pricing and interactive appointment selection.
- **Home Services** — trust-first utility layout, service area, phone CTA and a working quote-capture demo.
- **Fitness / Studio** — brutal/acid visual language, daily class timetable, membership comparison and interactive class booking.
- **Professional Services** — Swiss/editorial consulting language, engagement examples, delivery method and enquiry-capture flow.

Every concept can be opened as its own fullscreen scrollable product and shared directly:

```text
?view=business&demo=restaurant
?view=business&demo=cafe
?view=business&demo=salon
?view=business&demo=services
?view=business&demo=fitness
?view=business&demo=professional
```

All six are clearly fictional concept work, not claimed client projects. Local WebP presentation assets live in `public/demos/` with source notes in `public/demos/README.md`.

Business code is split across `src/BusinessStudio.tsx`, `src/BusinessDemos.tsx`, `src/business.css`, and `src/business-demos.css`, and remains a lazy chunk so the original Creative Lab stays independent.
