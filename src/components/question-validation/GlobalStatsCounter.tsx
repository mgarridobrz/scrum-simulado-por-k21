
import React, { useEffect, useState } from 'react';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

const GlobalStatsCounter = () => {
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  
  useEffect(() => {
    // Get all quiz attempts and count them
    const attempts = getTrackedQuizAttempts();
    setTotalAttempts(attempts.length);
    
    // Add event listener to update when storage changes
    const handleStorageChange = () => {
      const updatedAttempts = getTrackedQuizAttempts();
      setTotalAttempts(updatedAttempts.length);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
        <div className="flex items-center justify-center p-4">
          <div className="text-center">
            <span className="block text-3xl font-bold text-k21-teal">{totalAttempts}</span>
            <span className="text-sm text-gray-500">simulados completados</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalStatsCounter;
