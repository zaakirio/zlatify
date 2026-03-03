import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { NavArrowLeft, Timer, Check } from 'iconoir-react';
import { useUserProfileStore } from '../../../store/user-profile.store';
import { saveWorkout } from '../../../db/repositories/workout.repository';
import { calculateProgression } from '../../program/engine/progression';
import { ALL_STAGES } from '../../program/data/stages';
import type { ExerciseId } from '../../program/types/program.types';
import type { LoggedSet, LoggedExercise, Workout, ProgressionResult } from '../../program/types/workout.types';
import { generateId, formatWeight, formatWeightSigned } from '../../../lib/utils';
import { todayISO } from '../../../lib/date';
import { SetLogger } from '../components/SetLogger';
import { RestTimer } from '../components/RestTimer';
import { WorkoutComplete } from '../components/WorkoutComplete';

type WorkoutStep = 'active' | 'complete';

export function WorkoutPage() {
  const { programState, updateProgramState, loadProgramState } = useUserProfileStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<WorkoutStep>('active');
  const [startTime] = useState(Date.now());
  const [showTimer, setShowTimer] = useState(false);

  const [pullUpSets, setPullUpSets] = useState<LoggedSet[]>([]);
  const [dipSets, setDipSets] = useState<LoggedSet[]>([]);
  const [progressionResults, setProgressionResults] = useState<ProgressionResult[]>([]);

  useEffect(() => {
    if (!programState) {
      loadProgramState();
    }
  }, [programState, loadProgramState]);

  const getTargetSets = useCallback((): { sets: number; reps: [number, number]; hasTopSet: boolean; backOffSets: number; backOffPct: number } => {
    if (!programState) return { sets: 3, reps: [8, 10], hasTopSet: false, backOffSets: 0, backOffPct: 0 };

    switch (programState.currentPhase) {
      case 'hypertrophy':
        return { sets: 3, reps: [8, 10], hasTopSet: false, backOffSets: 0, backOffPct: 0 };
      case 'transition':
        return { sets: 3, reps: [6, 8], hasTopSet: false, backOffSets: 0, backOffPct: 0 };
      case 'strength':
        return { sets: 1, reps: [3, 6], hasTopSet: true, backOffSets: 3, backOffPct: 0.9 };
      case 'introductory':
        return { sets: 4, reps: [3, 6], hasTopSet: false, backOffSets: 0, backOffPct: 0 };
      case 'progressive':
        return { sets: 1, reps: [4, 6], hasTopSet: true, backOffSets: 5, backOffPct: 0.9 };
      default:
        return { sets: 3, reps: [3, 6], hasTopSet: true, backOffSets: 3, backOffPct: 0.9 };
    }
  }, [programState]);

  const target = getTargetSets();

  const getWorkingWeight = (exerciseId: ExerciseId): number => {
    if (!programState) return 0;
    const weights = exerciseId === 'weighted_pull_up'
      ? programState.currentWeights.pullUp
      : programState.currentWeights.dip;
    return weights.working ?? weights.top ?? 0;
  };

  const addSet = (exerciseId: ExerciseId, set: LoggedSet) => {
    if (exerciseId === 'weighted_pull_up') {
      setPullUpSets((prev) => [...prev, set]);
    } else {
      setDipSets((prev) => [...prev, set]);
    }
    setShowTimer(true);
  };

  const handleComplete = async () => {
    if (!programState) return;

    const exercises: LoggedExercise[] = [
      { exerciseId: 'weighted_pull_up', sets: pullUpSets },
      { exerciseId: 'weighted_dip', sets: dipSets },
    ];

    const stageConfig = ALL_STAGES.find((s) => s.stage === programState.currentStage);
    if (!stageConfig) return;

    const workout: Workout = {
      id: generateId(),
      date: todayISO(),
      timestamp: startTime,
      stage: programState.currentStage,
      phase: programState.currentPhase,
      sessionType: 'heavy',
      weekType: 'regular',
      cycleNumber: programState.cycleCounter,
      weekInCycle: programState.weekInCycle,
      dayInWeek: programState.sessionInWeek,
      exercises,
      durationMinutes: Math.round((Date.now() - startTime) / 60000),
    };

    const result = calculateProgression(workout, programState, stageConfig);
    workout.progressionResults = result.progressionResults;
    setProgressionResults(result.progressionResults);

    await saveWorkout(workout);

    await updateProgramState({
      ...result.updatedState,
      sessionInWeek: (programState.sessionInWeek + 1) % 3,
    });

    setStep('complete');
  };

  if (!programState) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="font-mono text-sm text-text-muted dark:text-text-muted-dark">Loading...</div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <WorkoutComplete
        progressionResults={progressionResults}
        onDone={() => navigate('/')}
      />
    );
  }

  const pullUpWeight = getWorkingWeight('weighted_pull_up');
  const dipWeight = getWorkingWeight('weighted_dip');
  const backOffPullUp = target.hasTopSet ? Math.round(pullUpWeight * target.backOffPct * 4) / 4 : pullUpWeight;
  const backOffDip = target.hasTopSet ? Math.round(dipWeight * target.backOffPct * 4) / 4 : dipWeight;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-text-muted dark:text-text-muted-dark tap-target">
          <NavArrowLeft className="h-5 w-5" strokeWidth={1.8} />
          <span className="text-xs uppercase tracking-wider">Back</span>
        </button>
        <div className="font-mono text-sm font-bold tabular-nums">
          {Math.round((Date.now() - startTime) / 60000)}min
        </div>
        <button
          onClick={() => setShowTimer(!showTimer)}
          className="flex items-center gap-1 text-primary tap-target"
        >
          <Timer className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </div>

      {showTimer && (
        <RestTimer
          seconds={programState.currentStage === 'novice' ? 180 : 300}
          onDismiss={() => setShowTimer(false)}
        />
      )}

      {/* Exercise Sections */}
      <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
        {/* Pull Ups */}
        <div className="card p-4">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">Pull Ups</h3>
          <div className="font-mono text-xs text-text-muted dark:text-text-muted-dark mb-3">
            {target.hasTopSet
              ? `1 top ${target.reps[0]}-${target.reps[1]}r @ ${formatWeightSigned(pullUpWeight)} + ${target.backOffSets} back-off @ ${formatWeightSigned(backOffPullUp)}`
              : `${target.sets}x${target.reps[0]}-${target.reps[1]}r @ ${formatWeightSigned(pullUpWeight)}`
            }
          </div>

          {pullUpSets.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-sm bg-surface-secondary p-2.5 mb-2 dark:bg-surface-dark animate-slide-in"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Set {i + 1}</span>
              <span className="font-mono text-sm font-bold tabular-nums">{formatWeight(s.weightKg)} x {s.actualReps}</span>
              <Check className="h-4 w-4 text-primary animate-fade-in" strokeWidth={2.5} />
            </div>
          ))}

          <SetLogger
            exerciseId="weighted_pull_up"
            setNumber={pullUpSets.length + 1}
            suggestedWeight={
              target.hasTopSet && pullUpSets.length >= 1
                ? backOffPullUp
                : pullUpWeight
            }
            targetReps={target.reps}
            setType={target.hasTopSet && pullUpSets.length === 0 ? 'top' : target.hasTopSet ? 'back_off' : 'working'}
            onLog={addSet}
          />
        </div>

        {/* Dips */}
        <div className="card p-4">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">Dips</h3>
          <div className="font-mono text-xs text-text-muted dark:text-text-muted-dark mb-3">
            {target.hasTopSet
              ? `1 top ${target.reps[0]}-${target.reps[1]}r @ ${formatWeightSigned(dipWeight)} + ${target.backOffSets} back-off @ ${formatWeightSigned(backOffDip)}`
              : `${target.sets}x${target.reps[0]}-${target.reps[1]}r @ ${formatWeightSigned(dipWeight)}`
            }
          </div>

          {dipSets.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-sm bg-surface-secondary p-2.5 mb-2 dark:bg-surface-dark animate-slide-in"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Set {i + 1}</span>
              <span className="font-mono text-sm font-bold tabular-nums">{formatWeight(s.weightKg)} x {s.actualReps}</span>
              <Check className="h-4 w-4 text-primary animate-fade-in" strokeWidth={2.5} />
            </div>
          ))}

          <SetLogger
            exerciseId="weighted_dip"
            setNumber={dipSets.length + 1}
            suggestedWeight={
              target.hasTopSet && dipSets.length >= 1
                ? backOffDip
                : dipWeight
            }
            targetReps={target.reps}
            setType={target.hasTopSet && dipSets.length === 0 ? 'top' : target.hasTopSet ? 'back_off' : 'working'}
            onLog={addSet}
          />
        </div>
      </div>

      {/* Complete Button */}
      {pullUpSets.length > 0 && dipSets.length > 0 && (
        <button
          onClick={handleComplete}
          className="w-full rounded-sm bg-primary py-4 font-display text-lg font-bold uppercase tracking-wider text-black transition-transform active:scale-[0.98] md:max-w-sm md:mx-auto"
        >
          Complete Workout
        </button>
      )}
    </div>
  );
}
