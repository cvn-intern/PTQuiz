import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const data = await request.json();
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/open`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('accessToken')}`
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
