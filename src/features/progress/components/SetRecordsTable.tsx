import { formatWeight } from '../../../lib/utils';
import { formatDateShort } from '../../../lib/date';
import type { SetRecord } from '../utils/types';
import { cn } from '../../../lib/utils';

interface Props {
  records: SetRecord[];
}

export function SetRecordsTable({ records }: Props) {
  if (records.length === 0) return null;

  // Find the record with the highest e1RM for highlighting
  const bestE1RMReps = records.reduce(
    (best, r) => (r.e1rm > best.e1rm ? r : best),
    records[0],
  ).reps;

  return (
    <div className="card p-4">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
        Set Records
      </p>

      {/* Header */}
      <div className="flex items-center border-b border-border pb-2 mb-2">
        <span className="w-12 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Reps
        </span>
        <span className="flex-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Weight
        </span>
        <span className="flex-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Est. 1RM
        </span>
        <span className="w-20 text-right font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Date
        </span>
      </div>

      {/* Rows */}
      {records.map((record) => (
        <div
          key={record.reps}
          className={cn(
            'flex items-center border-b border-border/50 py-2',
            record.reps === bestE1RMReps && 'bg-primary/5',
          )}
        >
          <span className="w-12 font-mono text-sm font-bold tabular-nums">
            {record.reps}
          </span>
          <span className="flex-1 font-mono text-sm tabular-nums">
            {formatWeight(record.bestWeight)}
          </span>
          <span className="flex-1 font-mono text-sm tabular-nums text-text-muted dark:text-text-muted-dark">
            {formatWeight(record.e1rm)}
          </span>
          <span className="w-20 text-right font-mono text-[11px] text-text-muted dark:text-text-muted-dark">
            {formatDateShort(record.date)}
          </span>
        </div>
      ))}
    </div>
  );
}
