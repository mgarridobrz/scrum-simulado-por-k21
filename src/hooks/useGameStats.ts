import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CategoryStats {
  category: string;
  attempts: number;
  avg_score: number;
  avg_time: number;
}

interface DailyStats {
  date: string;
  attempts: number;
}

interface DetailedGameStats {
  totalAttempts: number;
  uniquePlayers: number;
  averageScore: number;
  averageTime: number;
  bestScore: number;
  bestTime: number;
  categoryStats: CategoryStats[];
  dailyStats: DailyStats[];
  topPerformers: Array<{
    name: string;
    score: number;
    time: number;
    category: string;
  }>;
}

export const useGameStats = () => {
  const [stats, setStats] = useState<DetailedGameStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGameStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all game attempts
      const { data: attempts, error: attemptsError } = await supabase
        .from('game_attempts')
        .select('*')
        .order('created_at', { ascending: false });

      if (attemptsError) throw attemptsError;

      if (!attempts || attempts.length === 0) {
        setStats({
          totalAttempts: 0,
          uniquePlayers: 0,
          averageScore: 0,
          averageTime: 0,
          bestScore: 0,
          bestTime: 0,
          categoryStats: [],
          dailyStats: [],
          topPerformers: []
        });
        return;
      }

      // Calculate basic stats
      const totalAttempts = attempts.length;
      const uniquePlayers = new Set(attempts.filter(a => a.email).map(a => a.email)).size;
      const averageScore = attempts.reduce((sum, a) => sum + a.correct_answers, 0) / totalAttempts;
      const averageTime = attempts.reduce((sum, a) => sum + a.total_time_ms, 0) / totalAttempts / 1000;
      const bestScore = Math.max(...attempts.map(a => a.correct_answers));
      const bestTime = Math.min(...attempts.map(a => a.total_time_ms)) / 1000;

      // Calculate category stats
      const categoryGroups = attempts.reduce((acc, attempt) => {
        if (!acc[attempt.category]) {
          acc[attempt.category] = [];
        }
        acc[attempt.category].push(attempt);
        return acc;
      }, {} as Record<string, typeof attempts>);

      const categoryStats: CategoryStats[] = Object.entries(categoryGroups).map(([category, categoryAttempts]) => ({
        category,
        attempts: categoryAttempts.length,
        avg_score: categoryAttempts.reduce((sum, a) => sum + a.correct_answers, 0) / categoryAttempts.length,
        avg_time: categoryAttempts.reduce((sum, a) => sum + a.total_time_ms, 0) / categoryAttempts.length / 1000
      }));

      // Calculate daily stats (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentAttempts = attempts.filter(a => new Date(a.created_at) >= thirtyDaysAgo);
      const dailyGroups = recentAttempts.reduce((acc, attempt) => {
        const date = new Date(attempt.created_at).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {} as Record<string, number>);

      const dailyStats: DailyStats[] = Object.entries(dailyGroups)
        .map(([date, attempts]) => ({ date, attempts }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Get top performers (best scores with shortest times)
      const topPerformers = attempts
        .filter(a => a.name && a.correct_answers > 0)
        .sort((a, b) => {
          if (a.correct_answers === b.correct_answers) {
            return a.total_time_ms - b.total_time_ms;
          }
          return b.correct_answers - a.correct_answers;
        })
        .slice(0, 10)
        .map(attempt => ({
          name: attempt.name,
          score: attempt.correct_answers,
          time: attempt.total_time_ms / 1000,
          category: attempt.category
        }));

      setStats({
        totalAttempts,
        uniquePlayers,
        averageScore: Number(averageScore.toFixed(1)),
        averageTime: Number(averageTime.toFixed(1)),
        bestScore,
        bestTime,
        categoryStats,
        dailyStats,
        topPerformers
      });

    } catch (err) {
      console.error('Error fetching game stats:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchGameStats
  };
};