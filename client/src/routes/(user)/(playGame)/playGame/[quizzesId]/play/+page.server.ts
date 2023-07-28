import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const { quizzesId } = params;
	const response = await fetch(`/api/play-game/quiz/${quizzesId}`, {
		method: 'GET'
	});

	const result = await response.json();
	return {
		title: 'Play Game',
		result
	};
};
