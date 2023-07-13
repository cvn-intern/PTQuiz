import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const formData = await request.json();
	const response = await fetch('http://localhost:8080/api/auth/change-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('accessToken')}`
		},
		body: JSON.stringify(formData)
	});
	const result = await response.json();

	if (result.error) {
		throw error(400, result.error);
	}
	return json(result);
};
