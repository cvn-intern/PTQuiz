import { error, json, type RequestHandler } from '@sveltejs/kit';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const GET: RequestHandler = async ({ fetch, params }) => {
	const response = await fetch(`${VITE_API_URL}/question/get?questionId=${params.questionId}`, {
		method: 'GET'
	});

	const result = await response.json();

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};

