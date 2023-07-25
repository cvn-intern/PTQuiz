import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { HEADER_NAMES } from './libs/constant/headers';
import { checkValidToken, getProfile, refreshToken } from './libs/helpers/auth';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.accessToken = event.cookies.get('accessToken');
		if (!event.locals.accessToken) {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
			event.locals.lastPage = event.url.pathname;
			return await resolve(event);
		}
		const isAccessTokenValid = await checkValidToken(event.locals.accessToken);
		if (isAccessTokenValid.status === false) {
			if (isAccessTokenValid.message === 'Token is expired') {
				const isRefreshTokenValid = await checkValidToken(
					event.cookies.get('refreshToken')
				);
				if (isRefreshTokenValid.status === false) {
					event.locals.user = undefined;
					event.locals.accessToken = undefined;
					event.locals.lastPage = event.url.pathname;
					event.cookies.delete('accessToken', {
						path: '/'
					});
					event.cookies.delete('refreshToken', {
						path: '/'
					});
					return await resolve(event);
				}
				const response = await refreshToken(event.cookies.get('refreshToken'));
                if(!response) {
                    event.locals.user = undefined;
                    event.locals.accessToken = undefined;
                    event.locals.lastPage = event.url.pathname;
                    event.cookies.delete('accessToken', {
                        path: '/'
                    });
                    event.cookies.delete('refreshToken', {
                        path: '/'
                    });
                    return await resolve(event);
                }
				else if (response.message === 'Tokens refreshed successfully') {
					event.cookies.set('accessToken', response.data.accessToken, {
						path: '/'
					});
					event.cookies.set('refreshToken', response.data.refreshToken, {
						path: '/'
					});
					event.locals.accessToken = event.cookies.get('accessToken');
					const user = await getProfile(event.locals.accessToken);
					if (!user) {
						event.locals.user = undefined;
						event.locals.accessToken = undefined;
						event.cookies.delete('accessToken', {
							path: '/'
						});
						event.cookies.delete('refreshToken', {
							path: '/'
						});
						event.locals.lastPage = event.url.pathname;
					} else {
						event.locals.user = user;
					}
					return await resolve(event);
				}
			} else {
				event.locals.user = undefined;
				event.locals.accessToken = undefined;
				event.cookies.delete('accessToken', {
					path: '/'
				});
				event.cookies.delete('refreshToken', {
					path: '/'
				});

                return await resolve(event);
			}
		}
		if (event.locals.user !== undefined) {
			return await resolve(event);
		}
		const user = await getProfile(event.locals.accessToken);
		if (!user) {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
			event.cookies.delete('accessToken', {
				path: '/'
			});
			event.cookies.delete('refreshToken', {
				path: '/'
			});
			event.locals.lastPage = event.url.pathname;
		} else {
			event.locals.user = user;
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
