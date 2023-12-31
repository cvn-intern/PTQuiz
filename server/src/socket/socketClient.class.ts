import { Socket } from 'socket.io';
import { Payload } from '../auth/types';

export class SocketClient extends Socket {
    public user: Payload;
    public aliasAvatar: string;
    public aliasName: string;
}
