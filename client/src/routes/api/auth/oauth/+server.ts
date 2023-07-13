import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const bodyContent = await request.json();
	const response = await fetch('http://localhost:8080/api/auth/oauth', {
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
