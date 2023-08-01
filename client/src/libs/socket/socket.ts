import { io } from 'socket.io-client';
import * as cookie from 'cookie';

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
	transports: ['websocket'],
	path: '/socket.io',
    auth: {
        token : cookie.serialize('accessToken', 'test')
    }
});

export default socket;
