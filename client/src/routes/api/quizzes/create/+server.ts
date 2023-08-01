import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log('request', request);
	const formData = await request.formData();
	const response = await fetch(`${VITE_API_URL}/quizzes/create`, {
		method: 'POST',
		// headers: { 'Content-type': 'multipart/form-data' },
		body: formData
	});
	console.log(alert(123));
	const result = await response.json();

	if (result.statusCode !== HttpStatus.CREATED) {
		throw error(HttpStatus.BAD_REQUEST, result.error);
	}
	return json(result);
};
