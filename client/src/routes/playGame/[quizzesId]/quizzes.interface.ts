export interface Quiz {
	id: string;
	categoryId: string;
	userId: string;
	title: string;
	type: number;
	image: string | null;
	options: (string | null)[];
	answers: (string | null)[];
	createdAt: string;
	updatedAt: string;
	written: string | null;
}

export interface Quizzes {
	quizzes: Quiz[];
}
