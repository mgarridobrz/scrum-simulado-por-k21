
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
  quiz_size: number;
  score: number | null;
  created_at: string;
  questions_data?: any;
}
