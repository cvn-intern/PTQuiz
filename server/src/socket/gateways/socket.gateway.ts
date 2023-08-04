import { MessageDto } from './../dto/message.dto';
import { CryptoService } from './../../crypto/crypto.service';
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
import { AnswerDto, GifQuestionDto, RoomPinDto } from '../dto';
import { QuestionPointerDto } from '../dto/questionPointer.dto';
import { WebSocketJwtGuard } from '../WebSocketJwtGuard.guard';
import { SocketClient } from '../socketClient.class';
import { SocketError } from '../../error';
import { EmitChannel, ListenChannel } from '../socketChannel.enum';
import { QuestionIdDto } from '../dto/questionId.dto';
import { JoinRoomDto } from '../dto/joinRoom.dto';
import { EndGameDto } from '../dto/endGame.dto';

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

    constructor(
        public socketService: SocketService,
        private cryptoService: CryptoService,
    ) {}
    private logger: Logger = new Logger('SocketGateway');

    handleConnection(@ConnectedSocket() client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }
    async handleDisconnect(@ConnectedSocket() client: Socket) {
        try {
            this.logger.log(`Client disconnected: ${client.id}`);
            const { roomPIN, isHost } =
                await this.socketService.leaveRoomImmediately(client.id);
            if (roomPIN) {
                const roomParticipants =
                    await this.socketService.getRoomParticipants(roomPIN);
                this.server.to(roomPIN).emit(EmitChannel.ROOM_USERS, {
                    roomParticipants,
                    signal: 'leave',
                });
                client.leave(roomPIN);
                if (isHost) {
                    this.server.to(roomPIN).emit(EmitChannel.HOST_LEFT, {
                        isHost,
                    });
                }
            }
        } catch (error) {}
    }
    afterInit() {
        this.logger.log('Initialized!');
    }

    @SubscribeMessage(ListenChannel.JOIN_ROOM)
    async handleJoinRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: JoinRoomDto,
    ) {
        try {
            const { roomPIN, aliasName, roomPassword, isHostJoined } = data;
            const result = await this.socketService.joinRoom(
                roomPIN,
                client.user.id,
                client.id,
                aliasName,
                roomPassword,
                isHostJoined,
            );
            if (result.status === true) {
                client.join(roomPIN);
                const roomParticipants =
                    await this.socketService.getRoomParticipants(roomPIN);
                this.server.to(roomPIN).emit(EmitChannel.ROOM_USERS, {
                    roomParticipants,
                    signal: 'join',
                });
                client.emit(EmitChannel.JOINED, {
                    ...result,
                    isJoined: true,
                });
            } else {
                client.emit(EmitChannel.JOINED, {
                    ...result,
                    isJoined: false,
                });
            }
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.LEAVE_ROOM)
    async handleLeaveRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDto,
    ) {
        try {
            const { roomPIN } = data;
            const { isHost } = await this.socketService.leaveRoom(
                roomPIN,
                client.user.id,
                client.id,
            );
            client.leave(roomPIN);
            const roomParticipants =
                await this.socketService.getRoomParticipants(roomPIN);
            this.server.to(roomPIN).emit(EmitChannel.ROOM_USERS, {
                roomParticipants,
                signal: 'leave',
            });
            if (isHost) {
                this.server.to(roomPIN).emit(EmitChannel.HOST_LEFT, {
                    isHost,
                });
            }
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.SEND_MESSAGE)
    async handleMessage(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: MessageDto,
    ) {
        try {
            const { content, roomPIN } = data;
            this.server.to(roomPIN).emit(EmitChannel.ROOM_MESSAGES, {
                user: {
                    id: client.user.id,
                    displayName: client.user.displayName,
                    avatar: client.user.avatar,
                },
                content,
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
        @MessageBody() data: RoomPinDto,
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
        @MessageBody() data: RoomPinDto,
    ) {
        try {
            const { roomPIN } = data;
            await this.socketService.startGame(roomPIN, client.user.id);
            this.server.to(roomPIN).emit(EmitChannel.STARTED, {
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
        @MessageBody() data: EndGameDto,
    ) {
        try {
            const { roomPIN, participants } = data;
            await this.socketService.endGame(roomPIN, client.user.id);
            this.server.to(roomPIN).emit(EmitChannel.ENDED, {
                isEnded: true,
                participants,
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
        @MessageBody() data: RoomPinDto,
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
                data.answer.questionId,
            );
            const hostSocketId = await this.socketService.getHostSocketId(
                data.roomPIN,
            );
            this.server
                .to(hostSocketId)
                .emit(EmitChannel.SCORE_BOARD, scoreBoard);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GET_ANSWER_QUESTION)
    async handleGetAnswerQuestion(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: QuestionIdDto,
    ) {
        try {
            const { questionId } = data;
            const answer = await this.socketService.getAnswerQuestion(
                questionId,
            );
            const decryptAnswer = await this.cryptoService.encryptData(
                JSON.stringify(answer),
            );
            client.emit(EmitChannel.ANSWER_QUESTION, decryptAnswer);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GIF_QUESTION)
    async handleGifQuestion(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: GifQuestionDto,
    ) {
        try {
            this.server.to(data.roomPIN).emit(EmitChannel.GIF_QUESTION, {
                isShowGif: data.isShowGif,
                isShowOption: data.isShowOption,
                duration: data.duration,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GET_ROOM_INFO)
    async handleRoomInfo(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDto,
    ) {
        try {
            const { roomPIN } = data;
            const roomInfo = await this.socketService.getRoomInfo(
                roomPIN,
                client.user.id,
            );
            client.emit(EmitChannel.ROOM_INFO, roomInfo);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }
}
