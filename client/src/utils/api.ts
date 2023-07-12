import axios from 'axios';
import { tokens } from '../stores/token';
import { get } from 'svelte/store';

export interface Response {
	status: string;
	message: string;
	data?: any;
}

const apiNoAuth = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

const apiWithAuth = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

apiWithAuth.interceptors.request.use(
	(config) => {
		const accessToken = get(tokens).accessToken;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiWithAuth.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		// check 401, message is 'Access token expired'
		if (
			error.response.status === 401 &&
			error.response.data.message === 'Access token expired' &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			const refreshToken = get(tokens).refreshToken;
			const { data } = await apiNoAuth.post('/auth/refresh', {
				refreshToken: refreshToken
			});
			if (data.statusCode === 201) {
				tokens.update((tokens) => {
					return {
						...tokens,
						accessToken: data.data.accessToken,
						refreshToken: data.data.refreshToken
					};
				});
				return apiWithAuth(originalRequest);
			}
		}
		return Promise.reject(error);
	}
);
export function handleAxiosError(error: any): Response {
	if (error.response) {
		return {
			status: 'Error',
			message: error.response.data.message
		};
	} else if (error.request) {
		return {
			status: 'Error',
			message: 'No response was received'
		};
	} else {
		return {
			status: 'Error',
			message: 'Internal server error'
		};
	}
}

export { apiNoAuth, apiWithAuth };
