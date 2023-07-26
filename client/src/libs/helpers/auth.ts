import { VITE_API_URL, VITE_JWT_SECRET } from '$env/static/private';
import * as jwt from 'jsonwebtoken';
import { JwtError } from '../message/responseMessage.enum';
export const checkValidToken = async (token: string | undefined) => {
	if (!token) {
		return {
			status: false,
			message: JwtError.INVALID_TOKEN
		};
	}

	try {
		const decoded = jwt.verify(token, VITE_JWT_SECRET as string);
		if (!decoded) {
			return {
				status: false,
				message: JwtError.INVALID_TOKEN
			};
		}

		return {
			status: true,
			message: 'Token is valid'
		};
	} catch (err: any) {
		if (err.name === JwtError.TOKEN_EXPIRED_ERROR) {
			return {
				status: false,
				message: JwtError.ACCESS_TOKEN_EXPIRED
			};
		}

		return {
			status: false,
			message: JwtError.INVALID_TOKEN
		};
	}
};

export const getProfile = async (token: string | undefined) => {
	if (!token) {
		return undefined;
	}

	const response = await fetch(`${VITE_API_URL}/auth/profile`, {
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

export const refreshTokens = async (refreshToken: string | undefined) => {
	if (!refreshToken) {
		return undefined;
	}

	const response = await fetch(`${VITE_API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken
		})
	});
	const result = await response.json();
	if (response.status === 201) {
		return result;
	}

	return undefined;
};
