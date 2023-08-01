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
import { AnswerDto, JoinLeaveRoomDto, RoomPINDto } from '../dto';
import { QuestionPointerDto } from '../dto/questionPointer.dto';

@WebSocketGateway(8082, {
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
    path: '/socket.io',
})
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
        try {
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
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
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
    @SubscribeMessage('is-host')
    async handleIsHost(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: JoinLeaveRoomDto,
    ) {
        try {
            const { roomPIN, userId } = data;
            const isHost = await this.socketService.checkRoomHost(
                roomPIN,
                userId,
            );
            client.emit('is-host', {
                isHost,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('start')
    async handleStartQuiz(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: RoomPINDto,
    ) {
        try {
            const { roomPIN } = data;
            this.server.to(roomPIN).emit('started', {
                isStarted: true,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('get-quiz-questions')
    async handleGetQuestions(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: RoomPINDto,
    ) {
        try {
            const { roomPIN } = data;
            const questions = await this.socketService.getQuestions(roomPIN);
            this.server.to(roomPIN).emit('quiz-questions', questions);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('change-question-pointer')
    async handleGetQuestion(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: QuestionPointerDto,
    ) {
        try {
            const { roomPIN, questionPointer } = data;
            this.server.to(roomPIN).emit('question-pointer', {
                questionPointer,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage('pick-answer')
    async handlePickAnswer(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: AnswerDto,
    ) {
        try {
            const result = await this.socketService.pickAnswer(client.id, data);
            client.emit('answer-result', {
                ...result,
            });
            const hostSocketId = await this.socketService.getHostSocketId(
                data.roomPIN,
            );
            if (hostSocketId) {
                const scoreBoard = await this.socketService.getScoreBoard(
                    data.roomPIN,
                );
                this.server.to(hostSocketId).emit('score-board', scoreBoard);
            }
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }
}
