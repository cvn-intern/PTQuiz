import { tokens } from '../stores/token';
import { apiNoAuth, apiWithAuth, handleAxiosError } from './api';

export const login = async (email: any, password: any) => {
	try {
		const { data } = await apiNoAuth.post('/auth/login', {
			email,
			password
		});
		if (data.statusCode === 200) {
			tokens.update((tokens) => {
				return {
					...tokens,
					accessToken: data.data.accessToken,
					refreshToken: data.data.refreshToken
				};
			});
			return {
				status: 'Success',
				message: data.message
			};
		}
	} catch (error) {
		return handleAxiosError(error);
	}
};

export const getMe = async () => {
	try {
		const { data } = await apiWithAuth.get('/auth/me');
		if (data.statusCode === 200) {
			return {
				status: 'Success',
				message: data.message,
				data: data.data
			};
		}
	} catch (error) {
		return handleAxiosError(error);
	}
};
