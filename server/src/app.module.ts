import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { PlaygameModule } from './playgame/playgame.module';
import { SocketModule } from './socket/socket.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
@Module({
    imports: [
        PrismaModule,
        AuthModule,
        CloudinaryModule,
        ConfigModule.forRoot(),
        MailerModule,
        QuizzesModule,
        QuestionModule,
        UserModule,
        PlaygameModule,
        SocketModule,
        RoomModule,
    ],
    controllers: [RoomController],
    providers: [],
})
export class AppModule {}
