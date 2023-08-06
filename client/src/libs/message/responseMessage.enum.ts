export enum ResponseMessage {
	MISSING_DISPLAY_NAME = "Display name can't be empty",
	MISSING_EMAIL = "Email can't be empty",
	MISSING_PASSWORD = "Password can't be empty",
	MISSING_CONFIRM_PASSWORD = "Confirm password can't be empty",
	INVALID_EMAIL = 'Invalid email.',
	PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS = 'Password must be at least 8 characters',
	DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS = 'Display name must be at least 3 characters',
	CONFIRM_PASSWORD_MUST_MATCH_PASSWORD = 'Confirm password must match password',
	EMAIL_ALREADY_EXISTS = 'Email already exists',
	PASSWORD_TOO_LONG = 'Password too long',
	CONFIRM_PASSWORD_TOO_LONG = 'Confirm password too long',
	DISPLAY_NAME_TOO_LONG = 'Display name too long',
	EMAIL_TOO_LONG = 'Email too long',
	EMAIL_NOT_CONFIRMED = 'Your account is not active, please confirm your email',
	AVATAR_MUST_BE_LESS_THAN_5MB = 'Avatar must be less than 4MB',
	OLD_PASSWORD_IS_REQUIRED = 'Old password is required',
	NEW_PASSWORD_IS_REQUIRED = 'New password is required',
	NEW_PASSWORD_TOO_LONG = 'New password is too long',
	OLD_PASSWORD_TOO_LONG = 'Old password is too long'
}

export enum AuthError {
	USER_NOT_ACTIVATED = 'Your account is not active, please confirm your email',
	USER_INVALID_CREDENTIALS = 'Invalid credentials',
	USER_ALREADY_ACTIVATED = 'Email already confirmed',
	USER_EMAIL_NOT_FOUND = 'User with this email does not exist',
	USER_PASSWORDS_NOT_MATCH = 'Password do not match confirm password',
	USER_NOT_FOUND = 'User not found',
	USER_OAUTH_CHANGE_PASSWORD = 'You are using OAuth, please change password in your OAuth account',
	USER_OAUTH_LOGIN = 'You are using OAuth, please login with your OAuth account',
	USER_OLD_PASSWORD_INVALID = 'Old password is not valid',
	USER_BLOCKED = 'Your account is blocked, please reset your password or contact for support',
	USER_ALREADY_ACTIVATED_LOGIN = 'User with this email already exists, please login',
	USER_LOGIN_INACTIVE_ACCOUNT = 'Your account is not active, please confirm your email'
}

export enum JwtError {
	INVALID_TOKEN = 'Invalid token',
	EXPIRED_TOKEN = 'Token expired',
	ACCESS_TOKEN_EXPIRED = 'Access token expired',
	TOKEN_EXPIRED_ERROR = 'TokenExpiredError'
}

export enum UserError {
	FILE_TOO_LARGE = 'File size too large, max file size is 5MB',
	DISPLAY_NAME_CANNOT_BE_EMPTY = "Display name can't be empty",
	UNKNOWN_FILE_FORMAT = 'An unknown file format not allowed'
}

export enum QuizError {
	QUIZ_NOT_FOUND = 'Quiz not found',
	QUIZ_NOT_OWNED = 'You are not the owner of this quiz',
	QUIZ_SUCCESSFULLY_CREATED = 'Quiz successfully created',
	QUIZ_SUCCESSFULLY_UPDATED = 'Quiz successfully updated',
	QUIZ_SUCCESSFULLY_DELETED = 'Quiz successfully deleted'
}

export enum QuestionError {
	QUESTION_NOT_FOUND = 'Question not found',
	QUESTION_NOT_OWNED = 'You are not the owner of this question',
	QUESTION_SUCCESSFULLY_CREATED = 'Question successfully created',
	QUESTION_SUCCESSFULLY_UPDATED = 'Question successfully updated',
	QUESTION_SUCCESSFULLY_DELETED = 'Question successfully deleted',
	QUESTION_MISSING_ANSWER = 'Question must have at least one answer',
	QUESTION_MISSING_CORRECT_ANSWER = 'Question must have at least one correct answer'
}

export enum SocketError {
	SOCKET_USER_ALREADY_CONNECTED = "You've already joined this room, please go to the right tab",
	SOCKET_ROOM_CLOSED = 'Room is closed',
	SOCKET_ROOM_NOT_FOUND = 'Room does not exist',
	SOCKET_USER_NOT_FOUND = 'User does not exist',
	SOCKET_USER_NOT_JOINED = 'User has not joined this room',
	SOCKET_QUIZ_NOT_FOUND = 'Quiz does not exist',
	SOCKET_QUESTION_NOT_FOUND = 'Question does not exist',
	SOCKET_HOST_NOT_FOUND = 'Host does not exist',
	SOCKET_ROOM_STARTED = 'Room has already started',
	SOCKET_ROOM_PERMISSION_DENIED = 'You do not have permission to do this',
	SOCKET_ROOM_WRONG_PASSWORD = 'Enter wrong password',
	SOCKET_ALIAS_NAME_VALID = 'Alias name is not valid',
	SOCKET_ROOM_COUNT_MAX = 'Capacity of room is max (15)',
	SOCKET_HOST_NOT_JOINED_YET = 'Host has not joined this room',
	SOCKET_ROOM_FULL = 'Room is full',
	SOCKET_INVALID_FORMAT = 'Invalid format'
}
