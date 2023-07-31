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

	const result = await response.json();

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
