# Portfolio Design System

Markdown rendering of [`docs/Portfolio design system.pdf`](./docs/Portfolio%20design%20system.pdf) (9 boards). This file is the canonical, text version of that document; the PDF remains the visual reference.

> A portfolio system for a software engineer. Cream paper, coal ink, heavy editorial serifs, and spacing math borrowed from Apple.

## Contents

1. [Foundations](#1-foundations)
2. [Color](#2-color)
3. [Type](#3-type)
4. [Scale](#4-scale)
5. [Spacing](#5-spacing)
6. [Radius](#6-radius)
7. [Controls](#7-controls)
8. [Content](#8-content)
9. [Bento](#9-bento)

---

## 1. Foundations

### The brief (assumptions, edit freely)

| | |
|---|---|
| **Audience — Skimmers** | Recruiters, engineers and clients who give a portfolio about thirty seconds. |
| **The one job** | Open a project, or send an email. Everything else on the page exists to make one of those two clicks easy. |
| **The feeling** | Warm, sure of itself, serious about craft. Printed, not rendered. Inky, not techy. |
| **Done looks like** | Ten seconds. A stranger finds a project and the contact link without scrolling back up. |

### Six principles (every later board follows these)

1. **Ink first** — Heavy serifs carry the personality. Everything around them stays quiet.
2. **Two surfaces, no gradients** — Cream paper and coal ink. Sand is the recess in between. Depth comes from nesting, not shadows.
3. **Nothing thin** — No weight under 400. Subtitles and secondary text start at 500. No light, no monospace labels.
4. **Concentric corners** — An inner radius is the outer radius minus the padding between them. Never the same number twice.
5. **One spacing scale** — Steps of 4px on an 8px grid. If a number is not on the scale, it is wrong.
6. **Gap equals padding** — Inside a panel, the gap between cards matches the panel's padding. Ember is a pinprick, used once per screen.

### Borrowed from Apple (what they do, and what we do with it)

| Idea | What Apple does | What we do |
|---|---|---|
| Concentric corners | SwiftUI sets a concentric corner's radius to the container's radius minus the distance between the two corners. When that reaches zero, the corner is square. | Inner radius = outer radius − padding, with a 4px floor so nothing ever goes fully square. |
| Grid and targets | An 8pt grid on iOS and macOS, and a 44 × 44pt minimum tap target. | Spacing moves in 4px steps on an 8px grid. Every tap target is at least 44px. |
| Weights | The Human Interface Guidelines say to avoid Ultralight, Thin and Light, and to prefer Regular, Medium, Semibold or Bold. | Nothing under 400. Subtitles and secondary text start at 500. |
| Tracking | The system font adjusts tracking at every point size: tighter as type gets bigger, looser as type gets smaller. | Display −0.04em, body 0, captions +0.01em, small caps labels +0.12em. |
| Continuous corners | Apple's corners are continuous curves, often called squircles, not plain circular arcs. | Squircle corners where the browser supports them, a normal radius everywhere else. |

Sources: Apple's SwiftUI concentric corner docs and Human Interface Guidelines. Apple.com type sizes come from third-party extractions, so read them as a reference, not a spec.

---

## 2. Color

Cream and coal do almost all the work. Ember is a pinprick. Every pair below was checked against the WCAG contrast formula.

### Surfaces — four grounds, one dark moment

| Name | Hex | Role |
|---|---|---|
| Cream | `#F4EEE3` | Ground. The page itself, most of what you see. |
| Paper | `#FBF8F1` | Raised. Cards that sit on sand panels. |
| Sand | `#E9E1D1` | Recess. The panel that holds a bento of paper cards. |
| Coal | `#151412` | Ink for text, and the dark ground for one panel per page. |

### Text, accent and lines — each color has exactly one job

| Name | Hex | Role |
|---|---|---|
| Stone | `#5E5A52` | Secondary text on cream, paper and sand. |
| Ash | `#A8A296` | Secondary text on coal only. |
| Ember | `#B4421C` | Accent on cream and paper. Focus, hover, one mark. |
| Ember glow | `#F08A5D` | The same accent, tuned for coal. |
| Line | Coal at 16% | Hairlines and rings on light grounds. |
| Line on coal | Cream at 18% | Hairlines and rings on coal. |

### How much of each (rough share of any screen)

Cream 58% · Paper 10% · Sand 8% · Coal 20% · Ember 4%

### Contrast, checked (AAA is 7 and up, AA is 4.5 and up)

| Pair | Ratio | Grade |
|---|---|---|
| Coal on cream | 15.94 | AAA |
| Coal on paper | 17.36 | AAA |
| Coal on sand | 14.16 | AAA |
| Stone on cream | 5.94 | AA |
| Stone on paper | 6.47 | AA |
| Stone on sand | 5.28 | AA |
| Ember on cream | 4.87 | AA |
| Ember on paper | 5.30 | AA |

---

## 3. Type

Heavy, inky serifs for headlines. A sturdy humanist sans for everything you read. Nothing thin, nothing monospaced.

### Display: pick your ink (Fraunces is the default, three alternates to compare)

- **Fraunces (default)** — Variable, weight and softness axes. One variable file covers every weight plus a softness axis. Heavy cuts spread like ink on newsprint.
- **Besley (alternate)** — Variable, 400 to 900. A Clarendon-style serif. Sturdier and more newspaper, a little more serious than Fraunces.
- **Young Serif (alternate)** — Single weight. One weight that is already heavy. Warm and simple to ship, with no axes to manage.
- **Caprasimo (alternate)** — Single weight. Cooper-style and the most inky of the four. Playful, so keep it to a few big words.

### Fraunces, weight by weight (weight steps down as size steps down)

| Weight | Used for |
|---|---|
| 600 Semibold | Serif accents under 24px, only when the sans would feel too plain. |
| 700 Bold | Card titles and H3, 28px and below. |
| 800 ExtraBold | Section headings, H1 and H2 at 56px and 40px. |
| 850 Signature | Display sizes, 88px and 128px. The default for anything that has to feel inky. |
| 900 Black | One huge word at 160px or more, like a closing "Say hello." |

### Softness axis (sharp to bubbly)

`SOFT 0` (sharp) · `SOFT 50` (default) · `SOFT 100` (bubbly)

### Optical size axis (small cut to display cut)

`opsz 9` (sturdy) · `opsz 144` (fine hairlines). Browsers set the optical size from the font size on their own, so display sizes pick the fine cut and small sizes pick the sturdy one. Leave it on auto.

### Open Sans, the reading voice

Swap-in is a one-line change if you prefer another sans.

---

## 4. Scale

Eleven steps, tuned against Apple's own sizes. The bigger the type, the tighter the tracking and the line height.

### The eleven steps (shown at real size)

| Role | Specimen / use | Spec |
|---|---|---|
| Display XL — Hero headline | Software | Fraunces 850, 128px / 0.92 · tracking −0.04em. One per page, at the very top. |
| Display L — Page titles | Carefully | Fraunces 850, 88px / 0.95 · tracking −0.035em. Board titles, case study titles, closing words. |
| H1 — Section heading | Selected work | Fraunces 800, 56px / 1.0 · tracking −0.03em. Apple.com uses 56 / 1.07 for its headlines. |
| H2 — Sub-section | Notes and toolbox | Fraunces 800, 40px / 1.08 · tracking −0.025em. Apple.com uses 40 / 1.10. |
| H3 — Card title | Project one, built in public | Fraunces 700, 28px / 1.14 · tracking −0.02em. Apple.com uses 28 / 1.14. |
| Lead — Subtitle | I build software that holds up, and looks like it means it. | Open Sans 500, stone, 21px / 1.45 · tracking −0.01em. Sits under a headline. 21px appears in Apple.com's scale. |
| Body L — Article text | Most of my time goes into software that feels finished: quick to load, clear to read. | Open Sans 400, coal, 19px / 1.6 · tracking −0.005em. Long reading, case studies and notes. |
| Body — Default text | Most of my time goes into software that feels finished: quick to load, clear to read. | Open Sans 400, coal, 17px / 1.5 · tracking 0. Matches iOS Body at 17pt. |
| Small — Card description | What it is, who it's for, and the part I'm proudest of. | Open Sans 500, stone, 15px / 1.5 · tracking 0. Matches iOS Subhead at 15pt. |
| Caption — Meta, footnotes | Written November 2026 · 4 min read | Open Sans 600, stone, 13px / 1.4 · tracking +0.01em. Matches iOS Footnote at 13pt. The smallest size for sentences. |
| Kicker — Label above a title | SELECTED WORK | Open Sans 700, caps, 12px / 1.33 · tracking +0.12em. Ember on cream or paper, or stone. Never on sand. |

Apple.com sizes (21, 28, 40, 56 with line heights 1.07 to 1.19) come from a third-party extraction of its styles. iOS Body 17pt, Subhead 15pt and Footnote 13pt are Dynamic Type defaults.

### Why tracking tightens (Apple's system font does this at every size)

- DISPLAY AT 128PX: tracking 0 feels loose at this size; −0.04em is tight, even, inky.
- CAPS LABEL SCALED UP TO 40PX: tracking 0 makes capitals crowd each other; +0.12em gives capitals air.

Pattern: −0.04em at 128, −0.03em at 56, −0.02em at 28, 0 at 17, +0.01em at 13, +0.12em for caps.

---

## 5. Spacing

One scale in steps of 4px, sitting on an 8px grid. Every gap, padding and margin is a step on it, or it does not ship.

### The scale (twelve steps, shown at 1:1)

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96 · 128`

| Token | Value | Where it goes |
|---|---|---|
| space-1 | 4px | An icon and its label. Fine optical nudges. |
| space-2 | 8px | Padding around an inset inside a bento card. Gap between a card title and its description. |
| space-3 | 12px | Bento panel padding, and the gap between bento cards. Kicker to title. |
| space-4 | 16px | Title to paragraph. Gap between buttons. Padding inside small cards. |
| space-5 | 20px | Paragraph to paragraph. Page side padding on phones. |
| space-6 | 24px | Grid gutter on desktop. Padding in text cards. |
| space-7 | 32px | A section heading to its content. Vertical padding of a list row. |
| space-8 | 40px | A hero headline to its intro paragraph. |
| space-9 | 48px | Page side padding on desktop. Padding inside large panels and the sheet gutters on these boards. |
| space-10 | 64px | Between groups inside a section. Section gap on tablets. |
| space-11 | 96px | Between sections on desktop. |
| space-12 | 128px | Hero top and bottom padding. The one time you want a lot of air. |

Apple's platforms use an 8pt grid. The 4, 20 and 40 steps are the half-steps its web styles lean on as well.

### The page and its grid (twelve columns, content never wider than 1200px)

A 1440px window, scaled to fit. The container is 1296px wide and centered, with 48px of padding on each side, which leaves 1200px for content. Wider windows just grow the 72px margins.

The twelve columns at 1:1: 78px columns, 24px gutters.

---

## 6. Radius

The nested-corner math Apple uses. Subtract the padding from the outer radius and every curve shares one center.

### The formula

```
inner = outer − padding
```

And the other way round: `outer = inner + padding`. Curves that share a center stay the same distance apart all the way round. Give a nested shape the same radius as its container and the gap swells at every corner, which the eye reads as a bump.

Apple's SwiftUI documents the same rule: a concentric corner's radius is the container's radius minus the distance between the two corners, and a result of zero means a square corner.

Inner radius = outer radius − padding, with a 4px floor so nothing ever goes fully square.

### Wrong, then right (same container, same padding, one number different)

- **Wrong** — `64 inside 64`. The inner corner is as round as the outer one, so the gap fattens at each corner and the shape looks like it is floating loose.
- **Right** — `64 − 32 = 32`. The gap is the same width along the edges and around the corners. The inner shape looks seated, like a machined bezel.

### The radius ladder (five levels, each one the last minus its padding)

| Token | Radius | Padding in | Used for |
|---|---|---|---|
| radius-panel | 40px | 12px | Bento panels, hero containers, the dark footer panel. |
| radius-card | 28px | 8px | Cards inside a panel. Standalone cards on the page too. |
| radius-inset | 20px | 8px | Images, code panels and swatches set inside a card. |
| radius-item | 12px | 8px | Inputs, small thumbnails, tags that are not pills. |
| radius-floor | 4px | none | The lowest a corner goes. Anything below becomes square. |

Shown at 1:1: sand panel, paper card, coal inset, cream item, stone block. Each level is drawn with the `calc()` it would use in code.

---

## 7. Controls

Buttons, chips, navigation and forms, each in every state. Pills are exempt from the radius math. Everything else follows it.

### Buttons (three sizes, none under 44px tall)

States: default, hover, pressed, focus, disabled. Variants: Primary, Secondary, Quiet, Icon (44px).

| Size | Height | Use |
|---|---|---|
| Large | 56px | Hero actions |
| Default | 48px | Most places |
| Small | 44px | The minimum |

### Chips and tags (sentence case, never monospace)

- **Tags, not interactive** — 28px tall. Because nobody can tap them, they are allowed to be small. Filled, soft or ringed, nothing more. (e.g. TypeScript, Postgres, Design systems)
- **Filter chips, interactive** — 44px tall. Selected is never colour alone: it flips to coal and gains a check mark. States: default, hover, selected, focus, disabled. (e.g. All work, Web apps, Tools, Open source)

### Navigation (a pill inside a pill, so no radius math needed)

Desktop bar is 60px tall: 44px items with 8px of padding. Current page is shown by fill and by `aria-current`, so it never depends on colour alone. States: current page (coal fill), hover (sand fill), default.

Phone: menu opens to a vertical list (Work, Notes, About, Get in touch).

### Forms (visible labels, human error messages)

Field states: default, focus, disabled. 52px tall, 17px text so phones do not zoom, 12px corners. The ring is stone, which keeps 5.94 to 1 against the page so the edge is easy to find. Labels marked required with `*`.

---

## 8. Content

The reusable blocks a page is built from: the masthead, rows, cards, quotes, code, and the one dark panel.

### Masthead and hero (shown here at Display L; the hero itself uses Display XL)

Layout example:

```
Andréi        Work   Notes   About            Get in touch

ISSUE 01      A PORTFOLIO OF SOFTWARE          NOVEMBER 2026

Software,
carefully edited.

I'm Andréi, a software engineer. I build [what you build]
and sweat the details most people never notice.

[See selected work]   [About me]
```

### List rows (default, then hover)

```
01
          Project one                                              [Stack] [Stack]     [Year]
          What it is, who it's for, and the part you're proudest of.

02
          Project two                                              [Stack] [Stack]     [Year]
          What it is, who it's for, and the part you're proudest of.
```

Hover inverts the row to coal over 200ms and slides the arrow 6px. The row bleeds 16px past the text column so the text never moves.

### Project cards

Image inset 8px, so its corners are `28 − 8 = 20`.

---

## 9. Bento

A panel of cards on a strict grid. The gap equals the panel's padding, and every nested corner is computed, never guessed.

### Five rules (break one and the grid stops looking machined)

1. **Gap equals padding** — The panel pads its cards by 12px, and the cards sit 12px apart. One number, so the margin and the gutter read as the same thing.
2. **Radius is computed** — Panel 40, card `40 − 12 = 28`, inset `28 − 8 = 20`. Write the `calc()` in the code, so changing one number moves them all.
3. **Paper on sand** — Cards are paper, the panel is sand, insets are sand again. Depth is the step between surfaces. No shadows.
4. **Snap to six columns** — Cards span 1, 2, 3, 4 or 6 columns and 1 or 2 rows. No half columns and no custom heights.
5. **One lead, one dark** — One card is clearly the biggest. At most one card is coal. Seven cards is the ceiling.

### Sizes (six columns, rows of 120px in this reference)

- Wide — 4 × 1
- Tall — 2 columns × 2 rows
- Small — 2 × 1
- Half — 3 × 1
- Full — 6 × 1

### A real one (sample copy in brackets, swap for your own)

```
TOOLBOX
What I reach for first

[Photo of you]

[Language]   [Framework]   [Database]   [Cloud]

NOTES                              SHIPPED

[Note title one]                   [Date]
[Note title two]
[Note title three]                 [Date]

[Date]                             [00]
                                   [What it counts]

Hi, I'm Andréi.
A software engineer who cares how things feel. [One more line about what you do.]

CURRENTLY          IN MY OWN WORDS          CONTACT
```
