import { useState } from 'react';
import type { ExerciseId } from '../../program/types/program.types';
import type { MetricType, TimeRange } from '../utils/types';
import { EXERCISE_LABELS } from '../utils/types';
import { useProgressData } from '../hooks/useProgressData';
import { ExerciseTabs } from '../components/ExerciseTabs';
import { SummaryStatCards } from '../components/SummaryStatCards';
import { MetricSelector } from '../components/MetricSelector';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { ProgressChart } from '../components/ProgressChart';
import { SetRecordsTable } from '../components/SetRecordsTable';
import { GraphUp } from 'iconoir-react';

export function ProgressPage() {
  const [exerciseId, setExerciseId] = useState<ExerciseId>('weighted_pull_up');
  const [metric, setMetric] = useState<MetricType>('e1rm');
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');

  const { isLoading, stats, chartData, setRecords, hasData } = useProgressData(
    exerciseId,
    metric,
    timeRange,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-32 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
        <div className="h-11 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
          ))}
        </div>
        <div className="h-[240px] animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold uppercase tracking-widest">Progress</h1>

      <ExerciseTabs selected={exerciseId} onChange={setExerciseId} />

      {!hasData && setRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-sm border border-primary/20 bg-primary/10">
            <GraphUp className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-base font-medium">No data yet</p>
          <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
            Complete workouts to track your {EXERCISE_LABELS[exerciseId]} progress
          </p>
        </div>
      ) : (
        <>
          <SummaryStatCards stats={stats} />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <MetricSelector selected={metric} onChange={setMetric} />
            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
          </div>

          <ProgressChart data={chartData} metric={metric} />

          <SetRecordsTable records={setRecords} />
        </>
      )}
    </div>
  );
}
