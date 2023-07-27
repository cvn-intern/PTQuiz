import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const GET: RequestHandler = async ({ fetch, request, params }) => {
	const response = await fetch(`${VITE_API_URL}/quizzes/info?quizId=${params.quizId}`, {
		method: 'GET'
	});

	const responseAllQuestionOfQuiz = await fetch(`${VITE_API_URL}/quizzes/all-questions?quizId=${params.quizId}`)

	const result = await response.json();
	const resultAllQuestionOfQuiz = await responseAllQuestionOfQuiz.json();

	result.data.questions = resultAllQuestionOfQuiz.data;
	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
