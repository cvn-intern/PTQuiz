import { io } from 'socket.io-client';

const VITE_SOCKET_URL = 'http://localhost:8080';
const socket = io(`${VITE_SOCKET_URL}`, {
	transports: ['websocket']
});

export default socket;
