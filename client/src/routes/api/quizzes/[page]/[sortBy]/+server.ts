import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ fetch, params }) => {
	const response = await fetch(
		`${VITE_API_URL}/quizzes/all-quizzes?page=${params.page}&sortBy=${params.sortBy}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const result = await response.json();
	if (response.status === HttpStatus.OK) {
		return new Response(JSON.stringify(result.data), {
			status: HttpStatus.OK
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: HttpStatus.UNAUTHORIZED
		});
	}
};
