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

A separate practical mode was added without changing the core Creative Lab.

Entry points:

- persistent **NEED A SMALL BUSINESS WEBSITE?** control on the Creative Lab
- direct share URL using \`?view=business\`

The business mode deliberately changes tone from award-site experimentation to straightforward commercial clarity. It includes six fictional concept directions (restaurant, café, beauty, home service, fitness, professional service), desktop/mobile previews, three sub-$2k package anchors, and an interactive budget-fit control.

This layer is dynamically imported as \`BusinessStudio\`, so visitors who only explore the Creative Lab do not pay the full business-portal JS/CSS cost up front. Opening Business Studio also switches the homepage ThreeUI scenes to static fallbacks while the overlay is active, reducing unnecessary GPU work behind it.
