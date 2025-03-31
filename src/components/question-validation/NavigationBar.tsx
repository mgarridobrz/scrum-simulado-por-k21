
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface NavigationBarProps {
  currentIndex: number;
  totalQuestions: number;
  filter: string;
  onFilterChange: (value: string) => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onShowAttempts: () => void;
  onLogout: () => void;
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
  onLogout,
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
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="fundamentals">Fundamentos</SelectItem>
              <SelectItem value="roles">Papéis</SelectItem>
              <SelectItem value="events">Eventos</SelectItem>
              <SelectItem value="artifacts">Artefatos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={onNavigateHome}>
            Voltar para início
          </Button>
          <Button variant="destructive" size="sm" onClick={onLogout}>
            Sair
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
