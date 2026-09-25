# Harper & Reyes Law: design system

## 1. Visual theme & atmosphere
A well-run regional law firm, not a corporate consultancy. Calm, established, plain-spoken. White-ivory canvas,
deep navy for authority, one deep teal-green accent that carries every primary action. Serif headings at regular
weight feel classic without shouting; a humanist sans keeps body copy easy to read for stressed, non-legal
readers. Photography (offices, signing, client meetings, real headshots) does the emotional work. No gold, no
gavels, no marble clichés.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--color-navy` | #14284b | Brand. Headings, dark bands, page heroes, stars |
| `--color-navy-deep` | #0e1d38 | Top bar, footer, hero overlay |
| `--color-accent` | #1b6a60 | The only accent. Primary CTAs, links, active nav, icons |
| `--color-accent-hover` | #155850 | Hover/pressed accent |
| `--color-accent-soft` | #e3efec | Accent tint fills (fee note, success icon) |
| `--color-accent-on-dark` | #a9d3cb | Accent text on navy |
| `--color-canvas` | #fcfcfa | Page background (ivory-white) |
| `--color-surface` | #ffffff | Cards, header, form panels |
| `--color-surface-tint` | #f1f4f7 | Alternate section background (cool gray-blue) |
| `--color-hairline` | #dce3ea | Borders, dividers |
| `--color-border-input` | #b3bfcd | Form control borders |
| `--color-ink` | #37424f | Body text (slate) |
| `--color-muted` | #5a6574 | Secondary text (AA on canvas and tint) |
| `--color-on-dark` | #ffffff | Headings on navy |
| `--color-on-dark-body` | #d4dde8 | Body on navy |
| `--color-on-dark-muted` | #a8b6c9 | Small print on navy |
| `--color-line-on-dark` | rgba(255,255,255,.16) | Dividers on navy |

## 3. Typography rules
Headings: Libre Baskerville. Body/UI: Source Sans 3. Sentence case everywhere.

| Role | Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display (home hero h1) | `--text-display` | 3.25rem | 400 serif | 1.15 | -0.01em |
| Page title (inner h1) | `--text-h1` | 2.5rem | 400 serif | 1.2 | -0.01em |
| Section heading | `--text-h2` | 2rem | 400 serif | 1.25 | 0 |
| Sub-section heading | `--text-h2-sm` | 1.625rem | 400 serif | 1.3 | 0 |
| Card / item title | `--text-h3` | 1.3125rem | 700 serif | 1.3 | 0 |
| Small title | `--text-h4` | 1.125rem | 700 sans | 1.35 | 0 |
| Lead paragraph | `--text-lead` | 1.1875rem | 400 sans | 1.6 | 0 |
| Body | `--text-body` | 1.0625rem | 400 sans | 1.6 | 0 |
| Small / meta | `--text-sm` | 0.9375rem | 400 sans | 1.5 | 0 |
| Fine print / eyebrow | `--text-xs` | 0.8125rem | 700 sans | 1.4 | 0.08em (eyebrow only) |
| Stat figure | `--text-stat` | 1.875rem | 400 serif | 1.2 | 0 |
| Rating figure | `--text-rating` | 3.5rem | 400 serif | 1 | 0 |
Paragraphs max 65ch. Headings `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## 4. Component stylings
- **Primary button** (`.lw-btn-accent`): accent fill, white text, 6px radius, 48px min height, 600 weight.
  Hover: accent-hover + soft accent shadow. Active: translateY(1px). Focus: 3px accent outline, 2px offset.
- **Outline button**: 1.5px navy border, navy text; hover fills navy. **Ghost** (on navy/photo): white 60% border.
- **Text link with arrow**: accent, 700, arrow gap widens on hover.
- **Cards**: surface, 1px hairline, 10px radius, `--shadow-sm`; hover lifts to `--shadow-md`.
- **Inputs**: 46px, 6px radius, input border, label above (600, navy), helper text below in muted.
  Focus: accent border + 3px accent ring at 20%.
- **Nav**: white bar 78px, links navy 600; active link accent with 2px underline. Phone block + one CTA at right.
- **Footer**: navy-deep, four columns, legal block with Attorney Advertising text and privacy disclosure.
- **CTA labels**: consultation intent is always "Free consultation"; calls always show the number.

## 5. Layout principles
- Container 1200px, side padding 32px (20px under 760px).
- Spacing scale: `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 64, `-9` 88 (px).
- Sections: 88px vertical (60px on phones), alternating canvas / tint. One navy band per page at most besides
  the page hero, CTA band and footer.
- Layout families per page are never repeated (split, bento, sticky-head list, timeline row, dark band,
  testimonial stack, portrait row, form split).

## 6. Depth & elevation
- `--shadow-sm`: 0 1px 2px navy/6%, 0 8px 24px navy/7% (cards, images)
- `--shadow-md`: 0 2px 4px navy/6%, 0 18px 44px navy/12% (hover, form panel, dropdown)
- Header: hairline + very soft navy shadow. Never black shadows.
- Radii: `--radius-btn` 6px, `--radius-input` 6px, `--radius-card` 10px. Nothing else.

## 7. Do's and don'ts
- Do write like the partners talk: specific counties, real processes, plain English.
- Do show the phone number in the header, hero, sidebars, CTA band and footer.
- Do include "Past results do not guarantee a similar outcome" wherever results appear.
- Don't use gold/brass, gavel or scales as decoration, em dashes, stacked eyebrows, numbered steps, or
  award badges from real organizations.
- Don't put labels over photos. Don't use more than one accent.

## 8. Responsive behavior (container queries on `site`)
- ≤1220px: header phone block hides (CTA stays).
- ≤1000px: nav collapses to burger dropdown; footer 2 columns; multi-column grids go to 2 columns;
  sidebars drop below content; sticky elements become static.
- ≤760px: single column for splits, forms and grids; section padding 60px; type steps down one size.
- ≤560px: header CTA replaced by call icon button; footer 1 column; top bar shows only the 24/7 line.

## 9. Agent prompt guide
"Harper & Reyes Law: ivory-white canvas (#fcfcfa), navy (#14284b) for authority, one teal-green accent
(#1b6a60) for every action. Libre Baskerville 400 headings, Source Sans 3 body at 17px. 6px buttons and
inputs, 10px cards, soft navy-tinted shadows. Calm, specific, bilingual-friendly copy. Use tokens only."
