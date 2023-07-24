import i18n, { type Config } from 'sveltekit-i18n';
import type { KeyValueObject } from '$types';

export const defaultLocale = 'en';

const lang: KeyValueObject = {
	en: 'English',
	vi: 'Tiếng Việt'
};

const config: Config = {
	translations: {
		en: { lang },
		vi: { lang }
	},
	loaders: [
		...Object.entries(lang).map(([locale]) => ({
			locale,
			key: 'common',
			loader: async () => await import(`./locales/${locale}/common.json`)
		})),
		...Object.entries(lang).map(([locale]) => ({
			locale,
			key: 'validation',
			loader: async () => await import(`./locales/${locale}/validation.json`)
		}))
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	loadTranslations,
	addTranslations,
	translations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...', $loading));
