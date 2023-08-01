export interface TypeCategory {
	category: {
		name: string;
	};
	quizzes: quiz[];
}
export interface quiz {
	title: string;
	description: string;
	user: string;
	image: string;
	difficultyLevel: number;
	numberQuestions: number;
	durationMins: number;
}
