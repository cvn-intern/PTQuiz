import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { QuizzesDto } from './dto/quizzes.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizzesService {
    constructor(private prisma: PrismaService) {}

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

    async getAllQuizzesOfUser(userId: string) {
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
                title: true,
                description: true,
                image: true,
                numberQuestions: true,
            },
        });
        return quizzesOfUser;
    }

    async getDiscovery() {
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
            },
        });
        const discovery = [];
        quizzes.forEach((quiz) => {
            const categories = [];
            quiz.quizQuestions.forEach((question) => {
                categories.push(question.question.categoryId);
            });
            discovery.push({
                quizId: quiz.id,
                categories: categories,
            });
        });
        const QuizzesWithCategory = [];
        discovery.forEach((discovery) => {
            QuizzesWithCategory.push({
                quizId: discovery.quizId,
                category: this.findMostCategoryInQuiz(discovery.categories),
            });
        });
        return QuizzesWithCategory;
    }

    async deleteQuizzes(userId: string, quizzesId: string) {
        const quizzes = await this.prisma.quizzes.findUnique({
            where: {
                id: quizzesId,
            },
        });
        if (quizzes.userId === userId) {
            await this.prisma.quizzes.delete({
                where: {
                    id: quizzesId,
                },
            });
        } else {
            throw new UnauthorizedException('Unauthorized Exception');
        }
    }

    async addQuizzes(dto: QuizzesDto, userId: string) {
        const newQuizzes = await this.prisma.quizzes.create({
            data: {
                userId: userId,
                title: dto.title,
                numberQuestions: dto.numberQuestions,
                description: dto.description,
                image: dto.image,
                durationMins: dto.durationMins,
                isRandom: dto.isRandom,
                isRandomOption: dto.isRandomOption,
                attempts: dto.attempts,
                point: dto.point,
                passingPoint: dto.passingPoint,
                passed: dto.passed,
                difficultyLevel: dto.difficultyLevel,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                isActivated: dto.isActivated,
                isShared: dto.isShared,
            },
        });
    }
    async changeInfoQuizzes(dto: QuizzesDto, quizzesId: string) {
        await this.prisma.quizzes.update({
            where: {
                id: quizzesId,
            },
            data: dto,
        });
    }
}
