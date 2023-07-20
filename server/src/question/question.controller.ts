import { QuestionService } from './question.service';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    Query,
} from '@nestjs/common';

import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
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
}
