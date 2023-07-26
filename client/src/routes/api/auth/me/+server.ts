import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch(`${VITE_API_URL}/auth/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();
	if (response.status === 200) {
		return new Response(JSON.stringify(result.data), {
			status: 200
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: 401
		});
	}
};
