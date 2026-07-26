# Nikita Patsakula — Blog

Personal blog of Nikita Patsakula (engineering, tensor compute, ML infrastructure), built with [Astro](https://astro.build).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Internationalization

The site serves two locales, Russian (`ru`, default) and English (`en`), with symmetric routing: every page lives under `/<base>/<locale>/...`, and `/` redirects to `/ru/`.

- **Pages** live under `src/pages/[locale]/` and emit one route per locale via `getStaticPaths`.
- **Posts** live in `src/content/blog/<locale>/`; a post's file path is its `id` (e.g. `ru/my-post`), and each route renders only the posts whose `id` starts with that locale.
- **UI strings** (site description, nav labels) are centralized in `src/i18n/ui.ts`; add a key to both locale blocks together.
- **RSS** is per-locale: `/<base>/<locale>/rss.xml`.
- The header has a `RU | EN` switcher that swaps the locale segment while keeping the rest of the path.

To add a post, create a `.md`/`.mdx` file in the right locale folder (e.g. `src/content/blog/ru/`); drop a translated copy under `src/content/blog/en/` for the English version.

## Writing a post

Create a `.md` or `.mdx` file in `src/content/blog/<locale>/` (e.g. `src/content/blog/ru/`). Frontmatter is validated against the schema in `src/content.config.ts` (`title`, `description`, `pubDate`, optional `updatedDate`/`heroImage`).

Use `.mdx` when you need the visualization components:

```mdx
import VegaLite from '../../components/VegaLite.astro';
import OnnxEcosystem from '../../components/OnnxEcosystem.astro';
import TabbedBars from '../../components/TabbedBars.astro';
```

## Visualization components

- **`VegaLite`** — render any [Vega-Lite](https://vega.github.io/vega-lite/) spec via a `spec` prop. Lazy-loads, renders as SVG.
- **`OnnxEcosystem`** — hub-and-spoke diagram (frameworks → ONNX → runtimes).
- **`TabbedBars`** — tabbed grouped-bar chart for performance benchmarks.

Plots and images go in `public/images/` and are referenced as `/images/<file>`.

## Deployment

The site builds to static HTML and deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` triggers a deploy to `https://npatsakula.github.io/blog/`.

### First-time setup

1. Push this repo to `github.com/npatsakula/blog`.
2. In the repo settings → **Pages** → **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow builds and deploys automatically.

### Moving to a custom domain

Remove `base: '/blog'` from `astro.config.mjs`, set `site` to the domain, and add a `CNAME` file in `public/` (or set the custom domain in the Pages settings).

