import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionService } from 'src/question/question.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { Answer } from './dto/answer.dto';
import { PlayGameError } from 'src/error/playGameError.enum';
@Injectable()
export class PlaygameService {
    constructor(
        private prisma: PrismaService,
        private quizzservice: QuizzesService,
        private questionService: QuestionService,
    ) {}

    isRightAnswer(answerOfUser, answerOfQuestion) {
        return answerOfUser.every((item) => answerOfQuestion.includes(item));
    }
    async getAllQuestionOfQuiz(userId: string, quizId: string) {
        return await this.quizzservice.getAllQuestionsOfQuiz(userId, quizId);
    }

    async playGame(userId: string, quizId: string) {
        try {
            const umCompleteGame = await this.prisma.participants.findFirst({
                where: {
                    userId: userId,
                    quizId: quizId,
                },
            });
            if (umCompleteGame != null) {
                return umCompleteGame;
            }
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: quizId,
                },
            });
            const participant = await this.prisma.participants.create({
                data: {
                    userId: userId,
                    quizId: quizId,
                    questions: quiz.numberQuestions,
                    correct: 0,
                    totalAttempt: 0,
                    point: 0,
                },
            });
            return participant;
        } catch (err) {
            throw new HttpException(
                PlayGameError.CAN_NOT_PLAY,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async answerQuestion(userId: string, dto: Answer, participantId: string) {
        try {
            const { questionId, answerOfUser } = dto;
            const question = await this.questionService.getQuestion(questionId);
            const answerOfQuestion = question.answers;
            const isCorrect = this.isRightAnswer(
                answerOfUser,
                answerOfQuestion,
            );
            const participant = await this.prisma.participants.findUnique({
                where: {
                    id: participantId,
                },
            });
            const quiz = await this.prisma.quizzes.findUnique({
                where: {
                    id: participant.quizId,
                },
            });

            const score = isCorrect ? quiz.point / quiz.numberQuestions : 0;
            const isAnswered = await this.prisma.user_questions.findFirst({
                where: {
                    userId: userId,
                    participantId: participantId,
                    questionId: questionId
                },
            });
            if (isAnswered) {
                await this.prisma.user_questions.update({
                    where: {
                        id: isAnswered.id,
                    },
                    data: {
                        givenAnswers:
                            this.questionService.arrayToString(answerOfUser),
                        score: score,
                        timestamp: new Date(),
                    },
                });
            } else {
                await this.prisma.user_questions.create({
                    data: {
                        userId: userId,
                        participantId: participantId,
                        questionId: questionId,
                        question: question.title,
                        image: question.image,
                        options: this.questionService.arrayToString(
                            question.options,
                        ),
                        correct:
                            this.questionService.arrayToString(
                                answerOfQuestion,
                            ),
                        givenAnswers:
                            this.questionService.arrayToString(answerOfUser),
                        score: score,
                        timestamp: new Date(),
                    },
                });
            }
            return isCorrect;
        } catch (error) {
            throw new HttpException(
                PlayGameError.CAN_NOT_ANSWER,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
