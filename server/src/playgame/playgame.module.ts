import { Module } from '@nestjs/common';
import { PlaygameController } from './playgame.controller';
import { PlaygameService } from './playgame.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionService } from '../question/question.service';
import { CryptoService } from '../crypto/crypto.service';
@Module({
    controllers: [PlaygameController],
    providers: [
        PlaygameService,
        QuizzesService,
        QuestionService,
        CryptoService,
    ],
})
export class PlaygameModule {}
