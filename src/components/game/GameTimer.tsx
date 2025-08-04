import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  isActive: boolean;
  onTick?: (time: number) => void;
  className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = ({ isActive, onTick, className = "" }) => {
  const [time, setTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      // Start timing from now
      const now = Date.now();
      setLastActiveTime(now);
      
      interval = setInterval(() => {
        const currentTime = Date.now();
        const newTime = accumulatedTime + (currentTime - now);
        setTime(newTime);
        onTick?.(newTime);
      }, 10);
    } else if (lastActiveTime) {
      // Paused - accumulate the time that passed
      const now = Date.now();
      const timeToAdd = now - lastActiveTime;
      setAccumulatedTime(prev => prev + timeToAdd);
      setTime(prev => prev + timeToAdd);
      setLastActiveTime(null);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, onTick]);

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      setTime(0);
      setLastActiveTime(null);
      setAccumulatedTime(0);
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