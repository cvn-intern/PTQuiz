import { AnswerType, OptionType } from './questionInput.type';

export type QuestionResponse = {
    id: string;
    userId: string;
    categoryId: string;
    title: string;
    options: OptionType;
    answers: AnswerType;
    written: string;
    image: string;
    type: number;
    time: number;
    createdAt: Date;
    updatedAt: Date;
    hint: string;
};

export type QuestionResponseNoAnswer = {
    title: string;
    image: string;
    type: number;
    time: number;
};
