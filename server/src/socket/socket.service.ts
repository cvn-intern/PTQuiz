import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SocketError } from '../error';
import { AnswerDto } from './dto';
import { TypeQuestion } from '../question/type';
import { AnswerType } from '../question/type/questionInput.type';

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
        if (room.isStarted) {
            throw new Error(SocketError.SOCKET_ROOM_STARTED);
        }
        if (room.isClosed) {
            throw new Error(SocketError.SOCKET_ROOM_CLOSED);
        }
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });
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
                correct: 0,
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
        await this.prisma.user_questions.deleteMany({
            where: {
                participantId: foundUser.participantId,
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
                        id: true,
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                avatar: true,
                            },
                        },
                        point: true,
                        correct: true,
                    },
                },
                roomId: true,
                isHost: true,
            },
        });
        return roomParticipants.map((roomParticipant) => {
            return {
                id: roomParticipant.participant.id,
                displayName: roomParticipant.participant.user.displayName,
                avatar: roomParticipant.participant.user.avatar,
                isHost: roomParticipant.isHost,
                point: roomParticipant.participant.point,
                correct: roomParticipant.participant.correct,
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
        await this.prisma.user_questions.deleteMany({
            where: {
                participantId: foundUser.participantId,
            },
        });
        await this.prisma.participants.delete({
            where: {
                id: foundUser.participantId,
            },
        });
        return foundUser.room.PIN;
    }

    async endGame(roomPIN: string, userId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN, userId },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }

        await this.prisma.rooms.update({
            where: {
                id: room.id,
            },
            data: {
                isClosed: true,
                isStarted: false,
            },
        });

        await this.prisma.room_participants.updateMany({
            where: {
                roomId: room.id,
            },
            data: {
                isFinished: true,
            },
        });
    }

    async startGame(roomPIN: string, userId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN, userId },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        await this.prisma.rooms.update({
            where: {
                id: room.id,
            },
            data: {
                isStarted: true,
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
        if (room.userId !== userId) {
            return false;
        }
        return true;
    }

    isRightAnswer(answerOfUser: AnswerType, answerOfQuestion: AnswerType) {
        return (
            answerOfUser.answerA === answerOfQuestion.answerA &&
            answerOfUser.answerB === answerOfQuestion.answerB &&
            answerOfUser.answerC === answerOfQuestion.answerC &&
            answerOfUser.answerD === answerOfQuestion.answerD
        );
    }
    objectToString(object: AnswerType) {
        return Object.values(object).toString();
    }
    stringToArray(str) {
        return str.split(',').map((item) => item === 'true');
    }
    isWrittenQuestion(type: number) {
        if (type === TypeQuestion.ESSAY) {
            return true;
        }
        return false;
    }
    async pickAnswer(socketId: string, userId: string, answer: AnswerDto) {
        let isCorrect = false;
        let score = 0;
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                room: {
                    PIN: answer.roomPIN,
                },
                isFinished: false,
            },
            select: {
                participantId: true,
                participant: {
                    select: {
                        quizId: true,
                        quiz: {
                            select: {
                                point: true,
                                numberQuestions: true,
                            },
                        },
                        point: true,
                        correct: true,
                    },
                },
                roomId: true,
            },
        });
        if (!foundUser) {
            throw new Error(SocketError.SOCKET_USER_NOT_JOINED);
        }
        const foundQuestion = await this.prisma.quiz_questions.findFirst({
            where: {
                quizId: foundUser.participant.quizId,
                questionId: answer.answer.questionId,
            },
            select: {
                question: {
                    select: {
                        title: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        answerA: true,
                        answerB: true,
                        answerC: true,
                        answerD: true,
                        written: true,
                        type: true,
                        image: true,
                    },
                },
            },
        });
        if (!foundQuestion) {
            throw new Error(SocketError.SOCKET_QUESTION_NOT_FOUND);
        }
        if (this.isWrittenQuestion(foundQuestion.question.type)) {
            if (
                answer.answer.writtenAnswer === foundQuestion.question.written
            ) {
                score +=
                    foundUser.participant.quiz.point /
                    foundUser.participant.quiz.numberQuestions;
                isCorrect = true;
                await this.prisma.participants.update({
                    where: {
                        id: foundUser.participantId,
                    },
                    data: {
                        point: foundUser.participant.point + score,
                        correct: foundUser.participant.correct + 1,
                    },
                });
            }
            await this.prisma.user_questions.create({
                data: {
                    userId,
                    participantId: foundUser.participantId,
                    questionId: answer.answer.questionId,
                    question: foundQuestion.question.title,
                    image: foundQuestion.question.image,
                    optionA: foundQuestion.question.optionA,
                    optionB: foundQuestion.question.optionB,
                    optionC: foundQuestion.question.optionC,
                    optionD: foundQuestion.question.optionD,
                    answerA: foundQuestion.question.answerA,
                    answerB: foundQuestion.question.answerB,
                    answerC: foundQuestion.question.answerC,
                    answerD: foundQuestion.question.answerD,
                    written: foundQuestion.question.written,
                    givenAnswers: answer.answer.writtenAnswer,
                    score: isCorrect ? score : 0,
                    timestamp: new Date(),
                },
            });
        } else {
            const answerOfQuestion: AnswerType = {
                answerA: foundQuestion.question.answerA,
                answerB: foundQuestion.question.answerB,
                answerC: foundQuestion.question.answerC,
                answerD: foundQuestion.question.answerD,
            };
            const answerOfUser: AnswerType = {
                answerA: answer.answer.givenAnswers.answerA,
                answerB: answer.answer.givenAnswers.answerB,
                answerC: answer.answer.givenAnswers.answerC,
                answerD: answer.answer.givenAnswers.answerD,
            };
            isCorrect = this.isRightAnswer(answerOfUser, answerOfQuestion);
            if (isCorrect) {
                score +=
                    foundUser.participant.quiz.point /
                    foundUser.participant.quiz.numberQuestions;
                await this.prisma.participants.update({
                    where: {
                        id: foundUser.participantId,
                    },
                    data: {
                        point: foundUser.participant.point + score,
                        correct: foundUser.participant.correct + 1,
                    },
                });
            }
            await this.prisma.user_questions.create({
                data: {
                    userId,
                    participantId: foundUser.participantId,
                    questionId: answer.answer.questionId,
                    question: foundQuestion.question.title,
                    image: foundQuestion.question.image,
                    optionA: foundQuestion.question.optionA,
                    optionB: foundQuestion.question.optionB,
                    optionC: foundQuestion.question.optionC,
                    optionD: foundQuestion.question.optionD,
                    answerA: foundQuestion.question.answerA,
                    answerB: foundQuestion.question.answerB,
                    answerC: foundQuestion.question.answerC,
                    answerD: foundQuestion.question.answerD,
                    written: foundQuestion.question.written,
                    givenAnswers: this.objectToString(
                        answer.answer.givenAnswers,
                    ),
                    score: isCorrect ? score : 0,
                    timestamp: new Date(),
                },
            });
        }
        return {
            isCorrect,
            score,
            answer: [
                foundQuestion.question.answerA,
                foundQuestion.question.answerB,
                foundQuestion.question.answerC,
                foundQuestion.question.answerD,
            ],
        };
    }

    async getHostSocketId(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const host = await this.prisma.room_participants.findFirst({
            where: {
                roomId: room.id,
                isHost: true,
            },
        });
        if (!host) {
            throw new Error(SocketError.SOCKET_HOST_NOT_FOUND);
        }
        return host.socketId;
    }
    async getScoreBoard(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const scoreBoard = await this.prisma.room_participants.findMany({
            where: {
                roomId: room.id,
            },
            select: {
                participant: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                displayName: true,
                                avatar: true,
                            },
                        },
                        point: true,
                        correct: true,
                    },
                },
                isHost: true,
            },
            orderBy: {
                participant: {
                    point: 'desc',
                },
            },
        });
        return scoreBoard.map((user) => {
            return {
                id: user.participant.id,
                displayName: user.participant.user.displayName,
                avatar: user.participant.user.avatar,
                isHost: user.isHost,
                point: user.participant.point,
                correct: user.participant.correct,
            };
        });
    }
}
