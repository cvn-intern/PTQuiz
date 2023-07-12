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
	if (result.error) {
		throw error(500, result.error.response);
	}
	await cookies.set('accessToken', result.data.accessToken, {
		path: '/'
	});
	await cookies.set('refreshToken', result.data.refreshToken, {
		path: '/'
	});
	console.log('result', result);
	return json(result);
};
