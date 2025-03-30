
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
    </div>
  );
};

export default QuizQuestion;
