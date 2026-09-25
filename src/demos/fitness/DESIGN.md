# Forge Strength Club: design system

## 1. Visual theme and atmosphere
An independent strength gym in a converted RiNo warehouse. Charcoal chrome (top bar, header, footer, trust band)
frames clean white and light-gray content sections. The photos carry the grit: high-contrast, mostly dark
training shots. One fiery orange-red handles every primary action. The type is condensed and confident, but the
sizes stay modest. It should read like a well-run local gym, not a concept piece.

## 2. Color palette and roles
| Token | Hex | Role |
|---|---|---|
| --color-ink | #1b1b1e | Body text, dark buttons, text on the accent color |
| --color-charcoal | #202024 | Header, dark sections, story cards, trial hero |
| --color-charcoal-2 | #2b2b30 | Hover surface on dark |
| --color-night | #161619 | Top bar, footer, trust band |
| --color-canvas | #ffffff | Page background, cards |
| --color-mist | #f2f2f0 | Alternate section tint, table header |
| --color-hairline | #e2e2de | Dividers and borders on light surfaces |
| --color-hairline-dark | #3a3a40 | Dividers on dark surfaces |
| --color-mute | #5c5c63 | Secondary text on light surfaces |
| --color-mute-dark | #b4b4ba | Secondary text on dark surfaces, input borders |
| --color-on-dark | #ececee | Primary text on dark surfaces |
| --color-accent | #ff5a1f | Primary CTA fill, stars, highlights on dark, CTA band |
| --color-accent-hover | #ff7440 | Primary CTA hover |
| --color-accent-text | #c63a0c | Accent used as text or icons on light surfaces (AA) |
| --color-accent-soft | #ffede5 | Highlighted table column, focus ring on inputs |
| --color-success / -soft | #1d7446 / #e6f3eb | Open class spots, Beginner level tag |
| --color-scrim* | rgba charcoal | Photo overlays |

No pure black. Shadows are tinted with charcoal (rgba 32,32,36).

## 3. Typography
| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Hero h1 | Bebas Neue | clamp(3rem to 4.2rem) | 400 | 0.95 | 0.01em |
| Page title | Bebas Neue | clamp(2.6rem to 3.6rem) | 400 | 0.95 | 0.01em |
| Section h2 | Bebas Neue | clamp(2.2rem to 3rem) | 400 | 1 | 0.01em |
| Card h3 | Bebas Neue | 1.75rem | 400 | 1 | 0.01em |
| Stat / price | Bebas Neue | 2.2rem to 3rem | 400 | 1 | 0 |
| Small heading | Manrope | 1.08 to 1.18rem | 700 | 1.4 | 0 |
| Body | Manrope | 1rem | 400 to 500 | 1.6 | 0 |
| Lead | Manrope | 1.08rem | 400 | 1.6 | 0 |
| Small / meta | Manrope | 0.9rem | 600 | 1.5 | 0 |
| Button | Manrope | 0.9 to 1.08rem | 700 | 1 | 0.01em |
| Eyebrow (rare) | Manrope | 0.8rem | 700 | 1.4 | 0.12em uppercase |

Headings are sentence case with `text-wrap: balance`. Paragraphs use `text-wrap: pretty` and stay under about 65ch.

## 4. Component styling
- **Primary button**: accent fill, ink text, 6px radius, 46px tall (54px large). Hover goes lighter, active
  shifts down 1px, focus shows a 3px accent outline. Label is always "Start your free week" for the trial.
- **Dark button**: ink fill with white text, used inside light cards (pricing) and on the CTA band.
- **Ghost button**: white 2px outline on photos, fills white on hover. **Outline**: ink border on light.
- **Text link**: accent-text color, bold, with an arrow; the underline appears on hover.
- **Cards**: white, 10px radius, either `--shadow-card` or a 1px hairline border, never both.
- **Tags** (class level): 4px radius, tinted fills, xs bold text.
- **Inputs**: 46px, 6px radius, 1px mute-dark border; focus gets an ink border plus a soft accent ring. Labels sit
  above the field and helper text below.
- **Nav**: charcoal, 74px tall, links in bold 0.95rem, the current page in accent, trial CTA on the right.
- **Footer**: night background, four columns (brand, visit, hours, explore) and a legal row.

## 5. Layout principles
- Container 1200px with 32px gutters (20px under 760, 16px under 560).
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 88 (`--space-1` to `--space-11`).
- Sections are 88px vertical (64px on phones). Section heads sit 40px above content.
- Each page uses a layout family only once: full-bleed hero, trust stats band, split image/text, bento, testimonial
  wall, photo band, price rows, info columns plus map, accent CTA band.

## 6. Depth and elevation
- `--shadow-card`: 0 1px 2px / 0 8px 24px, charcoal at 6 to 8%. Used on tiles, coach cards and the schedule panel.
- `--shadow-pop`: 0 16px 40px, charcoal at 28%. Used on the mobile nav dropdown and the trial form card.
- Radii: buttons 6, inputs 6, cards 10, tags 4. There are no other radii.

## 7. Do's and don'ts
- Do let the photography carry the energy, and keep one accent for actions.
- Do use real, specific copy: prices, hours, coach names, spots left.
- Don't use em or en dashes, emoji, or middle dots as separators.
- Don't use eyebrows on more than one of every three sections, and don't number sections.
- Don't put labels over photos, add decorative dots, use pure black, or wrap a CTA label on desktop.

## 8. Responsive behavior (container queries on `site`)
- 1100: the member login link hides, the class list goes to one column, the bring grid goes to 3 columns.
- 1024: the bento and testimonial wall go to 2 columns, coach cards to 2 columns, footer to 2 columns, amenities to 2.
- 900: the nav collapses to a hamburger with an absolute dropdown under the sticky header.
- 860: split layouts stack, the trust band becomes 2x2, plans stack (max 480px), and schedule rows turn into a
  compact two-line layout (time | class and coach | book and spots) with scrollable day tabs.
- 640: the bento, wall, class rows and coaches go to one column, and the form fields stack.
- 560: the header CTA hides (it stays in the menu) and the hero buttons go full width.

## 9. Agent prompt guide
"Forge Strength Club: charcoal and white gym site with a #ff5a1f accent. Bebas Neue headings at modest sizes,
Manrope body. Radii 6/6/10/4. Use only the tokens on `.site-fitness`, Phosphor bold icons, sentence-case copy,
and no dashes."
