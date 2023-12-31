import logo from '$assets/logo.png';
import type { IQuiz, IQuizAPI } from './quiz.type';

export async function load({ fetch, params }) {
	const page = params.page || 1;
	const sortBy = params.sortBy || 0;
	const response = await fetch(`/api/quizzes/${page}/${sortBy}`);
	const result = await response.json();

	if (response.status === 200) {
		const quizzes: IQuiz[] = result.quizzesOfUser.map((quiz: IQuizAPI) => {
			return {
				title: quiz.title,
				description: quiz.description,
				numberOfQuestions: quiz.numberOfQuestions,
				image: quiz.image,
				createdAt: quiz.createdAt,
				id: quiz.id,
				durationMins: quiz.durationMins,
				difficultyLevel: quiz.difficultyLevel,
			};
		});
		return {
			quizzes: quizzes,
			totalQuizzes: result.totalQuizzes
		};
	} else {
		return {
			quizzes: [
				{
					title: 'Cannot load quizzes',
					description: 'Cannot load quizzes',
					username: 'Cannot load quizzes',
					numberOfQuestions: 0,
					image: logo,
					createdAt: 'Cannot load quizzes'
				}
			]
		};
	}
}
