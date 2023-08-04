import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QuestionDto {
    @IsOptional()
    categoryId = 'clk6mopdw0005j3ngsixir2g2';

    @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
    @IsNotEmpty({ message: 'Title can not be empty' })
    title: string;

    @Length(1, 20, { message: 'Options A must be between 1 and 20 characters' })
    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @IsNotEmpty({ message: 'Options A can not be empty' })
    optionA = '';

    @Length(1, 20, { message: 'Options B must be between 1 and 20 characters' })
    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @IsNotEmpty({ message: 'Options B can not be empty' })
    optionB = '';

    @Length(1, 20, { message: 'Options C must be between 1 and 20 characters' })
    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @IsNotEmpty({ message: 'Options C can not be empty' })
    optionC = '';

    @Length(1, 20, { message: 'Options D must be between 1 and 20 characters' })
    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @IsNotEmpty({ message: 'Options D can not be empty' })
    optionD = '';

    @ValidateIf((o) => o.type === 0 || o.type === 1 || o.type === 3)
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'Answer A can not be empty' })
    answerA = false;

    @ValidateIf((o) => o.type === 0 || o.type === 1 || o.type === 3)
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'Answer B can not be empty' })
    answerB = false;

    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'Answer C can not be empty' })
    answerC = false;

    @ValidateIf((o) => o.type === 0 || o.type === 1)
    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty({ message: 'Answer D can not be empty' })
    answerD = false;

    @Length(1, 10, { message: 'Answer must be between 0 and 10 characters' })
    @ValidateIf((o) => o.type === 2)
    @IsNotEmpty({ message: 'Written can not be empty' })
    @Transform(({ value }) => value.trim())
    @Transform(({ value }) => value.toUpperCase())
    written = '';

    @IsNotEmpty({ message: 'Type can not be empty' })
    @Transform(({ value }) => Number(value))
    type: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    time = 20;

    @IsOptional()
    image = '';

    @Length(0, 50, { message: 'Hint must be between 0 and 50 characters' })
    @IsOptional()
    hint = '';
}
