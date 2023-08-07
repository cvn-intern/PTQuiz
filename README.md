<!-- import { MessageDto } from './../dto/message.dto';
import { CryptoService } from './../../crypto/crypto.service';
import { UseGuards, Logger } from '@nestjs/common';
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
import { EndGameDto as EndQuizDto } from '../dto/endGame.dto';
import { ChangeRoomVisibilityDto as SetPrivateRoomDto } from '../dto/changeRoomVisibility.dto';
import { ChangeRoomCountDto as SetRoomCapacityDto } from '../dto/changeRoomCount.dto';
import { KickUserDto } from '../dto/kickUser.dto';
import { ReactionDto } from '../dto/reaction.dto';
import { MessageHostDto } from '../dto/messageHost.dto';
import { ParticipantIdDto } from '../dto/participant.dto';

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
        this.logger.log('Socket server initialized');
    }

    @SubscribeMessage(ListenChannel.JOIN_ROOM)
    async handleJoinRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: JoinRoomDto,
    ) {
        try {
            const { roomPIN, aliasName, roomPassword } = data;
            const isHost = await this.socketService.checkRoomHost(
                roomPIN,
                client.user.id,
            );
            const result = await this.socketService.joinRoom(
                roomPIN,
                client.user.id,
                client.id,
                aliasName,
                roomPassword,
                isHost,
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

    @SubscribeMessage(ListenChannel.SEND_HOST_MESSAGE)
    async handleHostMessage(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: MessageHostDto,
    ) {
        try {
            const { content, roomPIN } = data;
            const isInRoom = await this.checkUserIsInRoom(client.id, roomPIN);
            if (!isInRoom) {
                throw new WsException({
                    message: SocketError.SOCKET_ROOM_PERMISSION_DENIED,
                });
            }
            this.server.to(roomPIN).emit(EmitChannel.HOST_MESSAGE, {
                user: {
                    id: client.user.id,
                    displayName: client.aliasName,
                    avatar: client.aliasAvatar,
                },
                content,
            });
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
            const isInRoom = await this.checkUserIsInRoom(client.id, roomPIN);
            if (!isInRoom) {
                throw new WsException({
                    message: SocketError.SOCKET_ROOM_PERMISSION_DENIED,
                });
            }
            this.server.to(roomPIN).emit(EmitChannel.ROOM_MESSAGES, {
                user: {
                    id: client.user.id,
                    displayName: client.aliasName,
                    avatar: client.aliasAvatar,
                },
                content,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }
    @SubscribeMessage(ListenChannel.SEND_REACTION)
    async handleReaction(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: ReactionDto,
    ) {
        try {
            const { reaction, roomPIN } = data;
            const isInRoom = await this.checkUserIsInRoom(client.id, roomPIN);
            if (!isInRoom) {
                throw new WsException({
                    message: SocketError.SOCKET_ROOM_PERMISSION_DENIED,
                });
            }
            this.server.to(roomPIN).emit(EmitChannel.ROOM_REACTIONS, {
                user: {
                    id: client.user.id,
                    displayName: client.aliasName,
                    avatar: client.aliasAvatar,
                },
                reaction,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.CHECK_IS_HOST)
    async handleCheckIsHost(
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

    @SubscribeMessage(ListenChannel.START_QUIZ)
    async handleStartQuiz(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: RoomPinDto,
    ) {
        try {
            const { roomPIN } = data;
            await this.socketService.startQuiz(roomPIN, client.user.id);
            this.server.to(roomPIN).emit(EmitChannel.STARTED, {
                isStarted: true,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.END_QUIZ)
    async handleEndQuiz(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: EndQuizDto,
    ) {
        try {
            const { roomPIN, participants } = data;
            await this.socketService.endQuiz(roomPIN, client.user.id);
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

    @SubscribeMessage(ListenChannel.GET_QUESTIONS_BY_QUIZ)
    async handleGetQuestions(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: RoomPinDto,
    ) {
        try {
            const { roomPIN } = data;
            const questions = await this.socketService.getQuestions(roomPIN);
            this.server.to(roomPIN).emit(EmitChannel.QUESTIONS, questions);
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GET_NEXT_QUESTION)
    async handleGetNextQuestion(
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
            this.server.to(roomPIN).emit(EmitChannel.NEXT_QUESTION, {
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
            if (!data.isBattle) {
                this.server
                    .to(hostSocketId)
                    .emit(EmitChannel.SCORE_BOARD, scoreBoard);
            } else {
                this.server
                    .to(data.roomPIN)
                    .emit(EmitChannel.SCORE_BOARD, scoreBoard);
            }
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

    @SubscribeMessage(ListenChannel.GET_GIF_QUESTION)
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

    @SubscribeMessage(ListenChannel.SET_PRIVATE_ROOM)
    async handleSetPrivateRoom(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: SetPrivateRoomDto,
    ) {
        try {
            const { roomId, isPublic } = data;
            const result = await this.socketService.setPrivateRoom(
                roomId,
                client.user.id,
                isPublic,
            );
            client.emit(EmitChannel.IS_PRIVATE_ROOM, {
                isPublic: result,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.SET_ROOM_CAPACITY)
    async handleSetRoomCapacity(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: SetRoomCapacityDto,
    ) {
        try {
            const { roomId, count } = data;
            if (typeof count !== 'number') {
                throw new WsException({
                    message: SocketError.SOCKET_INVALID_FORMAT,
                });
            }
            const result = await this.socketService.setRoomCapacity(
                roomId,
                client.user.id,
                count,
            );
            this.server.to(result.PIN).emit(EmitChannel.ROOM_CAPACITY, {
                count: result.count,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.KICK_USER)
    async handleKickUser(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: KickUserDto,
    ) {
        try {
            const { roomId, participantId } = data;
            const { participant } = await this.socketService.findUserSocketId(
                roomId,
                client.user.id,
                participantId,
            );
            this.server.to(participant.socketId).emit(EmitChannel.BE_KICKED, {
                beKicked: true,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    @SubscribeMessage(ListenChannel.GET_ME)
    async handleGetMe(
        @ConnectedSocket() client: SocketClient,
        @MessageBody() data: ParticipantIdDto,
    ) {
        try {
            const { participantId, index } = data;
            const me = await this.socketService.getMe(
                client.user.id,
                participantId,
            );
            client.emit(EmitChannel.ME, {
                me,
                index,
            });
        } catch (error) {
            throw new WsException({
                message: error.message,
            });
        }
    }

    async checkUserIsInRoom(socketId: string, roomPIN: string) {
        const sockets = await this.server.in(roomPIN).fetchSockets();
        const socketIds = sockets.map((socket) => {
            return socket.id;
        });
        if (!socketIds.includes(socketId)) {
            return false;
        }
        return true;
    }
} -->
<!-- {
    "isHost": true,
    "room": {
        "id": "cll0aqram0009j9s84egk12vt",
        "PIN": "220316",
        "userId": "clkl8ou1p0000q1qm2j3mdl34",
        "isPublic": false,
        "isClosed": false,
        "isStarted": false,
        "count": 2,
        "type": 2
    },
    "user": {
        "aliasName": "Super Shy",
        "displayName": "Gia Phong Ngo"
    },
    "roomPassword": "86947"
} -->
<!-- {
    "isHost": true
} -->
<!-- {
    "roomPIN": "220316",
    "aliasName": "Super Shy",
    "roomPassword": ""
} -->

<!-- [
    {
        "id": "cll0hnqo40001j9ookzivmcjb",
        "displayName": "Super Shy",
        "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s",
        "isHost": true,
        "point": 0,
        "correct": 0
    },
    {
        "id": "cll0hp51e0005j9ooakpogejk",
        "displayName": "Cùi",
        "avatar": "https://media4.giphy.com/media/RaxcELylDIaDnbWWtl/giphy.gif?cid=ecf05e47qpagl2cg9lueva249mxoedai6tq0ov4dal00urg4&ep=v1_gifs_related&rid=giphy.gif&ct=s",
        "isHost": false,
        "point": 0,
        "correct": 0
    }
] -->
<!-- {
    "isPublic": false
} -->

<!-- [
    {
        "id": "clklx5eyk000ubi014mxhiwq3",
        "categoryId": "clk6mopdw0005j3ngsixir2g2",
        "title": "day la cross",
        "options": {
            "optionA": "",
            "optionB": "",
            "optionC": "",
            "optionD": ""
        },
        "image": "",
        "type": 2,
        "time": 20,
        "createdAt": "2023-07-28T01:42:42.429Z",
        "updatedAt": "2023-07-28T01:42:42.429Z"
    },
    {
        "id": "clklx9niv000ybi01ff6qbkv4",
        "categoryId": "clk6mopdw0005j3ngsixir2g2",
        "title": "cc",
        "options": {
            "optionA": "ád",
            "optionB": "ád",
            "optionC": "ád",
            "optionD": "ád"
        },
        "image": "",
        "type": 1,
        "time": 20,
        "createdAt": "2023-07-28T01:46:00.151Z",
        "updatedAt": "2023-07-28T01:46:00.151Z"
    }
] -->

## Real-time playing quiz

#### Introduction
- In this project, we implement real-time playing quiz using Socket.io. Socket.io is a library that enables real-time, bidirectional and event-based communication between the browser and the server. In this project, we use socket.io to create a real-time connection between all clients in the same room. For instance, we use it for displaying all the clients in room and they can chat with each other, displaying quiz questions, display quiz results, etc.
- There is 2 mode in this project : `group` and `battle 1v1` mode. In `group` mode, all clients in the same room will play the quiz together. In `battle 1v1` mode, 2 players will play the quiz together. The winner will be the player who has the highest score.
#### Parser

#### Authentication and authorization with Socket.io
- We're using JWT for authentication and authorization. In order to authenticate and authorize the client, we need to send the JWT token to the server. The client will send the JWT token in the the authentication payload when connecting to the server. The server will verify the JWT token and get the user information from the JWT token. After that, the server will store the user information in the socket object. The client can get the user information from the socket object.
#### Overall description:
| Description         | Method                    | Listen channel          | Emit channel      |
| ------------------- | ------------------------- | ----------------------- | ----------------- |
| Join room           | `handleJoinRoom`          | `JOIN_ROOM`             | `JOINED`          |
| Leave room          | `handleLeaveRoom`         | `LEAVE_ROOM`            | `ROOM_USERS`      |
| Send message        | `handleMessage`           | `SEND_MESSAGE`          | `ROOM_MESSAGES`   |
| Send reaction       | `handleReaction`          | `SEND_REACTION`         | `ROOM_REACTIONS`  |
| Send host message   | `handleHostMessage`       | `SEND_HOST_MESSAGE`     | `HOST_MESSAGE`    |
| Check room host     | `handleCheckIsHost`       | `CHECK_IS_HOST`         | `IS_HOST`         |
| Start quiz          | `handleStartQuiz`         | `START_QUIZ`            | `STARTED`         |
| End quiz            | `handleEndQuiz`           | `END_QUIZ`              | `ENDED`           |
| Get questions       | `handleGetQuestions`      | `GET_QUESTIONS_BY_QUIZ` | `QUESTIONS`       |
| Get next question   | `handleGetNextQuestion`   | `GET_NEXT_QUESTION`     | `NEXT_QUESTION`   |
| Pick answer         | `handlePickAnswer`        | `PICK_ANSWER`           | `ANSWER_RESULT`   |
| Get answer question | `handleGetAnswerQuestion` | `GET_ANSWER_QUESTION`   | `ANSWER_QUESTION` |
| Gif question        | `handleGifQuestion`       | `GET_GIF_QUESTION`      | `GIF_QUESTION`    |
| Get room info       | `handleRoomInfo`          | `GET_ROOM_INFO`         | `ROOM_INFO`       |
| Set private room    | `handleSetPrivateRoom`    | `SET_PRIVATE_ROOM`      | `IS_PRIVATE_ROOM` |
| Set room capacity   | `handleSetRoomCapacity`   | `SET_ROOM_CAPACITY`     | `ROOM_CAPACITY`   |
| Kick user           | `handleKickUser`          | `KICK_USER`             | `BE_KICKED`       |
| Get me              | `handleGetMe`             | `GET_ME`                | `ME`              |

#### Methods:

##### `handleJoinRoom`
- This method is used to handle the `JOIN_ROOM` event. When the client sends a `JOIN_ROOM` event to the server, the server will handle the event and send a `JOINED` event to the client indicating that the client is successfully joined the room or not.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    aliasName: string;
    roomPassword: string;
}
```
Example :
```typescript
{
    "roomPIN": "220316",
    "aliasName": "Super Shy",
    "roomPassword": ""
}
```
- The server will send the following data to the client:
```typescript
{
    status: boolean;
    message: string;
    isJoined: boolean;
}
```
Example:
```typescript
{
    "status": true,
    "message": "Joined room successfully",
    "isJoined": true
}
```
- If the client is successfully joined the room, the `isJoined` will be `true`. Otherwise, it will be `false`.
- After the client joined the room, the server will send a `ROOM_USERS` event to all clients in the room. The `ROOM_USERS` event is used to display all clients in the room.
```typescript
{
    roomParticipants: {
        id: string;
        displayName: string;
        avatar: string;
    }[];
    signal: 'join' | 'leave';
}
```
Example:
```typescript
{
    "roomParticipants": [
        {
            "id": "cll0hnqo40001j9ookzivmcjb",
            "displayName": "Super Shy",
            "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s"
        },
        {
            "id": "cll0hp51e0005j9ooakpogejk",
            "displayName": "Cùi",
            "avatar": "https://media4.giphy.com/media/RaxcELylDIaDnbWWtl/giphy.gif?cid=ecf05e47qpagl2cg9lueva249mxoedai6tq0ov4dal00urg4&ep=v1_gifs_related&rid=giphy.gif&ct=s"
        }
    ],
    "signal": "join"
}
```

##### `handleLeaveRoom`

- This method is used to handle the `LEAVE_ROOM` event. When the client sends a `LEAVE_ROOM` event to the server, the server will handle the event and send a `ROOM_USERS` event to all the clients.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316"
}
```
- After the client left the room, the server will send a `ROOM_USERS` event to all clients in the room. The `ROOM_USERS` event is used to display all clients in the room:
```typescript
{
    roomParticipants: {
        id: string;
        displayName: string;
        avatar: string;
    }[];
    signal: 'join' | 'leave';
}
```
Example :
```typescript
{
    "roomParticipants": [
        {
            "id": "cll0hnqo40001j9ookzivmcjb",
            "displayName": "Super Shy",
            "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s"
        }
    ],
    "signal": "leave"
}
```

##### `handleSendMessage`

- This method is used to handle the `SEND_MESSAGE` event. When the client sends a `SEND_MESSAGE` event to the server, the server will handle the event and send a `ROOM_MESSAGES` event to all the clients in room. 
- This method is used to display the message of client in the room to all clients in the room.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    content: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "content": "Hello"
}
```

- After the client sends a `SEND_MESSAGE` event to the server, the server will send a `ROOM_MESSAGES` event to all clients in the room. The `ROOM_MESSAGES` event is used to display all messages in the room:
```typescript
{
    user: {
        id: string;
        displayName: string;
        avatar: string;
    };
    content: string;
}
```
Example:
```typescript
{
    "user": {
        "id": "cll0hnqo40001j9ookzivmcjb",
        "displayName": "Super Shy",
        "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s"
    },
    "content": "Hello"
}
```

##### `handleHostMessage`

- This method is used to handle the `SEND_HOST_MESSAGE` event. When the client sends a `SEND_HOST_MESSAGE` event to the server, the server will handle the event and send a `HOST_MESSAGE` event to all the clients in room. 
- This method is used to display the message of host in the room to all clients in the room.

- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    content: string;
}
```

- After the server receives the `SEND_HOST_MESSAGE` event, the server will send a `HOST_MESSAGE` event to all clients in the room:
```typescript
{
    user: {
        id: string;
        displayName: string;
        avatar: string;
    };
    content: string;
}
```

##### `handleReaction`

- This method is used to handle the `SEND_REACTION` event. When the client sends a `SEND_REACTION` event to the server, the server will handle the event and send a `ROOM_REACTIONS` event to all the clients in room. 
- This method is used to display the reaction of host in the room to all clients in the room.

- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    reaction: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "reaction": "👍"
}
```

- After the server receives the `SEND_REACTION` event, the server will send a `ROOM_REACTIONS` event to all clients in the room:
```typescript
{
    user: {
        id: string;
        displayName: string;
        avatar: string;
    };
    reaction: string;
}
```
Example:
```typescript
{
    "user": {
        "id": "cll0hnqo40001j9ookzivmcjb",
        "displayName": "Super Shy",
        "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s"
    },
    "reaction": "👍"
}
```
##### `handleCheckIsHost`

- This method is used to handle the `CHECK_IS_HOST` event. When the client sends a `CHECK_IS_HOST` event to the server, the server will handle the event and send a `IS_HOST` event to the client. 
- This method is used to check whether the client is the host of the room or not.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316"
}
```
- After the server receives the `CHECK_IS_HOST` event, the server will send a `IS_HOST` event to the client:
```typescript
{
    isHost: boolean;
}
```
Example:
```typescript
{
    "isHost": true
}
```

##### `handleStartQuiz`

- This method is used to handle the `START_QUIZ` event. When the client sends a `START_QUIZ` event to the server, the server will handle the event and send a `STARTED` event to all the clients in room. 
- This method is used to start the quiz which is used for the room.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```

- After the server receives the `START_QUIZ` event, the server will send a `STARTED` event to all clients in the room:
```typescript
{
    isStarted: boolean;
}
```
Example:
```typescript
{
    "isStarted": true
}
```

##### `handleEndQuiz`

- This method is used to handle the `END_QUIZ` event. When the host sends a `END_QUIZ` event to the server, the server will handle the event and send a `ENDED` event to all the clients in room. 
- This method is used to display the game results.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    participants: {
        id: string;
        displayName: string;
        isHost: boolean;
        avatar: string;
        point: number;
        correct: number;
        isAnswered: boolean;
    }[];
}
```
Example : 
```typescript
{
    "roomPIN": "220316",
    "participants": [
        {
            "id": "cll0hnqo40001j9ookzivmcjb",
            "displayName": "Super Shy",
            "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s",
            "isHost": true,
            "point": 0,
            "correct": 0,
            "isAnswered": false
        },
        {
            "id": "cll0hp51e0005j9ooakpogejk",
            "displayName": "Cùi",
            "avatar": "https://media4.giphy.com/media/RaxcELylDIaDnbWWtl/giphy.gif?cid=ecf05e47qpagl2cg9lueva249mxoedai6tq0ov4dal00urg4&ep=v1_gifs_related&rid=giphy.gif&ct=s",
            "isHost": false,
            "point": 0,
            "correct": 0,
            "isAnswered": false
        }
    ]
}
```

- After the server receives the `END_QUIZ` event, the server will send a `ENDED` event to all clients in the room:
```typescript
{
    isEnded: boolean;
    participants: {
        id: string;
        displayName: string;
        isHost: boolean;
        avatar: string;
        point: number;
        correct: number;
        isAnswered: boolean;
    }[];
}
```
Example:
```typescript
{
    "isEnded": true,
    "participants": [
        {
            "id": "cll0hnqo40001j9ookzivmcjb",
            "displayName": "Super Shy",
            "avatar": "https://media1.giphy.com/media/hwrvOUAwdcgwltXhiB/giphy.gif?cid=ecf05e471vq98sjw5lexjt8kct8rhch7hktggsrrmquhzwgx&ep=v1_gifs_related&rid=giphy.gif&ct=s",
            "isHost": true,
            "point": 0,
            "correct": 0,
            "isAnswered": false
        },
        {
            "id": "cll0hp51e0005j9ooakpogejk",
            "displayName": "Cùi",
            "avatar": "https://media4.giphy.com/media/RaxcELylDIaDnbWWtl/giphy.gif?cid=ecf05e47qpagl2cg9lueva249mxoedai6tq0ov4dal00urg4&ep=v1_gifs_related&rid=giphy.gif&ct=s",
            "isHost": false,
            "point": 0,
            "correct": 0,
            "isAnswered": false
        }
    ]
}
```

##### `handleGetQuestions`

- This method is used to handle the `GET_QUESTIONS_BY_QUIZ` event. When the client sends a `GET_QUESTIONS_BY_QUIZ` event to the server, the server will handle the event and send a `QUESTIONS` event to all the clients in room. 
- This method is used to display all questions in the quiz which is used for the room.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316"
}
```

- After the server receives the `GET_QUESTIONS_BY_QUIZ` event, the server will send a `QUESTIONS` event to all clients in the room:
```typescript
{
    id: string;
    categoryId: string;
    title: string;
    options: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
    };
    image: string;
    type: number;
    time: number;
    createdAt: string;
    updatedAt: string;
}[]
```
Example:
```typescript
[
    {
        "id": "clklx5eyk000ubi014mxhiwq3",
        "categoryId": "clk6mopdw0005j3ngsixir2g2",
        "title": "day la cross",
        "options": {
            "optionA": "",
            "optionB": "",
            "optionC": "",
            "optionD": ""
        },
        "image": "",
        "type": 2,
        "time": 20,
        "createdAt": "2023-07-28T01:42:42.429Z",
        "updatedAt": "2023-07-28T01:42:42.429Z"
    },
    {
        "id": "clklx9niv000ybi01ff6qbkv4",
        "categoryId": "clk6mopdw0005j3ngsixir2g2",
        "title": "hec",
        "options": {
            "optionA": "ád",
            "optionB": "ád",
            "optionC": "ád",
            "optionD": "ád"
        },
        "image": "",
        "type": 1,
        "time": 20,
        "createdAt": "2023-07-28T01:46:00.151Z",
        "updatedAt": "2023-07-28T01:46:00.151Z"
    }
]
```
##### `handleGetNextQuestion`

- This method is used to handle the `GET_NEXT_QUESTION` event. When the client sends a `GET_NEXT_QUESTION` event to the server, the server will handle the event and send a `NEXT_QUESTION` event to all the clients in room. 
- This method is used to display the next question.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    questionPointer: number;
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "questionPointer": 1
}
```

- After the server receives the `GET_NEXT_QUESTION` event, the server will send a `NEXT_QUESTION` event to all clients in the room:
```typescript
{
    questionPointer: number;
}
```
Example:
```typescript
{
    "questionPointer": 1
}
```

##### `handlePickAnswer`

- This method is used to handle the `PICK_ANSWER` event. When the client sends a `PICK_ANSWER` event to the server, the server will handle the event and send a `ANSWER_RESULT` event to the client. 
- This method is used to choose the answer for question displayed.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    answer: {
        questionId: string;
        writtenAnswer: string;
        givenAnswers: {
            answerA: boolean;
            answerB: boolean;
            answerC: boolean;
            answerD: boolean;
        };
        isBattle: boolean;
    };
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "answer": {
        "questionId": "clklx5eyk000ubi014mxhiwq3",
        "writtenAnswer": "",
        "givenAnswers": {
            "answerA": false,
            "answerB": false,
            "answerC": false,
            "answerD": false
        }
    },
    "isBattle": true
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "answer": {
        "questionId": "clklx5eyk000ubi014mxhiwq3",
        "writtenAnswer": "",
        "givenAnswers": {
            "answerA": false,
            "answerB": false,
            "answerC": false,
            "answerD": false
        }
    },
    "isBattle": true
}
```

- After the server receives the `PICK_ANSWER` event, the server will send a `ANSWER_RESULT` event to the client:
```typescript
{
    isCorrect: boolean;
    score: number;
    answer: boolean[];
}
```
Example:
```typescript
{
    "isCorrect": false,
    "score": 0,
    "answer": [
        false,
        false,
        false,
        false
    ]
}
```

##### `handleGetAnswerQuestion`

- This method is used to handle the `GET_ANSWER_QUESTION` event. When the client sends a `GET_ANSWER_QUESTION` event to the server, the server will handle the event and send a `ANSWER_QUESTION` event to the client. 
- This method is used to display the correct answer for question which have type is guess word, arrange text or input text.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```
Example:
```typescript
{
    "questionId": "clklx5eyk000ubi014mxhiwq3"
}
```

- After the server receives the `GET_ANSWER_QUESTION` event, the server will send a `ANSWER_QUESTION` event to the client:
```typescript
{
    token: string;
}
```
Example: 
```typescript
{
    "token": "U2FsdGVkX1/lolit204QZEDQAbFFODsGjQ4tz8uoyPnRIEkl8Fk6WHb4YUkbKqR78Qo38BptlGc6+mXa5OcP4umlyROwDf0iNpr1E404Fxgcg9eZWvInBfZWZqDKPZ9/+37UZCBr/Wsyd0EpWL2RGQ=="
}
```
##### `handleGifQuestion`

- This method is used to handle the `GET_GIF_QUESTION` event. When the client sends a `GET_GIF_QUESTION` event to the server, the server will handle the event and send a `GIF_QUESTION` event to all the clients in room. 
- This method is used to display gif question.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    isShowGif: boolean;
    isShowOption: boolean;
    duration: number;
}
```
Example:
```typescript
{
    "roomPIN": "680232",
    "isShowGif": true,
    "isShowOption": false,
    "duration": 1650
}
```

- After the server receives the `GET_GIF_QUESTION` event, the server will send a `GIF_QUESTION` event to all clients in the room:
```typescript
{
    isShowGif: boolean;
    isShowOption: boolean;
    duration: number;
}
```
Example:
```typescript
{
    "isShowGif": true,
    "isShowOption": false,
    "duration": 1650
}
```

##### `handleRoomInfo`

- This method is used to handle the `GET_ROOM_INFO` event. When the client sends a `GET_ROOM_INFO` event to the server, the server will handle the event and send a `ROOM_INFO` event to the client. 
- This method is used to get the room information.

- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
}
```
Example:
```typescript
{
    "roomPIN": "220316"
}
```
- After the server receives the `GET_ROOM_INFO` event, the server will send a `ROOM_INFO` event to the client:
```typescript
{
    isHost: boolean;
    room: {
        id: string;
        PIN: string;
        userId: string;
        isPublic: boolean;
        isClosed: boolean;
        isStarted: boolean;
        count: number;
        type: number;
    };
    user: {
        aliasName: string;
        displayName: string;
    };
    roomPassword: string;
}
```
Example:
```typescript
{
    "isHost": true,
    "room": {
        "id": "cll0aqram0009j9s84egk12vt",
        "PIN": "220316",
        "userId": "clkl8ou1p0000q1qm2j3mdl34",
        "isPublic": false,
        "isClosed": false,
        "isStarted": false,
        "count": 2,
        "type": 2
    },
    "user": {
        "aliasName": "Super Shy",
        "displayName": "Gia Phong Ngo"
    },
    "roomPassword": "86947"
}
```

##### `handleSetPrivateRoom`

- This method is used to handle the `SET_PRIVATE_ROOM` event. When the client sends a `SET_PRIVATE_ROOM` event to the server, the server will handle the event and send a `IS_PRIVATE_ROOM` event to all the clients in room. This method is used to set the room to private or public.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    isPublic: boolean;
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "isPublic": false
}
```

- After the server receives the `SET_PRIVATE_ROOM` event, the server will send a `IS_PRIVATE_ROOM` event to all clients in the room:
```typescript
{
    isPublic: boolean;
}
```
Example:
```typescript
{
    "isPublic": false
}
```

##### `handleSetRoomCapacity`

- This method is used to handle the `SET_ROOM_CAPACITY` event. When the client sends a `SET_ROOM_CAPACITY` event to the server, the server will handle the event and send a `ROOM_CAPACITY` event to all the clients in room. This method is used to set the room capacity.
- The client will send the following data to the server:
```typescript
{
    roomPIN: string;
    count: number;
}
```
Example:
```typescript
{
    "roomPIN": "220316",
    "count": 2
}
```

- After the server receives the `SET_ROOM_CAPACITY` event, the server will send a `ROOM_CAPACITY` event to all clients in the room:
```typescript
{
    count: number;
}
```
Example:
```typescript
{
    "count": 2
}
```

##### `handleKickUser`

- This method is used to handle the `KICK_USER` event. When the client sends a `KICK_USER` event to the server, the server will handle the event and send a `BE_KICKED` event to the client. This method is used to kick a user from the room.
- The client will send the following data to the server:
```typescript
{
    roomId: string;
    participantId: string;
}
```
Example:
```typescript
{
    "roomId": "cll0aqram0009j9s84egk12vt",
    "participantId": "cll0hp51e0005j9ooakpogejk"
}
```

- After the server receives the `KICK_USER` event, the server will send a `BE_KICKED` event to the client:
```typescript
{
    beKicked: boolean;
}
```
Example:
```typescript
{
    "beKicked": true
}
```

##### `handleGetMe`

- This method is used to handle the `GET_ME` event. When the client sends a `GET_ME` event to the server, the server will handle the event and send a `ME` event to the client. This method is used to get the client correct index in participants array.
- The client will send the following data to the server:
```typescript
{
    participantId: string;
    index: number;
}
```
Example:
```typescript
{
    "participantId": "cll0hp51e0005j9ooakpogejk",
    "index": 1
}
```

- After the server receives the `GET_ME` event, the server will send a `ME` event to the client:
```typescript
{
    me: boolean;
    index: number;
}
```
Example:
```typescript
{
    "me": true,
    "index": 1
}
```
