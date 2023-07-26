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
        @GetCurrentUser('id') userId: string,
        @Query('category') categoryName: string,
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
