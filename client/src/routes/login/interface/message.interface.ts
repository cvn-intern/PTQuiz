interface Message {
	isSuccess: boolean;
	error: {
		missing: {
			email: boolean;
			password: boolean;
			confirmPassword: boolean;
			displayName: boolean;
			default: boolean;
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
		error: {
			missing: {
				email: false,
				displayName: false,
				password: false,
				confirmPassword: false,
				default: false
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
			form.error.message = 'Email is required';
		}
	} else if (field === 'password') {
		if (!values || values.trim().length === 0) {
			form.error.missing.password = true;
			form.error.message = 'Password is required';
		}
		if (values.length < 8) {
			form.error.missing.password = true;
			form.error.message = 'Password must be at least 8 characters';
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
			form.error.message = 'Display name is required';
		}
	} else if (field === 'email') {
		if (!values || values.trim().length === 0) {
			form.error.missing.email = true;
			form.error.message = 'Email is required';
		}
		// use regex to validate email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		if (!emailRegex.test(values)) {
			form.error.missing.email = true;
			form.error.message = 'Invalid email';
		}
	} else if (field === 'password') {
		if (!values || values.trim().length === 0) {
			form.error.missing.password = true;
			form.error.message = 'Password is required';
		}
		if (values.length < 8) {
			form.error.missing.password = true;
			form.error.message = 'Password must be at least 8 characters';
		}
	} else if (field === 'confirmPassword') {
		if (!values || values.trim().length === 0) {
			form.error.missing.confirmPassword = true;
			form.error.message = 'Confirm password is required';
		}
		if (values !== (document.getElementById('password') as HTMLInputElement).value) {
			form.error.missing.confirmPassword = true;
			form.error.message = 'Confirm password must match password';
		}
	} else form.isSuccess = true;
	return form;
}

export default Message;
export { createDefaultMessage, validationLogin, validationRegister };
