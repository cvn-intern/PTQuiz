import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (avatar) {
                if (avatar.size > +process.env.MAX_FILE_SIZE) {
                    throw new HttpException(
                        'File size too large, max file size is 4MB',
                        HttpStatus.BAD_REQUEST,
                    );
                } else if (avatar.size > 0) {
                    const image = await this.cloudinary.uploadFile(avatar);
                    url = image.url;
                }
            } else url = user.avatar;

            if (!body.displayName) {
                throw new HttpException(
                    "Display name can't be empty",
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
