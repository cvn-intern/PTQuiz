import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const formData = await request.formData();
};
