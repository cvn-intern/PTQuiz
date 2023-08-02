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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { QuizzesDto } from './dto/quizzes.dto';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('quizzes')
@UseInterceptors(ResTransformInterceptor)
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Create Quiz successfully')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createQuiz(
        @GetCurrentUser('id') userId: string,
        @UploadedFile() image: Express.Multer.File,
        @Body() quiz: QuizzesDto,
    ) {
        return await this.quizzesService.createQuiz(userId, quiz, image);
    }

    @Put('/update')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Update Quiz successfully')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async updateQuiz(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
        @UploadedFile() image: Express.Multer.File,
        @Body() quiz: QuizzesDto,
    ) {
        return await this.quizzesService.updateQuiz(
            userId,
            quizId,
            quiz,
            image,
        );
    }

    @Delete('/delete')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Delete Quiz successfully')
    @UseGuards(JwtAuthGuard)
    async deleteQuiz(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizId: string,
    ) {
        return await this.quizzesService.deleteQuiz(userId, quizId);
    }

    @Get('/all-quizzes')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async getQuizzes(
        @GetCurrentUser('id') userId: string,
        @Query('page') page: number,
    ) {
        return await this.quizzesService.getAllQuizzesOfUser(userId, page);
    }

    @Get('/info')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get info of Quiz successfully')
    @UseGuards(JwtAuthGuard)
    async getinfo(
        @GetCurrentUser('id') userId: string,
        @Query('quizId') quizzesId: string,
    ) {
        return await this.quizzesService.getInfoQuizzOfUser(userId, quizzesId);
    }

    @Get('/filter')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Filter successfully')
    async filterCategory(
        @Query('categoryName') categoryName: string,
        @Query('page') page: number,
    ) {
        return await this.quizzesService.filterCategory(categoryName, page);
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
