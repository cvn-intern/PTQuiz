import { io } from 'socket.io-client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		url: import.meta.env.VITE_SOCKET_URL as string,
		token: locals.accessToken
	};
};
