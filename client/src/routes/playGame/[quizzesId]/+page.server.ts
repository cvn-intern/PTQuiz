export const load = async ({ fetch, params }) => {
	const { quizzesId } = params;
	const response = await fetch(`/api/quizzes/play-game`, {
		method: 'POST',
		body: JSON.stringify({ quizzesId })
	});

	const gameInfo = await response.json();
	return {
		gameInfo
	};
};
