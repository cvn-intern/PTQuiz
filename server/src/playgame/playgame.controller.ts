import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ResTransformInterceptor } from 'src/interceptors/response.interceptor';
import { PlaygameService } from './playgame.service';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard.guard';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import {  AnswerDetail } from './dto/answer.dto';

@Controller('play-game')
@UseInterceptors(ResTransformInterceptor)
export class PlaygameController {
    constructor(private playgameService: PlaygameService) {}
    @Get('/quiz')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get quiz to play game successfully')
    @UseGuards(JwtAuthGuard)
    async getQuiz(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.playgameService.getAllQuestionOfQuiz(userId, quizId);
    }

    @Post('/answer')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Answer successfully')
    @UseGuards(JwtAuthGuard)
    async answerQuestion(
        @GetCurrentUser('id') userId: string,
        @Body() dto: AnswerDetail,
    ) {
        return await this.playgameService.answerQuestion(userId, dto);
    }

    @Post('/play')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Play successfully')
    @UseGuards(JwtAuthGuard)
    async playgame(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.playgameService.playGame(userId, quizId);
    }
}
