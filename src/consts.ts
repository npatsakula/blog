// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
//
// Localized strings (site description, nav labels) live in `src/i18n/ui.ts`
// so they can vary per locale. Only locale-independent values stay here.

export const SITE_TITLE = 'Nikita Patsakula';
export const AUTHOR = 'Nikita Patsakula';

// Social profile links shown in the header/footer. Mastodon intentionally
// omitted.
export const SOCIAL = {
	twitter: 'https://x.com/_ccer0z',
	github: 'https://github.com/npatsakula/',
} as const;

// Yandex.Metrika counter ID (the numeric ID from the "Counter" / «Счётчик»
// tab). The snippet only renders in production builds, so `astro dev` never
// fires hits. Set to `0` to fully disable tracking.
export const YANDEX_METRIKA_ID = 111265719;
