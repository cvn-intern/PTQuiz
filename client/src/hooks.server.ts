import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const access = event.cookies.get('accessToken');

	if (!access && event.route.id?.startsWith('/dashboard')) {
		throw redirect(303, '/login');
	}
    if (!access && event.route.id?.startsWith('/room')) {
        throw redirect(303, '/login');
    }
	const response = await resolve(event);
	return response;
};
