// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages serves project sites at <user>.github.io/<repo>/.
	// `site` + `base` make all internal links, assets, sitemap, and RSS
	// resolve under that subpath. When you move to a custom domain later,
	// drop `base` and point `site` at the domain.
	site: 'https://npatsakula.github.io',
	base: '/blog',
	i18n: {
		// Russian is the primary locale. `prefixDefaultLocale: true` gives
		// symmetric `/ru/` + `/en/` routing under base, so every page lives at
		// `/<base>/<locale>/...` and a single `[locale]/...` route structure
		// serves both languages. `redirectToDefaultLocale` is disabled because
		// Astro's auto `/` → `/ru/` redirect would target a non-existent locale
		// root (there is no home page); the manual `src/pages/index.astro`
		// redirects `/` straight to `/ru/blog/` instead.
		defaultLocale: 'ru',
		locales: ['ru', 'en'],
		routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
		// Show the Russian version when an English translation is missing.
		fallback: { en: 'ru' },
	},
	integrations: [
		mdx(),
		// Emit hreflang alternates between ru/en so search engines link siblings.
		sitemap({ i18n: { defaultLocale: 'ru', locales: { ru: 'ru-RU', en: 'en-US' } } }),
	],
	// Light Shiki theme so code blocks match the minimal, light page aesthetic
	// instead of Astro's default `github-dark` slab.
	markdown: {
		shikiConfig: {
			theme: 'github-light',
			wrap: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
