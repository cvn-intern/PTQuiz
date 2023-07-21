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
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { PlaygameService } from './playgame.service';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { AnswerDetail } from './dto/answer.dto';

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

    @Post('/submit')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Submit successfully')
    @UseGuards(JwtAuthGuard)
    async submitAllQuestion(
        @GetCurrentUser('id') userId: string,
        @Body() dto: AnswerDetail,
    ) {
        return await this.playgameService.submitAllQuestions(userId, dto);
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

    @Get('/end-game')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('End game successfully')
    @UseGuards(JwtAuthGuard)
    async endGame(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.playgameService.endGame(userId, quizId);
    }
}
