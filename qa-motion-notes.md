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

## Image art-direction pass — desktop and mobile

The project section no longer presents three interchangeable rounded image cards. A dominant image now sits directly in the editorial ledger with its caption and project explanation below; a secondary visual is embedded as a narrow supporting strip beside a text-led entry; the final direction is intentionally text-only. The studio visual is now a direct cropped figure with a caption instead of an image nested inside a second rounded shell.

At 1280px, the visual hierarchy reads as one large project study followed by smaller editorial entries, and the ink section retains its visual weight. At 390px, the ledger collapses to a clear vertical sequence without horizontal overflow; the images crop predictably and remain subordinate to the surrounding client-focused copy.

## Intro and slab motion revision — desktop and mobile

The desktop capture shows the hero remains immediately understandable while the headline is now structured as individually composited lines, giving the live first visit a clear staggered arrival rather than a static wall of text. The slab’s contained rounded starting state remains visible at the bottom of the opening viewport.

The mobile capture confirms the opening still resolves cleanly to one column and the slab remains a static normal-flow section below 768px. The desktop-only scroll calculation now uses a wider local entry window: it begins as the slab approaches the viewport and finishes after it passes through the viewport, making the clip-path expansion perceptible instead of completing too early. Reduced-motion still clears the transforms and clip path.

## Full-page motion expansion — desktop and mobile

The full-page desktop capture confirms the page now has section-level reveal targets beyond the hero: the approach heading and principles, service introduction and rows, project heading and ledger, studio visual and copy, contact band, and footer each participate in the same orchestration. Project and studio images also settle through a restrained transform after their parent content becomes visible.

The mobile capture remains a clean normal-flow page. Because the observer is disabled under reduced motion and the existing mobile slab fallback remains static below 768px, the new section choreography does not create a touch scroll trap or hide content on narrow screens.

## Runtime animation bug investigation

The live preview initially showed the section reveal targets stuck at `opacity: 0` while the page was being scrolled through the slab region. Browser inspection confirmed the old one-shot observer contract was not giving a visible result at the user’s scroll pace. The implementation was replaced with a direct requestAnimationFrame scroll-progress loop that updates each target’s opacity and transform from its viewport position. The corrected runtime was measured across multiple scroll positions and produced changing opacity/translate values; the slab continued to update from the existing scroll handler.

The final safeguard keeps new section choreography disabled below 768px and when reduced motion is requested, leaving mobile content static and immediately readable.

## Post-fix mobile verification

At 390×844, the updated page remains fully visible in normal document flow. The runtime guard exits below 768px, so mobile does not attempt the desktop scroll-progress choreography; this is intentional because the slab and page remain stable for touch scrolling while desktop receives the stronger live animation. The mobile full-page capture shows no hidden section content, overflow, or delayed reveal dependency.

## Image and choreography correction

The replacement image endpoints now return HTTP 200 with image/webp content and non-zero payloads through the live preview. The page markup contains 173 character spans and 11 line spans, including the slab headline and service/project titles. The final correction uses direct scroll-progress values for section movement, a line-reveal clip-path for headline lines, and staggered character animation for selected short titles and the orange slab accent.

## Final image integrity and text choreography QA

The desktop full-page capture shows the new generated editorial still lifes rendering cleanly in the Projects and Studio sections. The slab headline now reveals by line, with the orange accent phrase receiving character-level stagger. Service and project titles use character spans while preserving natural word wrapping. The mobile capture shows the same imagery loading correctly and keeps the touch-safe static section fallback; the DOM text remains readable and the character spans do not clip or break the layout.
