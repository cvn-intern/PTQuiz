import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, cookies }) => {
	const token = cookies.get('refreshToken');
	const response = await fetch(`${VITE_API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken: token
		})
	});
	const result = await response.json();
	if (response.status === HttpStatus.CREATED) {
		cookies.set('accessToken', result.data.accessToken, {
			path: '/'
		});
		cookies.set('refreshToken', result.data.refreshToken, {
			path: '/'
		});
		return new Response(JSON.stringify({ message: 'Refresh token success' }), {
			status: HttpStatus.CREATED
		});
	}
	return new Response(JSON.stringify({ message: 'Refresh token failed' }), {
		status: 400
	});
};
