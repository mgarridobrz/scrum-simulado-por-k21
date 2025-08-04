import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  isActive: boolean;
  onTick?: (time: number) => void;
  className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = ({ isActive, onTick, className = "" }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10; // Update every 10ms for precision
          onTick?.(newTime);
          return newTime;
        });
      }, 10);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, onTick]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Clock className="h-6 w-6 text-primary" />
      <span className="text-2xl font-mono font-bold text-primary">
        {formatTime(time)}
      </span>
    </div>
  );
};