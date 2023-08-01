import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { SocketService } from './socket.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [SocketGateway, SocketService],
})
export class SocketModule {}
