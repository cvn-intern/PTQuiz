import { loadTranslations } from '$i18n/translations';
import type { LayoutData } from './$types';
export const load: LayoutData = async ({ data }) => {
	const { lang, pathname, user } = data;
	await loadTranslations(lang, pathname);
	return { user };
};
