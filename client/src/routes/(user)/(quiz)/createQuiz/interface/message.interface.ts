interface Message {
	isSuccess: boolean;
	isDone: boolean;
	error: {
		missing: {
			title: boolean;
			description: boolean;
			passingPoint: boolean;
			point: boolean;
			image: boolean;
		};
		message: string;
	};
	success: {
		message: string;
		id: string;
	};
}

function createDefaultMessage(): Message {
	return {
		isSuccess: false,
		isDone: false,
		error: {
			missing: {
				title: false,
				description: false,
				passingPoint: false,
				point: false,
				image: false
			},
			message: ''
		},
		success: {
			message: '',
			id: ''
		}
	};
}

export default Message;
export { createDefaultMessage };
