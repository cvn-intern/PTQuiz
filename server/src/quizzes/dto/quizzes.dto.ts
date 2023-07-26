import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

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
    @IsOptional()
    description = '';

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'DurationMins can not be empty' })
    @IsNumber({}, { message: 'DurationMins must be a number' })
    @IsOptional()
    durationMins = -1;

    @Transform(({ value }) => value === 'true')
    @IsNotEmpty({ message: 'IsRandom can not empty' })
    @IsBoolean({ message: 'IsRandom must be a boolean' })
    @IsOptional()
    isRandom = false;

    @Transform(({ value }) => value === 'true')
    @IsNotEmpty({ message: 'IsRandomOption can not empty' })
    @IsBoolean({ message: 'IsRandomOption must be a boolean' })
    @IsOptional()
    isRandomOption = false;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Attempts cannot be empty' })
    @IsNumber({}, { message: 'Attempts must be a number' })
    @IsOptional()
    attempts = -1;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Point can not be empty' })
    @IsNumber({}, { message: 'Point must be a number' })
    point: number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'PassingPoint can not be empty' })
    @IsNumber({}, { message: 'PassingPoint must be a number' })
    passingPoint: number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Difficulty can not be empty' })
    @IsNumber({}, { message: 'Difficulty must be a number' })
    @IsOptional()
    difficultyLevel = 1;

    @Transform(({ value }) => new Date(value))
    @IsOptional()
    @IsNotEmpty({ message: 'Start date can not be empty' })
    startDate = new Date();

    @Transform(({ value }) => new Date(value))
    @IsOptional()
    @IsNotEmpty({ message: 'End date can not be empty' })
    endDate = new Date();

    @Transform(({ value }) => value === 'true')
    @IsOptional()
    passed = false;

    @Transform(({ value }) => value === 'true')
    @IsOptional()
    @IsNotEmpty({ message: 'IsActivated can not be empty' })
    @IsBoolean({ message: 'IsActivated must be a boolean' })
    isActivated = true;

    @Transform(({ value }) => value === 'true')
    @IsOptional()
    @IsNotEmpty({ message: 'IsShared can not be empty' })
    @IsBoolean({ message: 'IsShared must be a boolean' })
    isShared = false;
}
