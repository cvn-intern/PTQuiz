import { io } from 'socket.io-client';

export const createSocket = (url: string, token: string) => {
	const socket = io(url, {
		path: '/socket.io',
		transports: ['websocket'],
		extraHeaders: {
			authorization: `Bearer ${token}`,
		},
        auth: {
            token: token
        },
		secure: true,
		withCredentials: true
	});
	return socket;
};
