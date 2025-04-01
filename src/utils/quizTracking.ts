
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

/**
 * Utility for tracking quiz attempts
 */

// Function to save quiz attempt to Supabase
export const saveQuizAttemptToSupabase = async (
  name: string,
  email: string,
  size: number,
  score?: number
): Promise<boolean> => {
  try {
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
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }
    
    // Convert Supabase data format to our string format
    return (data || []).map(attempt => {
      const timestamp = new Date(attempt.created_at).toISOString();
      return `${attempt.name},${attempt.email || 'No email'},${attempt.quiz_size},${timestamp},${attempt.score || ''}`;
    });
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return [];
  }
};

// Main function to track a quiz attempt
export const trackQuizAttempt = async (
  name: string,
  email: string,
  size: number,
  score?: number
): Promise<void> => {
  // Save to Supabase
  await saveQuizAttemptToSupabase(name, email, size, score);
};

// Helper function to create a unique identifier for attempts
const createAttemptId = (attempt: string): string => {
  const parts = attempt.split(',');
  // Use name, email, quiz_size, and timestamp as unique identifier
  return `${parts[0]}_${parts[1]}_${parts[2]}_${parts[3]}`;
};

// Function to get all tracked quiz attempts
export const getTrackedQuizAttempts = async (): Promise<string[]> => {
  try {
    // Get Supabase attempts
    const attempts = await fetchQuizAttemptsFromSupabase();
    
    // Sort attempts by date (newest first)
    attempts.sort((a, b) => {
      const dateA = new Date(a.split(',')[3]);
      const dateB = new Date(b.split(',')[3]);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.info(`Loaded ${attempts.length} attempts from Supabase`);
    return attempts;
  } catch (error) {
    console.error("Error retrieving quiz attempts:", error);
    return [];
  }
};
