
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizScoreCounterProps {
  correctCount: number;
  incorrectCount: number;
}

const QuizScoreCounter = ({ correctCount, incorrectCount }: QuizScoreCounterProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/90 p-2 rounded-md shadow-sm border fixed top-4 right-4 z-50">
      <Badge variant="default" className="bg-green-500 flex items-center gap-1">
        <CheckCircle size={14} />
        <span>{correctCount}</span>
      </Badge>
      <Badge variant="default" className="bg-red-500 flex items-center gap-1">
        <XCircle size={14} />
        <span>{incorrectCount}</span>
      </Badge>
    </div>
  );
};

export default QuizScoreCounter;
