import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const data = await request.json();
	const response = await fetch(`${VITE_API_URL}/room/open`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			quizId: data.quizId
		})
	});
	const result = await response.json();
	if (response.status === 200) {
		return json(result);
	} else {
		throw error(400, result.message);
	}
};
