import { QuestionService } from './question.service';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard.guard';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
    Query,
} from '@nestjs/common';

import { QuestionDto } from './dto/question.dto';
import { ResTransformInterceptor } from 'src/interceptors/response.interceptor';
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
