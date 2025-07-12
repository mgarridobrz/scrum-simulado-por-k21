
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
 * Fetches random questions for quiz with language support
 */
export async function fetchRandomQuestions(
  count: number, 
  language: 'pt' | 'en' = 'pt'
): Promise<QuestionWithCategory[]> {
  try {
    // Get all questions first, then randomize in JavaScript
    const allQuestions = await fetchQuestionsByCategory(undefined, language);
    
    if (allQuestions.length === 0) {
      return [];
    }
    
    // Shuffle using Fisher-Yates algorithm
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the requested count
    const result = shuffled.slice(0, Math.min(count, shuffled.length));
    console.log(`Selected ${result.length} random questions for language: ${language}`);
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
    // Get total attempts and average score - include ALL attempts (with and without completion time)
    const { data: statsData, error: statsError } = await supabase
      .from('quiz_attempts')
      .select('score, language')
      .limit(100000); // Set a very high limit to get all records

    if (statsError) {
      console.error("Error fetching global stats:", statsError);
      throw statsError;
    }

    // Get total questions count
    const { count: totalQuestions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*', { count: 'exact', head: true });

    if (questionsError) {
      console.error("Error fetching questions count:", questionsError);
      throw questionsError;
    }

    const attempts = statsData || [];
    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0 
      ? attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / totalAttempts 
      : 0;

    // Calculate language breakdown
    const languageBreakdown = attempts.reduce(
      (acc, attempt) => {
        const lang = attempt.language || 'pt';
        acc[lang as 'pt' | 'en'] = (acc[lang as 'pt' | 'en'] || 0) + 1;
        return acc;
      },
      { pt: 0, en: 0 }
    );

    return {
      totalAttempts,
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
 * Gets ranking data for specific quiz size with language support
 */
export async function getRankingData(
  quizSize: number,
  language?: 'pt' | 'en'
): Promise<Array<{
  name: string;
  score: number;
  completionTimeSeconds: number;
  language: string;
}>> {
  try {
    let query = supabase
      .from('quiz_attempts')
      .select('name, score, completion_time_seconds, language')
      .eq('quiz_size', quizSize)
      .not('score', 'is', null)
      .order('score', { ascending: false })
      .order('completion_time_seconds', { ascending: true })
      .limit(100);

    // Add language filter if specified
    if (language) {
      query = query.eq('language', language);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching ranking data:", error);
      throw error;
    }

    return (data || []).map(row => ({
      name: row.name,
      score: row.score,
      completionTimeSeconds: row.completion_time_seconds || 0,
      language: row.language || 'pt'
    }));
  } catch (error) {
    console.error("Error in getRankingData:", error);
    return [];
  }
}

/**
 * Gets quiz attempt statistics - FIXED: include ALL attempts regardless of completion time
 */
export async function getQuizAttemptStats(): Promise<QuizStats> {
  try {
    console.log('[STATS] VERSÃO CORRIGIDA - Iniciando busca de estatísticas...');
    console.log('[STATS] Usando limit(100000) para buscar todos os registros');
    
    // Buscar TODAS as tentativas, incluindo as sem completion_time_seconds
    // Remove the default 1000 record limit by setting a higher limit
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('quiz_size, score, completion_time_seconds, created_at')
      .order('created_at', { ascending: false })
      .limit(100000); // Set a very high limit to get all records

    if (error) {
      console.error("Error fetching quiz stats:", error);
      throw error;
    }

    console.log(`[STATS] Total de registros encontrados na base: ${data?.length || 0}`);
    console.log(`[STATS] Primeiros 3 registros:`, data?.slice(0, 3));
    
    const attempts = data || [];
    const totalAttempts = attempts.length;
    
    console.log(`[STATS] Total de tentativas para estatísticas: ${totalAttempts}`);
    
    // Count by quiz size - include ALL attempts
    const size10Count = attempts.filter(a => a.quiz_size === 10).length;
    const size25Count = attempts.filter(a => a.quiz_size === 25).length;
    const size50Count = attempts.filter(a => a.quiz_size === 50).length;
    
    console.log(`[STATS] Contagens por tamanho: 10=${size10Count}, 25=${size25Count}, 50=${size50Count}`);
    
    // Get last 50 attempts for average - include ALL attempts
    const lastFifty = attempts.slice(0, 50);
    const averageLastFifty = lastFifty.length > 0 
      ? Math.round((lastFifty.reduce((sum, a) => sum + (a.score || 0), 0) / lastFifty.length))
      : 0;
    
    // Calculate averages by quiz size - only for time averages use attempts with completion time
    const size10AttemptsWithTime = attempts.filter(a => a.quiz_size === 10 && a.completion_time_seconds);
    const size25AttemptsWithTime = attempts.filter(a => a.quiz_size === 25 && a.completion_time_seconds);
    const size50AttemptsWithTime = attempts.filter(a => a.quiz_size === 50 && a.completion_time_seconds);
    
    // Score averages include ALL attempts
    const size10AllAttempts = attempts.filter(a => a.quiz_size === 10);
    const size25AllAttempts = attempts.filter(a => a.quiz_size === 25);
    const size50AllAttempts = attempts.filter(a => a.quiz_size === 50);
    
    const averageScore10 = size10AllAttempts.length > 0 
      ? Math.round(size10AllAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / size10AllAttempts.length)
      : null;
    const averageScore25 = size25AllAttempts.length > 0 
      ? Math.round(size25AllAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / size25AllAttempts.length)
      : null;
    const averageScore50 = size50AllAttempts.length > 0 
      ? Math.round(size50AllAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / size50AllAttempts.length)
      : null;
    
    // Time averages only for attempts with completion time
    const averageTime10 = size10AttemptsWithTime.length > 0 
      ? Math.round(size10AttemptsWithTime.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / size10AttemptsWithTime.length)
      : null;
    const averageTime25 = size25AttemptsWithTime.length > 0 
      ? Math.round(size25AttemptsWithTime.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / size25AttemptsWithTime.length)
      : null;
    const averageTime50 = size50AttemptsWithTime.length > 0 
      ? Math.round(size50AttemptsWithTime.reduce((sum, a) => sum + (a.completion_time_seconds || 0), 0) / size50AttemptsWithTime.length)
      : null;

    const finalStats = {
      totalAttempts,
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

    console.log(`[STATS] Estatísticas finais calculadas:`, finalStats);
    
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
