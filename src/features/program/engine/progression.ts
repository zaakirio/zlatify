import type { StageConfig, ExerciseId, RepBasedProgressionRule, RPEBasedProgressionRule } from '../types/program.types';
import type { ProgramState } from '../types/progression.types';
import type { Workout, ProgressionResult } from '../types/workout.types';

interface ProgressionOutput {
  progressionResults: ProgressionResult[];
  updatedState: Partial<ProgramState>;
  phaseTransition?: { from: string; to: string } | null;
  stageTransition?: { from: string; to: string } | null;
  notification?: string;
}

export function calculateProgression(
  workout: Workout,
  programState: ProgramState,
  stageConfig: StageConfig,
): ProgressionOutput {
  const phaseConfig = stageConfig.phases.find(
    (p) => p.phase === programState.currentPhase,
  );
  if (!phaseConfig) {
    return { progressionResults: [], updatedState: {} };
  }

  const results: ProgressionResult[] = [];
  const updatedWeights = {
    pullUp: { ...programState.currentWeights.pullUp },
    dip: { ...programState.currentWeights.dip },
  };
  const updatedStall = {
    pullUp: { ...programState.stallTracker.pullUp },
    dip: { ...programState.stallTracker.dip },
  };

  let phaseTransition: { from: string; to: string } | null = null;
  let stageTransition: { from: string; to: string } | null = null;

  for (const loggedExercise of workout.exercises) {
    const exerciseId = loggedExercise.exerciseId as ExerciseId;
    const exerciseRules = phaseConfig.progressionRules[exerciseId];
    if (!exerciseRules) continue;

    const workingSets = loggedExercise.sets.filter((s) => !s.isWarmup);
    if (workingSets.length === 0) continue;

    // Get the relevant progression rule
    const ruleKey = Object.keys(exerciseRules)[0]; // primary rule
    const rule = exerciseRules[ruleKey];
    if (!rule) continue;

    const weightKey = exerciseId === 'weighted_pull_up' ? 'pullUp' : 'dip';
    const currentWeight = updatedWeights[weightKey].working
      ?? updatedWeights[weightKey].top
      ?? 0;

    if (rule.type === 'rep_based') {
      const result = applyRepBasedProgression(
        exerciseId,
        rule,
        workingSets.map((s) => s.actualReps),
        currentWeight,
        ruleKey,
      );
      results.push(result);

      // Update weight
      const newWeight = currentWeight + result.increment;
      if (updatedWeights[weightKey].working !== undefined) {
        updatedWeights[weightKey].working = newWeight;
      } else {
        updatedWeights[weightKey].top = newWeight;
      }

      // Update stall tracker
      if (result.increment === 0) {
        updatedStall[weightKey].consecutiveStalls += 1;
      } else {
        updatedStall[weightKey].consecutiveStalls = 0;
        updatedStall[weightKey].lastProgressDate = workout.date;
      }

      // Check phase/stage transitions
      const criteria = phaseConfig.advancementCriteria;

      // Check rep floor (e.g., novice P3: 2 reps in any top set → advance)
      if (criteria.type === 'rep_floor') {
        const minReps = Math.min(...workingSets.map((s) => s.actualReps));
        if (minReps <= criteria.threshold) {
          if (criteria.action === 'next_stage') {
            stageTransition = {
              from: programState.currentStage,
              to: getNextStage(programState.currentStage),
            };
          } else {
            phaseTransition = {
              from: programState.currentPhase,
              to: getNextPhase(stageConfig, programState.currentPhase),
            };
          }
        }
      }

      // Check consecutive stall
      if (criteria.type === 'consecutive_stall') {
        if (updatedStall[weightKey].consecutiveStalls > criteria.threshold) {
          if (criteria.action === 'next_phase') {
            phaseTransition = {
              from: programState.currentPhase,
              to: getNextPhase(stageConfig, programState.currentPhase),
            };
          } else if (criteria.action === 'next_stage') {
            stageTransition = {
              from: programState.currentStage,
              to: getNextStage(programState.currentStage),
            };
          }
        }
      }
    } else if (rule.type === 'rpe_based') {
      // RPE-based progression — for intermediate P2 and advanced
      // For now use rep count as proxy until RPE UI is wired
      const result = applyRPEBasedProgression(
        exerciseId,
        rule,
        workingSets,
        currentWeight,
        ruleKey,
      );
      results.push(result);

      if (updatedWeights[weightKey].top !== undefined) {
        updatedWeights[weightKey].top = currentWeight + result.increment;
      }
    }
  }

  const updatedState: Partial<ProgramState> = {
    currentWeights: updatedWeights,
    stallTracker: updatedStall,
  };

  // Apply phase transition
  if (phaseTransition) {
    updatedState.currentPhase = phaseTransition.to as ProgramState['currentPhase'];
    // Reset stall trackers on phase transition
    updatedState.stallTracker = {
      pullUp: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
      dip: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
    };
  }

  // Apply stage transition
  if (stageTransition) {
    updatedState.currentStage = stageTransition.to as ProgramState['currentStage'];
    const firstPhase = getFirstPhase(stageTransition.to);
    updatedState.currentPhase = firstPhase as ProgramState['currentPhase'];
    updatedState.stallTracker = {
      pullUp: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
      dip: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
    };
    updatedState.cycleCounter = 1;
    updatedState.weekInCycle = 0;
    updatedState.sessionInWeek = 0;
  }

  return {
    progressionResults: results,
    updatedState,
    phaseTransition,
    stageTransition,
  };
}

function applyRepBasedProgression(
  exerciseId: ExerciseId,
  rule: RepBasedProgressionRule,
  repCounts: number[],
  currentWeight: number,
  ruleKey: string,
): ProgressionResult {
  // Use the LOWEST rep count across all sets (per Zlat's method)
  const minReps = Math.min(...repCounts);

  // Find the matching threshold (first one where reps >= threshold)
  // Thresholds are sorted high to low
  let increment = 0;
  let matchedRule = 'Hold weight';

  const sortedThresholds = [...rule.repThresholds].sort((a, b) => b.reps - a.reps);
  for (const threshold of sortedThresholds) {
    if (minReps >= threshold.reps) {
      increment = threshold.increment;
      matchedRule = increment > 0
        ? `${minReps} reps → +${increment}kg`
        : `${minReps} reps → hold weight`;
      break;
    }
  }

  return {
    exerciseId,
    setCategory: ruleKey,
    previousWeight: currentWeight,
    newWeight: currentWeight + increment,
    increment,
    repsAchieved: minReps,
    rule: matchedRule,
  };
}

function applyRPEBasedProgression(
  exerciseId: ExerciseId,
  rule: RPEBasedProgressionRule,
  sets: { actualReps: number; rpe?: string }[],
  currentWeight: number,
  ruleKey: string,
): ProgressionResult {
  // Determine RPE from logged sets. Use explicit RPE if available, otherwise infer.
  const rpe = sets[0]?.rpe ?? inferRPE(sets);

  const threshold = rule.rpeThresholds.find((t) => t.rpe === rpe);
  let increment = threshold?.increment ?? 0;
  let matchedRule = `RPE: ${rpe} → ${increment > 0 ? `+${increment}kg` : increment < 0 ? 'deload' : 'hold'}`;

  // Handle deload (failed)
  if (increment === -999) {
    // Deload 5-10%: use 7.5% as default
    increment = -(currentWeight * 0.075);
    increment = Math.round(increment * 4) / 4; // Round to nearest 0.25
    matchedRule = `Failed → deload ${Math.abs(increment)}kg`;
  }

  return {
    exerciseId,
    setCategory: ruleKey,
    previousWeight: currentWeight,
    newWeight: Math.max(0, currentWeight + increment),
    increment,
    repsAchieved: Math.min(...sets.map((s) => s.actualReps)),
    rpeRating: rpe as ProgressionResult['rpeRating'],
    rule: matchedRule,
  };
}

function inferRPE(sets: { actualReps: number }[]): string {
  const minReps = Math.min(...sets.map((s) => s.actualReps));
  if (minReps < 2) return 'failed';
  if (minReps === 2) return 'hard';
  if (minReps === 3) return 'moderate';
  return 'easy';
}

function getNextStage(current: string): string {
  const order = ['novice', 'advanced_novice', 'intermediate', 'advanced'];
  const idx = order.indexOf(current);
  return order[Math.min(idx + 1, order.length - 1)];
}

function getNextPhase(stageConfig: StageConfig, currentPhase: string): string {
  const phases: string[] = stageConfig.phases.map((p) => p.phase);
  const idx = phases.indexOf(currentPhase);
  if (idx < phases.length - 1) return phases[idx + 1];
  // If at last phase, trigger stage transition instead
  return phases[phases.length - 1];
}

function getFirstPhase(stage: string): string {
  const firstPhases: Record<string, string> = {
    novice: 'hypertrophy',
    advanced_novice: 'introductory',
    intermediate: 'one_week_cycle',
    advanced: 'advanced_cycle',
  };
  return firstPhases[stage] ?? 'hypertrophy';
}
