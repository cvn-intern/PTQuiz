import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { JwtAuthGuard } from '../auth/guard/jwtGuard.guard';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';

@Controller('user')
@UseInterceptors(ResTransformInterceptor)
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/edit-profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Edit profile successfully')
    @UseInterceptors(FileInterceptor('avatar'))
    async editProfile(
        @UploadedFile() avatar: Express.Multer.File,
        @GetCurrentUser('id') userId: string,
        @Body() body: { displayName: string },
    ) {
        return this.userService.editProfile(avatar, userId, body);
    }
}
