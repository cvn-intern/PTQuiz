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

import { Question } from './dto/question.dto';
import { ResTransformInterceptor } from 'src/interceptors/response.interceptor';
@Controller('question')
@UseInterceptors(ResTransformInterceptor)
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post('/addquestion')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Add Question successfully')
    @UseGuards(JwtAuthGuard)
    async addQuestion(
        @Body() dto: Question,
        @GetCurrentUser('id') userId: string,
        @Query('quizzesId') quizzesId: string,
    ) {
        return await this.questionService.addQuestion(dto, userId, quizzesId);
    }
}
