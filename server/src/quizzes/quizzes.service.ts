import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { QuizzesDto } from './dto/quizzes.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuizzesError } from 'src/error/quizzesError.enum';
import { QuestionService } from 'src/question/question.service';
import { QuestionResponse } from 'src/question/type/questionResponse.type';
@Injectable()
export class QuizzesService {
    constructor(
        private prisma: PrismaService,
        private questionService: QuestionService,
    ) {}

    findMostCategoryInQuiz(arrCategory) {
        const frequencyMap = {};
        let maxCount = 0;
        let mostCategoryInQuiz = '';

        for (let i = 0; i < arrCategory.length; i++) {
            const currentString = arrCategory[i];
            frequencyMap[currentString] =
                (frequencyMap[currentString] || 0) + 1;

            if (frequencyMap[currentString] > maxCount) {
                maxCount = frequencyMap[currentString];
                mostCategoryInQuiz = currentString;
            }
        }

        return mostCategoryInQuiz;
    }
    findIndexOfCategory(discovery, category) {
        return discovery.findIndex((item) => item.category === category);
    }

    async getAllQuizzesOfUser(userId: string) {
        try {
            const quizzesOfUser = await this.prisma.quizzes.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    user: {
                        select: {
                            displayName: true,
                        },
                    },
                    createdAt: true,
                    title: true,
                    description: true,
                    image: true,
                    numberQuestions: true,
                    durationMins: true,
                    difficultyLevel: true,
                },
            });
            return quizzesOfUser;
        } catch (err) {
            throw new HttpException(
                QuizzesError.FAILED_GET_ALL_QUIZZES,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getDiscovery() {
        try {
            const quizzes = await this.prisma.quizzes.findMany({
                select: {
                    id: true,
                    quizQuestions: {
                        select: {
                            question: {
                                select: {
                                    categoryId: true,
                                },
                            },
                        },
                    },
                    isShared: true,
                },
            });
            const quizzesOfdiscovery = quizzes.map((quiz) => {
                const categories = quiz.quizQuestions.map(
                    (question) => question.question.categoryId,
                );
                return {
                    quizId: quiz.id,
                    categories: this.findMostCategoryInQuiz(categories),
                };
            });
            let discovery = [];
            for (let index = 0; index < quizzesOfdiscovery.length; index++) {
                if (quizzesOfdiscovery[index].categories !== '') {
                    let category = await this.prisma.categories.findUnique({
                        where: {
                            id: quizzesOfdiscovery[index].categories,
                        },
                        select: {
                            name: true,
                        },
                    });
                    let indexOfCategory = this.findIndexOfCategory(
                        discovery,
                        category.name,
                    );
                    const quizzes = await this.getInfoOfPublicQuiz(
                        quizzesOfdiscovery[index].quizId,
                    );

                    if (indexOfCategory === -1) {
                        discovery.push({
                            category: category.name,
                            quizzes: [quizzes],
                        });
                    } else {
                        discovery[indexOfCategory].quizzes.push(quizzes);
                    }
                }
            }

            return discovery;
        } catch (error) {
            throw new HttpException(
                QuizzesError.FAILED_GET_DISCOVERY,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getInfoQuizzOfUser(userId: string, quizId: string) {
        try {
            return await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                    userId: userId,
                },
                select: {
                    user: {
                        select: {
                            displayName: true,
                        },
                    },
                    title: true,
                    description: true,
                    image: true,
                    isShared: true,
                    numberQuestions: true,
                    startDate: true,
                },
            });
        } catch (err) {
            throw new HttpException(
                QuizzesError.NOT_FOUND_QUIZZES,
                HttpStatus.NOT_FOUND,
            );
        }
    }
    async getInfoOfPublicQuiz(quizId: string) {
        try {
            return await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                    isShared: true,
                },
                select: {
                    user: {
                        select: {
                            displayName: true,
                        },
                    },
                    id: true,
                    title: true,
                    description: true,
                    image: true,
                    difficultyLevel: true,
                    numberQuestions: true,
                    durationMins: true,
                },
            });
        } catch (err) {
            throw new HttpException(
                QuizzesError.FAILED_GET_ALL_PUBLIC_QUIZZES,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async filterCategory(categoryName: string) {
        try {
            const categories = await this.getDiscovery();
            let resultFilter = categories.filter(
                (category) => category.category === categoryName,
            );
            return resultFilter[0].quizzes;
        } catch (exception) {
            throw new HttpException(
                QuizzesError.NOT_FOUND_CATEGORY,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getAllQuestionsOfQuiz(userId: string, quizId: string) {
        try {
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            const questions = await this.prisma.quiz_questions.findMany({
                where: {
                    quizId: quizId,
                },
                select: {
                    question: true,
                },
            });
            const allQuestions = questions.map((question) => {
                const questionResponse: QuestionResponse = {
                    id: question.question.id,
                    userId: question.question.userId,
                    categoryId: question.question.categoryId,
                    title: question.question.title,
                    options: this.questionService.splitStringAnswerToArray(
                        question.question.options,
                    ),
                    answers: this.questionService.splitStringAnswerToArray(
                        question.question.answers,
                    ),
                    image: question.question.image,
                    type: question.question.type,
                    createdAt: question.question.createdAt,
                    updatedAt: question.question.updatedAt,
                };
                return questionResponse;
            });
            if (quiz.userId === userId) {
                return allQuestions;
            } else if (quiz.userId !== userId) {
                if (quiz.isShared === false) {
                    throw new HttpException(
                        QuizzesError.QUIZ_NOT_SHARED,
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    return allQuestions;
                }
            }
        } catch (error) {
            throw new HttpException(
                QuizzesError.ERROR_QUIZ,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
