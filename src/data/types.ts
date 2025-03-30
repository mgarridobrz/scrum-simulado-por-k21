
import { QuestionType } from "@/components/QuizQuestion";

export type QuizCategory = 'fundamentals' | 'roles' | 'events' | 'artifacts';

export interface QuestionWithCategory extends QuestionType {
  category: QuizCategory;
  explanation?: string;
}
