export type QuestionResponse = {
    id: string;
    userId: string;
    categoryId: string;
    title: string;
    options: string[];
    answers: string[];
    image: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;
};
