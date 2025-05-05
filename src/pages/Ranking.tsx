import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentQuarter, getTopPerformersForQuarter } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ArrowLeft, Medal, RefreshCw, Trophy, Clock } from 'lucide-react';

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
  const [currentQuarter, setCurrentQuarter] = useState(getCurrentQuarter());
  const { toast } = useToast();
  
  const loadTopPerformers = async (quarter = currentQuarter) => {
    setIsLoading(true);
    try {
      // Fetch rankings for each quiz size separately
      const { performers: performers10 } = await getTopPerformersForQuarter(quarter, 10);
      const { performers: performers25 } = await getTopPerformersForQuarter(quarter, 25);
      const { performers: performers50 } = await getTopPerformersForQuarter(quarter, 50);
      
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
    loadTopPerformers();
  }, [currentQuarter]);
  
  const formatQuarter = (quarter: string) => {
    const [year, quarterNum] = quarter.split('Q');
    return `${quarterNum}º Trimestre de ${year}`;
  };
  
  const formatTime = (seconds?: number): string => {
    if (!seconds) return '--:--';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const generateQuarterOptions = (): { value: string; label: string }[] => {
    const options = [];
    const currentDate = new Date();
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
        label: formatQuarter(value)
      });
    }
    
    return options;
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
                Os 10 melhores resultados do {formatQuarter(currentQuarter)}
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
                      {performer.completionTime ? (
                        <div className="flex items-center justify-end gap-1">
                          <Clock size={14} className="text-green-600" />
                          {formatTime(performer.completionTime)}
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <Clock size={14} className="text-green-600" />
                          {'--:--'}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum resultado encontrado para este trimestre.
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  const quarterOptions = generateQuarterOptions();
  
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
          
          <div className="flex items-center gap-3">
            <Select
              value={currentQuarter}
              onValueChange={(value) => setCurrentQuarter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o trimestre" />
              </SelectTrigger>
              <SelectContent>
                {quarterOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => loadTopPerformers()}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>
        
        {/* Render three separate ranking tables */}
        {renderRankingTable(topPerformers10, "Ranking do Simulado - 10 Questões")}
        {renderRankingTable(topPerformers25, "Ranking do Simulado - 25 Questões")}
        {renderRankingTable(topPerformers50, "Ranking do Simulado - 50 Questões")}
        
        <div className="text-xs text-muted-foreground text-center">
          Os rankings são resetados a cada novo trimestre.
          <span className="block mt-1">Em caso de empate, o menor tempo de conclusão é usado como critério de desempate.</span>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
