import { HttpStatus } from '$constants/httpStatus';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data = await request.json();
	cookies.set('lang', data.locale, {
		path: '/'
	});
	return new Response(JSON.stringify({ message: 'success' }), {
		status: HttpStatus.OK
	});
};
