import { db } from '../database';
import type { Workout } from '../../features/program/types/workout.types';

export async function saveWorkout(workout: Workout): Promise<void> {
  await db.workouts.add({
    date: workout.date,
    timestamp: workout.timestamp,
    stage: workout.stage,
    phase: workout.phase,
    sessionType: workout.sessionType,
    weekType: workout.weekType,
    cycleNumber: workout.cycleNumber,
    weekInCycle: workout.weekInCycle,
    dayInWeek: workout.dayInWeek,
    exercises: JSON.stringify(workout.exercises),
    progressionResults: workout.progressionResults
      ? JSON.stringify(workout.progressionResults)
      : undefined,
    notes: workout.notes,
    durationMinutes: workout.durationMinutes,
  });
}

export async function getWorkouts(limit = 50): Promise<Workout[]> {
  const records = await db.workouts
    .orderBy('timestamp')
    .reverse()
    .limit(limit)
    .toArray();

  return records.map((r) => ({
    id: String(r.id),
    date: r.date,
    timestamp: r.timestamp,
    stage: r.stage,
    phase: r.phase,
    sessionType: r.sessionType,
    weekType: r.weekType,
    cycleNumber: r.cycleNumber,
    weekInCycle: r.weekInCycle,
    dayInWeek: r.dayInWeek,
    exercises: JSON.parse(r.exercises),
    progressionResults: r.progressionResults
      ? JSON.parse(r.progressionResults)
      : undefined,
    notes: r.notes,
    durationMinutes: r.durationMinutes,
  })) as Workout[];
}

export async function getWorkoutsByDateRange(
  startDate: string,
  endDate: string,
): Promise<Workout[]> {
  const records = await db.workouts
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray();

  return records.map((r) => ({
    id: String(r.id),
    date: r.date,
    timestamp: r.timestamp,
    stage: r.stage,
    phase: r.phase,
    sessionType: r.sessionType,
    weekType: r.weekType,
    cycleNumber: r.cycleNumber,
    weekInCycle: r.weekInCycle,
    dayInWeek: r.dayInWeek,
    exercises: JSON.parse(r.exercises),
    progressionResults: r.progressionResults
      ? JSON.parse(r.progressionResults)
      : undefined,
    notes: r.notes,
    durationMinutes: r.durationMinutes,
  })) as Workout[];
}

export async function getLastWorkout(): Promise<Workout | null> {
  const workouts = await getWorkouts(1);
  return workouts[0] ?? null;
}

export async function updateWorkout(workout: Workout): Promise<void> {
  await db.workouts.update(Number(workout.id), {
    exercises: JSON.stringify(workout.exercises),
    notes: workout.notes,
  });
}

export async function deleteWorkout(id: string): Promise<void> {
  await db.workouts.delete(Number(id));
}
