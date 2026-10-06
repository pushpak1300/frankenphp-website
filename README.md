# FrankenPHP website

This repository contains the source code of [frankenphp.dev](https://frankenphp.dev): the homepage, the help page and the FrankenPHP documentation in every language.
The site is built with [Blume](https://useblume.dev), a Markdown-first documentation framework on top of Astro.

## Getting started

You need Node.js 22.12 or newer and [pnpm](https://pnpm.io).

```console
git clone git@github.com:dunglas/frankenphp-website.git
cd frankenphp-website
pnpm install
pnpm dev
```

The site is served at http://localhost:4321 with hot reload.

To build the production site in `dist/` and preview it:

```console
pnpm build
pnpm preview
```

`pnpm doctor` checks the configuration and the content, and `npx blume validate` checks every internal link.

## Project structure

| Path                    | What it holds                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `content/docs/`         | The English documentation, one Markdown file per page.                                                 |
| `content/<locale>/docs/`| The translations (`fr`, `es`, `zh`, `ja`, `pt-br`, `ru`, `tr`). Missing pages fall back to English.    |
| `content/assets/`       | Images used by the documentation.                                                                      |
| `pages/`                | The homepage and the help page, one file per locale.                                                   |
| `components/`           | The homepage, help page, footer and translation notice components.                                     |
| `i18n/<locale>.json`    | Every string of the homepage, help page and footer, per locale.                                        |
| `public/`               | Static files served as-is (images, icons, manifest).                                                   |
| `blume.config.ts`       | Site configuration: languages, navigation, theme, search, SEO and agent support.                       |
| `theme.css`             | The FrankenPHP theme on top of Blume's design tokens.                                                  |

## Writing documentation

Each page is a Markdown file with a little frontmatter:

```markdown
---
title: "Using FrankenPHP workers"
description: "Run FrankenPHP in worker mode to keep your PHP application bootstrapped between requests."
sidebar:
  label: "Worker mode"
  order: 1
---

Boot your application once and keep it in memory.
```

- Pages are grouped in the sidebar by the parenthesized folder they live in, such as `content/docs/(01-get-started)/`.
  The parentheses keep the folder out of the URL: `content/docs/(01-get-started)/worker.md` is served at `/docs/worker`.
- Link to other pages with root-relative paths such as `/docs/config#caddyfile-config`; on a translated page, Blume points the link at the same language automatically.
- Callouts use this markup, styled by `theme.css` (`note`, `tip`, `important`, `warning` or `caution`):

  ```html
  <div class="fp-callout" data-callout="tip">
  <p class="fp-callout-title">Tip</p>

  Your **Markdown** here.

  </div>
  ```

## Importing the documentation from php/frankenphp

The documentation used to be copied from [php/frankenphp](https://github.com/php/frankenphp/tree/main/docs) at every build.
It now lives in this repository. To replace `content/` with a fresh copy converted from upstream, run:

```console
pnpm import-docs --force
```

Set `FRANKENPHP_REPO=/path/to/frankenphp` to import from a local checkout instead of cloning, and `GITHUB_KEY` to clone with a token.

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (see `.github/workflows/deploy.yaml`).
The workflow downloads `install.sh` and `install.ps1` from php/frankenphp so that `https://frankenphp.dev/install.sh` keeps serving the latest installer.

## SEO and AI agents

The build generates, with no extra step:

- `sitemap.xml`, `robots.txt`, canonical URLs, `hreflang` alternates for every language, Open Graph cards and schema.org structured data,
- `llms.txt` and `llms-full.txt`, a Markdown version of every page at its URL plus `.md` (for instance `/docs/worker.md`), a JSON API (`/api/docs/pages.json`) and an agent skill at `/skill.md`,
- the `go-import` meta tag that makes `go get frankenphp.dev/...` resolve to the php/frankenphp repository.
