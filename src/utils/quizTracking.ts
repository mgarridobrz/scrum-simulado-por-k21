
/**
 * Utility for tracking quiz attempts
 */

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
    const response = await fetch('https://dontpad.com/simuladocsmk21garrido');
    
    // Unfortunately, due to CORS restrictions, we likely can't post directly to dontpad
    console.log("Attempted to track quiz on dontpad, but this probably won't work due to CORS");
    
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
    
    // Get existing attempts from localStorage
    const existingData = localStorage.getItem('quizAttempts') || '';
    
    // Add new attempt and save back to localStorage
    const updatedData = existingData ? `${existingData}\n${attemptData}` : attemptData;
    localStorage.setItem('quizAttempts', updatedData);
    
    console.log("Quiz attempt saved to local storage with score");
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
  
  // If dontpad fails, save to local storage
  if (!dontpadSuccess) {
    saveQuizAttemptToLocalStorage(name, email, size, score);
  }
};

// Function to get all tracked quiz attempts from local storage
export const getTrackedQuizAttempts = (): string[] => {
  try {
    const data = localStorage.getItem('quizAttempts');
    return data ? data.split('\n') : [];
  } catch (error) {
    console.error("Error retrieving quiz attempts:", error);
    return [];
  }
};
