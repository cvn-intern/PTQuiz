import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuestionService } from 'src/question/question.service';

@Module({
    imports: [],
    controllers: [QuizzesController],
    providers: [QuizzesService, QuestionService],
})
export class QuizzesModule {}
