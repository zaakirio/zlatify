import { Trophy, ArrowUp, ArrowRight, Minus } from 'iconoir-react';
import type { ProgressionResult } from '../../program/types/workout.types';
import { formatWeight, formatWeightSigned } from '../../../lib/utils';

interface Props {
  progressionResults: ProgressionResult[];
  onDone: () => void;
}

export function WorkoutComplete({ progressionResults, onDone }: Props) {
  return (
    <>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideCard {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrowSlide {
          0% { opacity: 0; transform: translateX(-6px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-sm bg-primary/10 border border-primary/20"
          style={{ animation: 'bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <Trophy className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>

        <h2
          className="font-display text-2xl font-bold uppercase tracking-wider mb-2"
          style={{ animation: 'slideUp 0.4s ease-out 0.3s both' }}
        >
          Workout Complete
        </h2>
        <p
          className="text-text-muted dark:text-text-muted-dark mb-6 text-sm"
          style={{ animation: 'fadeIn 0.4s ease-out 0.5s both' }}
        >
          Progression results:
        </p>

        <div className="w-full space-y-3 mb-8">
          {progressionResults.map((r, index) => (
            <div
              key={`${r.exerciseId}-${r.setCategory}`}
              className="rounded-sm border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark"
              style={{ animation: `slideCard 0.4s ease-out ${0.6 + index * 0.15}s both` }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-display font-bold uppercase tracking-wide">
                    {r.exerciseId === 'weighted_pull_up' ? 'Pull Ups' : 'Dips'}
                  </div>
                  <div className="text-[11px] text-text-muted dark:text-text-muted-dark">
                    {r.rule}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {r.increment > 0 ? (
                    <>
                      <ArrowUp className="h-5 w-5 text-primary" strokeWidth={2} />
                      <span
                        className="font-mono text-3xl font-bold tabular-nums text-primary"
                        style={{ animation: 'pulseGlow 0.8s ease-in-out 2' }}
                      >
                        +{formatWeight(r.increment)}
                      </span>
                    </>
                  ) : r.increment === 0 ? (
                    <>
                      <Minus className="h-4 w-4 text-warning" strokeWidth={2} />
                      <span className="font-display text-lg font-bold uppercase text-warning">Hold</span>
                    </>
                  ) : (
                    <span
                      className="font-mono text-3xl font-bold tabular-nums text-danger"
                      style={{ animation: 'pulseGlow 0.8s ease-in-out 2' }}
                    >
                      {formatWeightSigned(r.increment)}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 font-mono text-sm text-text-muted dark:text-text-muted-dark">
                <span className="tabular-nums">{formatWeightSigned(r.previousWeight)}</span>
                <ArrowRight
                  className="h-4 w-4 text-text-muted dark:text-text-muted-dark"
                  strokeWidth={1.5}
                  style={{ animation: `arrowSlide 0.3s ease-out ${0.8 + index * 0.15}s both` }}
                />
                <span className="font-bold tabular-nums text-text dark:text-text-dark">
                  {formatWeightSigned(r.newWeight)}
                </span>
                <span className="ml-1 text-xs">({r.repsAchieved}r)</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onDone}
          className="w-full rounded-sm bg-primary py-4 font-display text-lg font-bold uppercase tracking-wider text-black transition-transform active:scale-[0.98]"
          style={{ animation: 'fadeIn 0.4s ease-out 1s both' }}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
}
