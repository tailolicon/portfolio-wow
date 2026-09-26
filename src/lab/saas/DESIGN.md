# Veyra design system

## 1. Visual theme & atmosphere
Veyra is an AI product-analytics platform for data teams and the people who ask them questions. The site is a
dark, precise product canvas in the tradition of developer-grade software sites: near-black blue-grey surfaces,
hairline borders, restrained grotesk type and the product itself as the protagonist. Every feature claim is
paired with a working piece of product UI (ask box, answer card, SVG charts, anomaly drivers, alert card) built
as real components from data. One signal-orange accent marks the things that matter: the primary action, the
moving metric, the anomaly. One WebGL moment: a monochrome data-line field behind the home hero, tinted warm.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--vy-canvas` | #0b0c0e | Page background (never pure black) |
| `--vy-surface-1` | #111316 | Section bands, app panels |
| `--vy-surface-2` | #16191d | Cards, inputs, app cards |
| `--vy-surface-3` | #1c2025 | Hover fills, table stripes, selected rows |
| `--vy-line` | #23272d | Hairline borders |
| `--vy-line-strong` | #323841 | Input borders, dividers that must read |
| `--vy-ink` | #eceef1 | Headings, primary text |
| `--vy-ink-2` | #b4bac3 | Body copy |
| `--vy-ink-3` | #858c96 | Secondary / captions (AA on canvas) |
| `--vy-ink-4` | #5d636c | Axis ticks, disabled |
| `--vy-accent` | #ff6b2c | Signal orange: primary CTA, moving metric, anomaly, focus |
| `--vy-accent-hover` | #ff8250 | Primary hover |
| `--vy-accent-soft` | rgba(255,107,44,.12) | Anomaly band, selected tab wash |
| `--vy-on-accent` | #1a0d06 | Text on accent |
| `--vy-positive` | #3fb47c | Up deltas inside product UI only |
| `--vy-negative` | #ef5a5a | Form errors, down deltas inside product UI only |
| `--vy-series` | #c9ced6 | Default chart series |
Shadows are tinted blue-black: `0 1px 0 rgba(255,255,255,.04) inset, 0 24px 60px -24px rgba(3,5,10,.8)`.

## 3. Typography rules
Display: Manrope (600). UI and body: Inter (400/500). Numbers: Inter with `tnum`. Code: system mono stack.
| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Display (hero h1) | clamp(40px, 5.6cqi, 68px) | 600 | 1.04 | -0.035em |
| H2 section | clamp(30px, 3.6cqi, 44px) | 600 | 1.1 | -0.03em |
| H3 feature | 22px | 600 | 1.25 | -0.015em |
| H4 card title | 16px | 600 | 1.35 | -0.01em |
| Lead | 18px | 400 | 1.55 | -0.005em |
| Body | 15px | 400 | 1.6 | 0 |
| Small / caption | 13px | 400 | 1.5 | 0 |
| UI micro (app) | 12px | 500 | 1.4 | 0 |
| Button | 14px | 500 | 1 | -0.005em |
Sentence case everywhere. `text-wrap: balance` on headings, `pretty` on paragraphs, measure <= 62ch.

## 4. Component stylings
- **Buttons**: 38px tall (44px large), 6px radius, 0 16px padding. Primary: accent fill, on-accent text,
  hover lightens. Secondary: surface-2 fill, line-strong border, ink text; hover surface-3. Ghost links: ink-2 with
  arrow that nudges 2px on hover. Focus: 2px accent outline, 2px offset. Never wrap (`white-space: nowrap`).
- **Cards / panels**: surface-1 or surface-2, 1px `--vy-line` border, 12px radius, inset top highlight.
- **App components**: 10px radius inner cards inside 12px panels, 12-13px Inter, tabular numbers, hairlines.
- **Inputs**: label above (13px, ink), 40px field, surface-2, line-strong border, 6px radius, helper/error below.
  Focus: accent border + 3px accent-soft ring. Error: negative border and message.
- **Nav**: 64px sticky, canvas at 80% with blur, bottom hairline on scroll. One line on desktop.
- **Footer**: 4 link columns + brand column, hairline top, 13px links in ink-3, legal row below.
- **States**: hover changes fill or text one step, never moves layout. Active nav item ink, others ink-3.

## 5. Layout principles
Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop / 72 phone.
Container 1200px max, 32px gutters (20px phone). 12-column grid, 24px gap. Split sections are 5/7 or 6/6.
Heading block to content: 48px. Layout families never repeat within a page; max two consecutive zigzags.

## 6. Depth & elevation
Level 0 canvas. Level 1 surface-1 band. Level 2 card with hairline. Level 3 product panel: hairline + tinted
shadow + faint inset highlight. No glows, no gradients except a 1-stop radial vignette around the hero field.

## 7. Do's and don'ts
Do: show the product with real data; keep accent to one or two touches per viewport; use tabular numbers;
align everything to the grid; keep copy specific (named warehouses, real-sounding numbers, named customers).
Don't: purple/blue neon, glassmorphism, gradient text, emoji, eyebrow on every section, three identical cards,
decorative dots, fake stats widgets, stock "AI brain" imagery, pill buttons, em or en dashes.

## 8. Responsive behavior
Container queries on `site`. <= 980px: splits stack, pricing 2x2, table scrolls horizontally inside its card.
<= 720px: nav collapses to a menu button with an absolutely positioned panel; section padding 72px; display
40px; app components keep full fidelity but hide secondary columns. Touch targets >= 40px.

## 9. Agent prompt guide
"Dark Veyra canvas #0b0c0e, hairline #23272d, ink #eceef1, single signal-orange #ff6b2c. Manrope 600 display with
tight negative tracking, Inter body. 6px buttons, 12px panels. Show the product as real components with SVG
charts from data. Quiet, precise, specific copy; no hype words, no dashes."
