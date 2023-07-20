import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Body,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard.guard';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { RoomService } from './room.service';
import { ResTransformInterceptor } from 'src/interceptors/response.interceptor';

@Controller('room')
@UseInterceptors(ResTransformInterceptor)
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Post('/open')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Open room successfully!')
    @UseGuards(JwtAuthGuard)
    async openRoom(
        @GetCurrentUser('id') userId: string,
        @Body() body: { quizId: string },
    ) {
        return this.roomService.createRoom(userId, body);
    }

    @Post('/close')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Close room successfully!')
    @UseGuards(JwtAuthGuard)
    async closeRoom(
        @GetCurrentUser('id') userId: string,
        @Body() body: { roomId: string },
    ) {
        return this.roomService.closeRoom(body, userId);
    }
}
