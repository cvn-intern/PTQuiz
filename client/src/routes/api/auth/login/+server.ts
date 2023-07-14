import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	// get data from request
	const data = await request.json();
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...data
		})
	});
	const result = await response.json();
	if (response.status === 200) {
		cookies.set('accessToken', result.data.accessToken, {
			path: '/'
		});
		cookies.set('refreshToken', result.data.refreshToken, {
			path: '/'
		});
		return new Response(JSON.stringify(result.data.user), {
			status: 200
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: 400
		});
	}
};
