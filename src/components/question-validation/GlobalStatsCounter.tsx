
import React, { useEffect, useState } from 'react';
import { getQuizAttemptStats, formatTimeFromSeconds } from '@/utils/quizTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, RefreshCw, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { QuizStats } from '@/data/types';

const GlobalStatsCounter = () => {
  const [stats, setStats] = useState<QuizStats | null>(null);
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
          
          {/* Stats by Quiz Size */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Estatísticas por tamanho do simulado</h4>
            
            <div className="grid grid-cols-3 gap-3">
              {/* 10 Questions */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <span className="block font-semibold text-sm mb-2">10 Questões</span>
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-4 w-4 text-amber-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Média:</span>
                  </div>
                  <span className="block text-lg font-bold text-amber-500">
                    {stats?.averageScore10 !== null ? `${stats?.averageScore10}%` : "-"}
                  </span>
                  <div className="flex items-center justify-center mt-2 mb-1">
                    <Clock className="h-4 w-4 text-indigo-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Tempo:</span>
                  </div>
                  <span className="block text-lg font-bold text-indigo-500">
                    {formatTimeFromSeconds(stats?.averageTime10 || null)}
                  </span>
                </div>
              </div>
              
              {/* 25 Questions */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <span className="block font-semibold text-sm mb-2">25 Questões</span>
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-4 w-4 text-amber-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Média:</span>
                  </div>
                  <span className="block text-lg font-bold text-amber-500">
                    {stats?.averageScore25 !== null ? `${stats?.averageScore25}%` : "-"}
                  </span>
                  <div className="flex items-center justify-center mt-2 mb-1">
                    <Clock className="h-4 w-4 text-indigo-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Tempo:</span>
                  </div>
                  <span className="block text-lg font-bold text-indigo-500">
                    {formatTimeFromSeconds(stats?.averageTime25 || null)}
                  </span>
                </div>
              </div>
              
              {/* 50 Questions */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <span className="block font-semibold text-sm mb-2">50 Questões</span>
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-4 w-4 text-amber-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Média:</span>
                  </div>
                  <span className="block text-lg font-bold text-amber-500">
                    {stats?.averageScore50 !== null ? `${stats?.averageScore50}%` : "-"}
                  </span>
                  <div className="flex items-center justify-center mt-2 mb-1">
                    <Clock className="h-4 w-4 text-indigo-500 mr-1.5" />
                    <span className="text-sm text-gray-500">Tempo:</span>
                  </div>
                  <span className="block text-lg font-bold text-indigo-500">
                    {formatTimeFromSeconds(stats?.averageTime50 || null)}
                  </span>
                </div>
              </div>
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
