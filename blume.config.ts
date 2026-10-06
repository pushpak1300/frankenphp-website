import { defineConfig } from "blume";
import { node } from "blume/deploy";
import { pagefind } from "blume/search";

import { codeThemes } from "./code-themes";

import en from "./i18n/en.json";
import es from "./i18n/es.json";
import fr from "./i18n/fr.json";
import ja from "./i18n/ja.json";
import ptBr from "./i18n/pt-br.json";
import ru from "./i18n/ru.json";
import tr from "./i18n/tr.json";
import zh from "./i18n/zh.json";

const translations = { en, fr, es, zh, ja, "pt-br": ptBr, ru, tr };
type Translation = typeof en;

const t = (pick: (strings: Translation) => string) =>
  Object.fromEntries(
    Object.entries(translations).map(([locale, strings]) => [locale, pick(strings)])
  );

const SITE = "https://frankenphp.dev";
const REPO = "https://github.com/php/frankenphp";

export default defineConfig({
  title: "FrankenPHP",
  description: en.meta.description,
  logo: {
    image: {
      light: "/img/logo_lightbg.svg",
      dark: "/img/logo_darkbg.svg",
      alt: "FrankenPHP",
    },
    text: "",
  },
  content: {
    root: "content",
  },

  github: {
    owner: "dunglas",
    repo: "frankenphp-website",
  },
  lastModified: "git",

  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", label: "English" },
      { code: "fr", label: "Français" },
      { code: "es", label: "Español" },
      { code: "zh", label: "简体中文" },
      { code: "ja", label: "日本語" },
      { code: "pt-br", label: "Português (Brasil)" },
      { code: "ru", label: "Русский" },
      { code: "tr", label: "Türkçe" },
    ],
  },

  navigation: {
    tabs: [{ label: t((s) => s.nav.docs), path: "/docs" }],
    actions: [
      { label: t((s) => s.nav.shop), href: "https://frankenphp.tpopsite.com/shop" },
      { label: t((s) => s.nav.help), href: "/help" },
    ],
    repo: REPO,
  },

  theme: {
    accent: { light: "#390075", dark: "#b3d133" },
    action: "#b3d133",
    background: { light: "#ffffff", dark: "#12021f" },
    radius: "lg",
    mode: "light",
    fonts: {
      display: { name: "Bricolage Grotesque", weights: ["500..800"] },
      body: { name: "Instrument Sans", weights: ["400..700"] },
      mono: { name: "Martian Mono", weights: ["400..600"] },
    },
  },

  markdown: {
    externalLinks: true,
    code: {
      theme: codeThemes,
    },
  },

  search: pagefind(),

  feedback: false,

  seo: {
    metatags: {
      "go-import": `frankenphp.dev git ${REPO}`,
      "theme-color": "#1a0330",
    },
    organization: {
      name: "FrankenPHP",
      logo: "/icon-512.png",
      url: SITE,
      sameAs: [REPO, "https://hub.docker.com/r/dunglas/frankenphp"],
    },
    software: {
      name: "FrankenPHP",
      description: en.meta.description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows, FreeBSD",
      license: "MIT",
      price: 0,
      sameAs: [REPO, "https://hub.docker.com/r/dunglas/frankenphp", "https://pkg.go.dev/github.com/dunglas/frankenphp"],
    },
  },

  agents: {
    llmsTxt: {
      details: [
        "Reach for FrankenPHP to run PHP applications (Laravel, Symfony, WordPress, or any PHP app) with a single binary instead of PHP-FPM plus a web server, to keep an app booted in memory with worker mode, or to embed PHP in a Go program.",
        "Install it with `curl https://frankenphp.dev/install.sh | sh` (Linux and macOS), `irm https://frankenphp.dev/install.ps1 | iex` (Windows), or the `dunglas/frankenphp` Docker image, then serve a directory with `frankenphp php-server -r public/`.",
        "Configuration uses the Caddyfile (`php_server`, `frankenphp { worker … }`) or the `FRANKENPHP_CONFIG` environment variable. Append `.md` to any page URL for its Markdown source.",
      ].join("\n\n"),
    },
    skillMd: true,
    catalog: true,
    mcp: {
      enabled: true,
      instructions:
        "Search and read the FrankenPHP documentation: installation, worker mode, configuration (Caddyfile), Docker images, deployment, Laravel, Symfony and WordPress integrations.",
    },
  },

  deployment: node({ site: SITE }),
});
