interface Message {
	isSuccess: boolean;
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

export default Message;
export { createDefaultMessage };
