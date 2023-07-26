import { VITE_API_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const data = await request.json();
	const response = await fetch(`${VITE_API_URL}/auth/reset-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...data
		})
	});
	const result = await response.json();
	if (response.status === HttpStatus.OK) {
		cookies.set('accessToken', result.data.accessToken, {
			path: '/'
		});
		cookies.set('refreshToken', result.data.refreshToken, {
			path: '/'
		});
		return new Response(JSON.stringify(result.message), {
			status: HttpStatus.OK
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: HttpStatus.BAD_REQUEST
		});
	}
};
