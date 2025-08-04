import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, Target, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface GameResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  totalTimeMs: number;
  penaltyTimeMs: number;
  finalScoreMs: number;
  category: string;
  onPlayAgain: () => void;
  onViewRanking: () => void;
  onBackToHome: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({
  correctAnswers,
  totalQuestions,
  totalTimeMs,
  penaltyTimeMs,
  finalScoreMs,
  category,
  onPlayAgain,
  onViewRanking,
  onBackToHome
}) => {
  const { language } = useLanguage();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isGoodScore = percentage >= 70;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`text-6xl mb-4 ${isGoodScore ? 'text-green-500' : 'text-orange-500'}`}>
          {isGoodScore ? '🎉' : '💪'}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {isGoodScore ? getTranslation(language, 'congratulations') : getTranslation(language, 'tryAgain')}
        </h2>
        <Badge variant={isGoodScore ? "default" : "secondary"} className="text-lg px-4 py-2">
          {percentage}% {getTranslation(language, 'correct')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslation(language, 'correct')}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">
                {formatTime(totalTimeMs)}
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslation(language, 'totalTime')}
              </div>
            </div>
          </div>
        </Card>

        {penaltyTimeMs > 0 && (
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  +{formatTime(penaltyTimeMs)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getTranslation(language, 'penaltyTime')}
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">
                {formatTime(finalScoreMs)}
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslation(language, 'finalScore')}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-4">
          {category}
        </Badge>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button onClick={onPlayAgain} className="w-full">
            {getTranslation(language, 'restartQuiz')}
          </Button>
          
          <Button onClick={onViewRanking} variant="outline" className="w-full">
            {getTranslation(language, 'gameRanking')}
          </Button>
          
          <Button onClick={onBackToHome} variant="secondary" className="w-full">
            {getTranslation(language, 'backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};