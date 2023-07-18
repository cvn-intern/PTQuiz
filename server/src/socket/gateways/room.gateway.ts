import { Socket, Server } from 'socket.io';
import { SocketGateway } from './socket.gateway';
import {
    SubscribeMessage,
    ConnectedSocket,
    WebSocketServer,
    MessageBody,
    WsException,
} from '@nestjs/websockets';
import { JoinLeaveRoomDto, sendMessageDto } from '../dto';

export class RoomGateway extends SocketGateway {
    @WebSocketServer() server: Server;
    @SubscribeMessage('join-room')
    async handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: JoinLeaveRoomDto,
    ) {
        try {
            const { roomPIN, userId } = data;
            const result = await this.socketService.joinRoom(roomPIN, userId);
            client.join(roomPIN);
            this.server.to(roomPIN).emit('room-users', {
                message: `${result.displayName} has joined the room`,
                result,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('leave-room')
    handleLeaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: JoinLeaveRoomDto,
    ): void {
        const { roomPIN: roomId, userId } = data;
        client.leave(roomId);
        this.server.to(roomId).emit('left-room', {
            message: `${userId} has left the room`,
            userId,
        });
    }

    @SubscribeMessage('send-message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: sendMessageDto,
    ): void {
        const { message, roomPIN } = data;
        this.server.to(roomPIN).emit('message', message);
    }

    @SubscribeMessage('get-all-rooms')
    handleGetAllRooms(@ConnectedSocket() client: Socket): void {
        const rooms = this.server.sockets.adapter.rooms;
        const res = [];
        rooms.forEach((value, key) => {
            res.push({ roomId: key, members: value.size });
        });
        client.emit('all-rooms', res);
    }
}
