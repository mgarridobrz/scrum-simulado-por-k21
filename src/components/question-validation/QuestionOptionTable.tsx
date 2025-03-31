
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { QuestionWithCategory } from '@/data/quizData';

interface QuestionOptionTableProps {
  question: QuestionWithCategory;
  editMode: boolean;
  onOptionChange: (id: string, text: string) => void;
  onCorrectAnswerChange: (value: string) => void;
}

const QuestionOptionTable = ({ 
  question, 
  editMode, 
  onOptionChange, 
  onCorrectAnswerChange 
}: QuestionOptionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Texto</TableHead>
          <TableHead className="w-[100px]">Correta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {question.options.map((option) => (
          <TableRow key={option.id}>
            <TableCell>{option.id}</TableCell>
            <TableCell>
              {editMode ? (
                <Input 
                  value={option.text} 
                  onChange={(e) => onOptionChange(option.id, e.target.value)} 
                />
              ) : (
                option.text
              )}
            </TableCell>
            <TableCell>
              {editMode ? (
                <Select 
                  value={question.correctAnswer} 
                  onValueChange={onCorrectAnswerChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map(o => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                option.id === question.correctAnswer ? (
                  <span className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" /> Sim
                  </span>
                ) : (
                  <span className="flex items-center text-muted-foreground">
                    <X size={16} className="mr-1" /> Não
                  </span>
                )
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionOptionTable;
