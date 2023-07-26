import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const formData = await request.formData();
	const form = new FormData();
	if (!formData.get('avatar')) {
		form.append('avatar', '');
	}
	form.append('avatar', formData.get('avatar') as Blob);
	form.append('displayName', formData.get('displayName') as string);

	const response = await fetch(`${VITE_API_URL}/user/edit-profile`, {
		method: 'POST',
		body: form
	});

	const result = await response.json();

	if (result.statusCode !== 200) {
		throw error(400, result.message);
	}
	return json(result);
};
