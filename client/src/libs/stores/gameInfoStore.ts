import { writable } from 'svelte/store';

interface QuizInfo {
	completedAt: string | null;
	correct: number;
	createdAt: string;
	id: string;
	isSingleMode: boolean;
	point: number;
	questions: number;
	quizId: string;
	startedAt: string;
	totalAttempt: number;
	updatedAt: string;
	userId: string;
}

export const gameInfoStore = writable<QuizInfo | null>(null);
