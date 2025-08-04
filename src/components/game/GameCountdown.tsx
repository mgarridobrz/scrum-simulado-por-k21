import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface GameCountdownProps {
  onComplete: () => void;
  duration?: number; // in seconds
}

export const GameCountdown: React.FC<GameCountdownProps> = ({ onComplete, duration = 3 }) => {
  const [count, setCount] = useState(duration);
  const { language } = useLanguage();

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  if (count <= 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center animate-scale-in">
          <div className="text-4xl font-bold text-primary mb-4">
            {getTranslation(language, 'start')}!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center animate-pulse">
        <div className="text-8xl font-bold text-primary mb-4 animate-scale-in">
          {count}
        </div>
        <div className="text-xl text-muted-foreground">
          {getTranslation(language, 'gameStartingSoon')}
        </div>
      </div>
    </div>
  );
};