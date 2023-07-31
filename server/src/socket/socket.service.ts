import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SocketError } from '../error';

@Injectable()
export class SocketService {
    constructor(private prisma: PrismaService) {}

    async joinRoom(roomPIN: string, userId: string, socketId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        if (room.isClosed) {
            throw new Error(SocketError.SOCKET_ROOM_CLOSED);
        }
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });
        if (room.isClosed) {
            throw new Error(SocketError.SOCKET_ROOM_CLOSED);
        }
        if (!user) {
            throw new Error(SocketError.SOCKET_USER_NOT_FOUND);
        }
        const isJoined = await this.prisma.room_participants.findFirst({
            where: {
                roomId: room.id,
                participant: {
                    userId: user.id,
                },
                isFinished: false,
            },
        });
        if (isJoined) {
            throw new Error(SocketError.SOCKET_USER_ALREADY_CONNECTED);
        }
        let isHost = false;
        if (room.userId === userId) {
            isHost = true;
        }
        const participants = await this.prisma.participants.create({
            data: {
                userId: user.id,
                quizId: room.quizId,
                point: 0,
            },
        });

        await this.prisma.room_participants.create({
            data: {
                socketId: socketId,
                roomId: room.id,
                participantId: participants.id,
                isHost,
            },
        });
        return {
            id: user.id,
            displayName: user.displayName,
        };
    }

    async leaveRoom(roomPIN: string, userId: string, socketId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error(SocketError.SOCKET_USER_NOT_FOUND);
        }
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                roomId: room.id,
                participant: {
                    userId: user.id,
                },
                isFinished: false,
            },
        });
        if (!foundUser) {
            throw new Error(SocketError.SOCKET_USER_NOT_JOINED);
        }
        await this.prisma.room_participants.delete({
            where: {
                id: foundUser.id,
            },
        });
        await this.prisma.participants.delete({
            where: {
                id: foundUser.participantId,
            },
        });
        return {
            id: user.id,
            displayName: user.displayName,
        };
    }

    async getRoomParticipants(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const roomParticipants = await this.prisma.room_participants.findMany({
            where: {
                roomId: room.id,
            },
            select: {
                participant: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                avatar: true,
                            },
                        },
                    },
                },
                roomId: true,
            },
        });
        return roomParticipants.map((roomParticipant) => {
            return {
                id: roomParticipant.participant.user.id,
                displayName: roomParticipant.participant.user.displayName,
                avatar: roomParticipant.participant.user.avatar,
            };
        });
    }

    async leaveRoomImmediately(socketId: string) {
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                isFinished: false,
            },
            select: {
                id: true,
                room: {
                    select: {
                        PIN: true,
                    },
                },
                participantId: true,
            },
        });
        if (!foundUser) {
            return null;
        }
        await this.prisma.room_participants.delete({
            where: {
                id: foundUser.id,
            },
        });
        await this.prisma.participants.delete({
            where: {
                id: foundUser.participantId,
            },
        });
        return foundUser.room.PIN;
    }

    async endRoom(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        await this.prisma.room_participants.updateMany({
            where: {
                roomId: room.id,
            },
            data: {
                isFinished: true,
            },
        });
    }

    async getQuestions(roomPIN: string) {
        const { quizId } = await this.prisma.rooms.findFirst({
            where: {
                PIN: roomPIN,
            },
        });
        const quiz = await this.prisma.quizzes.findUnique({
            where: {
                id: quizId,
            },
        });
        if (!quiz) {
            throw new Error(SocketError.SOCKET_QUIZ_NOT_FOUND);
        }
        const questions = await this.prisma.quiz_questions.findMany({
            where: {
                quizId: quizId,
            },
            select: {
                question: true,
            },
        });
        const allQuestions = questions.map((question) => {
            const questionResponse = {
                id: question.question.id,
                categoryId: question.question.categoryId,
                title: question.question.title,
                options: {
                    optionA: question.question.optionA,
                    optionB: question.question.optionB,
                    optionC: question.question.optionC,
                    optionD: question.question.optionD,
                },
                answers: {
                    answerA: question.question.answerA,
                    answerB: question.question.answerB,
                    answerC: question.question.answerC,
                    answerD: question.question.answerD,
                },
                written: question.question.written,
                image: question.question.image,
                type: question.question.type,
                time: question.question.time,
                createdAt: question.question.createdAt,
                updatedAt: question.question.updatedAt,
            };
            return questionResponse;
        });
        return allQuestions;
    }

    async checkRoomHost(roomPIN: string, userId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        if (room.userId === userId) {
            return true;
        }
        return false;
    }
}
