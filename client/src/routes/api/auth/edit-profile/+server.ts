import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	let formData = await request.formData();
	// upload file
	const form = new FormData();
	if (!formData.get('avatar')) {
		form.append('avatar', '');
	}
	form.append('avatar', formData.get('avatar') as Blob);
	form.append('displayName', formData.get('displayName') as string);

	const response = await fetch('http://localhost:8080/api/user/edit-profile', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${cookies.get('accessToken')}`
		},
		body: form
	});

	const result = await response.json();

	if (result.statusCode !== 200) {
		throw error(400, result.message);
	}
	return json(result);
};
