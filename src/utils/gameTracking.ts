import { supabase } from "@/integrations/supabase/client";
import { GameAttempt, GameQuestion, GameRanking } from "@/types/game";

export async function saveGameAttempt(
  name: string,
  email: string | null,
  category: string,
  questionCount: number,
  correctAnswers: number,
  totalTimeMs: number,
  penaltyTimeMs: number,
  questions: GameQuestion[],
  userAnswers: Array<{
    questionId: number;
    answer: string | null;
    isCorrect: boolean;
    timeSpent: number;
  }>,
  language: 'pt' | 'en' = 'pt'
): Promise<string | null> {
  try {
    const finalScoreMs = totalTimeMs + penaltyTimeMs;
    
    const questionsData = questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      return {
        id: question.id,
        question: question.question,
        category: question.category,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer?.answer || null,
        isCorrect: userAnswer?.isCorrect || false,
        timeSpent: userAnswer?.timeSpent || 0
      };
    });

    const { data, error } = await supabase
      .from('game_attempts')
      .insert({
        name,
        email,
        category,
        question_count: questionCount,
        correct_answers: correctAnswers,
        total_time_ms: totalTimeMs,
        penalty_time_ms: penaltyTimeMs,
        final_score_ms: finalScoreMs,
        questions_data: questionsData,
        language
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving game attempt:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error saving game attempt:', error);
    return null;
  }
}

export async function getGameRanking(
  category?: string,
  questionCount?: number,
  language?: 'pt' | 'en',
  limit: number = 100
): Promise<GameRanking[]> {
  try {
    let query = supabase
      .from('game_attempts')
      .select('name, final_score_ms, correct_answers, question_count, penalty_time_ms, total_time_ms, language, created_at')
      .order('final_score_ms', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    if (questionCount) {
      query = query.eq('question_count', questionCount);
    }

    if (language) {
      query = query.eq('language', language);
    }

    query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching game ranking:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching game ranking:', error);
    return [];
  }
}

export async function getGameStats(category?: string, questionCount?: number) {
  try {
    let query = supabase
      .from('game_attempts')
      .select('final_score_ms, correct_answers, question_count, total_time_ms, penalty_time_ms');

    if (category) {
      query = query.eq('category', category);
    }

    if (questionCount) {
      query = query.eq('question_count', questionCount);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching game stats:', error);
      return {
        totalAttempts: 0,
        averageTime: 0,
        averageScore: 0,
        averageCorrectAnswers: 0
      };
    }

    const attempts = data || [];
    const totalAttempts = attempts.length;

    if (totalAttempts === 0) {
      return {
        totalAttempts: 0,
        averageTime: 0,
        averageScore: 0,
        averageCorrectAnswers: 0
      };
    }

    const averageTime = attempts.reduce((sum, attempt) => sum + attempt.final_score_ms, 0) / totalAttempts;
    const averageCorrectAnswers = attempts.reduce((sum, attempt) => sum + attempt.correct_answers, 0) / totalAttempts;

    return {
      totalAttempts,
      averageTime: Math.round(averageTime),
      averageScore: Math.round(averageTime),
      averageCorrectAnswers: Math.round(averageCorrectAnswers * 100) / 100
    };
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return {
      totalAttempts: 0,
      averageTime: 0,
      averageScore: 0,
      averageCorrectAnswers: 0
    };
  }
}