import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  isActive: boolean;
  onTick?: (time: number) => void;
  className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = ({ isActive, onTick, className = "" }) => {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      // Set start time on first activation
      if (!startTime) {
        setStartTime(Date.now());
      }
      
      interval = setInterval(() => {
        if (startTime) {
          const newTime = Date.now() - startTime;
          setTime(newTime);
          onTick?.(newTime);
        }
      }, 10);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, startTime, onTick]);

  // Reset when component unmounts or game restarts
  useEffect(() => {
    return () => {
      setTime(0);
      setStartTime(null);
    };
  }, []);

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