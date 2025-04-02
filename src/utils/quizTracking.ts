
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { QuestionWithCategory, QuizAttempt, QuizCategory } from "@/data/types";

interface AttemptFilters {
  name?: string;
  email?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

// Function to save quiz attempt to Supabase
export const saveQuizAttemptToSupabase = async (
  name: string,
  email: string,
  size: number,
  score?: number,
  questionsData?: object
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([
        {
          name,
          email: email || null,
          quiz_size: size,
          score: score || null,
          questions_data: questionsData || null
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

// Fetch quiz attempts from Supabase with pagination and filtering
export const fetchQuizAttemptsFromSupabase = async (filters: AttemptFilters = {}): Promise<{
  attempts: string[];
  totalCount: number;
}> => {
  try {
    const {
      name,
      email,
      page = 1,
      pageSize = 10,
      orderBy = 'created_at',
      orderDirection = 'desc'
    } = filters;
    
    // Calculate the range for pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Build the query
    let query = supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact' });
    
    // Apply filters if provided
    if (name) {
      query = query.ilike('name', `%${name}%`);
    }
    
    if (email) {
      query = query.ilike('email', `%${email}%`);
    }
    
    // Get the count first
    const { count, error: countError } = await query;
    
    if (countError) {
      console.error("Error counting attempts:", countError);
      return { attempts: [], totalCount: 0 };
    }
    
    // Then get the paginated data
    const { data, error } = await query
      .order(orderBy, { ascending: orderDirection === 'asc' })
      .range(from, to);
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      return { attempts: [], totalCount: 0 };
    }
    
    // Convert Supabase data format to our string format
    const attempts = (data || []).map(attempt => {
      const timestamp = new Date(attempt.created_at).toISOString();
      return `${attempt.name},${attempt.email || 'No email'},${attempt.quiz_size},${timestamp},${attempt.score || ''}`;
    });
    
    return { 
      attempts, 
      totalCount: count || 0 
    };
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return { attempts: [], totalCount: 0 };
  }
};

// Main function to track a quiz attempt
export const trackQuizAttempt = async (
  name: string,
  email: string,
  size: number,
  score?: number,
  questionsData?: object
): Promise<void> => {
  // Save to Supabase
  await saveQuizAttemptToSupabase(name, email, size, score, questionsData);
};

// Function to get all tracked quiz attempts with filtering and pagination
export const getTrackedQuizAttempts = async (filters: AttemptFilters = {}): Promise<{
  attempts: string[];
  totalCount: number;
}> => {
  try {
    // Get Supabase attempts with pagination and filtering
    const result = await fetchQuizAttemptsFromSupabase(filters);
    
    console.info(`Loaded ${result.attempts.length} attempts from Supabase (page ${filters.page || 1}, total: ${result.totalCount})`);
    return result;
  } catch (error) {
    console.error("Error retrieving quiz attempts:", error);
    return { attempts: [], totalCount: 0 };
  }
};

// Fetch questions from database by category
export const fetchQuestionsByCategory = async (category?: string): Promise<QuestionWithCategory[]> => {
  try {
    let query = supabase.from('quiz_questions').select('*');
    
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
    
    // Transform database format to application format
    return data.map(item => ({
      id: item.id,
      question: item.question,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
      correctAnswer: item.correct_answer,
      explanation: item.explanation || '',
      category: item.category_id as QuizCategory // Cast the string to QuizCategory type
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// Get random questions for a quiz
export const getRandomQuestions = async (count: number): Promise<QuestionWithCategory[]> => {
  try {
    // Get all questions
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*');
      
    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
    
    // Transform and shuffle
    const questions = data.map(item => ({
      id: item.id,
      question: item.question,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
      correctAnswer: item.correct_answer,
      explanation: item.explanation || '',
      category: item.category_id as QuizCategory // Cast the string to QuizCategory type
    }));
    
    // Shuffle using Fisher-Yates algorithm
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    // Return requested number of questions
    return questions.slice(0, Math.min(count, questions.length));
  } catch (error) {
    console.error("Error getting random questions:", error);
    return [];
  }
};

// Update a question in the database
export const updateQuestion = async (question: QuestionWithCategory): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('quiz_questions')
      .update({
        question: question.question,
        options: question.options,
        correct_answer: question.correctAnswer,
        explanation: question.explanation,
        updated_at: new Date().toISOString()
      })
      .eq('id', question.id);
      
    if (error) {
      console.error("Error updating question:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating question:", error);
    return false;
  }
};

// Calculate category-based statistics
export const getCategoryStats = (
  userAnswers: Record<number, string>,
  questions: QuestionWithCategory[]
): { category: string; correctCount: number; totalCount: number }[] => {
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
};
