import { IsNotEmpty, Length } from 'class-validator';
export class QuizzesDto {
    userId: string;

    @Length(10, 30, {
        message: 'Title must be between 10 and 30 characters',
    })
    @IsNotEmpty({ message: 'Title can not be empty' })
    title: string;

    @IsNotEmpty({ message: 'Number of questions can not be empty' })
    numberQuestions: number;

    @IsNotEmpty({ message: 'Description can not be empty' })
    description: string;

    @IsNotEmpty({ message: 'Image can not be empty' })
    image: string;

    @IsNotEmpty({ message: 'DurationMins can not be empty' })
    durationMins: number;

    @IsNotEmpty({ message: 'IsRandom can not empty' })
    isRandom: boolean;

    @IsNotEmpty({ message: 'IsRandomOption can not empty' })
    isRandomOption: boolean;

    @IsNotEmpty({ message: 'Attempts cannot be empty' })
    attempts: number;

    @IsNotEmpty({ message: 'Point can not be empty' })
    point: number;

    @IsNotEmpty({ message: 'PassingPoint can not be empty' })
    passingPoint: number;

    @IsNotEmpty({ message: 'Passed can not be empty' })
    passed: boolean;

    @IsNotEmpty({ message: 'Difficulty can not be empty' })
    difficultyLevel: number;

    @IsNotEmpty({ message: 'Start date can not be empty' })
    startDate: Date;

    @IsNotEmpty({ message: 'End date can not be empty' })
    endDate: Date;

    @IsNotEmpty({ message: 'IsActivated can not be empty' })
    isActivated: boolean;

    @IsNotEmpty({ message: 'IsShared can not be empty' })
    isShared: boolean;
}
