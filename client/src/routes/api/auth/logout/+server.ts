import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('accessToken')}`
		}
	});
	const result = await response.json();
	cookies.delete('accessToken', {
		path: '/'
	});
	cookies.delete('refreshToken', {
		path: '/'
	});
	return new Response(JSON.stringify({ message: 'Logout success' }), {
		status: 200
	});
};
