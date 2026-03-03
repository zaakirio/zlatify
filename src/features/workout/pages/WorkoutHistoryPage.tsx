import { useEffect, useState, useCallback } from 'react';
import { ClockRotateRight, EditPencil, Check, Xmark } from 'iconoir-react';
import { getWorkouts, updateWorkout } from '../../../db/repositories/workout.repository';
import type { Workout, LoggedSet } from '../../program/types/workout.types';
import { formatDate, formatDuration } from '../../../lib/date';
import { sessionTypeDisplayName, formatWeightSigned, stageDisplayName } from '../../../lib/utils';

function SetEditor({
  set,
  onChange,
}: {
  set: LoggedSet;
  onChange: (updated: LoggedSet) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="0.25"
        value={set.weightKg}
        onChange={(e) => onChange({ ...set, weightKg: parseFloat(e.target.value) || 0 })}
        className="w-20 rounded-sm border border-border bg-surface-secondary px-2 py-1.5 font-mono text-sm tabular-nums text-right focus:border-primary focus:outline-none dark:border-border-dark dark:bg-surface-dark"
      />
      <span className="text-[10px] text-text-muted dark:text-text-muted-dark">kg</span>
      <span className="text-text-muted dark:text-text-muted-dark">&times;</span>
      <input
        type="number"
        step="1"
        min="0"
        value={set.actualReps}
        onChange={(e) => onChange({ ...set, actualReps: parseInt(e.target.value) || 0 })}
        className="w-14 rounded-sm border border-border bg-surface-secondary px-2 py-1.5 font-mono text-sm tabular-nums text-right focus:border-primary focus:outline-none dark:border-border-dark dark:bg-surface-dark"
      />
      <span className="text-[10px] text-text-muted dark:text-text-muted-dark">reps</span>
    </div>
  );
}

function WorkoutCard({
  workout,
  onSave,
}: {
  workout: Workout;
  onSave: (updated: Workout) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(workout);

  const handleSetChange = useCallback(
    (exerciseId: string, setIndex: number, updatedSet: LoggedSet) => {
      setDraft((prev) => ({
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exerciseId === exerciseId
            ? { ...ex, sets: ex.sets.map((s, i) => (i === setIndex ? updatedSet : s)) }
            : ex,
        ),
      }));
    },
    [],
  );

  const handleSave = async () => {
    await updateWorkout(draft);
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(workout);
    setEditing(false);
  };

  const topPullUp = workout.exercises
    .find((e) => e.exerciseId === 'weighted_pull_up')
    ?.sets.filter((s) => !s.isWarmup)[0];
  const topDip = workout.exercises
    .find((e) => e.exerciseId === 'weighted_dip')
    ?.sets.filter((s) => !s.isWarmup)[0];

  return (
    <div className="rounded-sm border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-display font-bold uppercase tracking-wide">
            {sessionTypeDisplayName(workout.sessionType)}
          </div>
          <div className="font-mono text-[11px] text-text-muted dark:text-text-muted-dark">
            {formatDate(workout.date)} &middot; {stageDisplayName(workout.stage as 'novice')}
            {workout.durationMinutes ? ` // ${formatDuration(workout.durationMinutes)}` : ''}
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-secondary hover:text-text dark:text-text-muted-dark dark:hover:bg-surface-dark dark:hover:text-text-dark"
          >
            <EditPencil className="h-4 w-4" strokeWidth={1.8} />
          </button>
        ) : (
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleCancel}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-danger/10 hover:text-danger dark:text-text-muted-dark"
            >
              <Xmark className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="space-y-3">
          {draft.exercises.map((ex) => {
            const workingSets = ex.sets.filter((s) => !s.isWarmup);
            if (workingSets.length === 0) return null;
            return (
              <div key={ex.exerciseId}>
                <div className="text-[10px] font-medium uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-1.5">
                  {ex.exerciseId === 'weighted_pull_up' ? 'Pull Ups' : 'Dips'}
                </div>
                <div className="space-y-1.5">
                  {ex.sets.map((set, idx) => {
                    if (set.isWarmup) return null;
                    return (
                      <div
                        key={set.id}
                        className="flex items-center gap-3 rounded-sm bg-surface-secondary p-2 dark:bg-surface-dark"
                      >
                        <span className="w-12 text-[10px] font-medium uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
                          Set {set.setNumber}
                        </span>
                        <SetEditor
                          set={set}
                          onChange={(updated) => handleSetChange(ex.exerciseId, idx, updated)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            {topPullUp && (
              <div className="flex-1 rounded-sm bg-surface-secondary p-2.5 dark:bg-surface-dark">
                <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Pull Ups</div>
                <div className="font-mono font-bold tabular-nums">
                  {formatWeightSigned(topPullUp.weightKg)} x{topPullUp.actualReps}
                </div>
              </div>
            )}
            {topDip && (
              <div className="flex-1 rounded-sm bg-surface-secondary p-2.5 dark:bg-surface-dark">
                <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Dips</div>
                <div className="font-mono font-bold tabular-nums">
                  {formatWeightSigned(topDip.weightKg)} x{topDip.actualReps}
                </div>
              </div>
            )}
          </div>

          {workout.progressionResults && workout.progressionResults.length > 0 && (
            <div className="mt-2 flex gap-2">
              {workout.progressionResults.map((pr) => (
                <span
                  key={`${pr.exerciseId}-${pr.setCategory}`}
                  className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold ${
                    pr.increment > 0
                      ? 'bg-primary/10 text-primary'
                      : pr.increment === 0
                        ? 'bg-warning/10 text-warning'
                        : 'bg-danger/10 text-danger'
                  }`}
                >
                  {pr.exerciseId === 'weighted_pull_up' ? 'PU' : 'Dip'}:{' '}
                  {pr.increment > 0 ? `+${pr.increment}kg` : pr.increment === 0 ? 'Hold' : 'Deload'}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function WorkoutHistoryPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getWorkouts(50).then(setWorkouts);
  }, []);

  const handleSave = (updated: Workout) => {
    setWorkouts((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  return (
    <div className="space-y-5">
      <h1 className="font-display text-xl font-bold uppercase tracking-widest">History</h1>

      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-sm bg-primary/10 border border-primary/20">
            <ClockRotateRight className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-base font-medium">No workouts yet</p>
          <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Your workout history will appear here</p>
        </div>
      ) : (
        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} onSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
}
