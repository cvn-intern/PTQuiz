import { IsEmail, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
    @Length(8, 20, {
        message: 'Old password must be between 8 and 20 characters',
    })
    oldPassword: string;

    @Length(8, 20, {
        message: 'New password must be between 8 and 20 characters',
    })
    newPassword: string;

    @Length(8, 20, {
        message: 'Confirm password must be between 8 and 20 characters',
    })
    confirmNewPassword: string;
}
