# BUILD REPORT

## Direction

PRISM / LAB is deliberately built as a creative-studio showreel rather than a developer résumé. The intended audience is a client who may know nothing about frameworks but immediately understands visual confidence, interaction quality and production polish.

The homepage is now a launcher into five complete concept worlds instead of a flat gallery.

## Main experience

### Homepage

- cinematic ThreeUI/WebGL hero
- kinetic typography
- pointer-reactive glow
- magnetic controls
- perspective cards
- scroll reveal / clip transitions
- live visual-direction selector
- illustrative craft/status HUD
- fullscreen Showreel Mode
- procedural project artwork
- large closing CTA

### Five immersive mini-sites

Each world has three internal scenes, its own composition language, keyboard navigation and a world-specific interaction.

1. **Luxury / NOIR ÉCLAT**
   - ThreeUI Nebula background
   - editorial serif language
   - draggable split material reveal

2. **Future SaaS / ORBIT OS**
   - ThreeUI Orbital Sphere
   - technical grid / data language
   - reactive command-console scanner

3. **Editorial / MONOLITH 24**
   - ThreeUI Halftone Flow
   - architectural layout
   - draggable grid and form composition

4. **Experimental / SIGNAL VOID**
   - ThreeUI Topology Field
   - chromatic/glitch typography
   - pointer-position signal distortion

5. **Product / OBJECT ONE**
   - ThreeUI Particle Network
   - minimal product-launch language
   - rotatable CSS 3D object and finish selector

The immersive component is dynamically imported from `src/ImmersiveExperience.tsx`, so none of its UI is required for the initial homepage bundle.

## ThreeUI integration

Real Community package imports are used, including:

- `LiquidFormBackground`
- `NebulaBackground`
- `OrbitalSphereBackground`
- `HalftoneFlow`
- `TopologyField`
- `ParticleNetwork`
- `EmberStorm`

The package stylesheet is imported globally through `@designcodeio/threeui/style.css`.

## Accessibility / resilience

- dialog semantics and `aria-modal`
- body-scroll locking in fullscreen mode
- focus transfer + simple focus trap
- Escape / arrow-key navigation
- focus-visible styling
- pointer/touch draggable interactions
- reduced-motion static backgrounds
- reduced-motion disables automated showreel timing
- Suspense/static fallbacks for shader experiences

## Static hosting

No backend is used.

Supported deployment paths:

- Vercel
- Cloudflare Pages
- GitHub Pages
- any static object host/CDN capable of serving `dist/`

A GitHub Pages Actions workflow is included at `.github/workflows/pages.yml`.

Vite uses `base: "./"`, so built assets remain relative and do not need a repository-specific base path.

## Verification

Run:

```bash
npm ci
npm run typecheck
npm run build
```

Expected output is `dist/`.

The Orbital Sphere shader remains the largest lazy chunk. It is intentionally retained because this project prioritizes visual demonstration, and it only loads when that visual is actually used.


## Small Business client path

The practical client path was rebuilt as six independent product demos instead of six skins of one shared mini-site.

Architecture:

- `BusinessStudio.tsx` is the showroom, pricing layer, URL/share controller and fullscreen demo shell.
- `BusinessDemos.tsx` contains six separate industry components with different information architecture and conversion jobs.
- `business-demos.css` uses isolated visual systems for restaurant, café, salon, home services, fitness and professional services.
- `public/demos/*.webp` contains local presentation photography, so deployed demos do not depend on runtime image hotlinks.

Outcome interactions are intentionally demonstrable in-browser: restaurant reservation selection, café loyalty state, salon appointment selection, contractor quote capture, fitness class booking and professional enquiry capture.

Direct URLs use `?view=business&demo=<industry>`; Back/Forward state is synchronized, and leaving Business Studio clears both `view` and `demo` query parameters.

The Business Studio remains dynamically imported. When open, background ThreeUI scenes on the Creative Lab are switched to static fallbacks, reducing unnecessary GPU work behind the client-facing product demo.
