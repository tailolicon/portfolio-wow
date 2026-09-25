# Nonna Rosa Trattoria: design system

## 1. Visual theme and atmosphere
A family trattoria on South Lamar that has been open since 1998. The site should feel like the room: warm white
walls, olive-wood tables, a red-checked sense of plenty without the kitsch. Photography of the food carries the
page; type is a classic serif used at modest sizes; one brick-red accent marks every primary action. Upscale
casual, never a dark fine-dining concept and never a parchment-and-brass "heritage" pastiche.

## 2. Color palette and roles
| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | #fdfcf9 | Page background (clean warm white) |
| `--color-surface` | #ffffff | Cards, inputs, info band |
| `--color-surface-soft` | #f3f3eb | Alternate section background (green-tinted paper) |
| `--color-brand-tint` | #e5e8d8 | Newsletter band, map placeholder, soft chips |
| `--color-brand` | #3f4a2c | Olive. Dominant brand color: top bar, order tile, icons, logo |
| `--color-brand-deep` | #2b3320 | Footer, aperitivo card, dark tiles |
| `--color-accent` | #b3362a | Brick/tomato. ALL primary CTAs, prices, stars, active states |
| `--color-accent-active` | #962b21 | Hover/active of accent |
| `--color-ink` | #1f2520 | Headings, strong text (green-gray near-black) |
| `--color-body` | #3d443b | Long-form paragraphs |
| `--color-muted` | #5a6157 | Secondary text, captions (AA on canvas and surface-soft) |
| `--color-hairline` | #e1e1d5 | Dividers, card borders |
| `--color-border` | #c9ceb9 | Input borders |
| `--color-disabled` | #a9ada3 | Disabled buttons, fully booked slots |
| `--color-on-dark` | #ffffff | Text on olive / photos |
| `--color-on-dark-soft` | #d5dac9 | Body text on olive |
| `--color-scrim` / `--color-scrim-strong` | olive-black 50% / 88% | Photo overlays |

One accent only. No gold, no brass, no burgundy. Shadows are tinted with the olive hue.

## 3. Typography rules
Display: Cormorant Garamond (600). Body and UI: Mulish.

| Role | Token | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero h1 | `--text-hero` | clamp(2.6rem to 3.8rem) | 600 | 1.05 | -0.005em |
| Page h1 (sub-page hero) | `--text-4xl` | clamp(2.4rem to 3.2rem) | 600 | 1.1 | -0.005em |
| Section h2 | `--text-3xl` | clamp(2rem to 2.6rem) | 600 | 1.1 | -0.005em |
| Card title | `--text-2xl` | 1.85rem | 600 | 1.15 | 0 |
| Item title | `--text-xl` | 1.45rem | 600 | 1.2 | 0 |
| Small heading | `--text-lg` | 1.2rem | 600 | 1.3 | 0 |
| Lead paragraph | `--text-md` | 1.1rem | 400 | 1.65 | 0 |
| Body | `--text-base` | 1rem | 400 | 1.65 | 0 |
| UI / meta | `--text-sm` | 0.9rem | 600-700 | 1.5 | 0 |
| Caption / legal | `--text-xs` | 0.8rem | 400 | 1.5 | 0 |
| Logo sub-line | `--text-2xs` | 0.72rem | 700 | 1 | 0.14em uppercase (logo only) |

Sentence case headings. `text-wrap: balance` on headings, `pretty` on paragraphs, max 65ch.

## 4. Component stylings
- **Primary button**: accent fill, white text, pill (`--radius-pill`), 48px (54px large). Hover accent-active,
  active translateY(1px), focus 2px accent outline offset 3px. 200ms transitions. Label "Reserve a table" for
  every booking CTA, "Order online" for ordering.
- **Outline button**: 1.5px ink border, transparent; hover fills brand olive with white text.
- **Light button** (on photos/olive): white fill, ink text; hover brand-tint.
- **Order buttons**: pill, white with hairline border (primary pickup variant in accent), icon + label + sub.
- **Cards**: surface, `--radius-card` 12px, hairline border or `--shadow-sm`. Photos inside cards share the radius.
- **Inputs**: surface, 1.5px border, `--radius-input` 8px, 48px tall, label above (0.9rem bold), helper text below.
  Focus: accent border + ring.
- **Nav**: one line, 78px header, sticky, warm white at 97% with hairline bottom. Active link accent with 2px underline.
- **Footer**: brand-deep background, four columns (brand, visit, hours, explore), legal line below.

## 5. Layout principles
- Container 1200px, gutters 32px (20px under 760px).
- Spacing scale (`--space-1..12`): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.
- Section padding 96px desktop, 64px mobile.
- Each layout family at most once per page: split image/text, lead+list, full-bleed band, bento, testimonial
  wall (masonry columns), map block, stats row, gallery.

## 6. Depth and elevation
| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | 0 2px 10px rgba(43,51,32,.07) | Resting cards |
| `--shadow-md` | 0 12px 32px rgba(43,51,32,.12) | Info band, floating panels, mobile nav |
| `--shadow-lg` | 0 20px 48px rgba(43,51,32,.18) | Card hover |

## 7. Do's and don'ts
- Do let food photography lead; keep copy plain and specific, as Elena would write it.
- Do keep prices in accent, tabular numerals, no "$" inside menu lists (dollar sign on featured dishes only).
- Don't use em or en dashes, gold/brass, eyebrow labels on every section, or overlays/pills on photos.
- Don't introduce a second accent color or mix radii outside pill / 12 / 8.

## 8. Responsive behavior (container queries on `site`)
- ≤1140px: nav links tighten.
- ≤1024px: nav collapses to hamburger dropdown; info band 2 columns; menu aside drops below content; team stacks.
- ≤760px: all splits, bento, forms and footer go single-column; hero overlay switches to a vertical gradient;
  aperitivo band becomes photo on top with the card below; gutters 20px.
- ≤520px: top bar keeps only the phone; header CTA hides (lives in the dropdown); order buttons full width.

## 9. Agent prompt guide
"Warm white canvas, olive (#3f4a2c) brand, a single brick-red (#b3362a) accent for CTAs and prices,
Cormorant Garamond headings at modest sizes, Mulish body, pill buttons, 12px cards, 8px inputs, olive-tinted
soft shadows, big appetizing food photos, plain neighborly copy, no dashes, no eyebrows."
