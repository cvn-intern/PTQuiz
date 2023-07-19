import { QuizzesService } from './quizzes.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { QuizzesDto } from './dto/quizzes.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard.guard';
@Controller('quizzes')
@UseInterceptors(ResTransformInterceptor)
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) {}

    @Get('/all-quizzes')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async getQuizzes(@GetCurrentUser('id') userId: string) {
        return await this.quizzesService.getAllQuizzesOfUser(userId);
    }

    @Get('/discovery')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get discovery successfully')
    @UseGuards(JwtAuthGuard)
    async getdiscovery(@GetCurrentUser('id') userId: string) {
        return await this.quizzesService.getDiscovery(userId);
    }
    @Get('/info')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get info of Quiz successfully')
    @UseGuards(JwtAuthGuard)
    async getinfo(
        @GetCurrentUser('id') userId: string,
        @Query('quizzesId') quizzesId: string,
    ) {
        return await this.quizzesService.getInfoQuizzOfUser(userId, quizzesId);
    }

    @Get('/filter')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Filter successfully')
    @UseGuards(JwtAuthGuard)
    async filterCategory(
        @Query('category') categoryName: string,
        @GetCurrentUser('id') userId: string,
    ) {
        return await this.quizzesService.filterCategory(userId, categoryName);
    }

    @Get('/all-questions')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get all questions successfully')
    @UseGuards(JwtAuthGuard)
    async getAllQuestionOfQuiz(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.quizzesService.getAllQuestionsOfQuiz(userId, quizId);
    }
}
