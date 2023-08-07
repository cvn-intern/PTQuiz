import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const PUT: RequestHandler = async ({ fetch, request, params }) => {
	const formData = await request.json();

	const response = await fetch(`${VITE_API_URL}/quizzes/update/?quizId=${params.quizId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});

	const result = await response.json();

	if (result.statusCode == HttpStatus.PAYLOAD_TOO_LARGE)
		throw error(HttpStatus.PAYLOAD_TOO_LARGE, result);

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
