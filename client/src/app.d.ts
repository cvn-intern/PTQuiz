declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		interface Locals {
			user: UserDto;
			accessToken: string | undefined;
			lastPage: string;
		}
		// interface PageData {
		// 	user: {
		// 		email: string;
		// 		displayName: string;
		// 		accessToken: string;
		// 		refreshToken: string;
		// 	};
		// 	title: string;
		// }
	}
}

export type KeyValueObject = {
	[key: string]: string;
};
export type UserDto = {
	id: string;
	email: string;
	displayName: string;
	avatar: string;
	role: string;
	status: number;
	loginFrom: string;
} | undefined;
export {};
