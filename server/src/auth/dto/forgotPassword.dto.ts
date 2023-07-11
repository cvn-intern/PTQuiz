import { IsEmail, IsString } from 'class-validator';

export class EmailDto {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}
