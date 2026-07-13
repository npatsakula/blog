# Svod Blog

Technical blog for the [Svod](https://github.com/npatsakula/svod) tensor framework, built with [Astro](https://astro.build).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Writing a post

Create a `.md` or `.mdx` file in `src/content/blog/`. Frontmatter is validated against the schema in `src/content.config.ts` (`title`, `description`, `pubDate`, optional `updatedDate`/`heroImage`).

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
