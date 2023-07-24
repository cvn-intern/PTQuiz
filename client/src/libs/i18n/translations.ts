import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

const config: Config = {
	translations: {
		en: { lang },
		vi: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./locale/common/en.json')).default
		},
		{
			locale: 'vi',
			key: 'common',
			loader: async () => (await import('./locale/common/vi.json')).default
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
