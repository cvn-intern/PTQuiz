import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from './dto/question.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}
    async addQuestion(dto: Question, userId: string, quizzesId: string) {
        const newQuestion = await this.prisma.questions.create({
            data: {
                userId: userId,
                title: dto.title,
                options: dto.options,
                answers: dto.answers,
                image: dto.image,
                type: dto.type,
                categoryId: dto.categoryId,
            },
        });
        const quiz_question = await this.prisma.quiz_questions.create({
            data: {
                quizId: quizzesId,
                questionId: newQuestion.id,
                sortOrder: 1,
            },
        });
    }

    async getQuestion(questionId: string) {
        try {
            const question = await this.prisma.questions.findUnique({
                where: {
                    id: questionId,
                },
            });
            return question;
        } catch (err) {
            throw new HttpException('Error question', HttpStatus.BAD_REQUEST);
        }
    }
}
