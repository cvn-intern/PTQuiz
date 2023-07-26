import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const formData = await request.formData();

	const response = await fetch(`${VITE_API_URL}/quizzes/create`, {
		method: 'POST',
		body: formData
	});

	const result = await response.json();

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
