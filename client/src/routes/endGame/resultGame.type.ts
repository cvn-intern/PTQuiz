export interface ResultGameInterface {
	id: string;
	userId: string;
	quizId: string;
	questions: number;
	correct: number;
	totalAttempt: number;
	point: number;
	startedAt: string;
	completedAt: string;
	isSingleMode: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Attempt {
	attempt: number;
	points: number;
	status: string;
}

