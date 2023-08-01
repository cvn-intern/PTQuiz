import { writable } from 'svelte/store';

export type QuizData = {
    id: string;
    description: string;
    image: string;
    numberOfQuestions: number;
    title: string;
    username: string;
    createdAt: string;
}
export const quizData = writable<QuizData[] | []>();