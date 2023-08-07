import type { PageServerLoad } from '../$types';
import { fail } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/history/single-play`, {
		method: 'GET'
	});
	const result = await response.json();

	return {
		title: 'Get history',
		result
	};
};
