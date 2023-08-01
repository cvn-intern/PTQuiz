import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const formData = await request.formData();
	if (formData.get('image').size === 0) formData.delete('image');
	console.log(formData);

	const response = await fetch(`${VITE_API_URL}/quizzes/create`, {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	console.log('api', result);

	if (result.statusCode !== HttpStatus.CREATED) {
		throw error(HttpStatus.BAD_REQUEST, result.error);
	}
	return json(result);
};
