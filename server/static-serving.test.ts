import { afterEach, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createApp } from "./index";

let server: Server | undefined;
let temporaryDirectory: string | undefined;

afterEach(async () => {
  if (server) {
    await new Promise<void>((resolve) => server?.close(() => resolve()));
    server = undefined;
  }
  if (temporaryDirectory) {
    await rm(temporaryDirectory, { recursive: true, force: true });
    temporaryDirectory = undefined;
  }
});

describe("production static serving", () => {
  it("serves prerendered writing documents and returns 404 for missing articles", async () => {
    temporaryDirectory = await mkdtemp(path.join(tmpdir(), "andrei-writing-"));
    await mkdir(path.join(temporaryDirectory, "writing", "example"), { recursive: true });
    await writeFile(path.join(temporaryDirectory, "index.html"), "<h1>Home</h1>");
    await writeFile(path.join(temporaryDirectory, "writing", "index.html"), "<h1>Writing</h1>");
    await writeFile(path.join(temporaryDirectory, "writing", "example", "index.html"), "<h1>Complete example article</h1>");
    await writeFile(path.join(temporaryDirectory, "404.html"), '<meta name="robots" content="noindex"><h1>Not found</h1>');
    server = createServer(createApp(temporaryDirectory));
    await new Promise<void>((resolve) => server?.listen(0, "127.0.0.1", () => resolve()));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Test server did not expose a port");
    const baseUrl = `http://127.0.0.1:${address.port}`;
    const index = await fetch(`${baseUrl}/writing`);
    const article = await fetch(`${baseUrl}/writing/example`);
    const missing = await fetch(`${baseUrl}/writing/missing`);
    const missingAsset = await fetch(`${baseUrl}/assets/missing.js`);
    expect(index.status).toBe(200);
    expect(await index.text()).toContain("Writing");
    expect(article.status).toBe(200);
    expect(await article.text()).toContain("Complete example article");
    expect(missing.status).toBe(404);
    expect(await missing.text()).toContain("noindex");
    expect(missingAsset.status).toBe(404);
  });
  it("serves HTML for the root and extensionless client routes, not a JavaScript bundle", async () => {
    temporaryDirectory = await mkdtemp(path.join(tmpdir(), "visionfx-static-"));
    await writeFile(path.join(temporaryDirectory, "index.html"), "<!doctype html><html><body>VisionFX</body></html>");
    await writeFile(path.join(temporaryDirectory, "app.js"), "console.log('bundle');");

    server = createServer(createApp(temporaryDirectory));
    await new Promise<void>((resolve) => server?.listen(0, "127.0.0.1", () => resolve()));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Test server did not expose a port");
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const rootResponse = await fetch(`${baseUrl}/`);
    const routeResponse = await fetch(`${baseUrl}/projects`);
    const assetResponse = await fetch(`${baseUrl}/app.js`);

    expect(rootResponse.headers.get("content-type")).toContain("text/html");
    expect(routeResponse.headers.get("content-type")).toContain("text/html");
    expect(await rootResponse.text()).toContain("<!doctype html>");
    expect(await routeResponse.text()).toContain("VisionFX");
    expect(assetResponse.headers.get("content-type")).toContain("application/javascript");
  });
});
