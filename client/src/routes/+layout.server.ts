import type { LayoutServerLoad } from './$types';
import { loadTranslations, locales, translations } from '$i18n/translations';
export const load: LayoutServerLoad = async ({ cookies, request, fetch, url }) => {
	const response = await fetch('/api/auth/me');
	const result = await response.json();
	const { pathname } = url;
	const accepted = request.headers.get('accept-language')?.match(/[a-zA-Z]+?(?=-|_|,|;)/) || [
		'en'
	];
	let defaultLocale = 'en';
	if (accepted.includes('vi')) {
		defaultLocale = 'vi';
	}
	const currentCookies = cookies.get('lang');
	if (!currentCookies) {
		cookies.set('lang', defaultLocale, {
			path: '/'
		});
	}
	const locale = cookies.get('lang') || defaultLocale;

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
