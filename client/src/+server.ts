import axios from 'axios';
import cookie from 'cookie';

export function createAPI(request) {
	console.log('request', request);
	const accessToken = request.cookies.get('accessToken');
	const refreshToken = request.cookies.get('refreshToken');
	// const accessToken = cookies['accessToken'];
	console.log('accessToken', accessToken);
	console.log('refreshToken', refreshToken);

	const apiNoAuth = axios.create({
		baseURL: import.meta.env.VITE_API_URL
	});

	const apiWithAuth = axios.create({
		baseURL: import.meta.env.VITE_API_URL
	});

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
				// const refreshToken = request.cookies.get('refreshToken');
				const { data } = await apiNoAuth.post('/auth/refresh', {
					refreshToken: refreshToken
				});
				console.log('data', data);
				if (data.statusCode === 201) {
					request.cookies.set('accessToken', data.data.accessToken);
					request.cookies.set('refreshToken', data.data.refreshToken);
					return apiWithAuth(originalRequest);
				}
			}
			return Promise.reject(error);
		}
	);

	if (accessToken) {
		apiWithAuth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	}

	return { apiNoAuth, apiWithAuth };
}
