import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { HEADER_NAMES } from './libs/constant/headers';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.accessToken = event.cookies.get('accessToken');
		if (!event.locals.accessToken) {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
            event.locals.lastPage = event.url.pathname;
			return await resolve(event);
		}

		if (event.locals.user !== undefined) {
			return await resolve(event);
		}
		const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.locals.accessToken}`
			}
		});

		const result = await response.json();

		if (response.status === 200) {
			event.locals.user = result.data;
		} else {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
			event.cookies.delete('accessToken', {
				path: '/'
			});
			event.locals.lastPage = event.url.pathname;
		}
		return await resolve(event);
	} catch (err: any) {
		event.locals.user = undefined;
		event.locals.accessToken = undefined;
		event.locals.lastPage;
		return await resolve(event);
	}
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }): Promise<Response> => {
	const token = event.locals.accessToken;
	if (token) {
		request.headers.set(HEADER_NAMES.AUTHORIZATION, `Bearer ${token}`);
	}

	return fetch(request);
};
export const handleError: HandleServerError = async ({ error }) => {
	const err: any = error;

	return {
		code: err?.status || 500,
		message: err?.body?.message || 'Internal Server Error'
	};
};
