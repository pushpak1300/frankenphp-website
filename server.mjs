import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mdx": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".sh": "text/plain; charset=utf-8",
  ".ps1": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".pagefind": "application/octet-stream",
  ".pf_meta": "application/octet-stream",
  ".pf_index": "application/octet-stream",
  ".pf_fragment": "application/octet-stream",
};
const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest\+json|javascript)|image\/svg\+xml)/;

const isFile = (file) => fs.statSync(file, { throwIfNoEntry: false })?.isFile() ?? false;

function resolve(pathname) {
  const target = path.normalize(path.join(ROOT, pathname));
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;
  if (isFile(target)) return target;
  if (isFile(path.join(target, "index.html"))) return path.join(target, "index.html");
  if (isFile(`${target}.html`)) return `${target}.html`;
  return null;
}

function send(req, res, file, status) {
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const headers = {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": file.includes(`${path.sep}_astro${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  };
  if (path.basename(file) === "index.html" && file === path.join(ROOT, "index.html")) {
    headers.Link = '</index.md>; rel="alternate"; type="text/markdown"';
  }

  const accept = String(req.headers["accept-encoding"] ?? "");
  const encoding = COMPRESSIBLE.test(type) ? (/\bbr\b/.test(accept) ? "br" : /\bgzip\b/.test(accept) ? "gzip" : null) : null;
  if (encoding) {
    headers["Content-Encoding"] = encoding;
    headers.Vary = "Accept-Encoding";
  } else {
    headers["Content-Length"] = fs.statSync(file).size;
  }

  res.writeHead(status, headers);
  if (req.method === "HEAD") return res.end();
  const stream = fs.createReadStream(file);
  const compressor = encoding === "br" ? zlib.createBrotliCompress() : encoding === "gzip" ? zlib.createGzip() : null;
  pipeline(...(compressor ? [stream, compressor, res] : [stream, res]), () => {});
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  const file = resolve(pathname);
  if (file) return send(req, res, file, 200);

  const notFound = path.join(ROOT, "404.html");
  if (isFile(notFound)) return send(req, res, notFound, 404);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
});

server.listen(PORT, () => console.log(`Serving ${ROOT} on port ${PORT}`));

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 25_000).unref();
});
