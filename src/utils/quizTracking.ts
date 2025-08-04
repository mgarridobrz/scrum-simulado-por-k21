
import { supabase } from "@/integrations/supabase/client";
import type { QuestionWithCategory, QuizAttempt, UserAnswers, QuizStats, QuizCategory } from "@/data/types";

/**
 * Fetches questions from the database with language support
 */
export async function fetchQuestionsByCategory(
  categoryId?: string, 
  language: 'pt' | 'en' = 'pt'
): Promise<QuestionWithCategory[]> {
  try {
    let query = supabase
      .from('quiz_questions')
      .select('*');
    
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
    
    if (!data) {
      return [];
    }
    
    // Transform database records to QuestionWithCategory format with language support
    const questions: QuestionWithCategory[] = data.map(row => ({
      id: row.id,
      question: language === 'en' && row.question_en ? row.question_en : row.question,
      category: row.category_id as QuizCategory,
      options: (language === 'en' && row.options_en ? row.options_en : row.options) as { id: string; text: string; }[],
      correctAnswer: row.correct_answer,
      explanation: language === 'en' && row.explanation_en ? row.explanation_en : row.explanation
    }));
    
    console.log(`Fetched ${questions.length} questions from database for language: ${language}`);
    return questions;
  } catch (error) {
    console.error("Error in fetchQuestionsByCategory:", error);
    throw error;
  }
}

/**
 * Fetches random questions for quiz with language support and category filter
 */
export async function fetchRandomQuestions(
  count: number, 
  language: 'pt' | 'en' = 'pt',
  category?: string
): Promise<QuestionWithCategory[]> {
  try {
    // Get questions filtered by category if specified, then randomize in JavaScript
    const allQuestions = await fetchQuestionsByCategory(category, language);
    
    if (allQuestions.length === 0) {
      return [];
    }
    
    // Remove duplicates based on question ID to ensure no duplicate questions
    const uniqueQuestions = allQuestions.filter((question, index, array) => 
      array.findIndex(q => q.id === question.id) === index
    );
    
    console.log(`Found ${allQuestions.length} questions, ${uniqueQuestions.length} unique questions`);
    
    // Shuffle using Fisher-Yates algorithm
    const shuffled = [...uniqueQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the requested count, ensuring we don't exceed available unique questions
    const result = shuffled.slice(0, Math.min(count, shuffled.length));
    console.log(`Selected ${result.length} random questions for language: ${language}, category: ${category || 'all'}`);
    
    // Double-check for duplicates in the final result
    const finalIds = result.map(q => q.id);
    const uniqueIds = [...new Set(finalIds)];
    if (finalIds.length !== uniqueIds.length) {
      console.error("Duplicate questions detected in final result!", { 
        total: finalIds.length, 
        unique: uniqueIds.length,
        duplicates: finalIds.filter((id, index) => finalIds.indexOf(id) !== index)
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching random questions:", error);
    throw error;
  }
}

/**
 * Updates a question in the database
 */
export async function updateQuestion(question: QuestionWithCategory): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('quiz_questions')
      .update({
        question: question.question,
        category_id: question.category,
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
    
    console.log(`Question ${question.id} updated successfully`);
    return true;
  } catch (error) {
    console.error("Error in updateQuestion:", error);
    return false;
  }
}

/**
 * Tracks a quiz attempt with language support and improved duplicate detection
 * NOW SAVES SCORE AS PERCENTAGE
 */
export async function trackQuizAttempt(
  name: string,
  email: string | null,
  score: number,
  totalQuestions: number,
  userAnswers: UserAnswers,
  questions: QuestionWithCategory[],
  completionTimeSeconds: number | null,
  language: 'pt' | 'en' = 'pt'
): Promise<string | null> {
  try {
    // Convert raw score to percentage
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    
    console.log(`[TRACKING] Attempting to track quiz for user: ${name}, raw score: ${score}/${totalQuestions}, percentage: ${scorePercentage}%, completion time: ${completionTimeSeconds}s`);
    
    // Enhanced duplicate detection with stricter criteria
    const currentTime = new Date();
    const twoSecondsAgo = new Date(currentTime.getTime() - 2000); // 2 seconds window
    
    const { data: existingAttempts, error: checkError } = await supabase
      .from('quiz_attempts')
      .select('id, created_at, score, completion_time_seconds')
      .eq('name', name)
      .eq('quiz_size', totalQuestions)
      .eq('language', language)
      .gte('created_at', twoSecondsAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(5);

    if (checkError) {
      console.error("[TRACKING] Error checking for existing attempts:", checkError);
    } else if (existingAttempts && existingAttempts.length > 0) {
      console.log(`[TRACKING] Found ${existingAttempts.length} recent attempts for ${name}:`, existingAttempts);
      
      // Check for exact duplicates (same score percentage and similar completion time)
      const exactDuplicate = existingAttempts.find(attempt => {
        const scoreMatch = Math.abs(attempt.score - scorePercentage) < 0.1;
        const timeMatch = completionTimeSeconds && attempt.completion_time_seconds ? 
          Math.abs((attempt.completion_time_seconds || 0) - completionTimeSeconds) < 2 : 
          !completionTimeSeconds && !attempt.completion_time_seconds;
        return scoreMatch && timeMatch;
      });
      
      if (exactDuplicate) {
        console.log("[TRACKING] Exact duplicate detected, skipping insert:", exactDuplicate);
        return exactDuplicate.id;
      }
    }

    const questionsData = questions.map(q => ({
      id: q.id,
      question: q.question,
      category: q.category,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[q.id] || null,
      isCorrect: userAnswers[q.id] === q.correctAnswer
    }));

    console.log(`[TRACKING] Inserting new attempt for ${name}: ${scorePercentage}% (${score}/${totalQuestions}) in ${completionTimeSeconds || 'N/A'}s`);

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        name,
        email,
        score: scorePercentage, // Save as percentage
        quiz_size: totalQuestions,
        questions_data: questionsData,
        completion_time_seconds: completionTimeSeconds,
        language: language
      })
      .select('id')
      .single();

    if (error) {
      console.error("[TRACKING] Error tracking quiz attempt:", error);
      return null;
    }

    console.log(`[TRACKING] Quiz attempt tracked successfully with ID: ${data.id} for language: ${language}, score saved as: ${scorePercentage}%`);
    return data.id;
  } catch (error) {
    console.error("[TRACKING] Error in trackQuizAttempt:", error);
    return null;
  }
}

/**
 * Gets tracked quiz attempts with pagination and optional filtering
 */
export async function getTrackedQuizAttempts(options?: {
  page?: number;
  pageSize?: number;
  language?: 'pt' | 'en';
}): Promise<{ attempts: QuizAttempt[], totalCount: number }> {
  const { page = 1, pageSize = 10, language } = options || {};
  
  try {
    let query = supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Add language filter if specified
    if (language) {
      query = query.eq('language', language);
    }

    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching quiz attempts:", error);
      throw error;
    }

    const attempts: QuizAttempt[] = (data || []).map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      score: row.score,
      quizSize: row.quiz_size,
      questionsData: Array.isArray(row.questions_data) ? row.questions_data as Array<{
        id: number;
        question: string;
        category: string;
        options: Array<{ id: string; text: string }>;
        correctAnswer: string;
        userAnswer: string | null;
        isCorrect: boolean;
      }> : [],
      createdAt: row.created_at,
      completionTimeSeconds: row.completion_time_seconds,
      language: row.language || 'pt'
    }));

    console.log(`Fetched ${attempts.length} attempts from database`);
    return {
      attempts,
      totalCount: count || 0
    };
  } catch (error) {
    console.error("Error in getTrackedQuizAttempts:", error);
    return { attempts: [], totalCount: 0 };
  }
}

/**
 * Gets global quiz statistics with language breakdown
 */
export async function getGlobalQuizStats(): Promise<{
  totalAttempts: number;
  averageScore: number;
  totalQuestions: number;
  languageBreakdown: { pt: number; en: number };
}> {
  try {
    // 1. Get total attempts count efficiently
    const { count: totalAttempts, error: countError } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error("Error counting attempts:", countError);
      throw countError;
    }

    // 2. Get average score efficiently (only scores field)
    const { data: scoresData, error: scoresError } = await supabase
      .from('quiz_attempts')
      .select('score');

    if (scoresError) {
      console.error("Error fetching scores:", scoresError);
      throw scoresError;
    }

    const scores = scoresData || [];
    const averageScore = scores.length > 0 
      ? scores.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / scores.length 
      : 0;

    // 3. Get total questions count
    const { count: totalQuestions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*', { count: 'exact', head: true });

    if (questionsError) {
      console.error("Error fetching questions count:", questionsError);
      throw questionsError;
    }

    // 4. Get language breakdown using efficient COUNT queries
    const [ptResult, enResult] = await Promise.all([
      supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('language', 'pt'),
      supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('language', 'en')
    ]);

    const languageBreakdown = {
      pt: ptResult.count || 0,
      en: enResult.count || 0
    };

    return {
      totalAttempts: totalAttempts || 0,
      averageScore: Math.round(averageScore * 100) / 100,
      totalQuestions: totalQuestions || 0,
      languageBreakdown
    };
  } catch (error) {
    console.error("Error in getGlobalQuizStats:", error);
    return {
      totalAttempts: 0,
      averageScore: 0,
      totalQuestions: 0,
      languageBreakdown: { pt: 0, en: 0 }
    };
  }
}

/**
 * Gets ranking data for specific quiz size with language and time period support
 */
export async function getRankingData(
  quizSize: number,
  language?: 'pt' | 'en',
  timePeriod?: '30days' | '90days' | 'alltime'
): Promise<Array<{
  name: string;
  score: number;
  completionTimeSeconds: number;
  language: string;
  created_at: string;
}>> {
  try {
    let query = supabase
      .from('quiz_attempts')
      .select('name, score, completion_time_seconds, language, created_at')
      .eq('quiz_size', quizSize)
      .not('score', 'is', null);

    // Add time period filter
    if (timePeriod === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query = query.gte('created_at', thirtyDaysAgo.toISOString());
    } else if (timePeriod === '90days') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      query = query.gte('created_at', ninetyDaysAgo.toISOString());
    }
    // For 'alltime' or undefined, no time filter is applied

    // Add language filter if specified
    if (language) {
      query = query.eq('language', language);
    }

    query = query
      .order('score', { ascending: false })
      .order('completion_time_seconds', { ascending: true })
      .limit(100);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching ranking data:", error);
      throw error;
    }

    return (data || []).map(row => ({
      name: row.name,
      score: row.score,
      completionTimeSeconds: row.completion_time_seconds || 0,
      language: row.language || 'pt',
      created_at: row.created_at
    }));
  } catch (error) {
    console.error("Error in getRankingData:", error);
    return [];
  }
}

/**
 * Gets quiz attempt statistics - OPTIMIZED: uses efficient queries with minimal data transfer
 */
export async function getQuizAttemptStats(): Promise<QuizStats> {
  try {
    console.log('📊 Iniciando busca otimizada de estatísticas...');
    
    // 1. Get total count efficiently (only metadata, no data transfer)
    const { count: totalAttempts, error: countError } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error getting total count:', countError);
      throw countError;
    }

    // 2. Get counts by quiz size efficiently in parallel
    const [count10, count25, count50] = await Promise.all([
      supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('quiz_size', 10),
      supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('quiz_size', 25),
      supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('quiz_size', 50)
    ]);

    const size10Count = count10.count || 0;
    const size25Count = count25.count || 0;
    const size50Count = count50.count || 0;

    // 3. Get average of last 50 attempts efficiently (only 50 records, only score field)
    const { data: lastFifty, error: lastFiftyError } = await supabase
      .from('quiz_attempts')
      .select('score')
      .order('created_at', { ascending: false })
      .limit(50);

    if (lastFiftyError) {
      console.error('Error getting last 50:', lastFiftyError);
      throw lastFiftyError;
    }

    const averageLastFifty = lastFifty && lastFifty.length > 0
      ? Math.round((lastFifty.reduce((sum, a) => sum + (a.score || 0), 0) / lastFifty.length))
      : 0;

    // 4. Get averages by quiz size efficiently (only necessary fields)
    const [data10, data25, data50] = await Promise.all([
      supabase.from('quiz_attempts').select('score, completion_time_seconds').eq('quiz_size', 10),
      supabase.from('quiz_attempts').select('score, completion_time_seconds').eq('quiz_size', 25),
      supabase.from('quiz_attempts').select('score, completion_time_seconds').eq('quiz_size', 50)
    ]);

    // Calculate averages
    let averageScore10 = null, averageScore25 = null, averageScore50 = null;
    let averageTime10 = null, averageTime25 = null, averageTime50 = null;

    if (data10.data && data10.data.length > 0) {
      averageScore10 = Math.round(data10.data.reduce((sum, a) => sum + (a.score || 0), 0) / data10.data.length);
      const withTime10 = data10.data.filter(a => a.completion_time_seconds);
      if (withTime10.length > 0) {
        averageTime10 = Math.round(withTime10.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / withTime10.length);
      }
    }

    if (data25.data && data25.data.length > 0) {
      averageScore25 = Math.round(data25.data.reduce((sum, a) => sum + (a.score || 0), 0) / data25.data.length);
      const withTime25 = data25.data.filter(a => a.completion_time_seconds);
      if (withTime25.length > 0) {
        averageTime25 = Math.round(withTime25.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / withTime25.length);
      }
    }

    if (data50.data && data50.data.length > 0) {
      averageScore50 = Math.round(data50.data.reduce((sum, a) => sum + (a.score || 0), 0) / data50.data.length);
      const withTime50 = data50.data.filter(a => a.completion_time_seconds);
      if (withTime50.length > 0) {
        averageTime50 = Math.round(withTime50.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / withTime50.length);
      }
    }

    const finalStats = {
      totalAttempts: totalAttempts || 0,
      size10Count,
      size25Count,
      size50Count,
      averageLastFifty,
      averageTime10,
      averageTime25,
      averageTime50,
      averageScore10,
      averageScore25,
      averageScore50
    };

    console.log(`📊 Estatísticas otimizadas calculadas:`, finalStats);
    
    return finalStats;
  } catch (error) {
    console.error("Error in getQuizAttemptStats:", error);
    return {
      totalAttempts: 0,
      size10Count: 0,
      size25Count: 0,
      size50Count: 0,
      averageLastFifty: 0,
      averageTime10: null,
      averageTime25: null,
      averageTime50: null,
      averageScore10: null,
      averageScore25: null,
      averageScore50: null
    };
  }
}

/**
 * Formats time from seconds to readable format
 */
export function formatTimeFromSeconds(seconds: number | null): string {
  if (!seconds) return '-';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

/**
 * Deletes a quiz attempt
 */
export async function deleteQuizAttempt(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('quiz_attempts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting quiz attempt:", error);
      return false;
    }

    console.log(`Quiz attempt ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error in deleteQuizAttempt:", error);
    return false;
  }
}
