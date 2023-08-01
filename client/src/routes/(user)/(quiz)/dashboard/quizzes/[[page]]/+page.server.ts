import img1 from '$assets/testimg.png';
import type { IQuiz, IQuizAPI } from './quiz.type';

export async function load({ fetch, params }) {
	const page = params.page || 1;
	const response = await fetch(`/api/quizzes/${page}`);
	const result = await response.json();

	console.log(result);
	console.log(params.page);

	if (response.status === 200) {
		const quizzes: IQuiz[] = result.quizzesOfUser.map((quiz: IQuizAPI) => {
			return {
				title: quiz.title,
				description: quiz.description,
				numberOfQuestions: quiz.numberOfQuestions,
				image: quiz.image,
				createdAt: quiz.createdAt,
				id: quiz.id
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
					image: img1,
					createdAt: 'Cannot load quizzes'
				}
			]
		};
	}
}
