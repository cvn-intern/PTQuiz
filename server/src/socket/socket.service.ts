import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SocketError } from '../error';
import { AnswerDto } from './dto';
import { TypeQuestion } from '../question/type';
import { AnswerType } from '../question/type/questionInput.type';
import { RoomCount } from './types/roomCount.enum';

@Injectable()
export class SocketService {
    constructor(private prisma: PrismaService) {}

    async joinRoom(
        roomPIN: string,
        userId: string,
        socketId: string,
        aliasName: string,
        roomPassword: string,
        isHostJoined: boolean,
    ) {
        if (aliasName.length > 10 || aliasName.length < 1) {
            return {
                status: false,
                message: SocketError.SOCKET_ALIAS_NAME_VALID,
            };
        }
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
        if (!isHostJoined) {
            const host = await this.prisma.room_participants.findFirst({
                where: {
                    roomId: room.id,
                    isHost: true,
                },
            });
            if (!host) {
                return {
                    status: false,
                    message: SocketError.SOCKET_HOST_NOT_JOINED_YET,
                };
            }
        }
        const roomParticipants = await this.getRoomParticipants(roomPIN);
        if (roomParticipants.length >= room.count) {
            return {
                status: false,
                message: SocketError.SOCKET_ROOM_FULL,
            };
        }
        if (!isHostJoined) {
            if (room.isPublic === false) {
                if (room.roomPassword !== roomPassword) {
                    return {
                        status: false,
                        message: SocketError.SOCKET_ROOM_WRONG_PASSWORD,
                    };
                }
            }
        }
        const aliasAvatars = [
            'https://media0.giphy.com/media/RGkEmSasnxTBw5iLvc/giphy.gif',
            'https://media2.giphy.com/media/iI4yl51ZcrhI3MCtzD/giphy.gif?cid=ecf05e470v04nwqq7w1kozrwj4ugcx8flr1ol0nv4d55349w&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media2.giphy.com/media/f6D3bIsKSlV3gOdXaB/giphy.gif?cid=ecf05e47gp2rzwvygpjanxnfllni1c25ojev2rdy7re0j8q6&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media4.giphy.com/media/XodmZ5OSlGu5jIRMrH/giphy.gif?cid=ecf05e47mdnh5ksdp0mqk5axyuv96cb89wsj2hs332qus791&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media0.giphy.com/media/WAaJJXFVeVKvgs7KsR/giphy.gif?cid=ecf05e47jeg64oncnr21m524yu9ungmsfu4f3fkg3aa6xryu&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media4.giphy.com/media/RqhDYE8AVtGWZE33EH/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media4.giphy.com/media/RaxcELylDIaDnbWWtl/giphy.gif?cid=ecf05e47qpagl2cg9lueva249mxoedai6tq0ov4dal00urg4&ep=v1_gifs_related&rid=giphy.gif&ct=s',
            'https://media0.giphy.com/media/m738BWCynXs23KFsnq/giphy.gif?cid=ecf05e47uggl22tfcwf2eiuirg3cdkhyslotnzr5mssrndhb&ep=v1_gifs_related&rid=giphy.gif&ct=s',
        ];
        const randomAvatar =
            aliasAvatars[Math.floor(Math.random() * aliasAvatars.length)];
        const user = await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                aliasName: aliasName,
                aliasAvatar: randomAvatar,
            },
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
            status: true,
            message: 'Joined successfully',
        };
    }

    async leaveRoom(roomPIN: string, userId: string, socketId: string) {
        let isHost = false;
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
        if (foundUser.isHost === true) {
            await this.prisma.rooms.update({
                where: {
                    id: room.id,
                },
                data: {
                    isStarted: false,
                },
            });
            isHost = true;
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
            isHost,
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
                                aliasAvatar: true,
                                aliasName: true,
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
                displayName: roomParticipant.participant.user.aliasName,
                avatar: roomParticipant.participant.user.aliasAvatar,
                isHost: roomParticipant.isHost,
                point: roomParticipant.participant.point,
                correct: roomParticipant.participant.correct,
            };
        });
    }

    async leaveRoomImmediately(socketId: string) {
        let isHost = false;
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                isFinished: false,
            },
            select: {
                id: true,
                room: {
                    select: {
                        id: true,
                        PIN: true,
                    },
                },
                participantId: true,
                isHost: true,
            },
        });
        if (!foundUser) {
            return null;
        }
        if (foundUser.isHost) {
            isHost = true;
            await this.prisma.rooms.update({
                where: {
                    id: foundUser.room.id,
                },
                data: {
                    isStarted: false,
                },
            });
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
            roomPIN: foundUser.room.PIN,
            isHost,
        };
    }

    async endQuiz(roomPIN: string, userId: string) {
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

    async startQuiz(roomPIN: string, userId: string) {
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
        if (
            type === TypeQuestion.ESSAY ||
            type === TypeQuestion.INPUT_TEXT ||
            type === TypeQuestion.ARRANGE_WORD
        ) {
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
    async getScoreBoard(roomPIN: string, questionId: string) {
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
                                aliasAvatar: true,
                                aliasName: true,
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
        const result = scoreBoard.map(async (user) => {
            let isAnswered = false;
            const result = await this.prisma.user_questions.findFirst({
                where: {
                    participantId: user.participant.id,
                    questionId,
                },
                select: {
                    givenAnswers: true,
                    questionRef: {
                        select: {
                            type: true,
                        },
                    },
                },
            });
            if (result) {
                if (this.isWrittenQuestion(result.questionRef.type)) {
                    if (result.givenAnswers !== '') {
                        isAnswered = true;
                    }
                } else {
                    if (result.givenAnswers !== null) {
                        if (result.givenAnswers !== 'false,false,false,false') {
                            isAnswered = true;
                        } else isAnswered = false;
                    }
                }
            }
            return {
                id: user.participant.id,
                displayName: user.participant.user.aliasName,
                avatar: user.participant.user.aliasAvatar,
                isHost: user.isHost,
                point: user.participant.point,
                correct: user.participant.correct,
                isAnswered: isAnswered,
            };
        });
        return Promise.all(result);
    }

    async getAnswerQuestion(questionId: string) {
        const answer = await this.prisma.questions.findUnique({
            where: {
                id: questionId,
            },
            select: {
                answerA: true,
                answerB: true,
                answerC: true,
                answerD: true,
                written: true,
            },
        });
        if (!answer) {
            throw new Error(SocketError.SOCKET_QUESTION_NOT_FOUND);
        }
        return answer;
    }

    async getRoomInfo(roomPIN: string, userId: string) {
        let roomPassword = null;
        const room = await this.prisma.rooms.findFirst({
            where: {
                PIN: roomPIN,
            },
            select: {
                id: true,
                PIN: true,
                userId: true,
                isPublic: true,
                isClosed: true,
                isStarted: true,
                count: true,
                type: true,
            },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        let isHost = false;
        if (room.userId === userId) {
            isHost = true;
            const result = await this.prisma.rooms.findUnique({
                where: {
                    id: room.id,
                },
                select: {
                    roomPassword: true,
                },
            });
            roomPassword = result.roomPassword;
        }
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                aliasName: true,
                displayName: true,
            },
        });
        return {
            isHost,
            room,
            user,
            roomPassword,
        };
    }

    async setPrivateRoom(roomId: string, userId: string, isPublic: boolean) {
        const room = await this.prisma.rooms.findFirst({
            where: {
                id: roomId,
                userId: userId,
            },
        });
        if (room.userId !== userId) {
            throw new Error(SocketError.SOCKET_ROOM_PERMISSION_DENIED);
        }
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const result = await this.prisma.rooms.update({
            where: {
                id: roomId,
            },
            data: {
                isPublic: isPublic,
            },
        });
        return result.isPublic;
    }

    async setRoomCapacity(roomId: string, userId: string, count: number) {
        if (count < RoomCount.MIN || count > RoomCount.MAX) {
            throw new Error(SocketError.SOCKET_ROOM_COUNT_MAX);
        }
        const room = await this.prisma.rooms.findFirst({
            where: {
                id: roomId,
                userId: userId,
            },
        });
        if (room.userId !== userId) {
            throw new Error(SocketError.SOCKET_ROOM_PERMISSION_DENIED);
        }
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const result = await this.prisma.rooms.update({
            where: {
                id: roomId,
            },
            data: {
                count,
            },
        });
        return result;
    }

    async findUserSocketId(
        roomId: string,
        hostId: string,
        participantId: string,
    ) {
        const room = await this.prisma.rooms.findFirst({
            where: {
                id: roomId,
                userId: hostId,
                isStarted: false,
            },
        });
        if (!room) {
            throw new Error(SocketError.SOCKET_ROOM_NOT_FOUND);
        }
        const participant = await this.prisma.room_participants.findFirst({
            where: {
                participantId: participantId,
                roomId: roomId,
                isFinished: false,
            },
        });
        return {
            participant,
        };
    }
}
