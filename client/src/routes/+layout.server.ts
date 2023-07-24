import type { LayoutServerLoad } from './$types';
import { defaultLocale, loadTranslations, locales, translations } from '$i18n/translations';
export const load: LayoutServerLoad = async ({ cookies, request, fetch, url }) => {
	const response = await fetch('/api/auth/me');
	const result = await response.json();
	const { pathname } = url;
	let locale = (cookies.get('lang') || '').toLowerCase();
	if (!locale) {
		if (
			request.headers.has('accept-language') &&
			!request.headers.get('user-agent')?.includes('Googlebot')
		) {
			locale = `${`${request.headers.get('accept-language')}`.match(
				/[a-zA-Z]+?(?=-|_|,|;)/
			)}`.toLowerCase();
		}
	}
	const supportedLocales = locales.get().map((locale) => locale.toLowerCase());

	if (!supportedLocales.includes(locale)) {
		locale = defaultLocale;
	}
	await loadTranslations(locale, pathname);
	if (response.status === 200) {
		const { iat, exp, ...user } = result;
		return {
			status: 'Success',
			user,
			i18n: { locale, route: pathname },
			translations: translations.get()
		};
	} else {
		return {
			status: 'Error',
			user: null,
			i18n: { locale, route: pathname },
			translations: translations.get()
		};
	}
};
