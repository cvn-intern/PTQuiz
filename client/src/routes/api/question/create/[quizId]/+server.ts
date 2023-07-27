import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request, params }) => {
	const data = await request.json();
	const response = await fetch(`${VITE_API_URL}/question/create?quizId=${params.quizId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();
	if (result.statusCode !== HttpStatus.CREATED) {
		throw error(HttpStatus.BAD_REQUEST, result.error);
	}
	return json(result);
};
