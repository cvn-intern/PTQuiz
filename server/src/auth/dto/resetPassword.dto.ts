import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string;

    @IsString({ message: 'Confirm Password must be a string' })
    @Length(8, 20, {
        message: 'Confirm Password must be between 8 and 20 characters',
    })
    confirmPassword: string;
}
