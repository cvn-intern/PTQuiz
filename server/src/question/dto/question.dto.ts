import { IsNotEmpty } from 'class-validator';

export class Question {
    @IsNotEmpty({ message: 'Categories can not be empty' })
    categoryId: string;

    @IsNotEmpty({ message: 'Title can not be empty' })
    title: string;

    @IsNotEmpty({ message: 'Options can not be empty' })
    options: string;

    @IsNotEmpty({ message: 'Answer can not be empty' })
    answers: string;

    @IsNotEmpty({ message: 'Answer can not be empty' })
    image: string;

    @IsNotEmpty({ message: 'Type can not be empty' })
    type: number;
}
