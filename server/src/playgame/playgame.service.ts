import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Injectable()
export class PlaygameService {
    constructor(private prisma: PrismaService){}

    // async getQuiz(userId: quizId: string)
}
