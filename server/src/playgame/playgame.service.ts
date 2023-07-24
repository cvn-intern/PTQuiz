import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnswerDetail } from './dto/answer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionService } from '../question/question.service';
import { PlayGameError } from '../error/playGameError.enum';
import { EndGameError } from '../error/endGameError.enum';
import { EndGameType } from './dto/endGame.type';

@Injectable()
export class PlaygameService {
    constructor(
        private prisma: PrismaService,
        private quizzesService: QuizzesService,
        private questionService: QuestionService,
    ) {}

    isRightAnswer(answerOfUser, answerOfQuestion) {
        return (
            answerOfUser.length === answerOfQuestion.length &&
            answerOfUser.every(
                (element, index) => element === answerOfQuestion[index],
            )
        );
    }
    arrayToString(array) {
        return array.join(', ');
    }
    stringToArray(str) {
        return str.split(',').map((item) => item === 'true');
    }

    async getAllQuestionOfQuiz(userId: string, quizId: string) {
        try {
            return await this.quizzesService.getAllQuestionsOfQuiz(
                userId,
                quizId,
            );
        } catch (err) {
            throw new HttpException(
                PlayGameError.NOT_FOUND_QUIZ,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async playGame(userId: string, quizId: string) {
        try {
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            const participant = await this.prisma.participants.create({
                data: {
                    userId: userId,
                    quizId: quizId,
                    questions: quiz.numberQuestions,
                    correct: 0,
                    totalAttempt: 0,
                    point: 0,
                    startedAt: new Date(),
                    isSingleMode: true,
                },
            });
            return participant;
        } catch (err) {
            throw new HttpException(
                PlayGameError.CAN_NOT_PLAY,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async submitAllQuestions(userId: string, dto: AnswerDetail) {
        try {
            const { participantId, answerOfUser } = dto;
            const participant = await this.prisma.participants.findUnique({
                where: {
                    id: participantId,
                },
            });
            const quizIdOfParticipant = participant.quizId;
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizIdOfParticipant,
                },
                select: {
                    numberQuestions: true,
                    point: true,
                    passingPoint: true,
                },
            });
            let totalPoint = 0;
            let totalCorrect = 0;
            await Promise.all(
                answerOfUser.map(async (answer) => {
                    let score = 0;

                    const question = await this.questionService.getQuestion(
                        answer.questionId,
                    );
                    if (question.type === 0 || question.type === 1) {
                        const arrayGiveAnswer = this.stringToArray(
                            answer.givenAnswers,
                        );
                        const checkTrue = this.isRightAnswer(
                            arrayGiveAnswer,
                            question.answers,
                        );
                        if (checkTrue) {
                            score = quiz.point / quiz.numberQuestions;
                        } else {
                            score = 0;
                        }
                    } else if (question.type === 2) {
                        if (answer.givenAnswers === question.written) {
                            score = quiz.point / quiz.numberQuestions;
                        } else {
                            score = 0;
                        }
                    }
                    if (score !== 0) {
                        totalCorrect += 1;
                    }
                    totalPoint += score;
                    const updateAnswerOfUser =
                        await this.prisma.user_questions.create({
                            data: {
                                userId: userId,
                                participantId: participantId,
                                questionId: answer.questionId,
                                question: question.title,
                                image: question.image,
                                optionA: question.options[0],
                                optionB: question.options[1],
                                optionC: question.options[2],
                                optionD: question.options[3],
                                answerA: question.answers[0],
                                answerB: question.answers[1],
                                answerC: question.answers[2],
                                answerD: question.answers[3],
                                written: question.written,
                                givenAnswers: answer.givenAnswers,
                                score: score,
                                timestamp: new Date(),
                            },
                        });
                }),
            );
            const updateParticipan = await this.prisma.participants.update({
                where: {
                    id: participantId,
                },
                data: {
                    completedAt: new Date(),
                    point: totalPoint,
                    correct: totalCorrect,
                },
            });
        } catch (error) {
            throw new HttpException(
                PlayGameError.CAN_NOT_SUBMIT,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    async endGame(userId: string, quizId: string) {
        try {
            const endGameParticipanList =
                await this.prisma.participants.findMany({
                    where: {
                        userId: userId,
                        quizId: quizId,
                        isSingleMode: true,
                    },
                    orderBy: {
                        completedAt: 'desc',
                    },
                });
            const { passingPoint } = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
                select: {
                    passingPoint: true,
                },
            });
            const endGameResult: EndGameType[] = endGameParticipanList.map(
                (endGameParticipan) => {
                    const { point } = endGameParticipan;
                    const passed = point >= passingPoint;
                    return { ...endGameParticipan, passed };
                },
            );
            return endGameResult;
        } catch (error) {
            throw new HttpException(
                EndGameError.ERROR_ENDGAME,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
