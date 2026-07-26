import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { getUI, locales } from '../../i18n/ui';

export async function getStaticPaths() {
	return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context) {
	const { locale } = context.params;
	// Only posts for this locale, newest first.
	const posts = (await getCollection('blog', ({ id }) =>
		id.startsWith(`${locale}/`),
	)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const t = getUI(locale);
	const base = `${import.meta.env.BASE_URL}/`.replace(/\/+$/, '/');
	return rss({
		title: SITE_TITLE,
		description: t.siteDescription,
		site: context.site,
		items: posts.map((post) => {
			// Drop the leading `<locale>/` from the id for the URL slug.
			const slug = post.id.replace(/^[^/]+\//, '');
			return {
				...post.data,
				link: `${base}${locale}/blog/${slug}/`,
			};
		}),
	});
}
