import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
@Module({
    imports: [
        PrismaModule,
        AuthModule,
        CloudinaryModule,
        ConfigModule.forRoot(),
        MailerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
