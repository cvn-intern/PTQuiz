import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const formData = await request.json();
	const response = await fetch(`${VITE_API_URL}/auth/change-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	});
	const result = await response.json();

	if (result.error) {
		throw error(400, result.error);
	}
	return json(result);
};
