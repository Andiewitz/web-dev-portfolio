import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (relativePath: string) => path.resolve(process.cwd(), relativePath);

describe("VisionFX motion contract", () => {
  it("keeps the active motion system explicit and composited", async () => {
    const css = await readFile(projectPath("client/src/index.css"), "utf8");

    expect(css).not.toContain("transition: all");
    expect(css).not.toContain("grid-template-rows 220ms");
    expect(css).not.toContain(".editorial-reveal");
    expect(css).toContain(".hero-slab");
    expect(css).toContain("@keyframes visionfx-hero-enter");
    expect(css).toContain("translate3d(0, 22px, 0)");
    expect(css).toContain("@media (hover: hover) and (pointer: fine)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".has-motion [data-reveal]");
    expect(css).toContain(".has-motion [data-reveal].is-visible");
    expect(css).toContain(".motion-line");
    expect(css).toContain(".motion-char");
    expect(css).toContain("@keyframes visionfx-char-reveal");
    expect(css).toContain(".project-lead__visual img");
    expect(css).toContain("transform: scale3d(0.86, 1, 1)");
    expect(css).not.toContain("will-change: clip-path");
    expect(css).toContain(".mobile-nav { position: absolute");
    expect(css).toContain("transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out)");
  });

  it("does not ship decorative pulse or entrance animation on the public pages", async () => {
    const home = await readFile(projectPath("client/src/pages/Home.tsx"), "utf8");
    const notFound = await readFile(projectPath("client/src/pages/NotFound.tsx"), "utf8");

    expect(home).toContain("const start = window.innerHeight * 0.96");
    expect(home).toContain("const end = -window.innerHeight * 0.12");
    expect(home).toContain("slab.style.transform");
    expect(home).not.toContain("slab.style.clipPath");
    expect(home).toContain("requestAnimationFrame(updateSections)");
    expect(home).toContain("window.addEventListener(\"scroll\", requestUpdate");
    expect(home).toContain("data-reveal");
    expect(home).toContain("function CharacterText");
    expect(home).toContain("visionfx-paper-architecture-final_544f85b5.jpg");
    expect(home).toContain("visionfx-fold-detail-final_2d166ab8.jpg");
    expect(home).toContain("visionfx-worktable-final_9bf25587.jpg");
    expect(home).toContain('loading="eager"');
    expect(home).not.toContain("editorial-reveal");
    expect(notFound).not.toContain("animate-pulse");
    expect(notFound).not.toContain("transition-all");
  });
});
