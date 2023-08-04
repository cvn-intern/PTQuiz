import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoomError } from 'src/error';

@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) {}

    async createRoom(userId: string, body: { quizId: string }) {
        try {
            if (!body.quizId)
                throw new HttpException(
                    RoomError.QUIZID_REQUIRED,
                    HttpStatus.BAD_REQUEST,
                );

            const isExistQuiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: body.quizId,
                },
            });
            if (!isExistQuiz)
                throw new HttpException(
                    RoomError.QUIZ_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );

            if (isExistQuiz.numberQuestions === 0)
                throw new HttpException(
                    RoomError.QUIZ_EMPTY,
                    HttpStatus.BAD_REQUEST,
                );

            const isExistRoom = await this.prisma.rooms.findFirst({
                where: {
                    quizId: body.quizId,
                    userId: userId,
                    isClosed: false,
                },
            });

            if (isExistRoom)
                throw new HttpException(
                    `${RoomError.ROOM_EXIST} \n ${process.env.CLIENT_URL}/room/${isExistRoom.PIN}`,
                    HttpStatus.BAD_REQUEST,
                );

            const room = await this.prisma.rooms.create({
                data: {
                    PIN: Math.floor(Math.random() * 1000000).toString(),
                    quizId: body.quizId,
                    userId: userId,
                    count: 0,
                    isStarted: false,
                    isPublic: true,
                    roomPassword: (
                        Math.floor(Math.random() * 90000) + 10000
                    ).toString(),
                    isClosed: false,
                    type: 1,
                    createdAt: new Date(),
                },
            });
            return room;
        } catch (err) {
            throw new HttpException(
                err.message || 'Something went wrong',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async closeRoom(body: { roomId: string }, userId: string) {
        try {
            if (!body.roomId)
                throw new HttpException(
                    RoomError.ROOMID_REQUIRED,
                    HttpStatus.BAD_REQUEST,
                );

            const room = await this.prisma.rooms.findFirst({
                where: {
                    id: body.roomId,
                    userId: userId,
                },
            });
            if (!room)
                throw new HttpException(
                    RoomError.ROOM_NOT_EXIST,
                    HttpStatus.BAD_REQUEST,
                );

            const result = await this.prisma.rooms.update({
                where: {
                    id: body.roomId,
                },
                data: {
                    isStarted: true,
                    isClosed: true,
                },
            });

            return result;
        } catch (err) {
            throw new HttpException(
                err.message || 'Something went wrong',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
