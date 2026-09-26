# Oyelaran Hart Architects: design system

## 1. Visual theme & atmosphere
Editorial restraint. The photography carries the site; type sits quietly beside it on a precise
12-column grid. Off-white paper, near-black ink, generous white space, square corners. Nothing moves
unless it helps: images fade up once, hovers are slow and small. It should read like a well-made
monograph: calm, exact, confident enough to leave space empty.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--oh-paper` | `#f3f3f0` | Page canvas (neutral off-white, not cream) |
| `--oh-paper-2` | `#e9e9e5` | Image placeholder, input fill, subtle panels |
| `--oh-ink` | `#171716` | Headings, primary text, primary button |
| `--oh-body` | `#45453f` | Paragraph text |
| `--oh-mute` | `#6f6f68` | Metadata, captions, labels (AA on paper at 14px+) |
| `--oh-line` | `#d6d6d0` | Hairline rules between rows and in tables |
| `--oh-line-strong` | `#a9a9a2` | Input borders, active rules |
| `--oh-accent` | `#b2442b` | Oxide red. Active filter, focus ring, link hover, status "On site". Nothing else |
| `--oh-on-ink` | `#f3f3f0` | Text on ink surfaces and over photography |
| `--oh-shade` | `rgb(23 23 22 / 0.45)` | Photo scrim at the bottom of the hero only |

One accent only. It appears in small quantities (a rule, a word, a focus ring), never as a fill larger than a button.

## 3. Typography rules
Family: **Manrope** for everything (loaded at 400 to 800). Data (years, areas, counts) uses `font-variant-numeric: tabular-nums`
and the `data` role. Sentence case throughout. No italics for display.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| display | clamp(2rem, 1.2rem + 2.6cqi, 3.25rem) | 400 | 1.08 | -0.02em |
| title | clamp(1.5rem, 1.1rem + 1.2cqi, 2.125rem) | 400 | 1.15 | -0.015em |
| heading | 1.25rem | 500 | 1.3 | -0.005em |
| lead | clamp(1.125rem, 1rem + 0.5cqi, 1.375rem) | 400 | 1.45 | -0.005em |
| body | 1rem | 400 | 1.6 | 0 |
| small | 0.875rem | 400 | 1.5 | 0 |
| data | 0.8125rem | 500 | 1.4 | 0.01em, tabular |
| label | 0.75rem | 500 | 1.3 | 0.06em uppercase (used sparingly) |

## 4. Component stylings
- **Nav**: 72px sticky bar on paper with a hairline under it. Wordmark left ("Oyelaran Hart" in 500),
  links right in `small`. Active link: ink with a 1px accent underline offset 6px. Hover: ink.
- **Primary button**: ink fill, paper text, 0 radius, 48px tall, 0 22px padding, `small` 500. Hover: accent fill.
- **Text link**: ink text with 1px underline in `--oh-line-strong`; hover turns underline and text accent.
  Used for "View project", "All projects". Trailing arrow icon (Phosphor, light weight) only on these.
- **Filter button**: text only, `small`, mute. Active: ink with accent underline. Count in `data` after label.
- **Project tile**: image (fixed aspect ratio per layout), then name in `heading` and a data line
  "Location, Year". Hover: image scales 1.02 over 900ms, name gets underline.
- **List row**: 5-column grid, 1px hairline top, 18px vertical padding, hover paper-2 background.
- **Inputs**: label above (`small` 500 ink), 48px field, paper-2 fill, 1px line-strong bottom border only,
  0 radius. Focus: 2px accent outline offset 2px. Helper/error below in `small`.
- **Footer**: ink surface, paper text, four columns: studios, contact, navigation, legal.

## 5. Layout principles
- Spacing scale (rem): 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 10. Section rhythm: 8rem desktop, 4.5rem phone.
- Container: max 1440px, side gutter clamp(1rem, 3.5cqi, 3rem). Full-bleed images ignore the gutter.
- 12-column grid, 24px gap (16px on phone). Text columns never exceed 62ch.
- Image aspect ratios: 3/2 landscape, 4/5 portrait, 16/9 wide, 21/9 panorama. Always `object-fit: cover`.

## 6. Depth & elevation
Flat. No card shadows. Only the mobile nav panel lifts, with `0 18px 40px rgb(23 23 22 / 0.12)`.
Hierarchy comes from scale, space and hairlines, not from shadow or color.

## 7. Do's and don'ts
Do: let one big photograph fill the width; align everything to the grid; use hairlines to structure data;
state facts plainly (area, year, client); leave empty columns.
Don't: round corners; add a second accent; put labels on photos; use more than one eyebrow per
three sections; animate type; use icons except arrows and the view toggle; use em or en dashes.

## 8. Responsive behavior
Container queries on `site`. Breakpoints: 1100px (4-col grids go 2-col, facts panel stacks below title),
820px (nav collapses to a menu button with an absolute panel, list view drops the status column),
560px (all grids single column, gutters 16px, section rhythm 4.5rem). Type uses cqi clamps.
Touch targets at least 44px.

## 9. Agent prompt guide
"Build a page for Oyelaran Hart Architects on off-white `#f3f3f0` with ink `#171716`, Manrope only,
square corners, 12-col grid, big photography at 3/2 or 21/9, metadata in tabular `data` style with
hairline rules. The oxide red `#b2442b` marks active states only. Sentence case, short factual copy,
British spelling."
