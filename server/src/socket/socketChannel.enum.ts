export enum EmitChannel {
    ROOM_USERS = 'room-users',
    ROOM_MESSAGES = 'room-messages',
    IS_HOST = 'is-host',
    STARTED = 'started',
    ENDED = 'ended',
    QUIZ_QUESTIONS = 'quiz-questions',
    QUESTION_POINTER = 'question-pointer',
    ANSWER_RESULT = 'answer-result',
    SCORE_BOARD = 'score-board',
    ANSWER_QUESTION = 'answer-question',
    GIF_QUESTION = 'gif-question',
    HOST_LEFT = 'host-left',
}

export enum ListenChannel {
    JOIN_ROOM = 'join-room',
    LEAVE_ROOM = 'leave-room',
    SEND_MESSAGE = 'send-message',
    IS_HOST = 'is-host',
    START_GAME = 'start-game',
    END_GAME = 'end-game',
    GET_QUIZ_QUESTIONS = 'get-quiz-questions',
    CHANGE_QUESTION_POINTER = 'change-question-pointer',
    PICK_ANSWER = 'pick-answer',
    GET_ANSWER_QUESTION = 'get-answer-question',
    GIF_QUESTION = 'gif-question',
}
