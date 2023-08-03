import { writable } from 'svelte/store';

export const quizStore = writable({
	quizzes: [],
	totalQuizzes: 0
});
