import type { ExerciseId } from '../../program/types/program.types';
import type { LoggedSet, Workout } from '../../program/types/workout.types';
import type { ChartDataPoint, MetricType, SetRecord, SummaryStats, TimeRange } from './types';
import { formatDateShort, getDateNMonthsAgo } from '../../../lib/date';

// --- 1RM Estimation ---

export function calculateE1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  if (reps <= 10) {
    // Brzycki formula
    return weightKg * (36 / (37 - reps));
  }
  // Epley formula
  return weightKg * (1 + reps / 30);
}

// --- Per-workout extractors ---

function workingSets(sets: LoggedSet[]): LoggedSet[] {
  return sets.filter((s) => !s.isWarmup && s.actualReps > 0);
}

export function bestE1RMFromSets(sets: LoggedSet[]): number {
  const working = workingSets(sets);
  if (working.length === 0) return 0;
  return Math.max(...working.map((s) => calculateE1RM(s.weightKg, s.actualReps)));
}

export function maxWeightFromSets(sets: LoggedSet[]): number {
  const working = workingSets(sets);
  if (working.length === 0) return 0;
  return Math.max(...working.map((s) => s.weightKg));
}

export function volumeFromSets(sets: LoggedSet[]): number {
  return workingSets(sets).reduce((sum, s) => sum + s.weightKg * s.actualReps, 0);
}

// --- Time range helpers ---

function getStartDate(timeRange: TimeRange): Date | null {
  switch (timeRange) {
    case '1m': return new Date(getDateNMonthsAgo(1) + 'T00:00:00');
    case '3m': return new Date(getDateNMonthsAgo(3) + 'T00:00:00');
    case '6m': return new Date(getDateNMonthsAgo(6) + 'T00:00:00');
    case '1y': return new Date(getDateNMonthsAgo(12) + 'T00:00:00');
    case 'all': return null;
  }
}

function getPreviousPeriodRange(timeRange: TimeRange): { start: Date; end: Date } | null {
  if (timeRange === 'all') return null;
  const months = { '1m': 1, '3m': 3, '6m': 6, '1y': 12 }[timeRange];
  return {
    start: new Date(getDateNMonthsAgo(months * 2) + 'T00:00:00'),
    end: new Date(getDateNMonthsAgo(months) + 'T00:00:00'),
  };
}

export function filterWorkoutsByRange(workouts: Workout[], timeRange: TimeRange): Workout[] {
  const start = getStartDate(timeRange);
  if (!start) return workouts;
  return workouts.filter((w) => new Date(w.date + 'T12:00:00') >= start);
}

function filterWorkoutsByDateRange(workouts: Workout[], start: Date, end: Date): Workout[] {
  return workouts.filter((w) => {
    const d = new Date(w.date + 'T12:00:00');
    return d >= start && d < end;
  });
}

// --- Chart data builders ---

function getMetricValue(sets: LoggedSet[], metric: MetricType): number {
  switch (metric) {
    case 'e1rm': return bestE1RMFromSets(sets);
    case 'max_weight': return maxWeightFromSets(sets);
    case 'volume': return volumeFromSets(sets);
  }
}

export function buildChartData(
  workouts: Workout[],
  exerciseId: ExerciseId,
  metric: MetricType,
): ChartDataPoint[] {
  const points: ChartDataPoint[] = [];

  for (const w of workouts) {
    const exercise = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (!exercise) continue;
    const working = workingSets(exercise.sets);
    if (working.length === 0) continue;

    const value = getMetricValue(exercise.sets, metric);
    if (value <= 0) continue;

    points.push({
      date: w.date,
      value: Math.round(value * 100) / 100,
      label: formatDateShort(w.date),
      isPR: false,
    });
  }

  // Sort chronologically
  points.sort((a, b) => a.date.localeCompare(b.date));
  return markPRPoints(points);
}

export function markPRPoints(data: ChartDataPoint[]): ChartDataPoint[] {
  let maxSoFar = -Infinity;
  return data.map((point) => {
    if (point.value > maxSoFar) {
      maxSoFar = point.value;
      return { ...point, isPR: true };
    }
    return point;
  });
}

// --- Set records ---

export function buildSetRecords(
  workouts: Workout[],
  exerciseId: ExerciseId,
): SetRecord[] {
  const records = new Map<number, SetRecord>();

  for (const workout of workouts) {
    const exercise = workout.exercises.find((e) => e.exerciseId === exerciseId);
    if (!exercise) continue;

    for (const set of exercise.sets) {
      if (set.isWarmup || set.actualReps <= 0) continue;
      const existing = records.get(set.actualReps);
      if (!existing || set.weightKg > existing.bestWeight) {
        records.set(set.actualReps, {
          reps: set.actualReps,
          bestWeight: set.weightKg,
          date: workout.date,
          e1rm: Math.round(calculateE1RM(set.weightKg, set.actualReps) * 100) / 100,
        });
      }
    }
  }

  return Array.from(records.values()).sort((a, b) => a.reps - b.reps);
}

// --- Summary stats ---

export function computeSummaryStats(
  workouts: Workout[],
  exerciseId: ExerciseId,
  timeRange: TimeRange,
): SummaryStats {
  const current = filterWorkoutsByRange(workouts, timeRange);
  const previousRange = getPreviousPeriodRange(timeRange);
  const previous = previousRange
    ? filterWorkoutsByDateRange(workouts, previousRange.start, previousRange.end)
    : [];

  // Current period metrics
  const currentE1RMs = current
    .map((w) => {
      const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
      return ex ? bestE1RMFromSets(ex.sets) : 0;
    })
    .filter((v) => v > 0);

  const currentMaxWeights = current
    .map((w) => {
      const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
      if (!ex) return { weight: 0, date: w.date };
      return { weight: maxWeightFromSets(ex.sets), date: w.date };
    })
    .filter((v) => v.weight > 0);

  const currentVolume = current.reduce((sum, w) => {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    return sum + (ex ? volumeFromSets(ex.sets) : 0);
  }, 0);

  // Previous period metrics
  const prevE1RMs = previous
    .map((w) => {
      const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
      return ex ? bestE1RMFromSets(ex.sets) : 0;
    })
    .filter((v) => v > 0);

  const prevVolume = previous.reduce((sum, w) => {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    return sum + (ex ? volumeFromSets(ex.sets) : 0);
  }, 0);

  const prevWorkoutCount = previous.filter((w) =>
    w.exercises.some((e) => e.exerciseId === exerciseId),
  ).length;

  const currentE1RM = currentE1RMs.length > 0 ? Math.max(...currentE1RMs) : null;
  const prevE1RM = prevE1RMs.length > 0 ? Math.max(...prevE1RMs) : null;

  const maxWeightEntry = currentMaxWeights.reduce<{ weight: number; date: string } | null>(
    (best, curr) => (!best || curr.weight > best.weight ? curr : best),
    null,
  );

  const workoutCount = current.filter((w) =>
    w.exercises.some((e) => e.exerciseId === exerciseId),
  ).length;

  return {
    currentE1RM: currentE1RM ? Math.round(currentE1RM * 10) / 10 : null,
    e1rmDelta:
      currentE1RM && prevE1RM ? Math.round((currentE1RM - prevE1RM) * 10) / 10 : null,
    maxWeightPR: maxWeightEntry?.weight ?? null,
    maxWeightDate: maxWeightEntry?.date ?? null,
    totalVolume: Math.round(currentVolume),
    volumeDelta: previousRange ? Math.round(currentVolume - prevVolume) : null,
    workoutCount,
    workoutCountDelta: previousRange ? workoutCount - prevWorkoutCount : null,
  };
}
