import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionResponse } from './type/questionResponse.type';
import { QuestionDto } from './dto/question.dto';
import { QuestionError } from '../error/index';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TypeQuestion } from './type';

@Injectable()
export class QuestionService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) {}

    image_type = ['image/png', 'image/jpg', 'image/jpeg'];

    async updateNumberQuestion(quizId: string) {
        try {
            const questions = await this.prisma.quiz_questions.findMany({
                where: {
                    quizId: quizId,
                },
                select: {
                    question: {
                        select: {
                            time: true,
                        },
                    },
                },
            });
            const numberQuestion = questions.length;
            let time = 0;
            questions.forEach((question) => {
                time += question.question.time;
            });
            await this.prisma.quizzes.update({
                where: {
                    id: quizId,
                },
                data: {
                    numberQuestions: numberQuestion,
                    durationMins: time,
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
                time,
                createdAt,
                updatedAt,
                hint,
            } = question;
            const questionResponse: QuestionResponse = {
                id: id,
                userId: userId,
                categoryId: categoryId,
                title: title,
                options: {
                    optionA: optionA,
                    optionB: optionB,
                    optionC: optionC,
                    optionD: optionD,
                },
                answers: {
                    answerA: answerA,
                    answerB: answerB,
                    answerC: answerC,
                    answerD: answerD,
                },
                written: written,
                image: image,
                type: type,
                time: time,
                createdAt: createdAt,
                updatedAt: updatedAt,
                hint: hint,
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
        image: Express.Multer.File,
    ) {
        try {
            console.log(1);
            if (!quizId) {
                throw new HttpException(
                    QuestionError.QUIZ_ID_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            const existQuiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            if (!existQuiz) {
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

            if (image) {
                if (image.size > parseInt(process.env.MAX_FILE_SIZE)) {
                    throw new HttpException(
                        QuestionError.IMAGE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                }

                const image_upload = await this.cloudinary.uploadFile(image);
                questionData.image = image_upload.secure_url;
            }
            if (questionData.type === TypeQuestion.SINGLE_CHOICE) {
                let totalTrueAnswer = 0;
                questionData.answerA ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerB ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerC ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerD ? totalTrueAnswer++ : totalTrueAnswer;
                if (totalTrueAnswer > 1) {
                    throw new HttpException(
                        QuestionError.SINGLE_CHOICE_MORE_THAN_ONE_ANSWER,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (
                questionData.type === TypeQuestion.SINGLE_CHOICE ||
                questionData.type === TypeQuestion.MULTIPLE_CHOICE
            ) {
                let totalTrueAnswer = 0;
                questionData.answerA ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerB ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerC ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerD ? totalTrueAnswer++ : totalTrueAnswer;
                if (totalTrueAnswer === 0) {
                    throw new HttpException(
                        QuestionError.MUST_HAVE_CORRECT_ANSWER,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (
                questionData.type === TypeQuestion.ESSAY ||
                questionData.type === TypeQuestion.INPUT_TEXT ||
                questionData.type === TypeQuestion.ARRANGE_WORD
            ) {
                let spaceIndex = questionData.written.indexOf(' ');
                if (spaceIndex !== -1) {
                    throw new HttpException(
                        QuestionError.QUESTION_WRITTEN_INVALID,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (questionData.type < 0 || questionData.type > 6) {
                throw new HttpException(
                    QuestionError.QUESTION_TYPE_INVALID,
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
        image: Express.Multer.File,
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

            if (image) {
                if (image.size > parseInt(process.env.MAX_FILE_SIZE)) {
                    throw new HttpException(
                        QuestionError.IMAGE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                }

                const image_upload = await this.cloudinary.uploadFile(image);
                questionData.image = image_upload.url;
            }
            if (questionData.type === TypeQuestion.SINGLE_CHOICE) {
                let totalTrueAnswer = 0;
                questionData.answerA ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerB ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerC ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerD ? totalTrueAnswer++ : totalTrueAnswer;
                if (totalTrueAnswer > 1) {
                    throw new HttpException(
                        QuestionError.SINGLE_CHOICE_MORE_THAN_ONE_ANSWER,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (
                questionData.type === TypeQuestion.SINGLE_CHOICE ||
                questionData.type === TypeQuestion.MULTIPLE_CHOICE
            ) {
                let totalTrueAnswer = 0;
                questionData.answerA ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerB ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerC ? totalTrueAnswer++ : totalTrueAnswer;
                questionData.answerD ? totalTrueAnswer++ : totalTrueAnswer;
                if (totalTrueAnswer === 0) {
                    throw new HttpException(
                        QuestionError.MUST_HAVE_CORRECT_ANSWER,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (
                questionData.type === TypeQuestion.ESSAY ||
                questionData.type === TypeQuestion.INPUT_TEXT ||
                questionData.type === TypeQuestion.ARRANGE_WORD
            ) {
                let spaceIndex = questionData.written.indexOf(' ');
                if (spaceIndex !== -1) {
                    throw new HttpException(
                        QuestionError.QUESTION_WRITTEN_INVALID,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            if (questionData.type < 0 || questionData.type > 6) {
                throw new HttpException(
                    QuestionError.QUESTION_TYPE_INVALID,
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
            const existQuestion = await this.prisma.quiz_questions.findMany({
                where: {
                    questionId: questionId,
                    quizId: quizId,
                },
            });
            if (!existQuestion || existQuestion.length == 0) {
                throw new HttpException(
                    QuestionError.QUESTION_NOT_FOUND,
                    HttpStatus.BAD_REQUEST,
                );
            }
            const userQuestion = await this.prisma.questions.findUnique({
                where: {
                    id: questionId,
                },
            });
            if (userQuestion.userId !== userId) {
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
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
