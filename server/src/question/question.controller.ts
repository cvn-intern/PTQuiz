import { QuestionService } from './question.service';
import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    Query,
    Body,
} from '@nestjs/common';

import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { QuestionDto } from './dto/question.dto';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
@Controller('question')
@UseInterceptors(ResTransformInterceptor)
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('/get')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get Question successfully')
    @UseGuards(JwtAuthGuard)
    async getQuestion(@Query('questionId') questionId: string) {
        return await this.questionService.getQuestion(questionId);
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Create Question successfully')
    @UseGuards(JwtAuthGuard)
    async createQuestion(
        @Body() questionsData: QuestionDto,
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.questionService.createQuestion(
            userId,
            quizId,
            questionsData,
        );
    }
}
