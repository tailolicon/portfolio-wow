# Wren & Volt: design system

## 1. Visual theme & atmosphere
An independent Brooklyn brand and motion studio. The site behaves like a studio reel with a real business
underneath: an off-black stage for the work, off-white paper for reading, and one hot signal orange that only
ever means "act here" (primary CTA, active filter, focus, selection). The client work supplies all other color.
Typography is loud at the top of the hierarchy (heavy Bricolage Grotesque, tight tracking, poster scale) and
quiet everywhere else (DM Sans at modest sizes). Motion is purposeful: a typographic vortex reel in the home
hero, a live liquid form in each case study's motion section, and gentle reveal-on-scroll for everything else.

## 2. Color palette & roles
| Token | Hex | Role |
|---|---|---|
| `--wv-ink` | `#0f0f0e` | Off-black. Stage background, body text on paper |
| `--wv-ink-2` | `#181817` | Raised dark surface (cards on stage, footer blocks) |
| `--wv-ink-3` | `#262624` | Dark hairlines, input borders on stage |
| `--wv-paper` | `#f0efec` | Off-white paper. Reading sections, text on stage |
| `--wv-paper-2` | `#e4e3df` | Paper surface (form fields, table stripes) |
| `--wv-line` | `#cfcdc8` | Hairline on paper |
| `--wv-mute` | `#6b6a66` | Secondary text on paper (AA on paper) |
| `--wv-mute-dark` | `#9a9993` | Secondary text on stage (AA on ink) |
| `--wv-volt` | `#ff4f1f` | The accent. Primary CTA, active states, focus ring |
| `--wv-volt-deep` | `#e23d0f` | Accent hover/pressed |
| `--wv-shadow` | `rgba(15,15,14,.18)` | Tinted shadow, only on the mobile menu panel |
Never introduce a second accent. Client colors live inside project visuals only.

## 3. Typography rules
Display: Bricolage Grotesque (opsz 96, 700-800). Body/UI: DM Sans (400/500/600).
| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Display XL (home hero) | clamp(3rem, 9cqi, 8.5rem) | 800 | 0.9 | -0.045em |
| Display L (page titles) | clamp(2.6rem, 6.4cqi, 6rem) | 800 | 0.94 | -0.04em |
| Heading M (section) | clamp(1.9rem, 3.6cqi, 3.2rem) | 700 | 1.0 | -0.03em |
| Heading S (card title) | 1.375rem | 700 | 1.15 | -0.015em |
| Statement | clamp(1.5rem, 2.8cqi, 2.5rem) | 600 | 1.18 | -0.02em |
| Body L | 1.1875rem | 400 | 1.55 | 0 |
| Body | 1rem | 400 | 1.6 | 0 |
| Small / meta | 0.875rem | 500 | 1.45 | 0 |
| Label (buttons, filters) | 0.9375rem | 500 | 1 | 0 |
Headings: sentence case, `text-wrap: balance`. Paragraphs: `text-wrap: pretty`, max 62ch.
Client logotypes are set per project (Archivo, Bebas Neue, Bodoni Moda, Jost, Manrope, Cormorant) and never
used for the studio's own UI.

## 4. Component stylings
- Button primary: volt background, ink text, pill radius, 48px tall, 0 22px padding, arrow icon on the right
  nudges 3px on hover, background deepens to volt-deep. One label per intent: "Start a project".
- Button secondary: transparent, 1px current-color border at 35% alpha, pill; hover fills paper/ink.
- Text link: underline offset 4px, underline thickness 1px, turns volt on hover.
- Filter chip: pill, 40px, hairline border; active = volt fill + ink text; count in muted tabular numerals.
- Project card: media 4px radius, image scales 1.04 on hover over 700ms, client logotype sits on the media;
  below: client (Heading S), project line, disciplines + year in meta.
- Inputs: 4px radius, 48px tall, paper-2 fill, 1px line border, label above (Small 500), helper below.
  Focus: 2px volt outline, 2px offset. Error text in ink with volt left rule.
- Nav: sticky, 68px, ink background, wordmark left, links center-right, primary CTA right. Active link has
  a 2px volt underline. Collapses to a menu button under 820px container width.
- Footer: ink, oversized wordmark, three info columns, legal row.

## 5. Layout principles
Spacing scale (rem): 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8. Section padding: clamp(4rem, 9cqi, 8rem).
Container: max 1360px, gutter clamp(1rem, 4cqi, 3rem). 12-column grid, 24px gutter.
Every page mixes layout families (hero, asymmetric grid, statement, wall, split, table, accordion); a family
is used at most once per page.

## 6. Depth & elevation
Flat. Depth comes from stage/paper contrast and photography, not shadows. Only the mobile menu panel uses
`0 24px 48px var(--wv-shadow)`. Media never gets shadows.

## 7. Do's and don'ts
Do: let project imagery carry color; keep the volt accent rare; set client marks in real type; give each
project real facts (year, disciplines, credits, outcomes).
Don't: eyebrow labels over every section, section numbers, marquee strips, pills over photos, gradient text,
glow effects, em dashes, stock-sounding superlatives, fake UI screenshots built from divs.

## 8. Responsive behavior
Container queries on `site` only. Breakpoints: 1100px (grids collapse 12 -> 8), 820px (mobile nav, two-column
layouts stack), 520px (single column, display sizes clamp down). Touch targets >= 44px. Hero stays within the
first viewport at every width; the vortex scene sits behind the copy on small widths at reduced opacity.

## 9. Agent prompt guide
"Wren & Volt page: off-black stage #0f0f0e and off-white paper #f0efec, one accent #ff4f1f used only for
primary action and active state. Bricolage Grotesque 800 display with -0.04em tracking, DM Sans body.
Pill buttons, 4px media radius, no shadows. Work imagery composes a photo or gradient with the client's
logotype set in type. Copy is short, direct, first person plural, no hype words."
