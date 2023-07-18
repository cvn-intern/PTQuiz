import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionResponse } from './type/questionResponse.type';
@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}
    arrayToString(array) {
        const arrayResult = array.map(element =>("@An'" + element + "'nA@"))
        return arrayResult.join(",")
    }
    splitStringAnswerToArray(answer) {
        var regex = /@An'(.*?)'nA@/g;
        var matches = [];

        var match;
        while ((match = regex.exec(answer)) !== null) {
            matches.push(match[1]);
        }

        return matches;
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
                options,
                answers,
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
                options: this.splitStringAnswerToArray(options),
                answers: this.splitStringAnswerToArray(answers),
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
}
