export enum ResponseError {
    USER_NOT_ACTIVATED = 'Your account is not active, please confirm your email',
    USER_INVALID_CREDENTIALS = 'Invalid credentials',
    USER_ALREADY_ACTIVATED = 'Email already confirmed',
    USER_EMAIL_NOT_FOUND = 'User with this email does not exist',
    USER_PASSWORDS_NOT_MATCH = 'Password do not match confirm password',
    USER_NOT_FOUND = 'User not found',
    USER_OAUTH_CHANGE_PASSWORD = 'You are using OAuth, please change password in your OAuth account',
}
