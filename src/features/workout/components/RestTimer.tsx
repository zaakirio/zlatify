import { useState, useEffect, useRef } from 'react';
import { Xmark } from 'iconoir-react';

interface Props {
  seconds: number;
  onDismiss: () => void;
}

const RADIUS = 52;
const STROKE_WIDTH = 4;
const SIZE = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RestTimer({ seconds, onDismiss }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setRemaining(seconds);
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [seconds]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const offset = CIRCUMFERENCE * (1 - remaining / seconds);
  const isUrgent = remaining > 0 && remaining <= 30;
  const isFinished = remaining === 0;

  return (
    <div className="rounded-sm border border-border bg-surface/95 backdrop-blur-sm p-6 dark:border-border-dark dark:bg-surface-secondary-dark/95">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
          Rest Timer
        </span>
        <button
          onClick={onDismiss}
          className="text-text-muted dark:text-text-muted-dark hover:text-text dark:hover:text-text-dark"
        >
          <Xmark className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="transform -rotate-90"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              stroke="#252525"
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="butt"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              stroke={isUrgent ? '#ff9500' : '#c8ff00'}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {isFinished ? (
              <span className="font-display text-3xl font-bold text-primary uppercase animate-bounce">
                GO
              </span>
            ) : (
              <span
                className={`font-mono text-3xl font-bold tabular-nums ${
                  isUrgent
                    ? 'text-warning'
                    : 'text-text dark:text-text-dark'
                }`}
              >
                {mins}:{secs.toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
