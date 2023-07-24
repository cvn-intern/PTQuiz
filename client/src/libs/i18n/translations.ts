import i18n, { type Config } from 'sveltekit-i18n';

export const defaultLocale = 'en';

const lang = {
	en: 'English',
	vi: 'Tiếng Việt'
};

const config: Config = {
	translations: {
		en: { lang },
		vi: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./locale/en/common.json')).default
		},
		{
			locale: 'vi',
			key: 'common',
			loader: async () => (await import('./locale/vi/common.json')).default
		},
		{
			locale: 'en',
			key: 'validation',
			loader: async () => (await import('./locale/en/validation.json')).default
		},
		{
			locale: 'vi',
			key: 'validation',
			loader: async () => (await import('./locale/vi/validation.json')).default
		}
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
