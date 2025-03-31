
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestionFiltersProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

const QuestionFilters = ({ filter, onFilterChange }: QuestionFiltersProps) => {
  return (
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
  );
};

export default QuestionFilters;
