import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Answer, AnswerDetail } from './dto/answer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionService } from '../question/question.service';
import { PlayGameError } from '../error/playGameError.enum';
import { EndGameError } from '../error/endGameError.enum';
import { EndGameType } from './dto/endGame.type';
import { CryptoService } from '../crypto/crypto.service';
import { Option, TypeQuestion } from 'src/question/type';
import { AnswerType } from 'src/question/type/questionInput.type';

@Injectable()
export class PlaygameService {
    constructor(
        private prisma: PrismaService,
        private quizzesService: QuizzesService,
    ) {}

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
    getListQuestionOfQuiz(quizId: string) {
        return this.prisma.quiz_questions.findMany({
            where: {
                quizId: quizId,
            },
            select: {
                quiz: {
                    select: {
                        point: true,
                        numberQuestions: true,
                        passingPoint: true,
                    },
                },
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
                    isSingleMode: true,
                },
                select: {
                    quizId: true,
                },
            });
            const quizIdOfParticipant = participant.quizId;
            const listQuestionOfQuiz = await this.getListQuestionOfQuiz(
                quizIdOfParticipant,
            );
            let totalPoint = 0;
            let totalCorrect = 0;
            const updateAllAnswer = listQuestionOfQuiz.map(
                (question, index) => {
                    let score = 0;
                    if (this.isWrittenQuestion(question.question.type)) {
                        answerOfUser[index].writtenAnswer ===
                        question.question.written
                            ? ((score =
                                  question.quiz.point /
                                  question.quiz.numberQuestions),
                              (totalCorrect += 1))
                            : (score = 0);
                    } else {
                        const answerOfQuestion: AnswerType = {
                            answerA: question.question.answerA,
                            answerB: question.question.answerB,
                            answerC: question.question.answerC,
                            answerD: question.question.answerD,
                        };
                        const isRightAnswer = this.isRightAnswer(
                            answerOfUser[index].givenAnswers,
                            answerOfQuestion,
                        );
                        isRightAnswer
                            ? ((score =
                                  question.quiz.point /
                                  question.quiz.numberQuestions),
                              (totalCorrect += 1))
                            : (score = 0);
                    }
                    totalPoint += score;
                    const updateAnswerOfUser = {
                        userId: userId,
                        participantId: participantId,
                        questionId: answerOfUser[index].questionId,
                        question: question.question.title,
                        image: question.question.image,
                        optionA: question.question.optionA,
                        optionB: question.question.optionB,
                        optionC: question.question.optionC,
                        optionD: question.question.optionD,
                        answerA: question.question.answerA,
                        answerB: question.question.answerB,
                        answerC: question.question.answerC,
                        answerD: question.question.answerD,
                        written: question.question.written,
                        givenAnswers: this.isWrittenQuestion(
                            question.question.type,
                        )
                            ? answerOfUser[index].writtenAnswer
                            : this.objectToString(
                                  answerOfUser[index].givenAnswers,
                              ),
                        score: score,
                        timestamp: new Date(),
                    };
                    return updateAnswerOfUser;
                },
            );

            const updateAllAnswerOfUserToDb =
                await this.prisma.user_questions.createMany({
                    data: updateAllAnswer,
                });
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
