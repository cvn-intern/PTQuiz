import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';

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
	if (response.status !== 200) {
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
