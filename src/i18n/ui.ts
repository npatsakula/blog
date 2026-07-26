// Single source of truth for locales and localized UI strings.
// `defaultLocale` must match `astro.config.mjs`'s `i18n.defaultLocale`.

export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

// All UI strings used outside of post content. Russian is the primary copy;
// English mirrors it. Add keys to both blocks together.
const strings: Record<Locale, {
	siteDescription: string;
	readBlog: string;
	aboutTitle: string;
	nav: { home: string; blog: string; about: string };
	copyright: string;
}> = {
	ru: {
		siteDescription:
			'Заметки о тензорных вычислениях, инфраструктуре ML и инженерии на Rust.',
		readBlog: 'Читать блог →',
		aboutTitle: 'Обо мне',
		nav: { home: 'Главная', blog: 'Блог', about: 'Обо мне' },
		copyright: 'Все права защищены.',
	},
	en: {
		siteDescription:
			'Notes on tensor compute, ML infrastructure, and engineering in Rust.',
		readBlog: 'Read the blog →',
		aboutTitle: 'About',
		nav: { home: 'Home', blog: 'Blog', about: 'About' },
		copyright: 'All rights reserved.',
	},
};

// Normalize an unknown locale string to a supported one, falling back to the
// default locale for anything unknown (e.g. `Astro.currentLocale` being undefined).
export function normalizeLocale(lang: string | undefined): Locale {
	return (lang && locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
}

// Resolve the UI string dictionary for a locale, falling back to the default
// locale's dictionary if the requested locale is missing.
export function getUI(lang: string | undefined) {
	return strings[normalizeLocale(lang)];
}
