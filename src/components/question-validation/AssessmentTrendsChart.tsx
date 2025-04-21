
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addDays, subDays, subWeeks, format } from "date-fns";

// Helper function to format date as YYYY-MM-DD
function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

// Helper to get start of week (Monday)
function getWeekStart(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday is 1
  return new Date(d.setDate(diff));
}

const AssessmentTrendsChart = () => {
  const { toast } = useToast();
  const [dailyData, setDailyData] = useState<{ date: string, count: number }[]>([]);
  const [weeklyData, setWeeklyData] = useState<{ week: string, count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessmentTrends = async () => {
      setLoading(true);
      try {
        const now = new Date();
        // For daily trends (last 30 days)
        const startDay = subDays(now, 29);
        const { data, error } = await supabase
          .from('quiz_attempts')
          .select('created_at')
          .gte('created_at', startDay.toISOString());
        if (error) throw error;

        // Aggregate counts per day for last 30 days
        const countsPerDay: Record<string, number> = {};
        for (let i = 0; i < 30; i++) {
          const dayString = formatDate(addDays(startDay, i));
          countsPerDay[dayString] = 0;
        }
        data?.forEach((row: { created_at: string }) => {
          const dayString = formatDate(new Date(row.created_at));
          if (countsPerDay[dayString] !== undefined) {
            countsPerDay[dayString] += 1;
          }
        });
        const daily = Object.entries(countsPerDay).map(([date, count]) => ({
          date: format(new Date(date), "dd/MM"),
          count,
        }));

        // For weekly trends (last 30 weeks)
        const startWeek = subWeeks(now, 29);
        const { data: dataWeekly, error: errorWeekly } = await supabase
          .from('quiz_attempts')
          .select('created_at')
          .gte('created_at', startWeek.toISOString());
        if (errorWeekly) throw errorWeekly;

        // Aggregate counts per week
        const weekCounts: Record<string, number> = {};
        for (let i = 0; i < 30; i++) {
          const weekStart = getWeekStart(addDays(startWeek, i * 7));
          const year = weekStart.getFullYear();
          const weekNum = Number(format(weekStart, "I"));
          const weekLabel = `S${weekNum} ${year}`;
          weekCounts[weekLabel] = 0;
        }
        dataWeekly?.forEach((row: { created_at: string }) => {
          const d = new Date(row.created_at);
          const weekStart = getWeekStart(d);
          const year = weekStart.getFullYear();
          const weekNum = Number(format(weekStart, "I"));
          const weekLabel = `S${weekNum} ${year}`;
          if (weekCounts[weekLabel] !== undefined) {
            weekCounts[weekLabel] += 1;
          }
        });
        const weekly = Object.entries(weekCounts).map(([week, count]) => ({
          week,
          count,
        }));

        setDailyData(daily);
        setWeeklyData(weekly);
      } catch (error) {
        toast({
          title: "Erro ao carregar estatísticas",
          description: "Não foi possível carregar as tendências de simulados.",
          variant: "destructive"
        });
      }
      setLoading(false);
    };
    fetchAssessmentTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mt-8 p-6 shadow-md bg-gradient-to-tr from-gray-50 to-white">
      <h3 className="text-lg font-semibold mb-5 text-k21-teal flex items-center gap-2">
        <span>Análise de Simulados Realizados</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="flex items-center gap-2 text-md font-medium mb-2">
            <CalendarDays size={18} className="text-blue-500" />
            Últimos 30 dias
          </h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={dailyData}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#069488"
                  strokeWidth={2.5}
                  dot={{ r: 2, stroke: "#069488", strokeWidth: 1, fill: "#fff" }}
                  activeDot={{ r: 5 }}
                  name="Por dia"
                  isAnimationActive
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="flex items-center gap-2 text-md font-medium mb-2">
            <Calendar size={18} className="text-yellow-600" />
            Últimas 30 semanas
          </h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={weeklyData}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="week" fontSize={12} interval={3} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#FFC700"
                  strokeWidth={2.5}
                  dot={{ r: 2, stroke: "#FFC700", strokeWidth: 1, fill: "#fff" }}
                  activeDot={{ r: 5 }}
                  name="Por semana"
                  isAnimationActive
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssessmentTrendsChart;
