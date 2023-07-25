import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ cookies, request, url, locals : {user} }) => {
	if (
		request.headers.has('accept-language') &&
		!request.headers.get('user-agent')?.includes('Googlebot')
	) {
		const accepted = request.headers.get('accept-language')?.match(/[a-zA-Z]+?(?=-|_|,|;)/) || [
			'en'
		];
		let defaultLocale = 'en'; // get from cookie, user session, ...
		if (accepted.includes('vi')) {
			defaultLocale = 'vi';
		}
		const currentCookie = cookies.get('lang');
		if (!currentCookie) {
			cookies.set('lang', defaultLocale, {
				path: '/'
			});
		}
		const initLocale = cookies.get('lang') || defaultLocale; // set default if no locale already set

		return {
            user,
			lang: initLocale,
			pathname: url.pathname
		};
	}
	return {
        user,
		lang: null,
		pathname: url.pathname
	};
};
