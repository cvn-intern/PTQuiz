import img1 from '../../../assets/testimg.png';
import type { IQuiz, IQuizAPI } from './quiz.type';

export async function load({ fetch }) {
	const response = await fetch('/api/quizzes/getAll');
	const result = await response.json();
	if (response.status === 200) {
		const quizzes: IQuiz[] = result.map((quiz: any) => {
			return {
				title: quiz.title,
				description: quiz.description,
				username: quiz.user.displayName,
				numberOfQuestions: quiz.numberOfQuestions,
				image: quiz.image,
				createdAt: quiz.createdAt
			};
		});
		return {
			quizzes: quizzes
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
