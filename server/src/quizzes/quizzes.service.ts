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
    findIndexOfCategory(discovery, category) {
        for (let i = 0; i < discovery.length; i++) {
            if (discovery[i].category === category) {
                return i;
            }
        }
        return -1;
    }
    async getAllQuizzesofUser(userId: string) {
        const quizzesOfUser = await this.prisma.quizzes.findMany({
            where: {
                userId: userId,
            },
        });
        return quizzesOfUser;
    }

    async getDiscovery() {
        let quizzes = await this.prisma.quizzes.findMany({
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
        const quizzesOfdiscovery = [];
        quizzes.forEach((quiz) => {
            const categories = [];
            quiz.quizQuestions.forEach((question) => {
                categories.push(question.question.categoryId);
            });
            quizzesOfdiscovery.push({
                quizId: quiz.id,
                categories: this.findMostCategoryInQuiz(categories),
            });
        });
        let discovery = [];
        // quizzesOfdiscovery.forEach( async (quiz) => {
        //     if (quiz.categories !== '') {
        //         let indexofCategory = this.findIndexOfCategory(
        //             discovery,
        //             quiz.categories,
        //         );
        //         const quizes = await this.getInfo(quiz.quizId)

        //         if (indexofCategory === -1) {
        //             const category = await this.prisma.categories.findUnique({
        //                 where:{
        //                     id:quiz.categories
        //                 }
        //             })
        //             discovery.push({
        //                 category: category.name,
        //                 quizzes: [quizes],
        //             });
        //             console.log(discovery)
        //         } else {
        //             discovery[indexofCategory].quizzes.push(quizes);
        //         }
        //     }
        // });
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
                const quizzes = await this.getInfo(
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
            throw new UnauthorizedException('Can not delete quiz');
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

    async getInfo(quizId: string) {
        return await this.prisma.quizzes.findUnique({
            where: {
                id: quizId,
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
            },
        });
    }

    async filterCategory(category: string) {
        const IdofCategory = await this.prisma.categories.findFirst({
            where: {
                name: category,
            },
        });
        if (IdofCategory) {
            const categories = await this.getDiscovery();
            categories.forEach((category) => {
                if (category.category === IdofCategory.id) {
                    console.log(category.quizzes);
                    return category.quizzes;
                }
            });
        } else {
            throw new UnauthorizedException('Not category found');
        }
    }
}
