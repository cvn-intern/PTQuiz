export async function load({ fetch, params }) {
	const response = await fetch('/api/endgame', {
		method: 'POST',
		body: JSON.stringify({ quizId: params.quizzesId })
	});
	const result = await response.json();
	if (response.status === 200) {
		return { result: result };
	} else {
		return { result: [] };
	}
}
