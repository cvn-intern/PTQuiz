import type { LayoutServerLoad } from './$types';
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
	if (!request.headers.get('user-agent')?.includes('Googlebot') && !currentCookies) {
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
			i18n: { locale, route: pathname }
		};
	} else {
		return {
			status: 'Error',
			user: null,
			i18n: { locale, route: pathname }
		};
	}
};
