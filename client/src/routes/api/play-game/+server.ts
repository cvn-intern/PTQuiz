import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const accessToken = cookies.get('accessToken');
	const data = await request.json();
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/play-game/play?quizId=${data.quizzesId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	const result = await response.json();
	if (response.status === 200) {
		return new Response(JSON.stringify(result.data), {
			status: 200
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: 400
		});
	}
};
