export interface ResultGameInterface {
	id: string;
	userId: string;
	quizId: string;
	questions: number;
	correct: number;
	totalAttempt: number;
	point: number;
	startedAt: Date;
	completedAt: Date;
	isSingleMode: boolean;
	createdAt: Date;
	updatedAt: Date;
	passed: boolean;
}

export interface Attempt {
	attempt: number;
	points: number;
	status: string;
}
