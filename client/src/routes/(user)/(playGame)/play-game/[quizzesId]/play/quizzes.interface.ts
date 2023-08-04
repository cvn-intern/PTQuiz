export interface Quiz {
	id: string;
	categoryId: string;
	userId: string;
	title: string;
	type: number;
	image: string | null;
	hint: string | null;
	options: {
		[key: string]: string;
	};
	answers: {
		[key: string]: boolean;
	};
	createdAt: string;
	updatedAt: string;
	written: string | null;
	time: number;
}
export interface SocketQuiz {
	id: string;
	categoryId: string;
	userId: string;
	title: string;
	type: number;
	image: string | null;
	hint: string | null;
	options: {
		[key: string]: string;
	};
	createdAt: string;
	updatedAt: string;
	time: number;
}
export interface QuizzesType {
	quizzes: Quiz[];
	[key: number]: Quiz;
	length: number;
}

export interface UserAnswer {
	participantId: string;
	answerOfUser: { [key: string]: answerOfUser };
}

export interface answerOfUser {
	questionId: string;
	givenAnswers: string;
	writtenAnswer: string;
}
