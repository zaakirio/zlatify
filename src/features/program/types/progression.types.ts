import type { Phase, Stage } from './program.types';

export interface StallRecord {
  consecutiveStalls: number;
  consecutiveDeloads: number;
  cyclesWithoutProgress: number;
  lastProgressDate?: string;
}

export interface ProgramState {
  id: string;
  currentStage: Stage;
  currentPhase: Phase;
  bodyweightKg: number;
  oneRepMax: {
    pullUp: number;
    dip: number;
  };
  currentWeights: {
    pullUp: Record<string, number>;
    dip: Record<string, number>;
  };
  stallTracker: {
    pullUp: StallRecord;
    dip: StallRecord;
  };
  cycleCounter: number;
  weekInCycle: number;
  sessionInWeek: number;
  weeksSinceLast1RMTest: number;
  cycleIncrements?: {
    pullUp: number;
    dip: number;
  };
  lastUpdated: number;
}

export interface UserProfile {
  id: string;
  name?: string;
  bodyweightKg: number;
  bodyweightHistory: { date: string; weightKg: number }[];
  createdAt: number;
  isOnboarded: boolean;
  unitPreference: 'kg' | 'lbs';
  restTimerSeconds: number;
}
