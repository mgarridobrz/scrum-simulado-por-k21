export interface GameAttempt {
  id: string;
  name: string;
  email: string | null;
  category: string;
  question_count: number;
  correct_answers: number;
  total_time_ms: number;
  penalty_time_ms: number;
  final_score_ms: number;
  questions_data: Array<{
    id: number;
    question: string;
    category: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
    userAnswer: string | null;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  language: string;
  created_at: string;
}

export interface GameQuestion {
  id: number;
  question: string;
  category: string;
  options: Array<{ id: string; text: string }>;
  correctAnswer: string;
  explanation?: string;
}

export interface GameState {
  phase: 'setup' | 'countdown' | 'question' | 'waiting' | 'finished';
  currentQuestionIndex: number;
  questions: GameQuestion[];
  answers: Array<{
    questionId: number;
    answer: string | null;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  startTime: number;
  questionStartTime: number;
  totalTime: number;
  penaltyTime: number;
  correctAnswers: number;
}

export interface GameConfig {
  category: string;
  questionCount: 5 | 10;
  name: string;
  email?: string;
}

export interface GameRanking {
  name: string;
  final_score_ms: number;
  correct_answers: number;
  question_count: number;
  penalty_time_ms: number;
  total_time_ms: number;
  language: string;
  created_at: string;
}