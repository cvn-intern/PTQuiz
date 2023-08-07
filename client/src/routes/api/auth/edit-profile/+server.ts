import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const formData = await request.formData();

	const response = await fetch(`${VITE_API_URL}/user/edit-profile`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: formData
	});

	const result = await response.json();

	if (result.statusCode == HttpStatus.PAYLOAD_TOO_LARGE)
		throw error(HttpStatus.PAYLOAD_TOO_LARGE, "File's size is too large.");

	if (result.statusCode !== HttpStatus.OK) {
		throw error(HttpStatus.BAD_REQUEST, result.message);
	}
	return json(result);
};
