# VisionFX Quality Ledger

| ID | Requirement | Priority | Status | Evidence | Next action |
|---|---|---:|---|---|---|
| STR-001 | A first-time visitor can identify VisionFX’s offer and next action | P0 | Pass | Desktop and 375px mobile screenshots show the offer, supporting explanation, and primary CTA above the fold | Verify interaction destination during final smoke test |
| VIS-001 | The supplied cream, charcoal, hairline, orange, and type system is implemented consistently | P1 | Pass | Visual review confirms the Voltage Editorial system, including controlled orange, technical metadata, charcoal capability band, work-led cards, and CTA/footer rhythm | Preserve these signatures in future changes |
| A11Y-001 | Navigation, CTAs, focus states, contrast, and reduced-motion behavior are accessible | P0 | Pass | Semantic navigation, native links/buttons, focus-visible rule, skip link, visible menu control, and reduced-motion CSS were implemented; mobile screenshot confirms the compact header layout | Final source and build verification complete |
| CONV-001 | Primary contact route is clear and works | P0 | Pass | Browser smoke test confirmed that the header “Start a project” CTA moves to `#contact`; the section contains a pre-addressed mailto action to hello@visionfx.studio | Replace placeholder studio mailbox if VisionFX uses another contact route |
| SEO-001 | Page title, description, semantic headings, and crawl configuration are present | P1 | Pass | `client/index.html` contains title, description, theme color, and favicon; `robots.txt` allows crawling; the page uses one H1 and section H2s | Add sitemap after a public domain is assigned |
| PERF-001 | The page is responsive and avoids avoidable layout shift | P1 | Pass | Production build and TypeScript check pass; desktop and mobile full-page screenshots show coherent reflow; hero image declares high fetch priority while work imagery loads lazily | Consider route-level code splitting only if future site growth makes the build warning material |

## Visual audit findings — 2026-08-27

The desktop audit confirmed the intended parchment → charcoal → parchment → ember → charcoal band rhythm. The hero’s asymmetric split, build receipt, headline scale, and primary CTA remain legible. The 375px audit confirmed a single-column reflow, compact header control, contained project imagery, and a readable CTA band without horizontal overflow. The independent visual review found no revision needed and advised preserving the Voltage Editorial signatures.

The final browser smoke test confirmed that the primary header CTA changes the URL to `#contact` and lands on the orange contact band as intended.

## Editorial redesign verification — 2026-08-27

The redesign removed the standalone slash, numeric indexing, and pseudo-technical receipt from the user-facing experience. Desktop and 375px mobile audits confirm the revised visual rhythm: open parchment hero, one charcoal editorial thesis band, text-led capability sections, studio imagery, a single orange conversion field, and a charcoal footer. The custom VisionFX focus-lens mark and compressed FX lockup now provide a more deliberate brand signature without returning to arbitrary graphic notation.

The updated homepage makes its web-development role explicit through visible references to frontend engineering, responsive systems, semantic structure, interaction states, performance, QA, and launch handoff. TypeScript validation and the production build passed following these changes.

## Projects-section verification — 2026-08-27

The new Projects destination appears in desktop and mobile navigation and leads into a dedicated editorial showcase. The cards present representative engagement directions rather than fabricated client work: each includes a business context and concrete deliverable signals such as responsive templates, component architecture, semantic markup, launch QA, and team handoff. The desktop audit confirms that original GPT-generated artwork has replaced temporary placeholders, while the 375px audit confirms a readable single-column project sequence without horizontal overflow.

## 16:9 hero-fit baseline — 2026-08-27

At 1280×720, the original hero extends below the viewport after the sticky header, causing the primary proof line and lower image area to fall below the initial screen. At 1920×1080, the whole composition is visible but has more vertical breathing room than needed. The responsive calibration will use viewport-aware hero padding, a bounded media height, and a slightly more compact display scale so the headline, image, primary action, and proof line fit inside common 16:9 desktop viewports without constraining mobile’s natural reading flow.

After calibration, both 1280×720 and 1920×1080 viewport checks show the complete hero composition above the next section: headline, supporting text, primary action, proof line, art-directed image, and caption all remain visible without clipping. The 16:9 desktop hero now uses the available viewport height rather than a fixed vertical stack.

At 768×1024, the hero intentionally transitions to its single-column reading order: clear proposition and CTA first, then the full-width artwork. At 375×812, the mobile header, headline, supporting copy, CTA, proof line, and artwork remain unobstructed and legible, with no horizontal overflow observed.

## Ink-led color-distribution verification — 2026-08-27

The revised desktop and mobile audits confirm that VisionFX no longer reads as overwhelmingly pale. Near-black now carries the hero, approach, projects, contact, and footer; warm sand structures the service and studio bands; parchment is limited to local project cards and image framing. The only visible orange areas are the brand mark, one highlighted proposition phrase, and primary conversion controls. The project showcase now reads as an asymmetric folio, with a lead engagement and two supporting entries rather than equal generic cards.

## Reference-driven opening verification — 2026-08-27

At the user-provided 1366×768 viewport, the revised VisionFX opening now follows the requested hierarchy: a quiet cream header and canvas, an editorial two-column argument with a bold left statement and narrow right serif paragraph, then a single near-black full-width slab. The original competing split-image hero has been removed from the opening. A second pass tightened the left statement into three intentional lines and aligned the right column lower to create the same editorial cadence without copying Anthropic’s wording or identity.

At 375×812, the two-column argument resolves into a legible single-column sequence, followed immediately by the dark statement slab. The mobile header remains compact and the change does not introduce horizontal overflow. TypeScript validation and the production build both pass after the placement correction.

## Scroll-driven slab verification — 2026-08-27

The dark statement surface now lives in a dedicated scroll region rather than behaving as a static panel. At 1366×768 it begins as a contained rounded window within the cream canvas. The implementation pins the stage while scroll progress transitions the slab from `inset(10vh 7vw 10vh 7vw round 22px)` to edge-to-edge through `clip-path`, then releases to the following page content. Content position and opacity transition with the same scroll progress; reduced-motion and mobile variants intentionally use a static, readable slab.

At 375×812, the scroll-specific desktop treatment resolves to a static near-black statement surface immediately below the opening argument. The small-screen fallback preserves the reading order and strong visual transition without introducing a sticky scroll trap or positioning movement on a touch-first screen.

The final fallback uses the template’s existing `useIsMobile` breakpoint hook at 768px, so mobile no longer receives scroll-linked inline transform or opacity values. CSS switches the slab to normal document flow below 768px, matching the runtime behavior rather than relying on a visual override alone.

## Immediate document-scroll timing — 2026-08-27

The expansion is now driven by the page-level `scrollYProgress`, not a local section observer. It begins at global scroll progress `0` and completes across the first 14% of document scroll, so the very first user scroll movement starts changing the slab’s inset and content state. The verified mobile path remains static below 768px.

## Client-comprehension rewrite — 2026-08-27

The approved page layout is unchanged, while the copy now explains the offer directly. At 1366×768, a prospective client sees “VisionFX — web development studio,” the three-part scope “Plan it. Design it. Build it.,” the client situations VisionFX serves, the three service disciplines, and a direct inquiry action before the following statement surface. At 375×812, this same information remains visible in one clear top-to-bottom sequence, with no text overlap or horizontal overflow observed.

## Restored local scroll treatment — 2026-08-27

The clear opening remains intact before the dark statement surface. At desktop width, the dark panel begins as an inset, rounded surface and expands as that local section enters the viewport; its sticky stage holds the editorial moment before releasing into the main page. At 375×812, the panel deliberately remains static in normal flow, preserving clear reading and avoiding a touch-device scroll trap.

## Contained-state repair — 2026-08-27

The repaired desktop initial state is visibly inset from both page edges with rounded corners and a cream frame; it no longer loads as a solid full-page dark field. The local scroll calculation begins from this CSS-defined contained state and updates only the slab’s `clip-path` as the section crosses its entry range. At 375×812, the verified mobile fallback remains a normal-flow, static dark panel.

## Slab content refinement — 2026-08-27

The slab now has one clear message rather than a rough label, oversized statement, and detached CTA. Its expanded content follows a deliberate hierarchy: a short eyebrow, a client-outcome headline (“Make the website the easy part”), one supporting sentence naming the process, a restrained Plan / Design / Build / Launch sequence, and one labeled action. Desktop and mobile screenshots confirm the content remains readable inside the existing contained-to-expanded interaction, with the mobile layout collapsing to a single column.

The animation review informed the refinement: scroll expansion remains explanatory motion, copy itself does not drift, the existing reduced-motion/mobile fallback is preserved, and the new content uses static layout properties rather than additional animated surfaces.

## Deployment serving-path verification — 2026-08-27

The production server now disables directory index resolution in its static middleware and explicitly sends the built `index.html` for `/` and extensionless client routes. Extension-bearing paths are left to static serving or normal 404 behavior, preventing a missing asset from receiving the document fallback. A deployed-style smoke test returned `text/html` and an `<!doctype html>` body for `/` and `/projects`, while the referenced bundle returned `application/javascript`. The regression is covered by `server/static-serving.test.ts`; Vitest, TypeScript validation, and the production build pass.

## Vercel deployment-entry correction — 2026-08-27

The user-provided deployment screenshot showed Vercel returning the bundled `server/index.ts` source at the root URL because the repository had no explicit Vercel output contract; Vercel inferred the server file as the entrypoint. Added `vercel.json` with the Vite framework, frozen-lockfile install, `pnpm build`, `dist/public` output directory, and an asset-safe SPA rewrite to `/index.html`. The build produced `dist/public/index.html` plus hashed CSS and JavaScript assets. The serving regression test, TypeScript check, and production build pass. The fix is prepared but still requires a fresh Vercel deployment to verify the live URL.


## Live Vercel verification — 2026-08-27

After the Vercel configuration was picked up, `https://visionfx-five.vercel.app/` served the VisionFX HTML application rather than raw server source. The live page title is `VisionFX — Digital presence, made clear`; the root rendered the homepage content, and the page includes the expected client route anchors and hashed asset references. This confirms the deployment-entry fix in the actual Vercel environment.


The live root now serves the VisionFX application correctly. A direct request to `/projects` also reaches the Vercel HTML application, but the current client router intentionally has no standalone `/projects` page and therefore renders the project’s own 404 view; this is not raw server source. Asset content-type verification remains to be completed against a hashed live bundle URL.


Final live verification: `https://visionfx-five.vercel.app/assets/index-Bs-TVEY2.js` returned `application/javascript` and a valid JavaScript prefix (`function mv(i,s){...}`). This confirms that Vercel is correctly serving the built frontend assets and HTML entry, and the source-serving regression is fully resolved.
