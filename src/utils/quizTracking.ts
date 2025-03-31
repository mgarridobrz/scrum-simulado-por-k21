
/**
 * Utility for tracking quiz attempts
 */

// We'll use a fixed URL for the dontpad storage
const DONTPAD_URL = 'https://dontpad.com/simuladocsmk21garrido';

// Function to save quiz attempt data to dontpad
export const saveQuizAttemptToDontpad = async (
  name: string,
  email: string,
  size: number,
  score?: number
): Promise<boolean> => {
  try {
    const timestamp = new Date().toISOString();
    const scoreInfo = score !== undefined ? ` with score ${score}%` : '';
    const data = `\n${timestamp} - ${name} (${email || 'No email'}) completed a ${size}-question quiz${scoreInfo}`;
    
    // Try to fetch the current content
    const response = await fetch(DONTPAD_URL);
    
    // Unfortunately, due to CORS restrictions, we can't post directly to dontpad
    console.log("Attempted to track quiz on dontpad, but this likely won't work due to CORS");
    
    // Return false to indicate we should fall back to local storage
    return false;
  } catch (error) {
    console.error("Error saving to dontpad:", error);
    return false;
  }
};

// Function to save quiz attempt data to local storage
export const saveQuizAttemptToLocalStorage = (
  name: string,
  email: string,
  size: number,
  score?: number
): void => {
  try {
    const timestamp = new Date().toISOString();
    const scoreValue = score !== undefined ? score : '';
    const attemptData = `${name},${email || 'No email'},${size},${timestamp},${scoreValue}`;
    
    // Create a unique key based on timestamp to ensure we don't overwrite
    const attemptKey = `quizAttempt_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Save this individual attempt with a unique key
    localStorage.setItem(attemptKey, attemptData);
    
    // Also update the list of attempt keys
    const attemptKeysList = JSON.parse(localStorage.getItem('quizAttemptKeys') || '[]');
    attemptKeysList.push(attemptKey);
    localStorage.setItem('quizAttemptKeys', JSON.stringify(attemptKeysList));
    
    console.log("Quiz attempt saved to local storage with unique key:", attemptKey);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

// Main function to track a quiz attempt
export const trackQuizAttempt = async (
  name: string,
  email: string,
  size: number,
  score?: number
): Promise<void> => {
  // First try to save to dontpad
  const dontpadSuccess = await saveQuizAttemptToDontpad(name, email, size, score);
  
  // Always save to local storage for reliability
  saveQuizAttemptToLocalStorage(name, email, size, score);
};

// Function to get all tracked quiz attempts from local storage
export const getTrackedQuizAttempts = (): string[] => {
  try {
    // Get the list of attempt keys
    const attemptKeys = JSON.parse(localStorage.getItem('quizAttemptKeys') || '[]');
    
    // Retrieve all attempts using their unique keys
    const attempts = attemptKeys.map((key: string) => {
      return localStorage.getItem(key) || '';
    }).filter((item: string) => item !== '');
    
    return attempts;
  } catch (error) {
    console.error("Error retrieving quiz attempts:", error);
    return [];
  }
};

// Function to clear all quiz attempts from local storage
export const clearQuizAttempts = (): void => {
  try {
    const attemptKeys = JSON.parse(localStorage.getItem('quizAttemptKeys') || '[]');
    
    // Remove each individual attempt
    attemptKeys.forEach((key: string) => {
      localStorage.removeItem(key);
    });
    
    // Clear the keys list
    localStorage.removeItem('quizAttemptKeys');
    
    console.log("All quiz attempts cleared from local storage");
  } catch (error) {
    console.error("Error clearing quiz attempts:", error);
  }
};
