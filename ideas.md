# VisionFX — Design Direction

## Ground-Truth Reference

The supplied `design.md` is the visual authority for VisionFX. Its Anthropic-adjacent editorial restraint, parchment canvas, charcoal bands, precision hairlines, warm orange action color, and Bricolage Grotesque / Inter / JetBrains Mono typography must remain recognizable in every implementation decision. VisionFX adapts this language for a confident web development agency rather than reproducing the reference brand itself.

## Chosen Approach: The Voltage Editorial

### Design Movement

An **editorial technical portfolio** with Anthropically restrained surfaces and the compositional confidence of contemporary design publications. The site treats web development as a visible practice: systems, interfaces, and execution shown as structured artifacts rather than generic agency promises.

### Core Principles

1. **Intelligence through restraint.** Cream, ink, and whitespace do the structural work; the orange voltage is reserved for the single decisive action in each view.
2. **Work before ornament.** Project modules, capabilities, and process language are concrete, readable, and evidence-led.
3. **Technical warmth.** Code-like labels and precise hairlines are balanced by editorial display type and generous asymmetrical composition.
4. **One continuous argument.** Each surface band changes the user’s context: introduction, expertise, selected work, invitation, and exit.

### Color Philosophy

Parchment `#F5F0E8` is the long-reading field, carrying most of the page. Charcoal `#2C2C2A` provides deliberate contrast for technical proof and the footer. VisionFX orange `#FF5F1F` is a voltage pulse: used only for conversion, active interaction, and earned emphasis. No gradients, shadows, or ornamental multicolor UI are permitted.

### Layout Paradigm

The home page follows a **split editorial rail** rather than a centered-card collage. The hero’s left reading column is paired with a right-side kinetic “build receipt”; work is arranged in a mixed-span project ledger; the service section reads as a vertical capability index. The section rhythm is Parchment → Charcoal → Parchment → Ember → Charcoal.

### Signature Elements

1. **Voltage mark:** A sharp orange bracket / forward slash motif that suggests a cursor, a route, and forward motion.
2. **Build receipts:** Monospaced project metadata, outcomes, and stack tags assembled as calm technical artifacts.
3. **Index lines:** Hairline dividers and two-digit numeric markers that guide scanning without decorative icon clutter.

### Interaction Philosophy

Interactions should feel decisive and tactile: buttons compress slightly on press; link underlines extend with a short horizontal motion; project tiles reveal concise build metadata. The navigation scrolls to clear page destinations, and the mobile menu remains text-led and direct.

### Animation

Motion uses transform and opacity only, with a snappy `cubic-bezier(0.23, 1, 0.32, 1)` curve. Hero text and the build receipt reveal in a restrained 40–70ms stagger; hover states remain under 180ms. No looping decorative animation, parallax, or delayed content. All non-essential motion is disabled for reduced-motion preferences.

### Typography System

**Bricolage Grotesque 800** carries headlines and work titles with compressed, editorial confidence. **Inter 400/600** handles readable supporting copy and controls. **JetBrains Mono 400/600** is reserved for technical labels, section indexes, and metadata. Body copy is left-aligned; labels are uppercase and tracked modestly.

### Brand Essence

**VisionFX is the web development partner for ambitious teams that need a distinctive site built with the same discipline as the product behind it.**

Personality: **precise, candid, electric**.

### Brand Voice

Voice is concise, specific, and quietly certain. Headlines name the outcome; CTAs use verbs that explain the next step; microcopy clarifies the working relationship.

> “Your next site should pull its weight.”

> “Bring the brief. We’ll bring the build.”

### Wordmark & Logo

The VisionFX wordmark is set in bold display type with a custom **“/” voltage mark** placed between the compact “Vision” and “FX” lockup. The standalone mark is a thick orange forward slash crossed by a slim charcoal horizon: a visual shorthand for moving an idea into production.

### Signature Brand Color

**VisionFX Orange — `#FF5F1F`**.

## Revision: Anthropic-Inspired Editorial Restraint

The redesign removes the prior forward-slash mark, decorative numeric indices, and pseudo-technical build receipt. In their place, VisionFX adopts a calmer rhythm inspired by Anthropic’s current public homepage: open off-white space, sparse utility navigation, a single art-directed media moment, one charcoal thesis band, and clear text-led sections. The intent is to borrow principles of restraint and editorial pacing, not Anthropic’s branding, content, or composition.

The revised artwork is commissioned through GPT Image for three specific jobs: a hero still life that creates visual gravity without technical ornament, a studio object image that humanizes the craft, and an inline graphic study that adds a quiet visual pause. The orange accent remains unique to VisionFX and is reserved for meaningful calls to action.

## Style Decisions

- Honor the supplied 0.5px hairline rule throughout; never use 1px borders.
- Apply the nested radius formula whenever a surface contains another surface.
- Do not introduce gradients, box shadows, generic icon decoration, fabricated proof, or testimonial content.
- Make all CTA destinations meaningful through page anchors; a contact request link may use a `mailto:` destination until VisionFX provides a scheduling workflow.
- Remove arbitrary numbers, standalone slash marks, directional-arrow ornament, and fake technical UI language from the public experience.

## Style Decisions — Revision Review

- The VisionFX lockup uses a custom focus-lens mark and a deliberately compressed FX treatment rather than a default typed wordmark or the removed slash motif.
- Orange functions as the VisionFX mark, a single earned emphasis in the opening proposition, primary actions, and the single contact field. It does not decorate routine UI.
- Every primary section must pair editorial clarity with a concrete signal of web production discipline, including responsive systems, component thinking, semantic structure, performance, QA, or launch handoff.
- The projects showcase communicates representative engagement directions rather than inventing client names, project outcomes, or testimonials. Its original GPT-generated artwork supports the story without implying a real client relationship.
- Project direction cards read as build engagements rather than generic agency tiles: each gives a business context plus concrete deliverable and handoff signals, including responsive templates, component architecture, semantic markup, launch QA, and team handoff.
- The VisionFX focus-lens mark is an orange field with a cream or charcoal concentric lens and signal point; it appears at meaningful brand touchpoints without reintroducing the removed slash or numeric ornament.

## Style Decisions — Color Distribution Correction

- The color system is ink-led rather than parchment-led: near-black carries the hero, services, navigation, and footer; sand carries project and studio context; parchment is a smaller local reading surface.
- Target visible-page allocation: 50–55% deep ink surfaces, 35–40% warm sand/parchment surfaces, less than 6% VisionFX orange, with the remaining balance in image material and fine neutral rules.
- Orange has only three jobs: VisionFX brand signature, a deliberately highlighted proposition detail, and the primary conversion moment. It never becomes a default card or section color.
- The final conversion section uses deep charcoal rather than an orange field; the orange conversion control is the earned action signal. This keeps orange below the target allocation while maintaining a decisive CTA.
- Project directions use an asymmetric folio spread. The lead engagement is an expanded editorial artifact, while the remaining directions are secondary entries rather than three identical generic tiles.

## Reference-Driven Placement Correction

The user-provided Anthropic screenshot is the ground-truth specification for the opening composition. VisionFX will not use a competing split image hero. It will begin on a quiet warm-cream canvas with a modest cream navigation bar, one two-column editorial argument, and a single wide near-black slab below. The hero's visual focal point is typography and whitespace; original VisionFX imagery moves to later supporting sections.

## Scroll Transition Contract

The dark statement slab returns as a local scroll-driven editorial surface, not a first-visit scroll event. The opening must communicate what VisionFX does, for whom, its core disciplines, and the contact action before the reader enters the animated region. As the dark slab enters the viewport, it expands from a rounded inset panel to a full-viewport field, holds the statement in place, then releases into the rest of the page. Mobile and reduced-motion contexts retain a static slab.

## Content Clarity Contract

Keep the approved composition, but ensure a prospective client can identify the target audience, service scope, deliverables, and inquiry process without translating agency language. Begin each section with a concrete client outcome; use editorial phrasing only after the factual meaning is clear.
