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

export default Message;
export { createDefaultMessage };
