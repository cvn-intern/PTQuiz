import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    Validate,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ async: false })
export class IsEndDateGreaterThanStartDate
    implements ValidatorConstraintInterface
{
    validate(endDate: Date, args: ValidationArguments) {
        const { object } = args;
        const startDate = (object as QuizzesDto).startDate;
        return endDate >= startDate;
    }

    defaultMessage(args: ValidationArguments) {
        return 'End date must be greater than start date';
    }
}

@ValidatorConstraint({ async: false })
export class IsPointGreaterThanPassingPoint
    implements ValidatorConstraintInterface
{
    validate(point: number, args: ValidationArguments) {
        const { object } = args;
        const passingPoint = (object as QuizzesDto).passingPoint;
        return point >= passingPoint;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Point must be greater than passing point';
    }
}

export class QuizzesDto {
    @Length(1, 30, {
        message: 'Title must be between 1 and 30 characters',
    })
    @IsNotEmpty({ message: 'Title can not be empty' })
    title: string;

    @IsOptional()
    description = '';

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'DurationMins can not be empty' })
    @IsNumber({}, { message: 'DurationMins must be a number' })
    durationMins = -1;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'IsRandom can not empty' })
    @IsBoolean({ message: 'IsRandom must be a boolean' })
    isRandom = false;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'IsRandomOption can not empty' })
    @IsBoolean({ message: 'IsRandomOption must be a boolean' })
    isRandomOption = false;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Attempts cannot be empty' })
    @IsNumber({}, { message: 'Attempts must be a number' })
    attempts = -1;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Point can not be empty' })
    @IsNumber({}, { message: 'Point must be a number' })
    @Validate(IsPointGreaterThanPassingPoint)
    point: number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'PassingPoint can not be empty' })
    @IsNumber({}, { message: 'PassingPoint must be a number' })
    passingPoint: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Difficulty can not be empty' })
    @IsNumber({}, { message: 'Difficulty must be a number' })
    difficultyLevel = 1;

    @IsOptional()
    @Transform(({ value }) => new Date())
    @IsNotEmpty({ message: 'Start date can not be empty' })
    startDate = new Date();

    @IsOptional()
    @Transform(({ value }) => new Date())
    @IsNotEmpty({ message: 'End date can not be empty' })
    @Validate(IsEndDateGreaterThanStartDate)
    endDate = new Date();

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    passed = false;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    @IsNotEmpty({ message: 'IsActivated can not be empty' })
    @IsBoolean({ message: 'IsActivated must be a boolean' })
    isActivated = true;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    @IsNotEmpty({ message: 'IsShared can not be empty' })
    @IsBoolean({ message: 'IsShared must be a boolean' })
    isShared = true;

    @IsOptional()
    categoryId = 'clkjsrewg0004k6m5dt89zll5';
}
