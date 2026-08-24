// Single source of truth for locales and localized UI strings.
// `defaultLocale` must match `astro.config.mjs`'s `i18n.defaultLocale`.

export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

// All UI strings used outside of post content. Russian is the primary copy;
// English mirrors it. Add keys to both blocks together.
const strings: Record<Locale, {
	siteDescription: string;
	aboutTitle: string;
	nav: { blog: string; about: string };
	copyright: string;
	diagram: {
		ariaLabel: string;
		inputs: Array<{ label: string; sub: string; icon: string }>;
		pipelines: Array<{ lang: string; stages: Array<{ text: string; missing?: boolean }> }>;
	};
}> = {
	ru: {
		siteDescription:
			'Заметки о тензорных вычислениях, инфраструктуре ML и инженерии на Rust.',
		aboutTitle: 'Обо мне',
		nav: { blog: 'Блог', about: 'Обо мне' },
		copyright: 'Все права защищены.',
		diagram: {
			ariaLabel:
				'Входные данные разной природы (пост, email, сообщение, транскрипция, DLP-перехват) проходят через определение языка Spellman, который маршрутизирует каждый текст в конвейер своего языка: токенизация, POS-разметка, NER там, где есть модель, и поисковая индексация.',
			inputs: [
				{ label: 'пост', sub: '@mentions · URL', icon: 'post' },
				{ label: 'email', sub: 'шапка · подпись', icon: 'mail' },
				{ label: 'сообщение', sub: 'мессенджер · опечатки', icon: 'chat' },
				{ label: 'транскрипция', sub: 'ASR · без пунктуации', icon: 'mic' },
				{ label: 'DLP', sub: 'перехват · смешанное', icon: 'shield' },
			],
			pipelines: [
				{
					lang: 'русский',
					stages: [
						{ text: 'токенизация · pymorphy' },
						{ text: 'POS' },
						{ text: 'NER · нейронный + алгоритмический' },
						{ text: 'поисковая индексация' },
					],
				},
				{
					lang: 'украинский',
					stages: [
						{ text: 'токенизация · ua-dict' },
						{ text: 'POS' },
						{ text: 'NER · алгоритмический' },
						{ text: 'поисковая индексация' },
					],
				},
				{
					lang: 'казахский',
					stages: [
						{ text: 'токенизация · стемминг' },
						{ text: 'POS — не нужен', missing: true },
						{ text: 'NER —', missing: true },
						{ text: 'поисковая индексация' },
					],
				},
			],
		},
	},
	en: {
		siteDescription:
			'Notes on tensor compute, ML infrastructure, and engineering in Rust.',
		aboutTitle: 'About',
		nav: { blog: 'Blog', about: 'About' },
		copyright: 'All rights reserved.',
		diagram: {
			ariaLabel:
				'Inputs of different natures (post, email, message, transcription, DLP intercept) flow through Spellman language detection, which routes each text into a language-specific pipeline: tokenization, POS tagging, NER where a model exists, and search indexing.',
			inputs: [
				{ label: 'post', sub: '@mentions · URL', icon: 'post' },
				{ label: 'email', sub: 'header · signature', icon: 'mail' },
				{ label: 'message', sub: 'messenger · typos', icon: 'chat' },
				{ label: 'transcription', sub: 'ASR · no punctuation', icon: 'mic' },
				{ label: 'DLP', sub: 'intercept · mixed', icon: 'shield' },
			],
			pipelines: [
				{
					lang: 'Russian',
					stages: [
						{ text: 'tokenization · pymorphy' },
						{ text: 'POS' },
						{ text: 'NER · neural + algorithmic' },
						{ text: 'search indexing' },
					],
				},
				{
					lang: 'Ukrainian',
					stages: [
						{ text: 'tokenization · ua-dict' },
						{ text: 'POS' },
						{ text: 'NER · algorithmic' },
						{ text: 'search indexing' },
					],
				},
				{
					lang: 'Kazakh',
					stages: [
						{ text: 'tokenization · stemming' },
						{ text: 'POS — not needed', missing: true },
						{ text: 'NER —', missing: true },
						{ text: 'search indexing' },
					],
				},
			],
		},
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
