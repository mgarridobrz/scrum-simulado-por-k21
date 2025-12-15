
import React, { useEffect, useState } from 'react';
import { getQuizAttemptStats, formatTimeFromSeconds } from '@/utils/quizTracking';
import { getGameStats } from '@/utils/gameTracking';
import { Card } from '@/components/ui/card';
import { Calculator, Users, Award, Clock, Gamepad2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import type { QuizStats } from '@/data/types';

interface PublicStatsCounterProps {
  themeId?: string;
}

const PublicStatsCounter: React.FC<PublicStatsCounterProps> = ({ themeId }) => {
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [gameStats, setGameStats] = useState<{ totalAttempts: number; totalQuestions: number } | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log('🔄 PublicStatsCounter - Carregando estatísticas...', new Date().toISOString(), 'themeId:', themeId);
        const [statsData, gameStatsData] = await Promise.all([
          getQuizAttemptStats(themeId),
          getGameStats(undefined, undefined, themeId)
        ]);
        console.log('✅ PublicStatsCounter - Estatísticas carregadas:', statsData);
        console.log('✅ PublicStatsCounter - Estatísticas de jogos carregadas:', gameStatsData);
        setStats(statsData);
        setGameStats(gameStatsData);
      } catch (error) {
        console.error("Error loading stats:", error);
        toast({
          title: "Erro ao carregar estatísticas",
          description: "Não foi possível carregar os dados de estatísticas.",
          variant: "destructive"
        });
      }
    };
    
    loadStats();
    
    // Add interval to refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [toast, themeId]);
  
  return (
    <Card className="bg-gradient-to-r from-white to-gray-50 shadow-md p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-k21-teal/10 mb-2">
            <Users className="h-6 w-6 text-k21-teal" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">{getTranslation(language, 'totalQuizzes')}</h3>
          <p className="text-3xl font-bold text-k21-teal">{stats?.totalAttempts || 0}</p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 mb-2">
            <Gamepad2 className="h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">
            {language === 'pt' ? 'Jogos Modo Game' : 'Game Mode Plays'}
          </h3>
          <p className="text-3xl font-bold text-orange-500">{gameStats?.totalAttempts || 0}</p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-k21-gold/10 mb-2">
            <Calculator className="h-6 w-6 text-k21-gold" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">{getTranslation(language, 'questionsAnswered')}</h3>
          <p className="text-3xl font-bold text-k21-gold">
            {stats && gameStats ? 
              (stats.size10Count * 10 + stats.size25Count * 25 + stats.size50Count * 50) + gameStats.totalQuestions
              : 0}
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 mb-2">
            <Award className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">{getTranslation(language, 'averageLast50')}</h3>
          <p className="text-3xl font-bold text-amber-500">{stats?.averageLastFifty || 0}%</p>
        </div>
      </div>
    </Card>
  );
};

export default PublicStatsCounter;
