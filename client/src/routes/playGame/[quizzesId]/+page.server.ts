export const load = async ({ fetch, params }) => {
	const { quizzesId } = params;
	const response = await fetch(`/api/quizzes/getAllQuestions/${quizzesId}`, {
		method: 'GET'
	});

	const result = await response.json();
	return {
		result
	};
};
