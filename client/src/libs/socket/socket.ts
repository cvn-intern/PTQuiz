import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
    transports: ['websocket'],
    auth: {
        token: Cookies.get('accessToken'),
    }
});

export default socket;
