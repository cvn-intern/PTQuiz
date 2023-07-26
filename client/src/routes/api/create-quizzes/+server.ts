import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const formData = await request.formData();
	console.log("formData", formData);
	const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/create`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${cookies.get('accessToken')}`
		},
		body: formData
	});

	const result = await response.json();
	if (result.statusCode !== 200) {
		throw error(400, result.message);
	}
	return json(result);
};
