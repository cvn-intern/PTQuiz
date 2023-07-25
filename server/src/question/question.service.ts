import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionResponse } from './type/questionResponse.type';
import { QuestionDto } from './dto/question.dto';
import { QuestionData } from './type/questionInput.type';
@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}
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

    private async updateIfChanged(updatedQuestion: Partial<QuestionResponse>) {
        if (!updatedQuestion.id) {
            return this.prisma.questions.create({
                data: updatedQuestion as QuestionResponse,
            });
        }

        const question = await this.prisma.questions.findUnique({
            where: { id: updatedQuestion.id },
        });

        if (!question) {
            throw new Error('Question not found');
        }

        let data: QuestionResponse;
        for (const field in updatedQuestion) {
            if (updatedQuestion[field] !== question[field]) {
                data[field] = updatedQuestion[field];
            }
        }

        if (Object.keys(data).length > 0) {
            return this.prisma.questions.update({
                where: { id: updatedQuestion.id },
                data,
            });
        }

        return null;
    }

    async updateQuestions(
        questions: Partial<QuestionData>[],
    ): Promise<(QuestionData | null)[]> {
        return Promise.all(questions.map(this.updateIfChanged.bind(this)));
    }

    async createQuestions(questionsData: QuestionDto[], userId: string) {
        const createQuestionsPromises = questionsData.map((questionData) => {
            // return this.prisma.questions.create({
            //     data: { ...questionData, userId },
            // });
            console.log(questionData);
        });

        // return await this.prisma.$transaction(createQuestionsPromises);
    }
}
