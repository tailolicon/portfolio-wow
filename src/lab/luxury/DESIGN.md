# Maison Orvel design system

## 1. Visual theme & atmosphere
A Paris fine-jewelry house, founded 1931, workshop above the flagship on rue Saint-Honoré. The site behaves
like a quiet boutique: soft stone-white walls, deep ink type, photography that is allowed to breathe, and one
restrained emerald used the way a house uses its box colour. Nothing competes with the pieces. Motion is slow
and precise (long ease-out fades, a gentle image scale on hover), never bouncy. The single WebGL moment is a
slow emerald horizon glow in the dark "Lumière" band behind the diamond rivière on the home page (and the
dark header of Appointments), both with a still gradient fallback that looks finished on its own.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--lx-paper` | `#F7F7F5` | Page canvas, header |
| `--lx-stone` | `#EDEDEA` | Alternate section surface, product image backdrop |
| `--lx-mist` | `#E3E3DF` | Hover surface, skeleton, selected chip background |
| `--lx-line` | `#D6D6D1` | Hairlines, input borders |
| `--lx-ink` | `#15181D` | Headings, primary buttons, announcement bar |
| `--lx-ink-2` | `#3A3E45` | Body copy |
| `--lx-muted` | `#63676E` | Secondary text, captions (5.3:1 on paper) |
| `--lx-night` | `#0C0F10` | Dark bands (signature, footer) |
| `--lx-on-dark` | `#F1F1EE` | Text on night |
| `--lx-on-dark-muted` | `#A4A9AC` | Secondary text on night |
| `--lx-accent` | `#1D4B43` | The one accent: deep emerald. Selected states, focus ring, links, the Maison box colour |
| `--lx-accent-deep` | `#143831` | Accent hover |
| `--lx-accent-soft` | `#6FA597` | Accent on dark only |
| `--lx-error` | `#9A2E2E` | Form errors |
Never pure black or white. Shadows are ink-tinted: `rgba(21,24,29,.08)`.

## 3. Typography rules
Display: Cormorant Garamond (400/500), used sparingly for headings and product names. UI and body: Jost.
| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display XL (hero) | Cormorant | clamp(2.6rem, 4.6cqi, 4.25rem) | 400 | 1.04 | -0.01em |
| Display L (section) | Cormorant | clamp(2rem, 3.2cqi, 2.9rem) | 400 | 1.1 | -0.005em |
| Display M | Cormorant | 1.75rem | 400 | 1.2 | 0 |
| Product name | Cormorant | 1.3rem | 500 | 1.25 | 0 |
| Body | Jost | 1rem | 400 | 1.7 | 0 |
| Body small | Jost | 0.875rem | 400 | 1.6 | 0.005em |
| UI label (nav, buttons) | Jost | 0.75rem | 500 | 1 | 0.14em, uppercase |
| Price | Jost | 0.9375rem | 400 | 1.4 | 0.02em, tabular |
Headings `text-wrap: balance`, paragraphs `pretty`, max 62ch. Sentence case everywhere except UI labels.

## 4. Component stylings
- Buttons: rectangular (radius 0), 48px tall, 0 24px padding, UI label type. Primary: ink fill, paper text,
  hover accent fill. Secondary: 1px ink outline, hover ink fill. Text link: ink with 1px underline offset 6px,
  hover accent. Focus: 2px accent outline, 3px offset. CTAs never wrap (`white-space: nowrap`).
- Product card: stone image well (4:5), piece centred, hover scales image 1.04 over 1.2s; name in Cormorant,
  collection and price in Jost below. No borders, no shadows.
- Inputs: label above (Jost 0.8125rem 500), 48px field, 1px line border, paper fill; focus border ink + accent
  ring; helper/error text below in 0.8125rem.
- Choice chips (metal, size, time): 44px, 1px line border; selected = ink border + mist fill.
- Nav: sticky, 72px, paper with hairline bottom. Left: page links (UI label). Centre: wordmark
  "MAISON ORVEL" (Cormorant 500, 0.3em tracking). Right: search, account, bag with count.
- Accordion: hairline rows, 60px header, plus/minus icon, 400ms height reveal.
- Footer: night background, newsletter row, four link columns, legal line.

## 5. Layout principles
Spacing scale (rem): 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8. Section padding `clamp(4rem, 9cqi, 8rem)`.
Container 1320px max, gutter `clamp(1.25rem, 4cqi, 3rem)`. 12-column grid, gap 1.5rem; product grid 4 up
(3 at 1100, 2 below 760). Every page mixes layout families: split hero, category rail, dark signature band,
product grid, editorial feature, text columns, timeline list, portrait row, form + aside.

## 6. Depth & elevation
Flat. Depth comes from photography and surface changes (paper, stone, night). Only overlays lift off the page:
mobile menu panel and bag notice use `0 18px 40px rgba(21,24,29,.12)`. Images never get shadows.

## 7. Do's and don'ts
Do: let product images sit on stone with generous air; keep one accent; use real piece data (carats,
grams, report numbers); use slow easing `cubic-bezier(.2,.7,.1,1)` 700-1200ms.
Don't: cream + brass, gold gradients, glows on text, rounded pills, eyebrow labels on every section,
section numbers, badges over photos, em or en dashes, exclamation marks, marketing superlatives.

## 8. Responsive behavior
Container queries only (`@container site`). At 1180: wordmark moves left, nav right. At 1100: listing grid 3 up. At 860: hamburger panel
(absolute, below header), hero stacks image above copy, product page gallery above details, grids 2 up,
footer columns 2 up. At 480: product grid 2 up with smaller names, forms single column. Touch targets 44px.

## 9. Agent prompt guide
"Maison Orvel: Paris fine jewelry since 1931. Paper #F7F7F5, stone #EDEDEA, ink #15181D, one accent emerald
#1D4B43. Cormorant Garamond headings at modest sizes, Jost for UI with 0.14em uppercase labels only on
buttons and nav. Radius 0. Photography first, lots of air, slow fades. Copy is calm, specific and factual."
