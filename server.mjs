// Serves the built site with Cache-Control headers, which the standalone
// server only sets on /_astro/* GETs.
import { createServer } from "node:http";

process.env.ASTRO_NODE_AUTOSTART = "disabled";
const { handler } = await import("./dist/server/entry.mjs");

const DAY = 86400;
const cacheControl = (path) => {
  if (path.startsWith("/_astro/") || path.startsWith("/pagefind/fragment/") || path.startsWith("/pagefind/index/")) {
    return "public, max-age=31536000, immutable"; // content-hashed
  }
  if (/\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/i.test(path)) {
    return `public, max-age=${DAY}, stale-while-revalidate=${7 * DAY}`;
  }
  // HTML, Markdown, install scripts, JSON: short so deploys show up fast.
  return `public, max-age=300, stale-while-revalidate=${DAY}`;
};

createServer((req, res) => {
  const path = (req.url ?? "/").split("?")[0];
  if ((req.method === "GET" || req.method === "HEAD") && path !== "/mcp") {
    res.setHeader("Cache-Control", cacheControl(path));
  }
  handler(req, res);
}).listen(Number(process.env.PORT ?? 3000), process.env.HOST ?? "::");
