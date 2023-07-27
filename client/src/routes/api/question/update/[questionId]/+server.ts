import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const PUT: RequestHandler = async ({ fetch, request, params }) => {
	const data = await request.json();
	const response = await fetch(
		`${VITE_API_URL}/question/update?questionId=${params.questionId}`,
		{
			method: 'PUT',
			body: JSON.stringify(data)
		}
	);

	const result = await response.json();

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
