
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import QuestionFilters from './QuestionFilters';

interface NavigationBarProps {
  currentIndex: number;
  totalQuestions: number;
  filter: string;
  onFilterChange: (value: string) => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onShowAttempts: () => void;
  onNavigateHome: () => void;
}

const NavigationBar = ({
  currentIndex,
  totalQuestions,
  filter,
  onFilterChange,
  onNavigatePrevious,
  onNavigateNext,
  onShowAttempts,
  onNavigateHome
}: NavigationBarProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Validação de Perguntas do Quiz</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShowAttempts}
            className="flex items-center gap-1"
          >
            <FileText size={16} />
            Listar Tentativas
          </Button>
          <QuestionFilters filter={filter} onFilterChange={onFilterChange} />
          <Button variant="outline" onClick={onNavigateHome}>
            Voltar para início
          </Button>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Questão {currentIndex + 1} de {totalQuestions}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNavigatePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1" size={16} /> Anterior
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNavigateNext}
            disabled={currentIndex === totalQuestions - 1}
          >
            Próxima <ChevronRight className="ml-1" size={16} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
