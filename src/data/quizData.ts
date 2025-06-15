
import { QuestionWithCategory } from "./types";
import { fetchRandomQuestions } from "@/utils/quizTracking";

// Function to get quiz questions from database with language support
export async function getQuizQuestions(language: 'pt' | 'en' = 'pt'): Promise<QuestionWithCategory[]> {
  try {
    // Fetch all questions from the database with language support
    const dbQuestions = await fetchRandomQuestions(1000, language); // Fetch large number to get all
    
    if (dbQuestions && dbQuestions.length > 0) {
      console.log(`Fetched ${dbQuestions.length} questions from database for language: ${language}`);
      return dbQuestions;
    }
    
    console.warn("No questions found in database");
    return [];
  } catch (error) {
    console.error("Error fetching questions from database:", error);
    return [];
  }
}

// Function to get a specified number of random questions with language support
export async function getRandomQuestions(count: number, language: 'pt' | 'en' = 'pt'): Promise<QuestionWithCategory[]> {
  try {
    // Get questions from database
    const randomQuestions = await fetchRandomQuestions(count, language);
    
    if (randomQuestions && randomQuestions.length > 0) {
      console.log(`Fetched ${randomQuestions.length} random questions from database for language: ${language}`);
      return randomQuestions;
    }
    
    console.warn("No questions found in database");
    return [];
  } catch (error) {
    console.error("Error in getRandomQuestions:", error);
    return [];
  }
}

// Function to calculate category-based statistics
export function getCategoryStats(
  userAnswers: Record<number, string>,
  questions: QuestionWithCategory[]
): { category: string; correctCount: number; totalCount: number }[] {
  const statsObj: Record<string, { correct: number; total: number }> = {};
  
  // Initialize stats for each category
  questions.forEach(question => {
    if (!statsObj[question.category]) {
      statsObj[question.category] = { correct: 0, total: 0 };
    }
    
    statsObj[question.category].total += 1;
    
    // Check if the answer is correct
    if (userAnswers[question.id] === question.correctAnswer) {
      statsObj[question.category].correct += 1;
    }
  });
  
  // Convert the object to an array format that can be mapped over in the UI
  const statsArray = Object.entries(statsObj).map(([category, data]) => ({
    category,
    correctCount: data.correct,
    totalCount: data.total
  }));
  
  return statsArray;
}

// Export types
export type { QuestionWithCategory } from './types';
