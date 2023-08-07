import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const PUT: RequestHandler = async ({ fetch, request, params }) => {
	const formData = await request.formData();
	const response = await fetch(
		`${VITE_API_URL}/question/update?questionId=${params.questionId}`,
		{
			method: 'PUT',
			body: formData
		}
	);

	console.log('Form data: ', formData);

	const result = await response.json();
	console.log('result update question: ', result);

	if (result.statusCode == HttpStatus.PAYLOAD_TOO_LARGE)
		throw error(HttpStatus.PAYLOAD_TOO_LARGE, "File's size is too large.");

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
