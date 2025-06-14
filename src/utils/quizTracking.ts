
import { supabase } from "@/integrations/supabase/client";
import type { QuestionWithCategory, QuizAttempt, UserAnswers } from "@/data/types";

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
      category: row.category_id,
      options: language === 'en' && row.options_en ? row.options_en : row.options,
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
 * Tracks a quiz attempt with language support
 */
export async function trackQuizAttempt(
  name: string,
  email: string | null,
  score: number,
  totalQuestions: number,
  userAnswers: UserAnswers,
  questions: QuestionWithCategory[],
  completionTimeSeconds: number,
  language: 'pt' | 'en' = 'pt'
): Promise<string | null> {
  try {
    const questionsData = questions.map(q => ({
      id: q.id,
      question: q.question,
      category: q.category,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[q.id] || null,
      isCorrect: userAnswers[q.id] === q.correctAnswer
    }));

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        name,
        email,
        score,
        quiz_size: totalQuestions,
        questions_data: questionsData,
        completion_time_seconds: completionTimeSeconds,
        language: language
      })
      .select('id')
      .single();

    if (error) {
      console.error("Error tracking quiz attempt:", error);
      return null;
    }

    console.log(`Quiz attempt tracked successfully with ID: ${data.id} for language: ${language}`);
    return data.id;
  } catch (error) {
    console.error("Error in trackQuizAttempt:", error);
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
      questionsData: row.questions_data,
      createdAt: row.created_at,
      completionTimeSeconds: row.completion_time_seconds,
      language: row.language || 'pt'
    }));

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
    // Get total attempts and average score
    const { data: statsData, error: statsError } = await supabase
      .from('quiz_attempts')
      .select('score, language');

    if (statsError) {
      console.error("Error fetching global stats:", error);
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
