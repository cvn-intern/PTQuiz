import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const response = await fetch(
		`${VITE_API_URL}/question/delete?quizId=${params.quizId}&questionId=${params.questionId}`,
		{
			method: 'DELETE'
		}
	);

	const result = await response.json();

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
