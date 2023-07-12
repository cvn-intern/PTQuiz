import { redirect } from '@sveltejs/kit';

export const load: LayoutData = async ({ url, data }) => {
	if (data && url.pathname === '/login') {
		throw redirect(307, '/');
	}
	if (!data && url.pathname !== '/login' && url.pathname !== '/register') {
		throw redirect(307, '/login');
	}
	return { data };
};
