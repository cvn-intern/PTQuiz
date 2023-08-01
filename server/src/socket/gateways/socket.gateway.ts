import { Logger, UseGuards } from '@nestjs/common';
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
import { AnswerDto, RoomPinDTO } from '../dto';
import { QuestionPointerDto } from '../dto/questionPointer.dto';
import { WebSocketJwtGuard } from '../WebSocketJwtGuard.guard';
import { SocketClient } from '../socketClient.class';
import { SocketError } from '../../error';
import { EmitChannel, ListenChannel } from '../socketChannel.enum';

@WebSocketGateway(8082, {
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
    path: '/socket.io',
})
@UseGuards(WebSocketJwtGuard)
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
                this.server
                    .to(roomPIN)
                    .emit(EmitChannel.ROOM_USERS, roomParticipants);
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

    @SubscribeMessage(ListenChannel.JOIN_ROOM)
    async handleJoinRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            await this.socketService.joinRoom(
                roomPIN,
                client.user.id,
                client.id,
            );
            client.join(roomPIN);
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server
                .to(roomPIN)
                .emit(EmitChannel.ROOM_USERS, roomParticipants);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.LEAVE_ROOM)
    async handleLeaveRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            client.leave(roomPIN);
            await this.socketService.leaveRoom(
                roomPIN,
                client.user.id,
                client.id,
            );
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server
                .to(roomPIN)
                .emit(EmitChannel.ROOM_USERS, roomParticipants);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.SEND_MESSAGE)
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any,
    ) {
        try {
            const { roomPIN, userId, avatar, message, reaction } = data;
            this.server.to(roomPIN).emit(EmitChannel.ROOM_MESSAGES, {
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
    @SubscribeMessage(ListenChannel.IS_HOST)
    async handleIsHost(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            const isHost = await this.socketService.checkRoomHost(
                roomPIN,
                client.user.id,
            );
            client.emit(EmitChannel.IS_HOST, {
                isHost,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.START_GAME)
    async handleStartQuiz(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            await this.socketService.startGame(roomPIN, client.user.id);
            this.server.to(roomPIN).emit('started', {
                isStarted: true,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.END_GAME)
    async handleEndGame(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            await this.socketService.endGame(roomPIN, client.user.id);
            this.server.to(roomPIN).emit('ended', {
                isEnded: true,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GET_QUIZ_QUESTIONS)
    async handleGetQuestions(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: RoomPinDTO,
    ) {
        try {
            const { roomPIN } = data;
            const questions = await this.socketService.getQuestions(roomPIN);
            this.server.to(roomPIN).emit(EmitChannel.QUIZ_QUESTIONS, questions);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.CHANGE_QUESTION_POINTER)
    async handleGetQuestion(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: QuestionPointerDto,
    ) {
        try {
            const { roomPIN, questionPointer } = data;
            const isHost = await this.socketService.checkRoomHost(
                roomPIN,
                client.user.id,
            );
            if (!isHost) {
                throw new WsException({
                    message: SocketError.SOCKET_ROOM_PERMISSION_DENIED,
                });
            }
            this.server.to(roomPIN).emit(EmitChannel.QUESTION_POINTER, {
                questionPointer,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.PICK_ANSWER)
    async handlePickAnswer(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: AnswerDto,
    ) {
        try {
            const result = await this.socketService.pickAnswer(
                client.id,
                client.user.id,
                data,
            );
            client.emit(EmitChannel.ANSWER_RESULT, {
                ...result,
            });
            const scoreBoard = await this.socketService.getScoreBoard(
                data.roomPIN,
            );
            this.server
                .to(data.roomPIN)
                .emit(EmitChannel.SCORE_BOARD, scoreBoard);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }
}
