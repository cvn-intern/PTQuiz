import { QuestionService } from './question.service';
import {
    Controller,
    Get,
    Post,
    Put,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    Query,
    Body,
    Delete,
    UploadedFile,
} from '@nestjs/common';

import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { QuestionDto } from './dto/question.dto';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
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

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Create Question successfully')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createQuestion(
        @Body() questionsData: QuestionDto,
        @GetCurrentUser('id') userId: string,
        @UploadedFile() image: Express.Multer.File,
        @Query('quizId') quizId: string,
    ) {
        return await this.questionService.createQuestion(
            userId,
            quizId,
            questionsData,
            image,
        );
    }

    @Put('/update')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Update Question successfully')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    async updateQuestion(
        @Body() questionsData: QuestionDto,
        @GetCurrentUser('id') userId: string,
        @Query('questionId') questionId: string,
        @UploadedFile() image: Express.Multer.File,
    ) {
        return await this.questionService.updateQuestion(
            userId,
            questionId,
            questionsData,
            image,
        );
    }

    @Delete('/delete')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Delete Question successfully')
    @UseGuards(JwtAuthGuard)
    async deleteQuestion(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
        @Query('questionId') questionId: string,
    ) {
        return await this.questionService.deleteQuestion(
            userId,
            quizId,
            questionId,
        );
    }
}
