import type { ExerciseId } from '../../program/types/program.types';
import { EXERCISE_LABELS } from '../utils/types';
import { cn } from '../../../lib/utils';

const EXERCISES: ExerciseId[] = ['weighted_pull_up', 'weighted_dip'];

interface Props {
  selected: ExerciseId;
  onChange: (id: ExerciseId) => void;
}

export function ExerciseTabs({ selected, onChange }: Props) {
  return (
    <div className="flex rounded-sm border border-border dark:border-border-dark overflow-hidden">
      {EXERCISES.map((id) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'flex-1 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-colors duration-100 tap-target',
            selected === id
              ? 'bg-primary text-black'
              : 'bg-surface text-text-muted dark:bg-surface-secondary-dark dark:text-text-muted-dark',
          )}
        >
          {EXERCISE_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
