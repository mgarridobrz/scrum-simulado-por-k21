export type QuizCategory = 'fundamentals' | 'roles' | 'events' | 'artifacts' | 'dysfunctions';

export interface QuestionWithCategory {
  id: number;
  question: string;
  category: QuizCategory;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  name: string;
  email: string | null;
  score: number;
  quizSize: number;
  questionsData: Array<{
    id: number;
    question: string;
    category: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
    userAnswer: string | null;
    isCorrect: boolean;
  }>;
  createdAt: string;
  completionTimeSeconds: number;
  language?: string; // Add language field to track which language was used
}

export interface QuizStats {
  totalAttempts: number;
  size10Count: number;
  size25Count: number;
  size50Count: number;
  averageLastFifty: number;
  averageTime10: number | null;
  averageTime25: number | null;
  averageTime50: number | null;
  averageScore10: number | null;
  averageScore25: number | null;
  averageScore50: number | null;
}
