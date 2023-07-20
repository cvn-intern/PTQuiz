import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	const accessToken = cookies.get('accessToken');
	const data = await request.json();
	console.log(data);
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/play-game/submit`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
            body: JSON.stringify(data)
		}
	);
	const result = await response.json();
	if (response.status === 200) {
		return new Response(JSON.stringify(result.message), {
			status: 200
		});
	} else {
		return new Response(JSON.stringify(result.message), {
			status: 400
		});
	}
};
