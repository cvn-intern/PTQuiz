import img1 from '../../../assets/testimg.png';
import img2 from '../../../assets/testimg2.png';
import img3 from '../../../assets/testimg3.png';

export function load() {
	return {
		quizzes: [
			{
				title: 'Quiz 1',
				description: 'This is a quiz about the first topic',
				username: 'user1',
				numberOfQuestions: 5,
				image: img1
			},
			{
				title: 'Quiz 2',
				description: 'This is a quiz about the second topic',
				username: 'user2',
				numberOfQuestions: 10,
				image: img2
			},
			{
				title: 'Quiz 3',
				description: 'This is a quiz about the third topic',
				username: 'user3',
				numberOfQuestions: 15,
				image: img3
			},
			{
				title: 'Quiz 4',
				description: 'This is a quiz about the third topic',
				username: 'user3',
				numberOfQuestions: 15,
				image: 'https://images-cdn.kahoot.it/91a94ea1-0123-41f2-a9d8-23715d075d59?auto=webp&width=176'
			}
			// {
			// 	title: 'Quiz 5',
			// 	description: 'This is a quiz about the third topic',
			// 	username: 'user3',
			// 	numberOfQuestions: 15,
			// 	image: 'https://images-cdn.kahoot.it/91a94ea1-0123-41f2-a9d8-23715d075d59?auto=webp&width=176'
			// },
		]
	};
}
