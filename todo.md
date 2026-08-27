# VisionFX Revision Tasks

- [x] Study Anthropic’s current homepage for transferable layout, typography, and image-direction principles without copying its identity.
- [x] Remove arbitrary forward-slash graphics, numeric labels, and pseudo-technical receipt motifs from the public-facing page.
- [x] Generate a smaller, deliberate visual asset set that supports the revised editorial composition.
- [x] Rebuild the homepage around a clearer hierarchy, fewer ornamental elements, and an Anthropic-inspired pacing of text and imagery.
- [x] Verify desktop and mobile layouts, navigation, CTA behavior, type safety, and the production build.
- [x] Save and deliver a new checkpoint with the revised design.
- [x] Add a dedicated Projects navigation destination and editorial project showcase to the homepage.
- [x] Verify the projects section at desktop and mobile widths, then save and deliver an updated checkpoint.
- [x] Recalibrate the hero to fit inside common 16:9 desktop viewports without hiding its primary message or action.
- [x] Verify the homepage at 16:9 desktop, tablet, and narrow mobile viewport sizes, then save and deliver the responsive refinement.
- [x] Research practical color-distribution principles for an editorial marketing site and document the chosen VisionFX allocation.
- [x] Rebalance VisionFX surfaces so the homepage is no longer overwhelmingly pale, then verify desktop and mobile color rhythm before delivery.
- [x] Replace the unrelated split-image hero with the user-provided Anthropic-inspired two-column editorial opening and a single dark content slab below.
- [x] Validate the corrected placement at 1366×768 and mobile widths, then save and deliver the reference-driven update.
- [x] Replace the static dark statement slab with a scroll-driven contained-to-viewport expansion that releases smoothly into the following section.
- [x] Provide a motion-reduced/static fallback and verify the effect across desktop and mobile viewports before delivery.
- [x] Bind the dark-slab expansion to the first pixel of document scroll rather than waiting for the slab section to enter the viewport.
- [x] Verify the revised immediate-expansion behavior and deliver the timing correction.
- [x] Simplify the opening so a first-time client sees VisionFX’s offer, proof, and contact action before any scroll-driven visual transition.
- [x] Move or remove the immediate dark-slab expansion, then verify the revised desktop and mobile first-visit flow before delivery.
- [x] Rewrite vague agency language across the homepage so prospects can quickly identify VisionFX’s audience, work, deliverables, and next step without changing the approved layout.
- [x] Verify the rewritten content in desktop and mobile layouts, then deliver the client-clarity update.
- [x] Restore the dark-slab scroll expansion after the clear opening offer and inquiry action, without obscuring first-visit comprehension.
- [x] Verify the restored desktop motion and mobile fallback, then save and deliver the update.
- [x] Repair the dark-slab regression so it begins visibly inset rather than loading as a solid full-page field.
- [x] Verify the panel’s contained start and local scroll expansion at desktop width before delivering the fix.
- [x] Repair the dark-slab regression so it begins visibly inset rather than loading as a solid full-page field.
- [x] Verify the panel’s contained start and local scroll expansion at desktop width before delivering the fix.
- [x] Restore the dark-slab scroll expansion after the clear opening offer and inquiry action, without obscuring first-visit comprehension.
- [x] Verify the restored desktop motion and mobile fallback, then save and deliver the update.

- [x] Redesign the slab content with a clear outcome, process cues, and one deliberate action without changing the scroll interaction.
- [x] Verify the refined slab content at desktop and mobile widths.
- [x] Save and deliver the refined slab-content checkpoint.

- [x] Inspect the production build and server entry configuration for the root response serving JavaScript instead of HTML.
- [x] Fix static-file ordering and SPA fallback behavior so `/` and client routes serve the built HTML entry.
- [x] Build and smoke-test production response headers and bodies, then save a deployment-ready checkpoint.

- [x] Add an explicit Vercel deployment contract that builds the frontend and serves `dist/public/index.html` instead of inferring `server/index.ts` as the entrypoint.
- [x] Verify the local Vercel-compatible output: `dist/public/index.html`, hashed assets, production build, type check, and static-serving regression test.
- [ ] Verify the live Vercel root and client route after redeploy, then confirm asset handling and save the deployment configuration checkpoint.
