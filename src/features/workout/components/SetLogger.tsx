import { useState } from 'react';
import { Plus, Minus } from 'iconoir-react';
import type { ExerciseId, SetType } from '../../program/types/program.types';
import type { LoggedSet } from '../../program/types/workout.types';
import { generateId } from '../../../lib/utils';

interface Props {
  exerciseId: ExerciseId;
  setNumber: number;
  suggestedWeight: number;
  targetReps: [number, number];
  setType: SetType;
  onLog: (exerciseId: ExerciseId, set: LoggedSet) => void;
}

export function SetLogger({ exerciseId, setNumber, suggestedWeight, targetReps, setType, onLog }: Props) {
  const [weight, setWeight] = useState(suggestedWeight);
  const [reps, setReps] = useState(targetReps[1]);

  const adjustWeight = (delta: number) => {
    setWeight((w) => Math.max(0, Math.round((w + delta) * 100) / 100));
  };

  const adjustReps = (delta: number) => {
    setReps((r) => Math.max(0, r + delta));
  };

  const handleLog = () => {
    const set: LoggedSet = {
      id: generateId(),
      setNumber,
      setType,
      targetReps,
      actualReps: reps,
      weightKg: weight,
      isWarmup: false,
      timestamp: Date.now(),
    };
    onLog(exerciseId, set);
    setReps(targetReps[1]);
  };

  return (
    <div className="rounded-sm border border-dashed border-border p-3 dark:border-border-dark">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
        Set {setNumber} {setType === 'top' ? '// TOP SET' : setType === 'back_off' ? '// BACK-OFF' : ''}
      </div>

      <div className="flex items-center gap-3">
        {/* Weight Control */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Weight (kg)</div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => adjustWeight(-1.25)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border dark:border-border-dark active:bg-primary active:text-black transition-all duration-75"
            >
              <Minus className="h-4 w-4" strokeWidth={2} />
            </button>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-14 min-w-0 rounded-sm border border-border bg-surface-secondary px-1 py-1.5 text-center font-mono tabular-nums text-base font-bold dark:border-border-dark dark:bg-surface-dark"
              step={1.25}
              min={0}
            />
            <button
              onClick={() => adjustWeight(1.25)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border dark:border-border-dark active:bg-primary active:text-black transition-all duration-75"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Reps Control */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Reps</div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => adjustReps(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border dark:border-border-dark active:bg-primary active:text-black transition-all duration-75"
            >
              <Minus className="h-4 w-4" strokeWidth={2} />
            </button>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="w-10 min-w-0 rounded-sm border border-border bg-surface-secondary px-1 py-1.5 text-center font-mono tabular-nums text-base font-bold dark:border-border-dark dark:bg-surface-dark"
              min={0}
              max={30}
            />
            <button
              onClick={() => adjustReps(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border dark:border-border-dark active:bg-primary active:text-black transition-all duration-75"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleLog}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-sm font-bold uppercase tracking-wider text-black active:scale-[0.98] transition-transform"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Log Set
      </button>
    </div>
  );
}
