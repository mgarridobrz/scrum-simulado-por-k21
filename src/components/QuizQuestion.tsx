
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
  onSelectOption: (id: string) => void;
  showResult?: boolean;
  className?: string;
  onContinue?: () => void;
}

const QuizQuestion = ({
  question,
  selectedOption,
  onSelectOption,
  showResult = false,
  className,
  onContinue,
}: QuizQuestionProps) => {
  const isCorrect = selectedOption === question.correctAnswer;
  const isIncorrect = selectedOption && selectedOption !== question.correctAnswer;
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium text-k21-black mb-6">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            id={option.id}
            label={option.text}
            isSelected={selectedOption === option.id}
            isCorrect={option.id === question.correctAnswer}
            showResult={!!selectedOption || showResult}
            onSelect={onSelectOption}
          />
        ))}
      </div>
      
      {selectedOption && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <h4 className="font-medium text-amber-800 mb-1">
            {isCorrect ? "Correto!" : "Incorreto!"} Explicação:
          </h4>
          <p className="text-sm text-amber-700">
            {question.explanation || "Não há explicação disponível para esta questão."}
          </p>
          
          {onContinue && (
            <div className="mt-4 flex justify-end">
              <Button onClick={onContinue}>
                Continuar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
