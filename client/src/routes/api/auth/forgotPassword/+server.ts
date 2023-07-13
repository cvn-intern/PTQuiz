import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const data = await request.json();
	const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
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
		return new Response(JSON.stringify(result.data), {
			status: 200
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: 400
		});
	}
};