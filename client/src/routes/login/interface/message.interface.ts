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

export default Message;
export { createDefaultMessage };
