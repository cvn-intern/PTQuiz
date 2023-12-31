import { CryptoService } from './../crypto/crypto.service';
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
    constructor(
        private playgameService: PlaygameService,
        private cryptoService: CryptoService,
    ) {}
    @Get('/quiz')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get quiz to play game successfully')
    @UseGuards(JwtAuthGuard)
    async getQuiz(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        const quiz = await this.playgameService.getAllQuestionOfQuiz(
            userId,
            quizId,
        );
        return this.cryptoService.encryptData(JSON.stringify(quiz));
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

    @Get('/all-history')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get history successfully')
    @UseGuards(JwtAuthGuard)
    async getHistory(@GetCurrentUser('id') userId: string) {
        return await this.playgameService.getAllHistory(userId);
    }

    @Get('/detail-history')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get detail history successfully')
    @UseGuards(JwtAuthGuard)
    async getDetailHistory(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.playgameService.getDetailHistory(userId, quizId);
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
