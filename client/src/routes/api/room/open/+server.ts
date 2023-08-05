import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const data = await request.json();
	const response = await fetch(`${VITE_API_URL}/room/open`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			quizId: data.quizId,
            type: data.type
		})
	});
	const result = await response.json();
	if (response.status === HttpStatus.OK) {
		return json(result);
	} else {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
};
