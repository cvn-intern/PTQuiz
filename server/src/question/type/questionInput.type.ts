export type QuestionData = {
    userId: string;
    categoryId: string;
    title: string;
    options: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
    };
    answers: {
        answerA: boolean;
        answerB: boolean;
        answerC: boolean;
        answerD: boolean;
    };
    written: string;
    image: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;
};
