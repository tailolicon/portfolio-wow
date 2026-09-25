# Ivy & Oak Hair Studio: design system

## 1. Visual theme and atmosphere
A calm, bright boutique salon in Old Town Scottsdale. Crisp soft-white canvas, a single muted sage green
that carries every primary action, charcoal text. Photography of real hair work does the talking; type is
elegant (Bodoni Moda) but set at modest sizes with generous whitespace. One signature shape: the arched
hero photo. Everything else is a quiet 12px card radius. No beige, no brass, no dark sections except the footer.

## 2. Color palette and roles
| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | #fcfcfa | Page background |
| `--color-surface` | #ffffff | Cards, widget, trust band |
| `--color-surface-tint` | #f2f4ef | Alternating sections, chips at rest, hero wash |
| `--color-accent` | #5b6a4f | The one brand color: primary buttons, links, icons, stars, promo bar, CTA band |
| `--color-accent-hover` | #4a5741 | Hover/active of accent |
| `--color-accent-soft` | #e4eadd | Offer/consult panels, selected picker, focus ring halo |
| `--color-accent-line` | #8a9a7b | Focus outline, hover borders |
| `--color-ink` | #2e322d | Headings, strong text, footer background |
| `--color-body` | #4a4e48 | Body copy |
| `--color-muted` | #6f736b | Secondary text (AA on canvas) |
| `--color-disabled` | #a3a79f | Booked time slots, n/a prices |
| `--color-hairline` | #e0e4db | Dividers, card borders |
| `--color-border-strong` | #cdd3c6 | Input borders |
| `--color-on-dark` / `-muted` / `-accent` | #eef2ea / #bcc2b7 / #b4c2a7 | Footer text tiers |
| `--color-dark-line` | #4a5047 | Footer dividers |
| `--color-scrim-*` | rgba(46,50,45,.55 / .1) | Offer photo band gradient |

## 3. Typography rules
Display: Bodoni Moda 500. Body: Jost 400/500. Sentence case everywhere.

| Role | Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| H1 home hero | `--text-h1` | clamp(2.3rem, 4.2cqi, 3.4rem) | 500 | 1.12 | -0.01em |
| H1 inner page | `--text-h1-page` | clamp(2.1rem, 3.6cqi, 2.9rem) | 500 | 1.12 | -0.01em |
| H2 section | `--text-h2` | clamp(1.75rem, 2.8cqi, 2.3rem) | 500 | 1.12 | -0.01em |
| H2 small (menu groups) | `--text-h2-sm` | clamp(1.5rem, 2.2cqi, 1.85rem) | 500 | 1.12 | -0.01em |
| H3 / card title | `--text-h3` | 1.375rem | 500 | 1.2 | 0 |
| Lead | `--text-lg` | 1.125rem | 400 | 1.7 | 0 |
| Body | `--text-base` | 1rem | 400 | 1.65 | 0 |
| Small / meta | `--text-md`, `--text-sm` | 0.9375 / 0.875rem | 400 | 1.5 | 0 |
| Caption, fine print | `--text-xs` | 0.8125rem | 400 | 1.5 | 0 |
| Eyebrow (rare) | `--text-xs` | 0.8125rem | 500 | 1.4 | 0.16em, uppercase |
| Rating score | `--text-score` | 3rem | 500 display | 1 | 0 |

Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`, max ~65ch.

## 4. Component stylings
- **Primary button** `.sl-btn`: pill, `--control-h` 48px, accent bg, white text, 500 weight. Hover: accent-hover.
  Active: translateY(1px). Focus-visible: 2px accent-line outline, 3px offset. 200ms transitions.
- **Ghost button**: transparent, 1px ink border; hover fills ink. **Light button**: white on accent bands.
- **Text link** `.sl-textlink`: ink with 1px muted underline border, turns accent on hover.
- **Cards** (review, stylist, retail, summary, policies): surface, 1px hairline, `--radius-card` 12px, no shadow.
  Only the booking widget, offer panel and hero inset use `--shadow-card`.
- **Inputs**: 48px min, `--radius-input` 8px, border-strong, canvas fill; focus = accent border + `--shadow-focus`.
  Label always above (500, ink), helper text below in muted `--text-xs`.
- **Chips / slots / picker**: chips are pills; time slots and stylist picker use 8px. Selected = accent fill
  (slots) or accent-soft fill + accent inset ring (picker). Disabled slot = tint bg, strike-through, disabled color.
- **Nav**: one line, 76px header, sticky, header-bg with blur. Active link = accent text + 1px underline.
- **Footer**: ink background, four columns (brand, visit, hours, links), dark-line divider, legal row.

## 5. Layout principles
- Container `--container` 1200px, side gutter 32px (20px under 640px).
- Spacing scale `--space-1..13`: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 104px. Nothing off-scale.
- Section rhythm: 104px desktop, 80px tablet, 64px phone.
- Home uses each layout family once: split hero, trust row, list with photo, full-bleed photo band,
  split image/text, testimonial wall, bento, asymmetric pair, map block.

## 6. Depth and elevation
| Token | Value | Use |
|---|---|---|
| none | hairline border only | Default for cards |
| `--shadow-card` | 0 18px 40px -26px rgba(52,66,44,.45) | Booking widget, offer panel, hero inset, mobile menu |
| `--shadow-focus` | 0 0 0 3px accent-soft | Input focus |
Shadows are always tinted green-gray, never black.

## 7. Do's and don'ts
- Do let photos carry the page; keep one accent for every primary CTA ("Book appointment").
- Do keep prices right-aligned with tabular numerals.
- Don't use em or en dashes, eyebrows on more than one in three sections, pills over photos, rotated
  elements, beige/cream or brass tones, or Title Case headings.
- Don't introduce new radii, hex values or spacing outside the tokens.

## 8. Responsive behavior (container queries on `site`)
- ≤1180: hide header phone. ≤1100: trust row 2x2, gift/retail stack, booking sidebar 330px.
- ≤960: burger menu; all splits collapse to one column; team grid 2 cols; review wall 2 cols; booking sidebar below form.
- ≤760: price table columns shrink to 64px, levels stack, gallery 2 cols, bento becomes 2 cols with lead image full width.
- ≤640: gutters 20px, hero CTAs full width, trust row single column, team and reviews single column, form fields single column.
- ≤420: gallery single column.

## 9. Agent prompt guide
"Ivy & Oak: soft white #fcfcfa canvas, sage #5b6a4f single accent, charcoal #2e322d text, Bodoni Moda 500
headings at modest sizes, Jost body, pill buttons, 12px cards, 8px inputs, hairline borders over shadows,
generous whitespace, one arched hero photo. Plain, specific copy written by the owner. Use only the tokens."
