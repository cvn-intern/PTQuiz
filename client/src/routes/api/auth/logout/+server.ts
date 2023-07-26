import type { RequestHandler } from './$types';
import { VITE_API_URL } from '$env/static/private';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ cookies }) => {
	const response = await fetch(`${VITE_API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
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
		status: HttpStatus.OK
	});
};
