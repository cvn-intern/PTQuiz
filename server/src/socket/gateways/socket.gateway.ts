import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';

@WebSocketGateway({ cors: '*' })
export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(public prisma: PrismaService) {}
    private logger: Logger = new Logger('SocketGateway');

    handleConnection(@ConnectedSocket() client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(@ConnectedSocket() client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    afterInit() {
        this.logger.log('Initialized!');
    }
}
