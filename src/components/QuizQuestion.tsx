import React from 'react';
import QuizOption from './QuizOption';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

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
  const { language } = useLanguage();
  const isCorrect = selectedOption === question.correctAnswer;
  
  const handleOptionSelect = (optionId: string) => {
    onSelectOption(question.id, optionId);
  };

  // Get language-specific text
  const questionText = language === 'en' && (question as any).question_en 
    ? (question as any).question_en 
    : question.question;
  
  const explanationText = language === 'en' && (question as any).explanation_en 
    ? (question as any).explanation_en 
    : (question as any).explanation;
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium text-gray-800 mb-6">{questionText}</h3>
      <div className="space-y-3">
        {question.options.map((option) => {
          const optionText = language === 'en' && (option as any).text_en 
            ? (option as any).text_en 
            : option.text;
          return (
            <QuizOption
              key={option.id}
              id={option.id}
              label={optionText}
              isSelected={selectedOption === option.id}
              isCorrect={option.id === question.correctAnswer}
              showResult={!!selectedOption || showResult}
              onSelect={handleOptionSelect}
            />
          );
        })}
      </div>
      
      {selectedOption && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md shadow-sm">
          <h4 className="font-medium text-blue-800 mb-1">
            {isCorrect ? getTranslation(language, 'correctExplanation') : getTranslation(language, 'incorrectExplanation')}
          </h4>
          <p className="text-sm text-blue-700">
            {explanationText || getTranslation(language, 'noExplanation')}
          </p>
          
          {onContinue && (
            <div className="mt-4 flex justify-end">
              <Button onClick={onContinue} className="bg-k21-teal hover:bg-k21-teal/90 text-white">
                {getTranslation(language, 'continue')}
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
          {getTranslation(language, 'previous')}
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedOption}
          className="bg-k21-teal hover:bg-k21-teal/90"
        >
          {isLastQuestion ? getTranslation(language, 'finish') : getTranslation(language, 'next')}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
