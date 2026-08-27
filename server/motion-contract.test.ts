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
    expect(css).toContain("@media (hover: hover) and (pointer: fine)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".mobile-nav { position: absolute");
    expect(css).toContain("transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out)");
  });

  it("does not ship decorative pulse or entrance animation on the public pages", async () => {
    const home = await readFile(projectPath("client/src/pages/Home.tsx"), "utf8");
    const notFound = await readFile(projectPath("client/src/pages/NotFound.tsx"), "utf8");

    expect(home).not.toContain("editorial-reveal");
    expect(notFound).not.toContain("animate-pulse");
    expect(notFound).not.toContain("transition-all");
  });
});
