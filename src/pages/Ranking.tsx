import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentQuarter, getTopPerformersForQuarter } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ArrowLeft, Medal, RefreshCw, Trophy } from 'lucide-react';

const Ranking = () => {
  const [topPerformers, setTopPerformers] = useState<{ name: string; score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuarter, setCurrentQuarter] = useState(getCurrentQuarter());
  const { toast } = useToast();
  
  const loadTopPerformers = async (quarter = currentQuarter) => {
    setIsLoading(true);
    try {
      const { performers } = await getTopPerformersForQuarter(quarter);
      setTopPerformers(performers);
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
        
        <Card className="bg-white shadow-md">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Ranking do Simulado
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
            ) : topPerformers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">#</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-right">Pontuação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((performer, index) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum resultado encontrado para este trimestre.
              </div>
            )}
            
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Os rankings são resetados a cada novo trimestre.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ranking;
