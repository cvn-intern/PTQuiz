import { error, json } from '@sveltejs/kit';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ fetch, request, params }) => {
	const response = await fetch(`${VITE_API_URL}/quizzes/questions-quiz?quizId=${params.quizId}`);
	const result = await response.json();
	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
