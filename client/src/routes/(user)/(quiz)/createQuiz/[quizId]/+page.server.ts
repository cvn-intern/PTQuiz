import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const { quizId } = params;
	const response = await fetch(`/api/quizzes/update/${quizId}`, {
		method: 'PUT'
	});

	const result = await response.json();
	return {
		title: 'Update Quiz',
		result
	};
};
