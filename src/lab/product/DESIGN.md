# Kova Audio: design system

## 1. Visual theme & atmosphere
A product launch that behaves like a quiet room. The product photograph carries every big moment; the chrome is
almost invisible. The site opens on a graphite canvas (the product is black, the room is dark), stays dark while the
story is about silence, sound and time, then makes one deliberate switch to a pale mineral canvas for materials,
spatial audio, the app and ordering. Utility pages (specs, compare, support, buy) live on the light canvas.
Danish restraint: no gradients as decoration, no glows, one warm signal colour used only where you can act.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--kv-night` | #0B0B0C | Dark canvas (hero, silence). Matches the flagship photograph's backdrop |
| `--kv-graphite` | #151618 | Dark tile, one step up from night |
| `--kv-graphite-2` | #1E2023 | Dark raised surfaces, inputs on dark |
| `--kv-line-dark` | #2C2F33 | Hairlines on dark |
| `--kv-mist` | #F3F4F2 | Light canvas (pale mineral, cool, never cream) |
| `--kv-paper` | #FFFFFF | Cards and panels on mist |
| `--kv-line` | #E1E3E1 | Hairlines on light |
| `--kv-ink` | #16171A | Primary text on light |
| `--kv-ink-2` | #5D6167 | Secondary text on light (AA on mist and paper) |
| `--kv-snow` | #F4F4F2 | Primary text on dark |
| `--kv-snow-2` | #A4A8AE | Secondary text on dark |
| `--kv-signal` | #C8431F | The one accent: primary buttons, links, focus, selected state (4.9:1 on white) |
| `--kv-signal-lift` | #F26A3D | Same hue, lifted for links on dark (6.1:1 on graphite) |
| Finish swatches | Graphite #3A3C3F, Sand #CDBFA8, Silver #C9CCCF | Only for colour chips of the product |

## 3. Typography rules
Family: Manrope for everything (display 600, body 400/500). Numerals tabular in specs and prices.
| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero product name | clamp(3rem, 8cqi, 6rem) | 600 | 1.02 | -0.035em |
| Section headline | clamp(2rem, 4.6cqi, 3.5rem) | 600 | 1.08 | -0.03em |
| Sub headline | clamp(1.35rem, 2.2cqi, 1.75rem) | 600 | 1.2 | -0.02em |
| Lead | clamp(1.1rem, 1.6cqi, 1.3rem) | 400 | 1.5 | -0.01em |
| Body | 1.0625rem (17px) | 400 | 1.55 | -0.005em |
| Caption / meta | 0.875rem | 500 | 1.45 | 0 |
| Fine print | 0.75rem | 400 | 1.5 | 0 |
| Big figure | clamp(3.5rem, 9cqi, 7.5rem) | 600 | 1 | -0.045em |
Headings use `text-wrap: balance`; paragraphs `pretty`, max 60ch. Sentence case always. No uppercase eyebrows
except at most one per three sections.

## 4. Component stylings
- **Primary button**: signal fill, white text, pill radius, 44px tall, 0 22px padding. Hover darkens 8%, active
  scales 0.98, focus 2px signal outline offset 3px.
- **Secondary button**: transparent, 1px current-colour border at 35%, pill. On dark uses snow.
- **Text link**: signal (signal-lift on dark), underline on hover only, trailing caret icon.
- **Cards**: paper on mist, radius `--kv-r-lg` (22px), no border, no shadow. Dark tiles: graphite, same radius.
- **Option tiles (configurator)**: paper, 1px line border, radius `--kv-r-md` (14px); selected = 2px signal ring.
- **Inputs**: label above (caption, 500), 48px field, radius `--kv-r-md`, 1px line border; helper text below in ink-2;
  error text in signal.
- **Nav**: sticky 64px bar, solid night (no backdrop blur: it would recomposite over WebGL), wordmark left, four links centred, bag + Buy right.
  Mobile: hamburger opens an absolutely positioned panel under the bar.
- **Footer**: mist, dense link columns (line-height 2.2), legal row in fine print.

## 5. Layout principles
Spacing scale (rem): 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8 (`--kv-s1` to `--kv-s10`).
Container 1180px max, 24px gutters (20px under 520px). Section padding `--kv-s9` block (6rem), `--kv-s8` on phones.
Story sections are one idea per viewport. Layout families on the home page: centred hero, full-bleed field with
text, split image/text, big-figure spread, bento grid, centred panel, interactive tool, chip row, list, closing card.

## 6. Depth & elevation
Flat. Separation comes from canvas changes (night to mist) and card fills. The only shadow is under product imagery
on light surfaces: `0 30px 60px -30px rgb(22 23 26 / 0.35)`. Sticky nav is a near-opaque night bar, no shadow.

## 7. Do's and don'ts
Do: let the photograph be large, keep copy short and specific, show real numbers (42 h, 268 g, 40 mm), keep one
accent, keep radius tokens.
Don't: add gradients or glows to UI, use a second accent, put labels on photographs, show a photo as a colour it is
not (colour chips are rendered swatches, photos are always Graphite), number sections, or use em or en dashes.

## 8. Responsive behavior
Container queries on `site`. Breakpoints: 980px (split layouts stack, specs nav collapses), 720px (nav becomes
hamburger, bento becomes single column, compare table scrolls horizontally with sticky first column), 480px
(type scale floors). Touch targets 44px minimum. Buy summary moves under the configurator on narrow widths.

## 9. Agent prompt guide
"Build a Kova Audio page: Manrope, graphite night canvas #0B0B0C or mist #F3F4F2, ink #16171A, one accent #C8431F
for actions only, pill buttons, 22px cards, 17px body, calm sentence-case headlines at weight 600 with tight
tracking. Product photography large and unlabelled. Specs are precise and grouped. No dashes, no eyebrows."
