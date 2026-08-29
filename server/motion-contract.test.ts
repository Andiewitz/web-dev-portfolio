import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (relativePath: string) => path.resolve(process.cwd(), relativePath);

describe("VisionFX motion contract", () => {
  it("uses Framer Motion for scroll-linked and entrance animations", async () => {
    const home = await readFile(projectPath("client/src/pages/Home.tsx"), "utf8");
    const css = await readFile(projectPath("client/src/index.css"), "utf8");

    // Framer Motion drives the animation system.
    expect(home).toContain("from \"framer-motion\"");
    expect(home).toContain("useScroll");
    expect(home).toContain("useTransform");
    expect(home).toContain("whileInView");
    expect(home).toContain("useReducedMotion");

    // Slab scroll expansion is driven by useScroll + useTransform (no manual rAF).
    expect(home).toContain("scrollYProgress");
    expect(home).toContain("slabScaleX");
    expect(home).toContain("scaleX: slabScaleX");
    expect(home).not.toContain("requestAnimationFrame(updateSlab)");
    expect(home).not.toContain("requestAnimationFrame(updateSections)");
    expect(home).not.toContain("slab.style.transform");
    expect(home).not.toContain("slab.style.clipPath");

    // Section reveals use whileInView (no manual scroll handler, no data-reveal attribute).
    expect(home).toContain("viewport={{ once: true");
    expect(home).not.toContain("data-reveal");

    // Text choreography uses Framer Motion variants (no CSS keyframes for char/line).
    expect(home).toContain("function CharacterText");
    expect(home).toContain("staggerChildren");
    expect(css).not.toContain("@keyframes visionfx-char-reveal");
    expect(css).not.toContain("@keyframes visionfx-line-reveal");
    expect(css).not.toContain("@keyframes visionfx-hero-enter");

    // Asset references and eager loading are preserved.
    expect(home).toContain("visionfx-paper-architecture-final_544f85b5.jpg");
    expect(home).toContain("visionfx-fold-detail-final_2d166ab8.jpg");
    expect(home).toContain("visionfx-worktable-final_9bf25587.jpg");
    expect(home).toContain('loading="eager"');

    // Reduced-motion fallback is handled by Framer Motion.
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("keeps the dark slab and mobile nav visually stable", async () => {
    const css = await readFile(projectPath("client/src/index.css"), "utf8");
    const home = await readFile(projectPath("client/src/pages/Home.tsx"), "utf8");

    expect(css).toContain(".hero-slab");
    expect(home).toContain("AnimatePresence");
    expect(home).toContain("mobile-nav");
  });

  it("does not ship decorative pulse or entrance animation on the not-found page", async () => {
    const notFound = await readFile(projectPath("client/src/pages/NotFound.tsx"), "utf8");
    expect(notFound).not.toContain("animate-pulse");
    expect(notFound).not.toContain("transition-all");
  });
});
