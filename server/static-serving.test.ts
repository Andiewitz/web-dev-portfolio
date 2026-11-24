import { afterEach, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
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
