import { Module } from '@nestjs/common';
import { PlaygameController } from './playgame.controller';
import { PlaygameService } from './playgame.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionService } from '../question/question.service';
@Module({
    controllers: [PlaygameController],
    providers: [PlaygameService, QuizzesService, QuestionService],
})
export class PlaygameModule {}
