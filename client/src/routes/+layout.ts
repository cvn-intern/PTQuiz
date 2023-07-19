import { redirect } from '@sveltejs/kit';
import type { LayoutData } from './$types';

export const load: LayoutData = async ({ url, data }) => {
	// if (data.user && url.pathname === '/login') {
	// 	throw redirect(303, '/');
	// }
	if (data.user && url.pathname.startsWith('/register')) {
		throw redirect(303, '/');
	}
	if (!data && url.pathname !== '/login') {
		throw redirect(307, '/login');
	}
	return { user: data.user };
};
