import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { SocketService } from './socket.service';

@Module({
    providers: [SocketGateway, SocketService],
})
export class SocketModule {}
