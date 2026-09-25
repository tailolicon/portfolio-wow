# Summit Plumbing & Air: design system

## 1. Visual theme & atmosphere
A dependable local contractor. Deep navy carries the brand (utility bar, page heroes, club band, footer),
white and a cool light gray carry the content, and a single safety-orange accent marks every primary action.
Dense and practical like the best US home-service sites: phone number everywhere, coupons, trust band,
real photography of techs and homes. No decoration that doesn't help someone book a visit.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| --color-navy | #0b2a4f | Brand, headings, dark bands, secondary buttons |
| --color-navy-deep | #081f3b | Hero base, emergency pre-footer |
| --color-navy-mid | #123b6b | Gradient partner for navy bands |
| --color-blue | #1d4f8a | Icons on white, hover on navy buttons, focus ring base |
| --color-blue-soft | #e7eef8 | Icon tiles, avatars, selected radio, tags |
| --color-ink | #15233b | Body text |
| --color-muted | #4b5a73 | Secondary text (AA on white and gray) |
| --color-line / -strong | #dbe2ec / #b9c4d4 | Card borders / input borders |
| --color-surface / -soft | #ffffff / #f2f5f9 | Page / alternating sections |
| --color-accent | #cc5208 | THE accent: primary CTA fill, links, check icons (4.5:1 with white) |
| --color-accent-hover | #b04505 | CTA hover, warning text |
| --color-accent-bright | #f47b2c | Accent on dark backgrounds only, stars, rating bars |
| --color-accent-soft | #fdeee4 | Accent tints (icon circles, emergency note) |
| --color-success / -soft | #1c7a4a / #e5f4ec | Form confirmation, ZIP found |
| --color-on-dark / -muted | #ffffff / #cfdbeb | Text on navy |

## 3. Typography rules
Archivo (display) + Inter (body). Sentence case everywhere.
| Role | Token | Size | Weight | Line-height |
|---|---|---|---|---|
| Hero h1 | --text-hero | clamp 2.4 to 3.5rem | 800 | 1.08 |
| Page h1 | --text-4xl | clamp 2.1 to 2.875rem | 800 | 1.15 |
| Section h2 | --text-3xl | clamp 1.75 to 2.25rem | 700-800 | 1.15 |
| Card title h3 | --text-xl / --text-2xl | 1.3125 / 1.625rem | 700 | 1.15 |
| Small heading | --text-lg | 1.125rem | 700 | 1.25 |
| Body | --text-md | 1rem | 400 | 1.6 |
| Secondary | --text-sm | 0.9375rem | 400-600 | 1.6 |
| Fine print | --text-xs | 0.8125rem | 400-600 | 1.45 |
| Big numbers | --text-display | 4rem | 800-900 | 1 |
Headings use text-wrap: balance; paragraphs use text-wrap: pretty and stay under ~65ch.
Eyebrow (.sv-kicker): uppercase, 0.1em tracking; at most one per page (home "Fall specials").

## 4. Component stylings
- Buttons (.sv-btn): radius --radius-btn 8px, min-height 46px (lg 54, sm 40), Archivo 700, no wrap.
  Orange = primary ("Book service", "Request service", "Claim offer", "Join the club").
  Navy = secondary actions. Outline/white = phone number. Ghost = secondary on navy.
  Hover darkens; :active translateY(1px); :focus-visible 3px bright-orange outline; 200ms transitions.
- Cards: white, 1px --color-line border, --radius-card 12px, --shadow-sm resting, --shadow-md on hover.
- Coupons: 2px dashed border with scissors glyph; lead coupon larger with accent border.
- Inputs: label above, 46px, 1px --color-line-strong, --radius-input 8px, focus = blue border + soft ring.
- Nav: one line, 600 weight, active page gets a 3px accent underline. Header 78px, sticky.
- Footer: navy, four columns, license number repeated in the brand column and copyright line.

## 5. Layout principles
Container 1240px, side padding 32 / 20 / 16px. Spacing scale --space-1..11 =
4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 88px. Sections 88px vertical (60px on phones).
Each page uses each layout family once: hero, trust band, bento with photos, asymmetric coupons,
split image/text, process row, dark club band, testimonial wall, centered story + team row, finance banner,
two-column FAQ.

## 6. Depth & elevation
All shadows tinted with navy: --shadow-sm (cards), --shadow-md (hover, forms), --shadow-lg (floating cards
on photos or navy), --shadow-header (sticky header). No pure black anywhere.

## 7. Do's and don'ts
Do: show the phone number in the utility bar, header, hero, emergency bar and footer. Keep prices real
and specific. Use the accent only for actions, stars and key highlights.
Don't: add a second accent color, pill buttons, labels overlaid on photos, section numbering,
em/en dashes, Title Case headings, or claim photos show something they don't.

## 8. Responsive behavior (container queries on `site`)
- 1200px: header drops "Call 24/7" caption. 1100px: nav collapses to hamburger dropdown.
- 1024px: hero form stacks under copy; two-column grids (club, coupons, FAQ, reviews, quote) stack;
  trust band 2x2; team 2x2; service grid 2 columns.
- 760px: header phone hides (utility bar keeps it); all grids single column; process becomes icon list.
- 480px: form rows single column, full-width hero buttons, trust band stacked.

## 9. Agent prompt guide
"Navy #0b2a4f contractor brand, white/#f2f5f9 surfaces, one orange accent #cc5208 for actions.
Archivo 700-800 headings in sentence case, Inter body. 8px buttons, 12px cards, 8px inputs.
Navy-tinted shadows. Use only tokens from services.css."
