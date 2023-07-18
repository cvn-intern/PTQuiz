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
			form.error.message = 'Email is required';
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.email = true;
			form.isDone = true;
			form.error.message = 'Email is too long';
		}
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (!emailRegex.test(values)) {
			form.error.missing.email = true;
			form.isDone = true;
			form.error.message = 'Invalid email';
		}
	} else if (field === 'password') {
		if (!values || values.trim().length === 0) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = 'Password is required';
		}
		if (values.length < 8) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = 'Password must be at least 8 characters';
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.password = true;
			form.isDone = true;
			form.error.message = 'Password is too long';
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
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.displayName = true;
			form.error.message = 'Display name is too long';
		}
	} else if (field === 'email') {
		if (!values || values.trim().length === 0) {
			form.error.missing.email = true;
			form.error.message = 'Email is required';
		}
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.email = true;
			form.error.message = 'Email is too long';
		}
		// use regex to validate email
		const emailRegex = /^\S+@\S+\.\S+$/;
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
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.password = true;
			form.error.message = 'Password is too long';
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
		if (values.length > import.meta.env.VITE_MAX_INPUT_SIZE) {
			form.error.missing.confirmPassword = true;
			form.error.message = 'Confirm password is too long';
		}
	} else form.isSuccess = true;
	return form;
}

export default Message;
export { createDefaultMessage, validationLogin, validationRegister };
