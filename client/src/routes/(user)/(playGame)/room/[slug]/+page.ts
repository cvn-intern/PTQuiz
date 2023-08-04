import type { PageLoad } from './$types';
export const ssr = false;
export const load: PageLoad = async ({ data, url }) => {
	if (!data.user && url.pathname !== 'room/Toaster.svelte') {
		if (window && window.sessionStorage) {
			window.sessionStorage.setItem('room', url.pathname);
		}
	}
	return {
		url: data.url,
		token: data.token
	};
};
