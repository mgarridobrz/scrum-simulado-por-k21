
import { QuestionWithCategory } from "./types";
import { fetchRandomQuestions } from "@/utils/quizTracking";

// Legacy questions for fallback if needed
import { fundamentalsQuestions } from "./fundamentalsQuestions";
import { rolesQuestions } from "./rolesQuestions";
import { eventsQuestions } from "./eventsQuestions";
import { artifactsQuestions } from "./artifactsQuestions";

// Combine all legacy questions into a single array for fallback
const legacyQuestions: QuestionWithCategory[] = [
  ...fundamentalsQuestions,
  ...rolesQuestions,
  ...eventsQuestions,
  ...artifactsQuestions,
];

// Function to get approved questions from database or localStorage fallback
export async function getQuizQuestions(language: 'pt' | 'en' = 'pt'): Promise<QuestionWithCategory[]> {
  try {
    // Try to fetch all questions from the database with language support
    const dbQuestions = await fetchRandomQuestions(1000, language); // Fetch large number to get all
    
    if (dbQuestions && dbQuestions.length > 0) {
      console.log(`Fetched ${dbQuestions.length} questions from database for language: ${language}`);
      return dbQuestions;
    }
    
    // Fallback to legacy questions if database is empty
    console.warn("No questions found in database, falling back to legacy questions");
    return getApprovedQuestions();
  } catch (error) {
    console.error("Error fetching questions from database:", error);
    // Fallback to legacy questions on error
    return getApprovedQuestions();
  }
}

// Function to get approved question IDs from localStorage
export function getApprovedQuestionIds(): number[] {
  const savedApprovedQuestions = localStorage.getItem('approvedQuestions');
  if (savedApprovedQuestions) {
    try {
      return JSON.parse(savedApprovedQuestions);
    } catch (error) {
      console.error("Error parsing approved questions:", error);
      return [];
    }
  }
  return [];
}

// Function to save edited questions to localStorage (legacy support)
export function saveEditedQuestion(question: QuestionWithCategory): void {
  const editedQuestions = getEditedQuestions();
  editedQuestions[question.id] = question;
  try {
    localStorage.setItem('editedQuestions', JSON.stringify(editedQuestions));
    console.log(`Question ${question.id} saved successfully.`, question);
  } catch (error) {
    console.error("Error saving edited question:", error);
  }
}

// Function to get all edited questions from localStorage (legacy support)
export function getEditedQuestions(): Record<number, QuestionWithCategory> {
  const savedEditedQuestions = localStorage.getItem('editedQuestions');
  if (savedEditedQuestions) {
    try {
      const parsed = JSON.parse(savedEditedQuestions);
      console.log(`Retrieved ${Object.keys(parsed).length} edited questions from localStorage.`);
      return parsed;
    } catch (error) {
      console.error("Error parsing edited questions:", error);
      return {};
    }
  }
  console.log("No edited questions found in localStorage.");
  return {};
}

// Function to save approved question IDs to localStorage (legacy support)
export function saveApprovedQuestionIds(ids: number[]): void {
  try {
    localStorage.setItem('approvedQuestions', JSON.stringify(ids));
    console.log(`Saved ${ids.length} approved question IDs to localStorage.`);
  } catch (error) {
    console.error("Error saving approved question IDs:", error);
  }
}

// Legacy function to get approved questions (for fallback only)
export function getApprovedQuestions(): QuestionWithCategory[] {
  const approvedIds = getApprovedQuestionIds();
  const editedQuestions = getEditedQuestions();
  
  // Apply edited questions to legacy questions
  const questionsWithEdits = legacyQuestions.map(question => {
    if (editedQuestions[question.id]) {
      return editedQuestions[question.id];
    }
    return question;
  });
  
  // If no questions are approved yet, return all legacy questions with edits applied
  if (approvedIds.length === 0) {
    console.log("No approved questions found, returning all legacy questions with edits applied.");
    return questionsWithEdits;
  }
  
  // Filter approved questions
  console.log(`Filtering ${approvedIds.length} approved questions from legacy questions.`);
  return questionsWithEdits.filter(question => approvedIds.includes(question.id));
}

// Function to get a specified number of random questions with language support
export async function getRandomQuestions(count: number, language: 'pt' | 'en' = 'pt'): Promise<QuestionWithCategory[]> {
  try {
    // Try to get questions from database first
    const randomQuestions = await fetchRandomQuestions(count, language);
    
    if (randomQuestions && randomQuestions.length > 0) {
      console.log(`Fetched ${randomQuestions.length} random questions from database for language: ${language}`);
      return randomQuestions;
    }
    
    // Fallback to legacy questions
    console.warn("No questions found in database, falling back to legacy questions");
    const approvedQuestions = getApprovedQuestions();
    
    // Create a copy of the original array to avoid modifying it
    const questionsCopy = [...approvedQuestions];
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = questionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }
    
    // If count is greater than the number of available questions, return all available
    if (count >= questionsCopy.length) {
      console.log(`Returning all ${questionsCopy.length} available legacy questions`);
      return questionsCopy;
    }
    
    // Return the first 'count' questions
    console.log(`Returning ${count} legacy questions out of ${questionsCopy.length} available`);
    return questionsCopy.slice(0, count);
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

// Export specific category questions for direct access if needed
export { fundamentalsQuestions, rolesQuestions, eventsQuestions, artifactsQuestions };
export type { QuestionWithCategory } from './types';
