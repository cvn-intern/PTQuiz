import { ResponseMessage as MESSAGE } from '../../../libs/message/responseMessage.enum';

interface Message {
	isSuccess: boolean;
	isDone: boolean;
	error: {
		missing: {
			email: boolean;
			password: boolean;
			confirmPassword: boolean;
			displayName: boolean;
			default: boolean;
			confirmEmail: boolean;
		};
		fill: {
			email: string;
		};
		message: string;
	};
	success: {
		message: string;
	};
}

function createDefaultMessage(): Message {
	return {
		isSuccess: false,
		isDone: false,
		error: {
			missing: {
				email: false,
				displayName: false,
				password: false,
				confirmPassword: false,
				default: false,
				confirmEmail: false
			},
			fill: {
				email: ''
			},
			message: ''
		},
		success: {
			message: ''
		}
	};
}

function validationLogin(values: string, field: string) {
	let form: Message;
	form = createDefaultMessage();

	if (field === 'email') {
		if (!values || values.trim().length === 0) {
			form.error.missing.email = true;
			form.isDone = true;
			form.error.message = MESSAGE.MISSING_EMAIL;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.email = true;
			form.isDone = true;
			form.error.message = MESSAGE.EMAIL_TOO_LONG;
		}
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (!emailRegex.test(values)) {
			form.error.missing.email = true;
			form.isDone = true;
			form.error.message = MESSAGE.INVALID_EMAIL;
		}
	} else if (field === 'password') {
		if (!values || values.trim().length === 0) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = MESSAGE.MISSING_PASSWORD;
		}
		if (values.length < 8) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = MESSAGE.PASSWORD_TOO_LONG;
		}
	} else form.isSuccess = true;
	return form;
}

function validationRegister(values: string, field: string) {
	let form: Message;
	form = createDefaultMessage();
	if (field === 'displayName') {
		if (!values || values.trim().length === 0) {
			form.error.missing.displayName = true;
			form.error.message = MESSAGE.MISSING_DISPLAY_NAME;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.displayName = true;
			form.error.message = MESSAGE.DISPLAY_NAME_TOO_LONG;
		}
	} else if (field === 'email') {
		if (!values || values.trim().length === 0) {
			form.error.missing.email = true;
			form.error.message = MESSAGE.MISSING_EMAIL;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.email = true;
			form.error.message = MESSAGE.EMAIL_TOO_LONG;
		}
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (!emailRegex.test(values)) {
			form.error.missing.email = true;
			form.error.message = MESSAGE.INVALID_EMAIL;
		}
	} else if (field === 'password') {
		if (!values || values.trim().length === 0) {
			form.error.missing.password = true;
			form.error.message = MESSAGE.MISSING_PASSWORD;
		} else if (values.length < 8) {
			form.error.missing.password = true;
			form.error.message = MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS;
		} else if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.password = true;
			form.error.message = MESSAGE.PASSWORD_TOO_LONG;
		}
	} else if (field === 'confirmPassword') {
		if (!values || values.trim().length === 0) {
			form.error.missing.confirmPassword = true;
			form.error.message = MESSAGE.MISSING_CONFIRM_PASSWORD;
		}
		if (values !== (document.getElementById('password') as HTMLInputElement).value) {
			form.error.missing.confirmPassword = true;
			form.error.message = MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.confirmPassword = true;
			form.error.message = MESSAGE.CONFIRM_PASSWORD_TOO_LONG;
		}
	} else form.isSuccess = true;
	return form;
}

export default Message;
export { createDefaultMessage, validationLogin, validationRegister };
