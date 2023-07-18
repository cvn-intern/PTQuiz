import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { RoomGateway } from './gateways/room.gateway';
import { SocketService } from './socket.service';

@Module({
    providers: [SocketGateway, RoomGateway, SocketService],
})
export class SocketModule {}
