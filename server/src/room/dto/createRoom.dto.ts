import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty({ message: 'Quiz ID cannot be empty' })
    @IsString({ message: 'Quiz ID must be a string' })
    quizId: string;
    @IsNotEmpty({ message: 'Room type cannot be empty' })
    @IsNumber({}, { message: 'Room type must be a number' })
    type: number;
}
