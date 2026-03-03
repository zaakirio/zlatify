import { useEffect, useState } from 'react';
import { Gym } from 'iconoir-react';
import { getWorkouts } from '../../../db/repositories/workout.repository';
import type { Workout } from '../../program/types/workout.types';
import { formatDate } from '../../../lib/date';
import { sessionTypeDisplayName, formatWeightSigned } from '../../../lib/utils';

const stageAccentBorders: Record<string, string> = {
  novice: 'border-l-[#c8ff00]',
  advanced_novice: 'border-l-[#00d4ff]',
  intermediate: 'border-l-[#a855f7]',
  advanced: 'border-l-[#ff6b00]',
};

const stageProgressionStyles: Record<string, string> = {
  novice: 'bg-[#c8ff00]/10 text-[#c8ff00]',
  advanced_novice: 'bg-[#00d4ff]/10 text-[#00d4ff]',
  intermediate: 'bg-[#a855f7]/10 text-[#a855f7]',
  advanced: 'bg-[#ff6b00]/10 text-[#ff6b00]',
};

export function RecentWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getWorkouts(5).then(setWorkouts);
  }, []);

  if (workouts.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark">
        <div className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-3">
          Recent
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-sm bg-primary/10">
            <Gym className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium">No workouts yet</p>
          <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">Complete your first session to track progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark">
      <div className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-3">
        Recent
      </div>
      <div className="space-y-1.5">
        {workouts.map((w) => {
          const topPullUp = w.exercises
            .find((e) => e.exerciseId === 'weighted_pull_up')
            ?.sets.filter((s) => !s.isWarmup)[0];
          const topDip = w.exercises
            .find((e) => e.exerciseId === 'weighted_dip')
            ?.sets.filter((s) => !s.isWarmup)[0];

          const accentBorder = stageAccentBorders[w.stage] ?? 'border-l-[#666]';
          const progressionStyle = stageProgressionStyles[w.stage] ?? 'bg-white/5 text-white/60';

          const pullUpProgression = w.progressionResults?.find(
            (p) => p.exerciseId === 'weighted_pull_up'
          );
          const dipProgression = w.progressionResults?.find(
            (p) => p.exerciseId === 'weighted_dip'
          );

          return (
            <div
              key={w.id}
              className={`flex items-center justify-between rounded-sm border-l-2 ${accentBorder} bg-surface-secondary p-3 dark:bg-surface-dark`}
            >
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {sessionTypeDisplayName(w.sessionType)}
                </div>
                <div className="font-mono text-[11px] text-text-muted dark:text-text-muted-dark">
                  {formatDate(w.date)}
                </div>
                {(pullUpProgression || dipProgression) && (
                  <div className="mt-1.5 flex gap-1.5">
                    {pullUpProgression && pullUpProgression.increment !== 0 && (
                      <span className={`inline-flex items-center gap-0.5 rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold ${progressionStyle}`}>
                        PU {pullUpProgression.increment > 0 ? '+' : ''}{pullUpProgression.increment}kg
                      </span>
                    )}
                    {dipProgression && dipProgression.increment !== 0 && (
                      <span className={`inline-flex items-center gap-0.5 rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold ${progressionStyle}`}>
                        Dip {dipProgression.increment > 0 ? '+' : ''}{dipProgression.increment}kg
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-right font-mono text-xs">
                {topPullUp && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">PU</div>
                    <div className="font-bold tabular-nums">
                      {formatWeightSigned(topPullUp.weightKg)} x{topPullUp.actualReps}
                    </div>
                  </div>
                )}
                {topDip && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Dip</div>
                    <div className="font-bold tabular-nums">
                      {formatWeightSigned(topDip.weightKg)} x{topDip.actualReps}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
