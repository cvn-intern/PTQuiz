import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserError } from '../error';
import { AuthError } from '../error/authError.enum';
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) {}
    async editProfile(
        avatar: Express.Multer.File,
        userId: string,
        body: { displayName: string },
    ) {
        try {
            let url;
            const user = await this.prisma.users.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new HttpException(
                    AuthError.USER_NOT_FOUND,
                    HttpStatus.NOT_FOUND,
                );
            }
            if (avatar) {
                if (avatar.size > parseInt(process.env.MAX_FILE_SIZE)) {
                    throw new HttpException(
                        UserError.FILE_TOO_LARGE,
                        HttpStatus.BAD_REQUEST,
                    );
                } else if (avatar.size > 0) {
                    const image = await this.cloudinary.uploadFile(avatar);
                    url = image.secure_url;
                }
            } else url = user.avatar;

            if (!body.displayName) {
                throw new HttpException(
                    UserError.DISPLAY_NAME_CANNOT_BE_EMPTY,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const updatedUser = await this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    avatar: url,
                    displayName: body.displayName,
                },
            });
            return updatedUser;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
