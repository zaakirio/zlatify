import type { ExerciseId } from '../../program/types/program.types';

export type TimeRange = '1m' | '3m' | '6m' | '1y' | 'all';
export type MetricType = 'e1rm' | 'max_weight' | 'volume';

export interface ChartDataPoint {
  date: string;
  value: number;
  label: string;
  isPR: boolean;
}

export interface SetRecord {
  reps: number;
  bestWeight: number;
  date: string;
  e1rm: number;
}

export interface SummaryStats {
  currentE1RM: number | null;
  e1rmDelta: number | null;
  maxWeightPR: number | null;
  maxWeightDate: string | null;
  totalVolume: number;
  volumeDelta: number | null;
  workoutCount: number;
  workoutCountDelta: number | null;
}

export const EXERCISE_LABELS: Record<ExerciseId, string> = {
  weighted_pull_up: 'Pull-Up',
  weighted_dip: 'Dip',
};

export const METRIC_LABELS: Record<MetricType, string> = {
  e1rm: 'Est. 1RM',
  max_weight: 'Max Weight',
  volume: 'Volume',
};

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '1m': '1M',
  '3m': '3M',
  '6m': '6M',
  '1y': '1Y',
  all: 'ALL',
};
