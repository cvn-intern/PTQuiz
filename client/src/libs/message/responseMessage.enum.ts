export enum ResponseMessage {
	MISSING_DISPLAY_NAME = "Display name can't be empty",
	MISSING_EMAIL = "Email can't be empty",
	MISSING_PASSWORD = "Password can't be empty",
	MISSING_CONFIRM_PASSWORD = "Confirm password can't be empty",
	INVALID_EMAIL = 'Invalid email',
	PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS = 'Password must be at least 8 characters',
	DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS = 'Display name must be at least 3 characters',
	CONFIRM_PASSWORD_MUST_MATCH_PASSWORD = 'Confirm password must match password',
	EMAIL_ALREADY_EXISTS = 'Email already exists',
	PASSWORD_TOO_LONG = 'Password too long',
	CONFIRM_PASSWORD_TOO_LONG = 'Confirm password too long',
	DISPLAY_NAME_TOO_LONG = 'Display name too long',
	EMAIL_TOO_LONG = 'Email too long',
	EMAIL_NOT_CONFIRMED = 'Your account is not active, please confirm your email'
}
