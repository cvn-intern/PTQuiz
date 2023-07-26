import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const bodyContent = await request.json();
	const response = await fetch(`${VITE_API_URL}/auth/oauth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyContent)
	});
	const result = await response.json();
	if (response.status !== HttpStatus.OK) {
		throw error(result.statusCode, result.message);
	}
	cookies.set('accessToken', result.data.accessToken, {
		path: '/'
	});
	cookies.set('refreshToken', result.data.refreshToken, {
		path: '/'
	});
	return json(result.data);
};
