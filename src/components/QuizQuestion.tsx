
import React from 'react';
import QuizOption from './QuizOption';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface QuestionType {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizQuestionProps {
  question: QuestionType;
  selectedOption: string | null;
  onSelectOption: (questionId: number, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  showResult?: boolean;
  className?: string;
  onContinue?: () => void;
}

const QuizQuestion = ({
  question,
  selectedOption,
  onSelectOption,
  onNext,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
  showResult = false,
  className,
  onContinue,
}: QuizQuestionProps) => {
  const isCorrect = selectedOption === question.correctAnswer;
  
  const handleOptionSelect = (optionId: string) => {
    onSelectOption(question.id, optionId);
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            id={option.id}
            label={option.text}
            isSelected={selectedOption === option.id}
            isCorrect={option.id === question.correctAnswer}
            showResult={!!selectedOption || showResult}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>
      
      {selectedOption && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md shadow-sm">
          <h4 className="font-medium text-blue-800 mb-1">
            {isCorrect ? "Correto!" : "Incorreto!"} Explicação:
          </h4>
          <p className="text-sm text-blue-700">
            {question.explanation || "Não há explicação disponível para esta questão."}
          </p>
          
          {onContinue && (
            <div className="mt-4 flex justify-end">
              <Button onClick={onContinue} className="bg-k21-teal hover:bg-k21-teal/90 text-white">
                Continuar
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedOption}
          className="bg-k21-teal hover:bg-k21-teal/90"
        >
          {isLastQuestion ? 'Finalizar' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
