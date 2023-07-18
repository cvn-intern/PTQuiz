import { Socket, Server } from 'socket.io';
import { SocketGateway } from './socket.gateway';
import {
    SubscribeMessage,
    ConnectedSocket,
    WebSocketServer,
    MessageBody,
} from '@nestjs/websockets';

export class RoomGateway extends SocketGateway {
    @WebSocketServer() server: Server;
    @SubscribeMessage('join-room')
    async handleJoinRoom(@ConnectedSocket() client: Socket) {
        const roomId = client.handshake.query.roomId as string;
        const userId = client.handshake.query.userId as string;
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: {
                displayName: true,
            },
        });
        client.join(roomId);
        this.server.to(roomId).emit('joined-room', {
            message: `${user.displayName} has joined the room`,
            userId,
            displayName: user.displayName,
        });
    }

    @SubscribeMessage('leave-room')
    handleLeaveRoom(@ConnectedSocket() client: Socket): void {
        const roomId = client.handshake.query.roomId as string;
        const userId = client.handshake.query.userId as string;
        client.leave(roomId);
        this.server.to(roomId).emit('left-room', {
            message: `${userId} has left the room`,
            userId,
        });
    }

    @SubscribeMessage('send-message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any,
    ): void {
        const { message } = data;
        const roomId = client.handshake.query.roomId as string;
        this.server.to(roomId).emit('message', message);
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
