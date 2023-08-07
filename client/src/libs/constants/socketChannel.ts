export enum EmitChannel {
	ROOM_USERS = 'room-users',
	ROOM_MESSAGES = 'room-messages',
	IS_HOST = 'is-host',
	STARTED = 'started',
	ENDED = 'ended',
	QUESTIONS = 'questions',
	NEXT_QUESTION = 'next-question',
	ANSWER_RESULT = 'answer-result',
	SCORE_BOARD = 'score-board',
	ANSWER_QUESTION = 'answer-question',
	GIF_QUESTION = 'gif-question',
	HOST_LEFT = 'host-left',
	ROOM_INFO = 'room-info',
	EXCEPTION = 'exception',
	JOINED = 'joined',
	BE_KICKED = 'be-kicked',
	IS_PRIVATE_ROOM = 'is-private-room',
	ROOM_CAPACITY = 'room-capacity',
	ROOM_REACTIONS = 'room-reactions',
	HOST_MESSAGE = 'host-message',
	ME = 'me'
}

export enum ListenChannel {
	JOIN_ROOM = 'join-room',
	LEAVE_ROOM = 'leave-room',
	SEND_MESSAGE = 'send-message',
	CHECK_IS_HOST = 'check-is-host',
	START_QUIZ = 'start-quiz',
	END_QUIZ = 'end-quiz',
	GET_QUESTIONS_BY_QUIZ = 'get-questions-by-quiz',
	GET_NEXT_QUESTION = 'get-next-question',
	PICK_ANSWER = 'pick-answer',
	GET_ANSWER_QUESTION = 'get-answer-question',
	GET_GIF_QUESTION = 'gif-question',
	GET_ROOM_INFO = 'get-room-info',
	SET_PRIVATE_ROOM = 'set-private-room',
	SET_ROOM_CAPACITY = 'set-room-capacity',
	KICK_USER = 'kick-user',
	BE_KICKED = 'be-kicked',
	SEND_REACTION = 'send-reaction',
	SEND_HOST_MESSAGE = 'send-host-message',
	GET_ME = 'get-me'
}
