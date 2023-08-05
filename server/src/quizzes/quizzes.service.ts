import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { QuizzesError } from '../error/quizzesError.enum';
import {
    QuestionResponse,
    QuestionResponseNoAnswer,
} from '../question/type/questionResponse.type';
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

    async getAllQuizzesOfUser(userId: string, page: number, sortBy: number) {
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
                        orderBy:
                            sortBy == 0
                                ? { createdAt: 'asc' }
                                : sortBy == 1
                                ? { createdAt: 'desc' }
                                : sortBy == 2
                                ? { title: 'asc' }
                                : { title: 'desc' },
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
                    category: {
                        select: {
                            id: true,
                        },
                    },
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

    async filterCategory(categoryName: string, page: number, userId: string) {
        try {
            page = page || 1;
            const pageSize = 5;

            categoryName = categoryName.toLowerCase();

            if (categoryName === 'all' || categoryName === undefined) {
                const categories = await this.prisma.categories.findMany();

                const quizPromises = categories.map((category) => {
                    return this.prisma.$transaction([
                        this.prisma.quizzes.findMany({
                            where: {
                                isShared: true,
                                OR: [
                                    {
                                        user: {
                                            role: Role.Admin,
                                        },
                                    },
                                    {
                                        user: {
                                            id: userId,
                                        },
                                    },
                                ],
                                category: {
                                    name: category.name,
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
                                category: {
                                    name: category.name,
                                },
                            },
                        }),
                    ]);
                });

                const result = await Promise.all(
                    quizPromises.map(async (promise, index) => {
                        const [quizzes, count] = await promise;
                        return {
                            category: categories[index].name,
                            quizzes: quizzes,
                            totalQuizzes: count,
                        };
                    }),
                );

                return result;
            } else {
                switch (categoryName) {
                    case 'math':
                        categoryName = 'Math';
                        break;
                    case 'science':
                        categoryName = 'Science';
                        break;
                    case 'history':
                        categoryName = 'History';
                        break;
                    case 'geography':
                        categoryName = 'Geography';
                        break;
                    case 'english':
                        categoryName = 'English';
                        break;
                    case 'literature':
                        categoryName = 'Literature';
                        break;
                    case 'other':
                        categoryName = 'Other';
                        break;
                }
                let quizzesOfUser, totalQuizzes;
                [quizzesOfUser, totalQuizzes] = await this.prisma.$transaction([
                    this.prisma.quizzes.findMany({
                        where: {
                            isShared: true,
                            OR: [
                                {
                                    user: {
                                        role: Role.Admin,
                                    },
                                },
                                {
                                    user: {
                                        id: userId,
                                    },
                                },
                            ],
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

                return [
                    {
                        category: categoryName,
                        quizzes: quizzesOfUser,
                        totalQuizzes: totalQuizzes,
                    },
                ];
            }
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
                    hint: question.question.hint,
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
                    url = image_upload.secure_url;
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
                    categoryId: quiz.categoryId,
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
                if (image.size > parseInt(process.env.MAX_FILE_SIZE)) {
                    throw new HttpException(
                        QuizzesError.FILE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                } else if (image.size > 0) {
                    const image_upload = await this.cloudinary.uploadFile(
                        image,
                    );
                    url = image_upload.secure_url;
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
                    categoryId: quiz.categoryId,
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
            const rooms = await this.prisma.rooms.findMany({
                where: {
                    quizId: quizId,
                },
            });
            rooms.forEach(async (room) => {
                const roomParticipants =
                    await this.prisma.room_participants.findMany({
                        where: {
                            roomId: room.id,
                        },
                    });
                roomParticipants.forEach(async (roomParticipant) => {
                    await this.prisma.room_participants.delete({
                        where: {
                            id: roomParticipant.id,
                        },
                    });
                    await this.prisma.user_questions.deleteMany({
                        where: {
                            participantId: roomParticipant.participantId,
                        },
                    });
                    await this.prisma.participants.delete({
                        where: {
                            id: roomParticipant.participantId,
                        },
                    });
                });
                await this.prisma.rooms.delete({
                    where: {
                        id: room.id,
                    },
                });
            });
            const participants = await this.prisma.participants.findMany({
                where: {
                    quizId: quizId,
                },
            });
            participants.forEach(async (participant) => {
                await this.prisma.user_questions.deleteMany({
                    where: {
                        participantId: participant.id,
                    },
                });
                await this.prisma.participants.delete({
                    where: {
                        id: participant.id,
                    },
                });
            });
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
    async getQuestionsOfQuiz(quizId: string) {
        try {
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            if (!quiz) {
                throw new HttpException(
                    QuizzesError.NOT_FOUND_QUIZZES,
                    HttpStatus.NOT_FOUND,
                );
            }
            const questions = await this.prisma.quiz_questions.findMany({
                where: {
                    quizId: quizId,
                },
                select: {
                    question: {
                        select: {
                            title: true,
                            image: true,
                            type: true,
                            time: true,
                        },
                    },
                },
            });
            const allQuestions = questions.map((question) => {
                const questionResponse: QuestionResponseNoAnswer = {
                    title: question.question.title,
                    image: question.question.image,
                    type: question.question.type,
                    time: question.question.time,
                };
                return questionResponse;
            });
            return allQuestions;
        } catch (error) {
            throw new HttpException(
                QuizzesError.ERROR_QUIZ,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
