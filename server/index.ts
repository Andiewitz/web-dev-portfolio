import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(staticPath: string) {
  const app = express();

  // Serve assets without allowing the static middleware to choose a bundle as the document.
  app.use(express.static(staticPath, { index: false, redirect: false }));

  app.get(["/writing", "/writing/:slug([a-z0-9-]+)"], (req, res) => {
    const document = path.join(staticPath, req.path.replace(/\/+$/, ""), "index.html");
    if (existsSync(document)) return res.type("html").sendFile(document);
    const notFound = path.join(staticPath, "404.html");
    return existsSync(notFound) ? res.status(404).sendFile(notFound) : res.status(404).send("Article not found");
  });
  app.use("/writing", (_req, res) => {
    const notFound = path.join(staticPath, "404.html");
    return existsSync(notFound) ? res.status(404).sendFile(notFound) : res.status(404).send("Article not found");
  });

  // Explicit HTML entry and extensionless SPA fallback. Asset-like paths are left to the
  // normal 404 path instead of accidentally receiving index.html.
  app.get("*", (req, res, next) => {
    if (path.extname(req.path)) return next();
    res.type("html").sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}

async function startServer() {
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");
  const app = createApp(staticPath);
  const server = createServer(app);
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

if (process.env.NODE_ENV !== "test" && process.env.VITEST !== "true") {
  startServer().catch(console.error);
}
