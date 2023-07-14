export interface IQuiz {
	title: string;
	description: string;
	username: string;
	numberOfQuestions: number;
	image: string;
}
export interface IQuizAPI {
	title: string;
	description: string;
	user: {
		displayName: string;
	};
	numberOfQuestions: number;
	image: string;
}