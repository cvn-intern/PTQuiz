import {
    IsBoolean,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
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

    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'Level can not be empty' })
    @IsNumber({}, { message: 'Level must be a number' })
    @IsIn([0, 1, 2], { message: 'Invalid level' })
    difficultyLevel: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: 'DurationMins can not be empty' })
    @IsNumber({}, { message: 'DurationMins must be a number' })
    durationMins = 0;

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

    @IsString({ message: 'CategoryId must be a string' })
    @IsNotEmpty({ message: 'CategoryId can not be empty' })
    @IsIn(
        [
            'clk6mopdw0005j3ngsixir2g2',
            'clk6mp0ik0006j3ngfaep8pb8',
            'clkjsqieu0000k6m5sqfi4gj5',
            'clkjsrewf0001k6m5bpxteo0t',
            '4clkjsrewg0002k6m565jmkvvw',
            'clkjsrewg0003k6m5tpo9b8nx',
            'clkjsrewg0004k6m5dt89zll5',
        ],
        { message: 'Invalid category id' },
    )
    categoryId = 'clkjsrewg0004k6m5dt89zll5';
}
