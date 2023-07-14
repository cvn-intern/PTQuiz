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

    @Get('/get-all')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async getQuizzes(@GetCurrentUser('id') userId: string) {
        return await this.quizzesService.getAllQuizzesofUser(userId);
    }

    @Delete('delete-by-id')
    @ResponseMessage('Delete Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async deleteQuizzes(
        @GetCurrentUser('id') userId: string,
        quizzesId: string,
    ) {
        return await this.quizzesService.deleteQuizzes(userId, quizzesId);
    }

    @Post('/add')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Add Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async addQuizzes(
        @Body() dto: QuizzesDto,
        @GetCurrentUser('id') userId: string,
    ) {
        return await this.quizzesService.addQuizzes(dto, userId);
    }

    @Put('/changeinfo')
    @ResponseMessage('Change info Quizzes successfully')
    @UseGuards(JwtAuthGuard)
    async changeInfo(
        @Body() dto: QuizzesDto,
        @Query('quizzesId') quizzesId: string,
    ) {
        return await this.quizzesService.changeInfoQuizzes(dto, quizzesId);
    }

    @Get('/discovery')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get discovery successfully')
    @UseGuards(JwtAuthGuard)
    async getdiscovery() {
        return await this.quizzesService.getDiscovery();
    }
    @Get('/info')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get discovery successfully')
    @UseGuards(JwtAuthGuard)
    async getinfo(@Query('quizzesId') quizzesId: string) {
        return await this.quizzesService.getInfo(quizzesId);
    }

    @Get('/filter')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Filter successfully')
    @UseGuards(JwtAuthGuard)
    async filterCategory(@Query('category') category: string){
        return  this.quizzesService.filterCategory(category);
    }

}
