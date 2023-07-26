import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionResponse } from './type/questionResponse.type';
import { QuestionDto } from './dto/question.dto';
import { QuestionError } from '../error/index';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}

    async updateNumberQuestion(quizId: string) {
        try {
            const questions = await this.prisma.quiz_questions.findMany({
                where: {
                    quizId: quizId,
                },
            });
            const numberQuestion = questions.length;
            await this.prisma.quizzes.update({
                where: {
                    id: quizId,
                },
                data: {
                    numberQuestions: numberQuestion,
                },
            });
        } catch (err) {
            throw new HttpException('Error question', HttpStatus.BAD_REQUEST);
        }
    }

    async getQuestion(questionId: string) {
        try {
            const question = await this.prisma.questions.findUnique({
                where: {
                    id: questionId,
                },
            });
            const {
                id,
                userId,
                categoryId,
                title,
                optionA,
                optionB,
                optionC,
                optionD,
                answerA,
                answerB,
                answerC,
                answerD,
                written,
                image,
                type,
                createdAt,
                updatedAt,
            } = question;
            const questionResponse: QuestionResponse = {
                id: id,
                userId: userId,
                categoryId: categoryId,
                title: title,
                options: [optionA, optionB, optionC, optionD],
                answers: [answerA, answerB, answerC, answerD],
                written: written,
                image: image,
                type: type,
                createdAt: createdAt,
                updatedAt: updatedAt,
            };
            return questionResponse;
        } catch (err) {
            throw new HttpException('Error question', HttpStatus.BAD_REQUEST);
        }
    }

    async createQuestion(
        userId: string,
        quizId: string,
        questionData: QuestionDto,
    ) {
        try {
            if (!quizId) {
                throw new HttpException(
                    QuestionError.QUIZ_ID_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            const existQuiz = await this.prisma.quiz_questions.findMany({
                where: {
                    quizId: quizId,
                },
            });
            if (existQuiz.length == 0) {
                throw new HttpException(
                    QuestionError.QUIZ_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const existCategory = await this.prisma.categories.findUnique({
                where: {
                    id: questionData.categoryId,
                },
            });

            if (!existCategory) {
                throw new HttpException(
                    QuestionError.CATEGORY_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const question = await this.prisma.questions.create({
                data: {
                    userId: userId,
                    ...questionData,
                },
            });
            await this.prisma.quiz_questions.create({
                data: {
                    quizId: quizId,
                    questionId: question.id,
                    sortOrder: 0,
                },
            });
            await this.updateNumberQuestion(quizId);
            return question;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async updateQuestion(
        userId: string,
        questionId: string,
        questionData: QuestionDto,
    ) {
        try {
            if (!questionId) {
                throw new HttpException(
                    QuestionError.QUESTION_ID_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            const existQuestion = await this.prisma.questions.findUnique({
                where: {
                    id: questionId,
                },
            });
            if (!existQuestion) {
                throw new HttpException(
                    QuestionError.QUESTION_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (existQuestion.userId !== userId) {
                throw new HttpException(
                    QuestionError.NOT_AUTHORIZED,
                    HttpStatus.UNAUTHORIZED,
                );
            }
            const existCategory = await this.prisma.categories.findUnique({
                where: {
                    id: questionData.categoryId,
                },
            });

            if (!existCategory) {
                throw new HttpException(
                    QuestionError.CATEGORY_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            return await this.prisma.questions.update({
                where: {
                    id: questionId,
                },
                data: {
                    userId: userId,
                    ...questionData,
                },
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteQuestion(userId: string, quizId: string, questionId: string) {
        try {
            if (!questionId) {
                throw new HttpException(
                    QuestionError.QUESTION_ID_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (!quizId) {
                throw new HttpException(
                    QuestionError.QUIZ_ID_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            const existQuestion = await this.prisma.questions.findUnique({
                where: {
                    id: questionId,
                },
            });
            if (!existQuestion) {
                throw new HttpException(
                    QuestionError.QUESTION_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (existQuestion.userId !== userId) {
                throw new HttpException(
                    QuestionError.NOT_AUTHORIZED,
                    HttpStatus.UNAUTHORIZED,
                );
            }

            await this.prisma.quiz_questions.deleteMany({
                where: {
                    questionId: questionId,
                    quizId: quizId,
                },
            });
            return await this.updateNumberQuestion(quizId);
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
