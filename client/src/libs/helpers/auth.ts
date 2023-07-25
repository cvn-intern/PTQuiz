import * as jwt from 'jsonwebtoken';
export const checkValidToken = async (token: string | undefined) => {
	if (!token) {
		return {
			status: false,
			message: 'Token is invalid'
		};
	}
	try {
		const decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET as string);
		if (!decoded) {
			return {
				status: false,
				message: 'Token is invalid'
			};
		}
		return {
			status: true,
			message: 'Token is valid'
		};
	} catch (err: any) {
		if (err.name === 'TokenExpiredError') {
			return {
				status: false,
				message: 'Token is expired'
			};
		}
		return {
			status: false,
			message: 'Token is invalid'
		};
	}
};

export const getProfile = async (token: string | undefined) => {
	if (!token) {
		return undefined;
	}
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const result = await response.json();
	if (response.status === 200) {
		return result.data;
	}
	return undefined;
};

export const refreshToken = async (refreshToken: string | undefined) => {
	if (!refreshToken) {
		return undefined;
	}
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken: refreshToken
		})
	});
	const result = await response.json();
	if (response.status === 201) {
		return result;
	}
	return undefined;
};
