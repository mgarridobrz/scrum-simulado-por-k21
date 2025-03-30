
import { QuestionWithCategory } from "./types";
import { fundamentalsQuestions } from "./fundamentalsQuestions";
import { rolesQuestions } from "./rolesQuestions";
import { eventsQuestions } from "./eventsQuestions";
import { artifactsQuestions } from "./artifactsQuestions";

// Combine all questions into a single array
export const quizQuestions: QuestionWithCategory[] = [
  ...fundamentalsQuestions,
  ...rolesQuestions,
  ...eventsQuestions,
  ...artifactsQuestions,
];

// Function to get a specified number of random questions from the question pool
export function getRandomQuestions(count: number): QuestionWithCategory[] {
  if (count >= quizQuestions.length) {
    return [...quizQuestions]; // Return all questions if count is greater than available questions
  }
  
  // Create a copy of the original array to avoid modifying it
  const questionsCopy = [...quizQuestions];
  
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = questionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
  }
  
  // Return the first 'count' questions
  return questionsCopy.slice(0, count);
}

// Function to calculate category-based statistics
export function getCategoryStats(
  userAnswers: Record<number, string>,
  questions: QuestionWithCategory[]
): Record<string, { correct: number; total: number }> {
  const stats: Record<string, { correct: number; total: number }> = {};
  
  // Initialize stats for each category
  questions.forEach(question => {
    if (!stats[question.category]) {
      stats[question.category] = { correct: 0, total: 0 };
    }
    
    stats[question.category].total += 1;
    
    // Check if the answer is correct
    if (userAnswers[question.id] === question.correctAnswer) {
      stats[question.category].correct += 1;
    }
  });
  
  return stats;
}

// Export specific category questions for direct access if needed
export { fundamentalsQuestions, rolesQuestions, eventsQuestions, artifactsQuestions };
