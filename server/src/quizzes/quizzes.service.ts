import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { QuizzesError } from '../error/quizzesError.enum';
import { QuestionResponse } from '../question/type/questionResponse.type';
import { QuizzesDto } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Role } from '../auth/types';
@Injectable()
export class QuizzesService {
    constructor(
        private prisma: PrismaService,
        private questionService: QuestionService,
        private cloudinary: CloudinaryService,
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

    async getAllQuizzesOfUser(userId: string, page: number) {
        try {
            page = page || 1;
            const pageSize = 5;
            const [quizzesOfUser, totalQuizzes] =
                await this.prisma.$transaction([
                    this.prisma.quizzes.findMany({
                        where: {
                            userId: userId,
                        },
                        select: {
                            createdAt: true,
                            title: true,
                            description: true,
                            image: true,
                            numberQuestions: true,
                            durationMins: true,
                            difficultyLevel: true,
                            id: true,
                        },
                        take: pageSize,
                        skip: (page - 1) * pageSize,
                    }),
                    this.prisma.quizzes.count({
                        where: {
                            userId: userId,
                        },
                    }),
                ]);
            return { quizzesOfUser, totalQuizzes };
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
                where: {
                    isShared: true,
                    user: {
                        role: Role.Admin,
                    },
                },
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
            const discovery = [];
            for (let index = 0; index < quizzesOfdiscovery.length; index++) {
                if (quizzesOfdiscovery[index].categories !== '') {
                    const category = await this.prisma.categories.findUnique({
                        where: {
                            id: quizzesOfdiscovery[index].categories,
                        },
                        select: {
                            name: true,
                        },
                    });
                    const indexOfCategory = this.findIndexOfCategory(
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
                    numberQuestions: true,
                    startDate: true,
                    endDate: true,
                    point: true,
                    passingPoint: true,
                    difficultyLevel: true,
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

    async filterCategory(categoryName: string, page: number) {
        try {
            page = page || 1;
            const pageSize = 5;
            console.log(categoryName);
            let quizzesOfUser, totalQuizzes;
            if (categoryName === 'All' || categoryName === undefined) {
                [quizzesOfUser, totalQuizzes] = await this.prisma.$transaction([
                    this.prisma.quizzes.findMany({
                        where: {
                            isShared: true,
                            user: {
                                role: Role.Admin,
                            },
                        },
                        select: {
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                            user: {
                                select: {
                                    displayName: true,
                                },
                            },
                            id: true,
                            title: true,
                            description: true,
                            image: true,
                            numberQuestions: true,
                            durationMins: true,
                            difficultyLevel: true,
                        },
                        take: pageSize,
                        skip: (page - 1) * pageSize,
                    }),
                    this.prisma.quizzes.count({
                        where: {
                            isShared: true,
                            user: {
                                role: Role.Admin,
                            },
                        },
                    }),
                ]);
            } else {
                [quizzesOfUser, totalQuizzes] = await this.prisma.$transaction([
                    this.prisma.quizzes.findMany({
                        where: {
                            isShared: true,
                            user: {
                                role: Role.Admin,
                            },
                            category: {
                                name: categoryName,
                            },
                        },
                        select: {
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                            user: {
                                select: {
                                    displayName: true,
                                },
                            },
                            id: true,
                            title: true,
                            description: true,
                            image: true,
                            numberQuestions: true,
                            durationMins: true,
                            difficultyLevel: true,
                        },
                        take: pageSize,
                        skip: (page - 1) * pageSize,
                    }),
                    this.prisma.quizzes.count({
                        where: {
                            isShared: true,
                            user: {
                                role: Role.Admin,
                            },
                            quizQuestions: {
                                some: {
                                    question: {
                                        categoryId: categoryName,
                                    },
                                },
                            },
                        },
                    }),
                ]);
            }
            return {
                quizzes: quizzesOfUser,
                totalQuizzes: totalQuizzes,
            };
            // if (categoryName === 'All') {
            //     return await this.getDiscovery();
            // }
            // const categories = await this.getDiscovery();
            // const resultFilter = categories.filter(
            //     (category) => category.category === categoryName,
            // );
            // console.log(resultFilter);

            // if (resultFilter.length !== 0) return resultFilter;
            // else return [];
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

    async createQuiz(
        userId: string,
        quiz: QuizzesDto,
        image: Express.Multer.File,
    ) {
        try {
            let url;
            if (!quiz) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (image) {
                if (image.size > parseInt(process.env.MAX_FILE_SIZE)) {
                    throw new HttpException(
                        QuizzesError.FILE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                } else if (image.size > 0) {
                    const image_upload = await this.cloudinary.uploadFile(
                        image,
                    );
                    url = image_upload.url;
                } else url = process.env.DEFAULT_THUMBNAIL;
            } else url = process.env.DEFAULT_THUMBNAIL;
            const newQuiz = await this.prisma.quizzes.create({
                data: {
                    userId: userId,
                    title: quiz.title,
                    numberQuestions: 0,
                    description: quiz.description,
                    image: url,
                    durationMins: quiz.durationMins,
                    isRandom: quiz.isRandom,
                    isRandomOption: quiz.isRandomOption,
                    attempts: quiz.attempts,
                    point: quiz.point,
                    passingPoint: quiz.passingPoint,
                    passed: quiz.passed || true,
                    difficultyLevel: quiz.difficultyLevel,
                    startDate: quiz.startDate,
                    endDate: quiz.endDate,
                    isActivated: quiz.isActivated,
                    isShared: quiz.isShared,
                },
            });
            return newQuiz;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async updateQuiz(
        userId: string,
        quizId: string,
        quiz: QuizzesDto,
        image: Express.Multer.File,
    ) {
        try {
            let url;
            if (!quizId) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }
            const quizOfUser = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });

            if (!quizOfUser) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (quizOfUser.userId !== userId) {
                throw new HttpException(
                    QuizzesError.NOT_PERMISSION,
                    HttpStatus.UNAUTHORIZED,
                );
            }

            if (image) {
                if (image.size > +process.env.MAX_FILE_SIZE) {
                    throw new HttpException(
                        QuizzesError.FILE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                } else if (image.size > 0) {
                    const image_upload = await this.cloudinary.uploadFile(
                        image,
                    );
                    url = image_upload.url;
                }
            } else url = quizOfUser.image;

            return await this.prisma.quizzes.update({
                where: {
                    id: quizId,
                },
                data: {
                    title: quiz.title,
                    description: quiz.description,
                    image: url,
                    durationMins: quiz.durationMins,
                    isRandom: quiz.isRandom,
                    isRandomOption: quiz.isRandomOption,
                    attempts: quiz.attempts,
                    point: quiz.point,
                    passingPoint: quiz.passingPoint,
                    passed: quiz.passed,
                    difficultyLevel: quiz.difficultyLevel,
                    startDate: quiz.startDate,
                    endDate: quiz.endDate,
                    isActivated: quiz.isActivated,
                    isShared: quiz.isShared,
                },
            });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteQuiz(userId: string, quizId: string) {
        try {
            if (!quizId) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }
            const quizOfUser = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            if (!quizOfUser) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }
            if (quizOfUser.userId !== userId) {
                throw new HttpException(
                    QuizzesError.NOT_PERMISSION,
                    HttpStatus.UNAUTHORIZED,
                );
            }
            await this.prisma.quiz_questions.deleteMany({
                where: {
                    quizId: quizId,
                },
            });
            return await this.prisma.quizzes.delete({
                where: {
                    id: quizId,
                },
            });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
