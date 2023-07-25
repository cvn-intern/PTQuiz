import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies }) => {
	const token = cookies.get('refreshToken');
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken: token
		})
	});
	const result = await response.json();
	if (response.status !== 200) {
		cookies.set('accessToken', result.data.accessToken, {
			path: '/'
		});
		cookies.set('refreshToken', result.data.refreshToken, {
			path: '/'
		});
		return new Response(JSON.stringify({ message: 'Refresh token success' }), {
			status: 200
		});
	}
	return new Response(JSON.stringify({ message: 'Refresh token failed' }), {
		status: 400
	});
};
