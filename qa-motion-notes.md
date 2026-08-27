# Motion Pass Visual QA

## Desktop — 1280 × 720

The hero content appears immediately with no delayed entrance. The opening remains a quiet two-column editorial composition, and the dark slab visibly starts as a rounded inset panel, preserving the intended continuity transition into the scroll-driven field.

## Mobile — 390 × 844

The hero falls back to a static, normal-flow layout and the slab is visible as a contained dark section below the opening. Typography remains legible, the CTA is reachable, and the menu trigger is visible. The mobile menu implementation now uses an opacity/translate transition rather than animating grid rows; its open state still needs an interaction-specific screenshot check.

## Current assessment

No decorative looping motion remains in the homepage or 404 page. The remaining motion is limited to the slab’s scroll-linked narrative expansion, hover feedback on fine pointers, press feedback, link/focus feedback, and the mobile navigation state transition.

## Full-page pass — 1280 × 720 desktop

The full page retains the intended editorial sequence and no layout drift is visible after the CSS motion changes. The slab remains a strong contained-to-full-width narrative surface, and the project hover transition remains isolated to the folio entries.

## Full-page pass — 390 × 844 mobile

The page remains a normal-flow single column with no horizontal overflow. The mobile slab is static, legible, and visually contained; the absolute closed menu does not reserve unexpected space or cover the hero. The full-page capture confirms the sand, parchment, and ink bands retain their rhythm down to the contact section.
