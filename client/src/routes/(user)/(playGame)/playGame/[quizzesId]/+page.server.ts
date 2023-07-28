import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { quizzesId } = params;
	const response = await fetch(`/api/play-game`, {
		method: 'POST',
		body: JSON.stringify({ quizzesId })
	});

	const gameInfo = await response.json();
	return {
		title: 'Play Game',
		gameInfo
	};
};
