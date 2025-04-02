
import React, { useEffect, useState } from 'react';
import { getQuizAttemptStats } from '@/utils/quizTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, RefreshCw, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface StatsData {
  totalAttempts: number;
  size10Count: number;
  size25Count: number;
  size50Count: number;
  averageLastFifty: number;
}

const GlobalStatsCounter = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const loadStats = async () => {
    setIsLoading(true);
    try {
      // Get stats for quiz attempts
      const statsData = await getQuizAttemptStats();
      setStats(statsData);
      console.log(`Loaded stats: ${JSON.stringify(statsData)}`);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast({
        title: "Erro ao carregar estatísticas",
        description: "Não foi possível carregar os dados de estatísticas.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Load data initially
    loadStats();
  }, []);
  
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-k21-gold" />
          Estatísticas Globais
        </CardTitle>
        <CardDescription>Estatísticas de todos os simulados realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Attempts */}
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-5 w-5 text-k21-teal mr-2" />
              <span className="text-sm text-gray-500">Simulados completados</span>
            </div>
            <span className="block text-3xl font-bold text-k21-teal">
              {stats?.totalAttempts || 0}
            </span>
          </div>
          
          {/* Quiz Sizes */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-gray-50 rounded text-center">
              <span className="block text-xs text-gray-500 mb-1">10 questões</span>
              <span className="block font-semibold">{stats?.size10Count || 0}</span>
            </div>
            <div className="p-2 bg-gray-50 rounded text-center">
              <span className="block text-xs text-gray-500 mb-1">25 questões</span>
              <span className="block font-semibold">{stats?.size25Count || 0}</span>
            </div>
            <div className="p-2 bg-gray-50 rounded text-center">
              <span className="block text-xs text-gray-500 mb-1">50 questões</span>
              <span className="block font-semibold">{stats?.size50Count || 0}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Average Score Last 50 */}
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm text-gray-500">Média últimos 50 simulados</span>
            </div>
            <span className="block text-2xl font-bold text-amber-500">
              {stats?.averageLastFifty || 0}%
            </span>
          </div>
          
          <div className="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={loadStats}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              <span className="sr-only">Atualizar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalStatsCounter;
