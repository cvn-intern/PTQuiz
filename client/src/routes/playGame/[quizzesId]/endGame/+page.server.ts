import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch('/api/endgame', {
		method: 'POST',
		body: JSON.stringify({ quizId: params.quizzesId })
	});
	const result = await response.json();
	if (response.status === 200) {
		return {
			title: 'End Game',
			result: result
		};
	} else {
		return {
			title: 'End Game',
			result: []
		};
	}
};
