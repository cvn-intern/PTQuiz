import { IsBoolean, IsNotEmpty, IsNumber, Length } from 'class-validator';
export class QuizzesDto {
    @Length(10, 30, {
        message: 'Title must be between 10 and 30 characters',
    })
    @IsNotEmpty({ message: 'Title can not be empty' })
    title: string;

    @IsNotEmpty({ message: 'Description can not be empty' })
    @Length(10, 100, {
        message: 'Description must be between 10 and 100 characters',
    })
    description: string;

    @IsNotEmpty({ message: 'Image can not be empty' })
    image: string;

    @IsNotEmpty({ message: 'DurationMins can not be empty' })
    @IsNumber({}, { message: 'DurationMins must be a number' })
    durationMins: number;

    @IsNotEmpty({ message: 'IsRandom can not empty' })
    @IsBoolean({ message: 'IsRandom must be a boolean' })
    isRandom: boolean;

    @IsNotEmpty({ message: 'IsRandomOption can not empty' })
    @IsBoolean({ message: 'IsRandomOption must be a boolean' })
    isRandomOption: boolean;

    @IsNotEmpty({ message: 'Attempts cannot be empty' })
    @IsNumber({}, { message: 'Attempts must be a number' })
    attempts: number;

    @IsNotEmpty({ message: 'Point can not be empty' })
    @IsNumber({}, { message: 'Point must be a number' })
    point: number;

    @IsNotEmpty({ message: 'PassingPoint can not be empty' })
    @IsNumber({}, { message: 'PassingPoint must be a number' })
    passingPoint: number;

    @IsNotEmpty({ message: 'Difficulty can not be empty' })
    @IsNumber({}, { message: 'Difficulty must be a number' })
    difficultyLevel: number;

    @IsNotEmpty({ message: 'Start date can not be empty' })
    startDate: Date;

    @IsNotEmpty({ message: 'End date can not be empty' })
    endDate: Date;

    @IsNotEmpty({ message: 'IsActivated can not be empty' })
    @IsBoolean({ message: 'IsActivated must be a boolean' })
    isActivated: boolean;

    @IsNotEmpty({ message: 'IsShared can not be empty' })
    @IsBoolean({ message: 'IsShared must be a boolean' })
    isShared: boolean;
}
