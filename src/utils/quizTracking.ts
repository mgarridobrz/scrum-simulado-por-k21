
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

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

// Function to save quiz attempt to Supabase
export const saveQuizAttemptToSupabase = async (
  name: string,
  email: string,
  size: number,
  score?: number
): Promise<boolean> => {
  try {
    // Fixed TypeScript error by using proper table typing
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([
        {
          name,
          email: email || null,
          quiz_size: size,
          score: score || null
        }
      ]);
    
    if (error) {
      console.error("Error saving to Supabase:", error);
      return false;
    }
    
    console.log("Quiz attempt saved to Supabase successfully");
    return true;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return false;
  }
};

// Fetch all quiz attempts from Supabase
export const fetchQuizAttemptsFromSupabase = async (): Promise<string[]> => {
  try {
    // Fixed TypeScript error by using proper table typing
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }
    
    // Convert Supabase data format to our local format
    return (data || []).map(attempt => {
      const timestamp = new Date(attempt.created_at).toISOString();
      return `${attempt.name},${attempt.email || 'No email'},${attempt.quiz_size},${timestamp},${attempt.score || ''}`;
    });
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return [];
  }
};

// Permanent storage key prefixes to ensure data isn't reset
const QUIZ_ATTEMPT_KEYS = 'k21quiz_attempt_keys';
const QUIZ_ATTEMPT_PREFIX = 'k21quiz_attempt_';

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
    const attemptKey = `${QUIZ_ATTEMPT_PREFIX}${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Save this individual attempt with a unique key
    localStorage.setItem(attemptKey, attemptData);
    
    // Also update the list of attempt keys
    const attemptKeysList = JSON.parse(localStorage.getItem(QUIZ_ATTEMPT_KEYS) || '[]');
    attemptKeysList.push(attemptKey);
    localStorage.setItem(QUIZ_ATTEMPT_KEYS, JSON.stringify(attemptKeysList));
    
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
  // First try to save to Supabase
  const supabaseSuccess = await saveQuizAttemptToSupabase(name, email, size, score);
  
  // Try to save to dontpad (likely to fail due to CORS)
  const dontpadSuccess = await saveQuizAttemptToDontpad(name, email, size, score);
  
  // Always save to local storage for reliability
  saveQuizAttemptToLocalStorage(name, email, size, score);
};

// Function to get all tracked quiz attempts
export const getTrackedQuizAttempts = async (): Promise<string[]> => {
  try {
    // Get local storage attempts
    const attemptKeys = JSON.parse(localStorage.getItem(QUIZ_ATTEMPT_KEYS) || '[]');
    const localAttempts = attemptKeys.map((key: string) => {
      return localStorage.getItem(key) || '';
    }).filter((item: string) => item !== '');
    
    // Get Supabase attempts
    const supabaseAttempts = await fetchQuizAttemptsFromSupabase();
    
    // Combine both sources
    const allAttempts = [...localAttempts, ...supabaseAttempts];
    
    // Sort attempts by date (newest first)
    allAttempts.sort((a, b) => {
      const dateA = new Date(a.split(',')[3]);
      const dateB = new Date(b.split(',')[3]);
      return dateB.getTime() - dateA.getTime();
    });
    
    return allAttempts;
  } catch (error) {
    console.error("Error retrieving quiz attempts:", error);
    // Fallback to local storage only
    const attemptKeys = JSON.parse(localStorage.getItem(QUIZ_ATTEMPT_KEYS) || '[]');
    const localAttempts = attemptKeys.map((key: string) => {
      return localStorage.getItem(key) || '';
    }).filter((item: string) => item !== '');
    return localAttempts;
  }
};

// Function to clear all quiz attempts from local storage
// Note: We don't clear Supabase data to maintain persistence
export const clearQuizAttempts = (): void => {
  try {
    const attemptKeys = JSON.parse(localStorage.getItem(QUIZ_ATTEMPT_KEYS) || '[]');
    
    // Remove each individual attempt
    attemptKeys.forEach((key: string) => {
      localStorage.removeItem(key);
    });
    
    // Clear the keys list
    localStorage.removeItem(QUIZ_ATTEMPT_KEYS);
    
    console.log("All quiz attempts cleared from local storage");
  } catch (error) {
    console.error("Error clearing quiz attempts:", error);
  }
};
