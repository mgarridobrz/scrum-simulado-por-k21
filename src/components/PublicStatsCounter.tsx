
import React, { useEffect, useState } from 'react';
import { getQuizAttemptStats } from '@/utils/quizTracking';
import { Card } from '@/components/ui/card';
import { Calculator, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StatsData {
  totalAttempts: number;
  size10Count: number;
  size25Count: number;
  size50Count: number;
  averageLastFifty: number;
}

const PublicStatsCounter = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await getQuizAttemptStats();
        setStats(statsData);
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
  }, [toast]);
  
  return (
    <Card className="bg-gradient-to-r from-white to-gray-50 shadow-md p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-k21-teal/10 mb-2">
            <Users className="h-6 w-6 text-k21-teal" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total de Simulados</h3>
          <p className="text-3xl font-bold text-k21-teal">{stats?.totalAttempts || 0}</p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-k21-gold/10 mb-2">
            <Calculator className="h-6 w-6 text-k21-gold" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">Questões Respondidas</h3>
          <p className="text-3xl font-bold text-k21-gold">
            {stats ? stats.size10Count * 10 + stats.size25Count * 25 + stats.size50Count * 50 : 0}
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 mb-2">
            <Award className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">Média Últimos 50</h3>
          <p className="text-3xl font-bold text-amber-500">{stats?.averageLastFifty || 0}%</p>
        </div>
      </div>
    </Card>
  );
};

export default PublicStatsCounter;
