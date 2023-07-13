import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
	const accessToken = cookies.get('accessToken');
	const response = await fetch('http://localhost:8080/api/auth/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
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
