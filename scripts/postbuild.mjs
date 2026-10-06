#!/usr/bin/env node
// Runs after `blume build`. Blume writes hreflang alternates for docs pages,
// but not for custom .astro pages; this adds them to the localized homepage
// and help page so search engines link each language version to the others.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://frankenphp.dev";
const LOCALES = ["en", "fr", "es", "zh", "ja", "pt-br", "ru", "tr"];
const CUSTOM_PAGES = ["/", "/help"];

const localized = (route, locale) =>
  locale === "en" ? route : `/${locale}${route === "/" ? "" : route}`;
const htmlFile = (route) => path.join(DIST, route, "index.html");

let patched = 0;
for (const route of CUSTOM_PAGES) {
  const alternates = [
    ...LOCALES.map(
      (locale) =>
        `<link rel="alternate" hreflang="${locale}" href="${SITE}${localized(route, locale)}">`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${SITE}${route}">`,
  ].join("");

  for (const locale of LOCALES) {
    const file = htmlFile(localized(route, locale));
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (html.includes('hreflang="x-default"')) continue;
    fs.writeFileSync(file, html.replace("</head>", `${alternates}</head>`));
    patched++;
  }
}

console.log(`✓ hreflang alternates added to ${patched} custom page(s)`);
