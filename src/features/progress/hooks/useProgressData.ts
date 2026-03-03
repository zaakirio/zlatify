import { useEffect, useMemo, useState } from 'react';
import type { ExerciseId } from '../../program/types/program.types';
import type { Workout } from '../../program/types/workout.types';
import { getWorkouts } from '../../../db/repositories/workout.repository';
import {
  buildChartData,
  buildSetRecords,
  computeSummaryStats,
  filterWorkoutsByRange,
} from '../utils/calculations';
import type { ChartDataPoint, MetricType, SetRecord, SummaryStats, TimeRange } from '../utils/types';

interface ProgressData {
  isLoading: boolean;
  stats: SummaryStats;
  chartData: ChartDataPoint[];
  setRecords: SetRecord[];
  hasData: boolean;
}

const EMPTY_STATS: SummaryStats = {
  currentE1RM: null,
  e1rmDelta: null,
  maxWeightPR: null,
  maxWeightDate: null,
  totalVolume: 0,
  volumeDelta: null,
  workoutCount: 0,
  workoutCountDelta: null,
};

export function useProgressData(
  exerciseId: ExerciseId,
  metric: MetricType,
  timeRange: TimeRange,
): ProgressData {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getWorkouts(500).then((workouts) => {
      if (!cancelled) {
        setAllWorkouts(workouts);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(
    () => filterWorkoutsByRange(allWorkouts, timeRange),
    [allWorkouts, timeRange],
  );

  const stats = useMemo(
    () => (allWorkouts.length > 0
      ? computeSummaryStats(allWorkouts, exerciseId, timeRange)
      : EMPTY_STATS),
    [allWorkouts, exerciseId, timeRange],
  );

  const chartData = useMemo(
    () => buildChartData(filtered, exerciseId, metric),
    [filtered, exerciseId, metric],
  );

  const setRecords = useMemo(
    () => buildSetRecords(allWorkouts, exerciseId),
    [allWorkouts, exerciseId],
  );

  const hasData = chartData.length > 0;

  return { isLoading, stats, chartData, setRecords, hasData };
}
