
import React from 'react';
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

const QuizProgress = ({
  currentQuestion,
  totalQuestions,
  className,
}: QuizProgressProps) => {
  const { language } = useLanguage();
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {getTranslation(language, 'question')} {currentQuestion} {getTranslation(language, 'of')} {totalQuestions}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-k21-gold to-k21-teal"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
