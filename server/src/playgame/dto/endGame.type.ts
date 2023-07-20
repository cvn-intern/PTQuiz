export interface EndGameType {
    id: string;
    userId: string;
    quizId: string;
    questions: number;
    correct: number;
    totalAttempt: number;
    point: number;
    startedAt: string;
    completedAt: string;
    isSingleMode: boolean;
    createdAt: string;
    updatedAt: string;
    passed: boolean;
}
