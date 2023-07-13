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
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard.guard';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { UserService } from './user.service';
import { ResTransformInterceptor } from 'src/interceptors/response.interceptor';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';

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
