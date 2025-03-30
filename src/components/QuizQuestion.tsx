
import React from 'react';
import QuizOption from './QuizOption';
import { cn } from '@/lib/utils';

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
}

const QuizQuestion = ({
  question,
  selectedOption,
  onSelectOption,
  showResult = false,
  className,
}: QuizQuestionProps) => {
  const isIncorrect = showResult && selectedOption && selectedOption !== question.correctAnswer;
  
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
            showResult={showResult}
            onSelect={onSelectOption}
          />
        ))}
      </div>
      
      {showResult && isIncorrect && question.explanation && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <h4 className="font-medium text-amber-800 mb-1">Explicação:</h4>
          <p className="text-sm text-amber-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
