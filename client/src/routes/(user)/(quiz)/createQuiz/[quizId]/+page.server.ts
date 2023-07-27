import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	console.log('123');
	console.log(params);
	const response = await fetch(`/api/quizzes/get/${params.quizId}`, {
		method: 'GET'
	});

	const result = await response.json();

	return {
		title: 'Get infor Quiz',
		result
	};
};
