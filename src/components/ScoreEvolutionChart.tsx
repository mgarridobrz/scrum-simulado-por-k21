
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, addDays } from 'date-fns';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';

// Helper function to format date as YYYY-MM-DD
function formatDateSQL(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Helper function for chart display
function formatDateDisplay(date: string): string {
  const parts = date.split('-');
  return `${parts[2]}/${parts[1]}`;
}

interface DailyScore {
  date: string;
  averageScore: number;
  count: number;
}

const ScoreEvolutionChart = () => {
  const { toast } = useToast();
  const [chartData, setChartData] = useState<DailyScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScoreEvolution = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const startDate = subDays(now, 29);

        // Get all quiz attempts for the last 30 days
        const { data, error } = await supabase
          .from('quiz_attempts')
          .select('created_at, score')
          .gte('created_at', startDate.toISOString())
          .not('score', 'is', null)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Initialize empty data for all 30 days
        const dailyData: Record<string, DailyScore> = {};
        for (let i = 0; i < 30; i++) {
          const day = formatDateSQL(addDays(startDate, i));
          dailyData[day] = {
            date: day,
            averageScore: 0,
            count: 0
          };
        }

        // Format the data for chart display
        const chartDataArray = Object.values(dailyData).map(day => ({
          ...day,
          date: formatDateDisplay(day.date)
        }));

        // Calculate moving average of scores for each day (using all attempts up to that day, limited to last 50)
        let movingAverages = [];
        if (data && data.length > 0) {
          for (let i = 0; i < chartDataArray.length; i++) {
            // Get all attempts up to this day
            const attemptsUpToDay = data.filter(attempt => {
              const attemptDay = formatDateSQL(new Date(attempt.created_at));
              const currentDay = Object.values(dailyData)[i].date;
              return attemptDay <= currentDay;
            });

            // Get last 50 attempts (or all if less than 50)
            const last50Attempts = attemptsUpToDay.slice(-50);

            // Calculate average
            const sum = last50Attempts.reduce((acc, curr) => acc + (curr.score || 0), 0);
            const average = last50Attempts.length > 0 ? Math.round(sum / last50Attempts.length) : 0;
            
            movingAverages.push({
              date: chartDataArray[i].date,
              averageScore: average,
              count: last50Attempts.length
            });
          }
          setChartData(movingAverages);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching score data:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar o histórico de pontuações.",
          variant: "destructive"
        });
        setChartData([]);
      }
      setLoading(false);
    };
    fetchScoreEvolution();
  }, [toast]);

  return (
    <Card className="p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-2 text-k21-teal flex items-center gap-2">
        <TrendingUp size={18} className="text-k21-gold" /> 
        Evolução de Pontuações
      </h2>
      <p className="text-sm text-muted-foreground mb-4">Média dos últimos 50 simulados</p>
      
      {loading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-k21-teal"></div>
        </div>
      ) : chartData.length > 0 ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                interval="preserveStartEnd" 
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #eee",
                  borderRadius: "5px"
                }}
                formatter={(value) => [`${value}%`, "Pontuação Média"]} 
                labelFormatter={(label) => `Dia: ${label}`} 
              />
              <Line 
                type="monotone" 
                dataKey="averageScore" 
                stroke="#069488" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 6 }}
                name="Pontuação Média" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 w-full flex items-center justify-center">
          <p className="text-muted-foreground">Nenhum dado disponível para exibição.</p>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        {!loading && chartData.length > 0 && (
          <>
            Baseado em {chartData.reduce((acc, curr) => acc + curr.count, 0)} simulados nos últimos 30 dias
          </>
        )}
      </div>
    </Card>
  );
};

export default ScoreEvolutionChart;
