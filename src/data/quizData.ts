
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

// Function to get approved questions IDs from localStorage
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

// Function to save edited questions to localStorage
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

// Function to get all edited questions from localStorage
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

// Function to save approved question IDs to localStorage
export function saveApprovedQuestionIds(ids: number[]): void {
  try {
    localStorage.setItem('approvedQuestions', JSON.stringify(ids));
    console.log(`Saved ${ids.length} approved question IDs to localStorage.`);
  } catch (error) {
    console.error("Error saving approved question IDs:", error);
  }
}

// Helper function to ensure edited questions are applied consistently
function applyEditedQuestions(questions: QuestionWithCategory[]): QuestionWithCategory[] {
  const editedQuestions = getEditedQuestions();
  
  return questions.map(question => {
    if (editedQuestions[question.id]) {
      return editedQuestions[question.id];
    }
    return question;
  });
}

// Filter questions by their approval status and use edited versions when available
export function getApprovedQuestions(): QuestionWithCategory[] {
  const approvedIds = getApprovedQuestionIds();
  
  // If no questions are approved yet, return the full set with edited versions applied
  if (approvedIds.length === 0) {
    console.log("No approved questions found, returning all questions with edits applied.");
    return applyEditedQuestions(quizQuestions);
  }
  
  // Filter approved questions and apply edited versions
  console.log(`Filtering ${approvedIds.length} approved questions from a total of ${quizQuestions.length}.`);
  const approvedQuestions = quizQuestions
    .filter(question => approvedIds.includes(question.id));
  
  return applyEditedQuestions(approvedQuestions);
}

// Function to get a specified number of random questions from the question pool
export function getRandomQuestions(count: number): QuestionWithCategory[] {
  // Get only approved questions for the quiz
  const approvedQuestions = getApprovedQuestions();
  
  // Log information for debugging
  console.log(`Requested ${count} questions, ${approvedQuestions.length} approved questions available`);
  
  // Create a copy of the original array to avoid modifying it
  const questionsCopy = [...approvedQuestions];
  
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = questionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
  }
  
  // If count is greater than the number of available questions, return all available
  if (count >= questionsCopy.length) {
    console.log(`Returning all ${questionsCopy.length} available questions`);
    return questionsCopy;
  }
  
  // Return the first 'count' questions
  console.log(`Returning ${count} questions out of ${questionsCopy.length} available`);
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
export type { QuestionWithCategory } from './types';
