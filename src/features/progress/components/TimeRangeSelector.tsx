import type { TimeRange } from '../utils/types';
import { TIME_RANGE_LABELS } from '../utils/types';
import { cn } from '../../../lib/utils';

const RANGES: TimeRange[] = ['1m', '3m', '6m', '1y', 'all'];

interface Props {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={cn(
            'rounded-sm px-2.5 py-1 font-mono text-[11px] font-bold transition-colors duration-100 tap-target',
            selected === r
              ? 'bg-primary text-black'
              : 'text-text-muted dark:text-text-muted-dark',
          )}
        >
          {TIME_RANGE_LABELS[r]}
        </button>
      ))}
    </div>
  );
}
