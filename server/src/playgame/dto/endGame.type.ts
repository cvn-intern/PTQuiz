export interface EndGameType {
    id: string;
    userId: string;
    quizId: string;
    questions: number;
    correct: number;
    totalAttempt: number;
    point: number;
    startedAt: Date;
    completedAt: Date;
    isSingleMode: boolean;
    createdAt: Date;
    updatedAt: Date;
    passed: boolean;
}
