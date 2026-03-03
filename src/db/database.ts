import Dexie, { type Table } from 'dexie';

export interface DBWorkout {
  id?: number;
  date: string;
  timestamp: number;
  stage: string;
  phase: string;
  sessionType: string;
  weekType: string;
  cycleNumber: number;
  weekInCycle: number;
  dayInWeek: number;
  exercises: string;
  progressionResults?: string;
  notes?: string;
  durationMinutes?: number;
}

export interface DBProgramState {
  id?: string;
  data: string;
  lastUpdated: number;
}

export interface DBUserProfile {
  id?: string;
  data: string;
}

class ZlatifyDatabase extends Dexie {
  workouts!: Table<DBWorkout>;
  programState!: Table<DBProgramState>;
  userProfile!: Table<DBUserProfile>;

  constructor() {
    super('zlatify');
    this.version(1).stores({
      workouts: '++id, date, timestamp, stage, phase, sessionType',
      programState: 'id',
      userProfile: 'id',
    });
  }
}

export const db = new ZlatifyDatabase();
