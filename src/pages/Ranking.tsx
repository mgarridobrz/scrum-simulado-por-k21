
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  getCurrentQuarter, 
  getTopPerformersForQuarter, 
  getCurrentMonth, 
  getCurrentWeek,
  getTopPerformersForMonth,
  getTopPerformersForWeek 
} from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ArrowLeft, Medal, RefreshCw, Trophy, Clock, Calendar, CalendarDays, CalendarMonth, CalendarQuarter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RankingData {
  name: string;
  score: number;
  completionTime?: number;
}

const Ranking = () => {
  const [topPerformers10, setTopPerformers10] = useState<RankingData[]>([]);
  const [topPerformers25, setTopPerformers25] = useState<RankingData[]>([]);
  const [topPerformers50, setTopPerformers50] = useState<RankingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPeriod, setCurrentPeriod] = useState('quarter');
  const [currentValue, setCurrentValue] = useState(getCurrentQuarter());
  const { toast } = useToast();
  
  const loadTopPerformers = async (period = currentPeriod, value = currentValue) => {
    setIsLoading(true);
    try {
      let performers10, performers25, performers50;
      
      // Fetch rankings for the selected time period
      if (period === 'quarter') {
        const result10 = await getTopPerformersForQuarter(value, 10);
        const result25 = await getTopPerformersForQuarter(value, 25);
        const result50 = await getTopPerformersForQuarter(value, 50);
        performers10 = result10.performers;
        performers25 = result25.performers;
        performers50 = result50.performers;
      } else if (period === 'month') {
        const result10 = await getTopPerformersForMonth(value, 10);
        const result25 = await getTopPerformersForMonth(value, 25);
        const result50 = await getTopPerformersForMonth(value, 50);
        performers10 = result10.performers;
        performers25 = result25.performers;
        performers50 = result50.performers;
      } else { // week
        const result10 = await getTopPerformersForWeek(value, 10);
        const result25 = await getTopPerformersForWeek(value, 25);
        const result50 = await getTopPerformersForWeek(value, 50);
        performers10 = result10.performers;
        performers25 = result25.performers;
        performers50 = result50.performers;
      }
      
      setTopPerformers10(performers10);
      setTopPerformers25(performers25);
      setTopPerformers50(performers50);
    } catch (error) {
      console.error("Error loading top performers:", error);
      toast({
        title: "Erro ao carregar ranking",
        description: "Não foi possível carregar os dados do ranking.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadTopPerformers(currentPeriod, currentValue);
  }, [currentPeriod, currentValue]);
  
  const formatPeriodValue = (period: string, value: string): string => {
    if (period === 'quarter') {
      const [year, quarterNum] = value.split('Q');
      return `${quarterNum}º Trimestre de ${year}`;
    } else if (period === 'month') {
      const [year, monthNum] = value.split('M');
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const monthName = monthNames[parseInt(monthNum) - 1];
      return `${monthName} de ${year}`;
    } else { // week
      const [year, weekNum] = value.split('W');
      return `Semana ${weekNum} de ${year}`;
    }
  };
  
  const formatTime = (seconds?: number): string => {
    if (!seconds) return '--:--';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const generatePeriodOptions = (): { value: string; label: string }[] => {
    const options = [];
    const currentDate = new Date();
    
    if (currentPeriod === 'quarter') {
      const currentYear = currentDate.getFullYear();
      const currentQuarterNum = Math.floor(currentDate.getMonth() / 3) + 1;
      
      for (let i = 0; i < 4; i++) {
        let year = currentYear;
        let quarter = currentQuarterNum - i;
        
        if (quarter <= 0) {
          year--;
          quarter = 4 + quarter;
        }
        
        const value = `${year}Q${quarter}`;
        options.push({
          value,
          label: formatPeriodValue('quarter', value)
        });
      }
    } else if (currentPeriod === 'month') {
      const currentYear = currentDate.getFullYear();
      const currentMonthNum = currentDate.getMonth() + 1;
      
      for (let i = 0; i < 6; i++) {
        let year = currentYear;
        let month = currentMonthNum - i;
        
        if (month <= 0) {
          year--;
          month = 12 + month;
        }
        
        const value = `${year}M${month}`;
        options.push({
          value,
          label: formatPeriodValue('month', value)
        });
      }
    } else { // week
      const currentYear = currentDate.getFullYear();
      const currentWeekNum = Math.ceil((currentDate.getTime() - new Date(currentYear, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      
      for (let i = 0; i < 8; i++) {
        let year = currentYear;
        let week = currentWeekNum - i;
        
        if (week <= 0) {
          year--;
          // Approximate number of weeks in the previous year
          week = 52 + week;
        }
        
        const value = `${year}W${week}`;
        options.push({
          value,
          label: formatPeriodValue('week', value)
        });
      }
    }
    
    return options;
  };
  
  const handlePeriodChange = (newPeriod: string) => {
    setCurrentPeriod(newPeriod);
    
    // Set appropriate current value based on period
    if (newPeriod === 'quarter') {
      setCurrentValue(getCurrentQuarter());
    } else if (newPeriod === 'month') {
      setCurrentValue(getCurrentMonth());
    } else { // week
      setCurrentValue(getCurrentWeek());
    }
  };
  
  const renderRankingTable = (performers: RankingData[], title: string) => {
    return (
      <Card className="bg-white shadow-md mb-8">
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                {title}
              </CardTitle>
              <CardDescription>
                Os 10 melhores resultados do {formatPeriodValue(currentPeriod, currentValue)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-6">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : performers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Pontuação</TableHead>
                  <TableHead className="text-right">Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performers.map((performer, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      {index === 0 ? (
                        <Medal className="h-5 w-5 text-amber-500 inline" />
                      ) : index === 1 ? (
                        <Medal className="h-5 w-5 text-gray-400 inline" />
                      ) : index === 2 ? (
                        <Medal className="h-5 w-5 text-amber-700 inline" />
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{performer.name}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {performer.score}%
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      <div className="flex items-center justify-end gap-1">
                        <Clock size={14} className="text-green-600" />
                        {formatTime(performer.completionTime)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum resultado encontrado para este período.
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  const periodOptions = generatePeriodOptions();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-3 items-end md:items-center">
            <Tabs 
              value={currentPeriod} 
              onValueChange={handlePeriodChange}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="week" className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  <span className="hidden sm:inline">Semana</span>
                </TabsTrigger>
                <TabsTrigger value="month" className="flex items-center gap-1">
                  <CalendarMonth size={14} />
                  <span className="hidden sm:inline">Mês</span>
                </TabsTrigger>
                <TabsTrigger value="quarter" className="flex items-center gap-1">
                  <CalendarQuarter size={14} />
                  <span className="hidden sm:inline">Trimestre</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Select
                value={currentValue}
                onValueChange={(value) => setCurrentValue(value)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => loadTopPerformers(currentPeriod, currentValue)}
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Render three separate ranking tables */}
        {renderRankingTable(topPerformers10, "Ranking do Simulado - 10 Questões")}
        {renderRankingTable(topPerformers25, "Ranking do Simulado - 25 Questões")}
        {renderRankingTable(topPerformers50, "Ranking do Simulado - 50 Questões")}
        
        <div className="text-xs text-muted-foreground text-center">
          {currentPeriod === 'quarter' && "Os rankings são resetados a cada novo trimestre."}
          {currentPeriod === 'month' && "Os rankings são resetados a cada novo mês."}
          {currentPeriod === 'week' && "Os rankings são resetados a cada nova semana."}
          <span className="block mt-1">Em caso de empate, o menor tempo de conclusão é usado como critério de desempate.</span>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
