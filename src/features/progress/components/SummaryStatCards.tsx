import { cn, formatWeight, formatVolume } from '../../../lib/utils';
import { formatDateShort } from '../../../lib/date';
import type { SummaryStats } from '../utils/types';

interface Props {
  stats: SummaryStats;
}

function DeltaBadge({ value, suffix = 'kg' }: { value: number | null; suffix?: string }) {
  if (value === null) return null;
  const isPositive = value > 0;
  const isZero = value === 0;
  return (
    <span
      className={cn(
        'inline-block mt-1 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold',
        isZero && 'bg-text-muted/10 text-text-muted',
        isPositive && 'bg-primary/10 text-primary',
        !isPositive && !isZero && 'bg-danger/10 text-danger',
      )}
    >
      {isPositive ? '+' : ''}{value}{suffix}
    </span>
  );
}

export function SummaryStatCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* e1RM */}
      <div className="card p-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
          Est. 1RM
        </p>
        <p className="font-mono text-2xl font-bold tabular-nums">
          {stats.currentE1RM !== null ? formatWeight(stats.currentE1RM) : '—'}
        </p>
        <DeltaBadge value={stats.e1rmDelta} />
      </div>

      {/* Max Weight PR */}
      <div className="card p-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
          Max Weight
        </p>
        <p className="font-mono text-2xl font-bold tabular-nums">
          {stats.maxWeightPR !== null ? formatWeight(stats.maxWeightPR) : '—'}
        </p>
        {stats.maxWeightDate && (
          <span className="inline-block mt-1 font-mono text-[10px] text-text-muted dark:text-text-muted-dark">
            {formatDateShort(stats.maxWeightDate)}
          </span>
        )}
      </div>

      {/* Volume */}
      <div className="card p-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
          Volume
        </p>
        <p className="font-mono text-2xl font-bold tabular-nums">
          {stats.totalVolume > 0 ? formatVolume(stats.totalVolume) : '—'}
        </p>
        <DeltaBadge value={stats.volumeDelta} />
      </div>

      {/* Workout Count */}
      <div className="card p-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
          Workouts
        </p>
        <p className="font-mono text-2xl font-bold tabular-nums">
          {stats.workoutCount}
        </p>
        <DeltaBadge value={stats.workoutCountDelta} suffix="" />
      </div>
    </div>
  );
}
