
import React, { useEffect, useState } from 'react';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GlobalStatsCounter = () => {
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const loadAttempts = async () => {
    setIsLoading(true);
    try {
      // Get all quiz attempts and count them
      const attempts = await getTrackedQuizAttempts();
      setTotalAttempts(attempts.length);
      console.log(`Loaded ${attempts.length} attempts`);
    } catch (error) {
      console.error("Error loading attempts:", error);
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
    loadAttempts();
  }, []);
  
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-k21-gold" />
          Estatísticas Globais
        </CardTitle>
        <CardDescription>Contagem de todos os simulados realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4">
          <div className="text-center">
            <span className="block text-3xl font-bold text-k21-teal">{totalAttempts}</span>
            <span className="text-sm text-gray-500">simulados completados</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={loadAttempts}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            <span className="sr-only">Atualizar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalStatsCounter;
