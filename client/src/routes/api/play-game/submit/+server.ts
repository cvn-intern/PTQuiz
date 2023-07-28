import type { RequestHandler } from '../$types';
import { HttpStatus } from '$constants/httpStatus';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const accessToken = cookies.get('accessToken');
	const data = await request.json();
	const response = await fetch(`${import.meta.env.VITE_API_URL}/play-game/submit`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	if (response.status === HttpStatus.OK) {
		return new Response(JSON.stringify(result.message), {
			status: HttpStatus.OK
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: HttpStatus.BAD_REQUEST
		});
	}
};
