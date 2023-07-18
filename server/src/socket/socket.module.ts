import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { RoomGateway } from './gateways/room.gateway';

@Module({
    providers: [SocketGateway, RoomGateway],
})
export class SocketModule {}
