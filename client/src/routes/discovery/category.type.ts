export interface TypeCategory {
    category: string;
	quizzes: quiz[];
}
export interface quiz {
	title: string;
	description: string;
	user: string;
	image: string;
}
