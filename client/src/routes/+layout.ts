import { redirect } from '@sveltejs/kit';
import type { LayoutData } from './$types';
import { loadTranslations } from '$i18n/translations';

export const load: LayoutData = async ({ url, data }) => {
	if (data.user && url.pathname.startsWith('/register')) {
		throw redirect(303, '/');
	}
	if (!data && url.pathname !== '/login') {
		throw redirect(307, '/login');
	}
	const { i18n } = data;
	const { locale, route } = i18n;

	await loadTranslations(locale, route);

	return { user: data.user, i18n };
};
