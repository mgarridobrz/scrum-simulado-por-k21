
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizScoreCounterProps {
  correctCount: number;
  incorrectCount: number;
}

const QuizScoreCounter = ({ correctCount, incorrectCount }: QuizScoreCounterProps) => {
  return (
    <div className="flex items-center justify-between gap-3 py-3 px-4 mb-6 bg-gray-100 rounded-lg border border-gray-200 shadow-inner">
      <h3 className="text-sm font-semibold text-gray-700">Seu progresso:</h3>
      <div className="flex items-center gap-3">
        <Badge variant="default" className="bg-green-600 text-white flex items-center gap-1.5 px-3 py-1.5 shadow-sm">
          <CheckCircle size={16} />
          <span className="font-bold">{correctCount}</span>
        </Badge>
        <Badge variant="default" className="bg-red-600 text-white flex items-center gap-1.5 px-3 py-1.5 shadow-sm">
          <XCircle size={16} />
          <span className="font-bold">{incorrectCount}</span>
        </Badge>
      </div>
    </div>
  );
};

export default QuizScoreCounter;
