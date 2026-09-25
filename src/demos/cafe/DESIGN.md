# Hearth & Honey Coffee Co. design system

## 1. Visual theme and atmosphere
A neighborhood café in Asheville that has been open for twelve years. It should feel lived-in and confident, not
trendy. Deep forest green, the color of the shop's awning and the Blue Ridge, carries the brand. The canvas is
a clean, slightly green off-white rather than cream. Honey amber is the only accent, and it marks every primary
action (Order ahead, Subscribe, Request a quote). The site trusts photography of the real shops, cups and
pastry case. Type is a friendly grotesque with modest sizes. Nothing decorative that a café owner wouldn't put
on their own sign.

## 2. Color palette and roles
| Token | Hex | Role |
|---|---|---|
| `--color-forest` | #1f3b2d | Brand. Headings, footer, stats band, Honey Card panel, active nav |
| `--color-forest-mid` | #2a4d3b | Raised elements on forest (stamps, social circles) |
| `--color-forest-deep` | #183024 | Text on honey buttons |
| `--color-honey` | #e0a23a | THE accent. Primary CTA fill, stars, focus ring, link underline |
| `--color-honey-press` | #cf9028 | Primary CTA hover |
| `--color-honey-text` | #8a5a10 | Honey used as text on light surfaces (AA contrast) |
| `--color-canvas` | #fbfbf8 | Page background |
| `--color-bone` | #f2f3ee | Alternate section wash, info boxes |
| `--color-mint` | #e6ece4 | Newsletter band, tags, today row, nav hover |
| `--color-white` | #ffffff | Cards, form surfaces |
| `--color-line` / `--color-line-strong` | #d8ded5 / #b4bfb3 | Dividers / input borders |
| `--color-ink` | #1c2a22 | Body text (never pure black) |
| `--color-muted` | #4f5e56 | Secondary text |
| `--color-on-dark` / `--color-on-dark-soft` | #dfe7de / #b3c2b6 | Text on forest |

## 3. Typography rules
Display: Bricolage Grotesque. Body: DM Sans. No serif, no italics in headings.

| Role | Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| H1 | `--text-h1` | clamp(2.3rem, 4.3cqi, 3.5rem) | 700 | 1.05 | -0.025em |
| H2 | `--text-h2` | clamp(1.75rem, 3cqi, 2.4rem) | 700 | 1.15 | -0.025em |
| H3 / card title | `--text-lg` | 1.3rem | 700 | 1.15 | -0.015em |
| Stat numbers | `--text-stat` | clamp(2rem, 3.2cqi, 2.6rem) | 700 | 1.1 | -0.015em |
| Lead | `--text-md` | 1.15rem | 400 | 1.6 | 0 |
| Body | `--text-base` | 1.0625rem | 400 | 1.6 | 0 |
| Small / meta | `--text-sm` | 0.93rem | 400-600 | 1.5 | 0 |
| Eyebrow (rare) | `--text-xs` | 0.85rem | 700 uppercase | 1.4 | 0.08em |
| Diet tag | `--text-2xs` | 0.72rem | 700 | 1.4 | 0 |

Headings use sentence case and `text-wrap: balance`; paragraphs use `text-wrap: pretty`, max ~60ch.

## 4. Component stylings
- **Primary button**: honey fill, forest-deep text, pill, 48px tall, `--shadow-cta`. Hover: honey-press.
  Active: translateY(1px). Focus: 3px honey outline, 2px offset.
- **Ghost button**: 2px forest border, forest text. Hover: forest fill, white text.
- **Light button** (on photos only): white border and text. Hover: white fill, forest text.
- **Text link**: forest, bold, honey underline 2px; arrow gap widens on hover.
- **Card**: white, 1px line border, `--radius-card` 14px, optional `--shadow-card`. Images inside are clipped by the card.
- **Input**: white, 1px line-strong border, `--radius-input` 8px, 46px tall, label above in 600 weight, helper below.
- **Nav**: one line, pill links, mint background on hover and current page; header 76px, sticky, glass canvas.
- **Footer**: forest background, logo, two location columns with hours, link column, legal row.
- **Tags/chips**: mint fill, forest text, pill (amenities) or 8px (diet tags).

## 5. Layout principles
- Container 1200px, gutter clamp(16px, 4cqi, 40px).
- Spacing scale (4px base): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 as `--space-1` to `--space-11`.
- Section rhythm: `--space-section` clamp(56px, 8cqi, 96px); tight sections `--space-section-tight`.
- Each page uses a layout family once: full-bleed hero, trust band, bento, split, duo panels, CTA strip,
  review wall, photo grid, stats row, photo band, list, timeline, icon grid, form split, FAQ accordion.

## 6. Depth and elevation
- `--shadow-card`: 0 1px 2px rgba(31,59,45,.06), 0 10px 30px -12px rgba(31,59,45,.22). Forest tinted.
- `--shadow-cta`: 0 6px 16px -8px rgba(160,104,16,.6). Honey tinted, primary buttons only.
- Everything else is flat with 1px borders. No black shadows.

## 7. Do's and don'ts
- Do use honey only for primary actions, stars, and focus. Do use real shop photos.
- Do write like the owners: specific prices, days, street names.
- Don't use em or en dashes, exclamation marks in confirmations, or more than one middle dot per line.
- Don't overlay labels on photos, number sections, or use more than 1 eyebrow per 3 sections.
- Don't introduce new radii, hex values, or font sizes outside the tokens.

## 8. Responsive behavior (container queries on `site`)
- ≤1100px: header phone number hides.
- ≤1024px: footer 2 columns; bento becomes feature on top plus two cards; menu aside moves below the menu;
  4-up grids become 2-up; location card puts details on top with photo and map side by side.
- ≤860px: nav collapses to a hamburger with a dropdown panel; all splits stack; review wall 1 column.
- ≤560px: header 66px and hides the Order ahead button (it lives in the menu panel); every grid is 1 column;
  hero overlay switches to a vertical gradient; buttons in rows stretch to full width.

## 9. Agent prompt guide
"Build a section for Hearth & Honey using `.site-cafe` tokens only: forest headings in Bricolage Grotesque,
DM Sans body in ink/muted, white 14px cards with 1px line borders, pill buttons with honey as the single
accent. Plain, specific copy in the owners' voice. No dashes, no decorative labels."
