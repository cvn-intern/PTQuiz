import { writable } from 'svelte/store';

export type QuestionData = {
    id: string;
    categoryId: string;
    title: string;
    options: OptionType;
    answers: AnswerType;
    written: string;
    image: string;
    type: number;
    index: number;
};

export type AnswerType = {
    answerA: boolean;
    answerB: boolean;
    answerC: boolean;
    answerD: boolean;
};

export type OptionType = {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
};


export const questionData = writable<QuestionData[] | null>(null);
