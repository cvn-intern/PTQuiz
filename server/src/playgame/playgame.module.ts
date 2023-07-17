import { Module } from '@nestjs/common';
import { PlaygameController } from './playgame.controller';
import { PlaygameService } from './playgame.service';

@Module({
    controllers: [PlaygameController],
    providers: [PlaygameService],
})
export class PlaygameModule {}
