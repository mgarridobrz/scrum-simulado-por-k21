import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";
import { QuestionWithCategory, QuizAttempt, QuizCategory } from "@/data/types";

interface AttemptFilters {
  name?: string;
  email?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  quarter?: string; // For ranking by quarter
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
      .insert({
        name,
        email: email || null,
        quiz_size: size,
        score: score || null,
        questions_data: questionsData as Json || null
      });
    
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

// Delete a quiz attempt by ID
export const deleteQuizAttempt = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('quiz_attempts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting attempt:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting attempt:", error);
    return false;
  }
};

// Get statistics about quiz attempts
export const getQuizAttemptStats = async (): Promise<{
  totalAttempts: number;
  size10Count: number;
  size25Count: number;
  size50Count: number;
  averageLastFifty: number;
}> => {
  try {
    // Get total count of attempts
    const { count: totalCount, error: totalError } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error("Error counting attempts:", totalError);
      return { totalAttempts: 0, size10Count: 0, size25Count: 0, size50Count: 0, averageLastFifty: 0 };
    }
    
    // Get count of attempts by quiz size
    const { data: sizeCounts, error: sizeError } = await supabase
      .from('quiz_attempts')
      .select('quiz_size');
    
    if (sizeError) {
      console.error("Error counting by size:", sizeError);
      return { 
        totalAttempts: totalCount || 0, 
        size10Count: 0, 
        size25Count: 0, 
        size50Count: 0, 
        averageLastFifty: 0 
      };
    }
    
    // Count occurrences of each size
    const size10Count = sizeCounts?.filter(item => item.quiz_size === 10).length || 0;
    const size25Count = sizeCounts?.filter(item => item.quiz_size === 25).length || 0;
    const size50Count = sizeCounts?.filter(item => item.quiz_size === 50).length || 0;
    
    // Get average score of last 50 attempts
    const { data: lastFifty, error: lastFiftyError } = await supabase
      .from('quiz_attempts')
      .select('score')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (lastFiftyError) {
      console.error("Error getting last fifty:", lastFiftyError);
      return { 
        totalAttempts: totalCount || 0, 
        size10Count, 
        size25Count, 
        size50Count, 
        averageLastFifty: 0 
      };
    }
    
    // Calculate average score
    const validScores = lastFifty?.filter(item => item.score !== null) || [];
    const averageLastFifty = validScores.length > 0
      ? validScores.reduce((acc, curr) => acc + (curr.score || 0), 0) / validScores.length
      : 0;
    
    return {
      totalAttempts: totalCount || 0,
      size10Count,
      size25Count,
      size50Count,
      averageLastFifty: Math.round(averageLastFifty)
    };
  } catch (error) {
    console.error("Error getting stats:", error);
    return { totalAttempts: 0, size10Count: 0, size25Count: 0, size50Count: 0, averageLastFifty: 0 };
  }
};

// Fetch quiz attempts from Supabase with pagination and filtering
export const fetchQuizAttemptsFromSupabase = async (filters: AttemptFilters = {}): Promise<{
  attempts: QuizAttempt[];
  totalCount: number;
}> => {
  try {
    const {
      name,
      email,
      page = 1,
      pageSize = 10,
      orderBy = 'created_at',
      orderDirection = 'desc',
      quarter
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
    
    // Filter by current quarter if specified
    if (quarter) {
      const [year, quarterNum] = quarter.split('Q');
      const startDate = new Date(parseInt(year), (parseInt(quarterNum) - 1) * 3, 1);
      const endDate = new Date(parseInt(year), parseInt(quarterNum) * 3, 0);
      
      query = query
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
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
    
    return { 
      attempts: data || [], 
      totalCount: count || 0 
    };
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return { attempts: [], totalCount: 0 };
  }
};

// Get current quarter for ranking
export const getCurrentQuarter = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  
  return `${year}Q${quarter}`;
};

// Get Top 10 performers for the current quarter
export const getTopPerformersForQuarter = async (quarter?: string): Promise<{
  performers: { name: string; score: number }[];
}> => {
  try {
    const currentQuarter = quarter || getCurrentQuarter();
    const [year, quarterNum] = currentQuarter.split('Q');
    const startDate = new Date(parseInt(year), (parseInt(quarterNum) - 1) * 3, 1);
    const endDate = new Date(parseInt(year), parseInt(quarterNum) * 3, 0);
    
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('id, name, score')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .not('score', 'is', null)
      .order('score', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error("Error fetching top performers:", error);
      return { performers: [] };
    }
    
    return { 
      performers: data.map(item => ({ 
        name: item.name, 
        score: item.score || 0 
      })) 
    };
  } catch (error) {
    console.error("Error fetching top performers:", error);
    return { performers: [] };
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
  attempts: QuizAttempt[];
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
      category: item.category_id as QuizCategory
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// Get balanced random questions for a quiz
export const getRandomQuestionsWithBalance = async (count: number): Promise<QuestionWithCategory[]> => {
  try {
    // Get all questions
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*');
      
    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
    
    // Transform data format
    const questions = data.map(item => ({
      id: item.id,
      question: item.question,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
      correctAnswer: item.correct_answer,
      explanation: item.explanation || '',
      category: item.category_id as QuizCategory
    }));
    
    // Group questions by category
    const questionsByCategory: Record<string, QuestionWithCategory[]> = {};
    questions.forEach(question => {
      if (!questionsByCategory[question.category]) {
        questionsByCategory[question.category] = [];
      }
      questionsByCategory[question.category].push(question);
    });
    
    // Shuffle each category's questions
    Object.keys(questionsByCategory).forEach(category => {
      // Fisher-Yates shuffle algorithm
      const categoryQuestions = questionsByCategory[category];
      for (let i = categoryQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
      }
    });
    
    // Calculate how many questions to pick from each category
    const categories = Object.keys(questionsByCategory);
    const totalCategories = categories.length;
    
    // Base number of questions per category
    const baseQuestionsPerCategory = Math.floor(count / totalCategories);
    let remainder = count % totalCategories;
    
    // Select questions with balance
    const selectedQuestions: QuestionWithCategory[] = [];
    
    categories.forEach(category => {
      // Determine how many questions to take from this category
      const categoryQuestions = questionsByCategory[category];
      const questionsToTake = baseQuestionsPerCategory + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      
      // Add questions up to the limit or as many as available
      const actualQuestionsToTake = Math.min(questionsToTake, categoryQuestions.length);
      selectedQuestions.push(...categoryQuestions.slice(0, actualQuestionsToTake));
    });
    
    // Shuffle the final selection to randomize the order
    for (let i = selectedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]];
    }
    
    return selectedQuestions;
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
