// Core program structure types for Zlat's weighted calisthenics program

export type Stage = 'novice' | 'advanced_novice' | 'intermediate' | 'advanced';

export type NovicePhase = 'hypertrophy' | 'transition' | 'strength';
export type AdvancedNovicePhase = 'introductory' | 'progressive';
export type IntermediatePhase = 'one_week_cycle' | 'two_week_cycle';
export type AdvancedPhase = 'advanced_cycle';

export type Phase = NovicePhase | AdvancedNovicePhase | IntermediatePhase | AdvancedPhase;

export type ExerciseId = 'weighted_pull_up' | 'weighted_dip';

export type SessionType =
  | 'heavy'
  | 'deload'
  | 'medium'
  | 'volume'
  | 'max'
  | 'accessory'
  | 'recovery'
  | 'preparatory'
  | '1rm_test'
  | 'realization';

export type SetType = 'top' | 'back_off' | 'working' | 'warmup' | 'deload' | '1rm_attempt';

export type RPE = 'easy' | 'moderate' | 'hard' | 'limit' | 'failed';

// Progression Rules
export interface RepBasedProgressionRule {
  type: 'rep_based';
  repThresholds: { reps: number; increment: number }[];
  stallThreshold?: number;
  stallAction: 'phase_transition' | 'deload_and_restart' | 'stage_transition';
}

export interface RPEBasedProgressionRule {
  type: 'rpe_based';
  rpeThresholds: { rpe: RPE; increment: number }[];
  failAction: 'deload_5_10_percent';
}

export type ProgressionRule = RepBasedProgressionRule | RPEBasedProgressionRule;

// Weight calculation methods
export type WeightCalculation =
  | { type: 'absolute' }
  | { type: 'percentage_of_top_set'; pct: number }
  | { type: 'percentage_of_1rm'; pct: number }
  | { type: 'percentage_of_monday_top'; pct: number }
  | { type: 'fixed_offset_from_top'; offsetKg: number }
  | { type: 'percentage_of_3x3'; pct: number };

export interface SetPrescription {
  setType: SetType;
  targetSets: number;
  targetReps: number | [number, number]; // single or range
  weightCalculation: WeightCalculation;
  maxSets?: number;
  executionNotes?: string;
  progressionRule?: ProgressionRule;
}

export interface SessionTemplate {
  sessionType: SessionType;
  dayLabel: string;
  exercises: {
    exerciseId: ExerciseId;
    sets: SetPrescription[];
  }[];
}

export interface WeekTemplate {
  weekLabel: string;
  weekType: 'regular' | '1rm_test' | 'volume' | 'recovery' | 'realization';
  sessions: SessionTemplate[];
}

export interface CycleStructure {
  weeks: WeekTemplate[];
  regularWeeksBeforeTest?: number;
}

export interface AdvancementCriteria {
  type: 'consecutive_stall' | 'rep_floor' | 'consecutive_deloads' | 'no_progress_cycles';
  threshold: number;
  action: 'next_phase' | 'next_stage' | 'deload_then_next_phase';
  description: string;
}

export interface WarmupSet {
  percentageOfWorkingWeight: number;
  reps: number;
}

export interface WarmupProtocol {
  beforeSession: string;
  beforeWorkingSets: WarmupSet[];
  beforeDeload?: WarmupSet[];
  skipThreshold?: number;
}

export interface PhaseConfig {
  phase: Phase;
  displayName: string;
  description: string;
  durationGuideline: string;
  cycleStructure: CycleStructure;
  progressionRules: Record<ExerciseId, Record<string, ProgressionRule>>;
  advancementCriteria: AdvancementCriteria;
  warmupProtocol: WarmupProtocol;
}

export interface StageConfig {
  stage: Stage;
  displayName: string;
  description: string;
  strengthRange: {
    pullUp: { minAddedWeight: number; maxAddedWeight: number; reps: number };
    dip: { minAddedWeight: number; maxAddedWeight: number; reps: number };
  };
  prerequisites?: string;
  usesAbsolutePercentages: boolean;
  phases: PhaseConfig[];
}

// Exercise form guide
export interface ExerciseFormGuide {
  exerciseId: ExerciseId;
  displayName: string;
  musclesWorked: string[];
  steps: { stepNumber: number; title: string; description: string }[];
  mistakes: { mistakeNumber: number; title: string; description: string }[];
}

// Additional exercise categories
export type AdditionalExerciseCategory =
  | 'legs'
  | 'one_arm_pull_ups'
  | 'muscle_ups'
  | 'skill_work'
  | 'bodybuilding'
  | 'core'
  | 'endurance';

export interface AdditionalExercise {
  category: AdditionalExerciseCategory;
  displayName: string;
  description: string;
  recommended: boolean;
  placementRule: 'before_basics' | 'after_basics';
  volumePerStage: Record<Stage, string>;
}
