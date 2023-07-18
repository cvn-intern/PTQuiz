import { ResponseMessage as MESSAGE } from '../../../../libs/message/responseMessage.enum';

interface Message {
	isSuccess: boolean;
	isDone: boolean;
	error: {
		missing: {
			displayName: boolean;
			oldPassword: boolean;
			newPassword: boolean;
			confirmPassword: boolean;
		};
		message: string;
	};
	success: {
		message: string;
	};
	tabs: {
		edit_profile: boolean;
		change_password: boolean;
	};
}

function createDefaultMessage(): Message {
	return {
		isSuccess: false,
		isDone: false,
		error: {
			missing: {
				displayName: false,
				oldPassword: false,
				newPassword: false,
				confirmPassword: false
			},
			message: ''
		},
		success: {
			message: ''
		},
		tabs: {
			edit_profile: false,
			change_password: false
		}
	};
}

function validationProfile(values: string, field: string) {
	let form: Message;
	form = createDefaultMessage();
	if (field === 'displayName') {
		form.tabs.edit_profile = true;
		if (!values || values.trim().length === 0) {
			form.error.missing.displayName = true;
			form.isDone = true;
			form.error.message = MESSAGE.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.displayName = true;
			form.isDone = true;
			form.error.message = MESSAGE.DISPLAY_NAME_TOO_LONG;
		}
	}
	if (field === 'oldPassword') {
		form.tabs.change_password = true;
		if (!values || values.trim().length === 0) {
			form.error.missing.oldPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.OLD_PASSWORD_IS_REQUIRED;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.oldPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.PASSWORD_TOO_LONG;
		}
	}
	if (field === 'newPassword') {
		form.tabs.change_password = true;
		if (!values || values.trim().length === 0) {
			form.error.missing.newPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.NEW_PASSWORD_IS_REQUIRED;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.newPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.NEW_PASSWORD_TOO_LONG;
		}
	}
	if (field === 'confirmPassword') {
		form.tabs.change_password = true;
		if (!values || values.trim().length === 0) {
			form.error.missing.confirmPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.MISSING_CONFIRM_PASSWORD;
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.confirmPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.CONFIRM_PASSWORD_TOO_LONG;
		}
		if (values != (document.getElementById('newPassword') as HTMLInputElement).value) {
			form.error.missing.confirmPassword = true;
			form.isDone = true;
			form.error.message = MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
		}
	}
	return form;
}

export default Message;
export { createDefaultMessage, validationProfile };
