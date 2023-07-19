import { IsNotEmpty } from "class-validator";

export class Answer {
    @IsNotEmpty({ message: 'QuestionId can not be empty' })
    questionId: string;
    @IsNotEmpty({ message: 'AnswerOfUser can not be empty' })
    answerOfUser: string[];
}
