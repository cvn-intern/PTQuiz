import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    WsException,
    MessageBody,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '../socket.service';
import { JoinLeaveRoomDto } from '../dto';

@WebSocketGateway({ cors: '*' })
export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;

    constructor(public socketService: SocketService) {}
    private logger: Logger = new Logger('SocketGateway');

    handleConnection(@ConnectedSocket() client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }
    async handleDisconnect(@ConnectedSocket() client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const roomPIN = await this.socketService.leaveRoomImmediately(
            client.id,
        );
        client.leave(roomPIN);
        if (roomPIN) {
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server.to(roomPIN).emit('room-users', roomParticipants);
        }
    }
    afterInit() {
        this.logger.log('Initialized!');
    }
    @SubscribeMessage('join-room')
    async handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: JoinLeaveRoomDto,
    ) {
        try {
            const { roomPIN, userId } = data;
            await this.socketService.joinRoom(roomPIN, userId, client.id);
            client.join(roomPIN);
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server.to(roomPIN).emit('room-users', roomParticipants);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('leave-room')
    async handleLeaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: JoinLeaveRoomDto,
    ) {
        try {
            const { roomPIN, userId } = data;
            client.leave(roomPIN);
            await this.socketService.leaveRoom(roomPIN, userId, client.id);
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server.to(roomPIN).emit('room-users', roomParticipants);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('send-message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any,
    ) {
        try {
            const { roomPIN, userId, avatar, message, reaction } = data;
            this.server.to(roomPIN).emit('room-messages', {
                userId,
                avatar,
                message,
                reaction,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }
}
