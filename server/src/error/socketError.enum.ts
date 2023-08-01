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
}
