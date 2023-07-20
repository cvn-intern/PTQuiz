import { io } from 'socket.io-client';

const VITE_SOCKET_URL = 'https://pt-quiz-server-ngogiaphong123.vercel.app';
const socket = io(`${VITE_SOCKET_URL}`, {
	transports: ['websocket']
});

export default socket;
