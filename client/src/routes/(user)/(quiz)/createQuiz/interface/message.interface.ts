interface Message {
	isSuccess: boolean;
	isDone: boolean;
	error: {
		missing: {
			title: boolean;
			description: boolean;
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
				title: false,
				description: false
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
