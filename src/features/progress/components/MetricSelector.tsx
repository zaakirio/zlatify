import type { MetricType } from '../utils/types';
import { METRIC_LABELS } from '../utils/types';
import { cn } from '../../../lib/utils';

const METRICS: MetricType[] = ['e1rm', 'max_weight', 'volume'];

interface Props {
  selected: MetricType;
  onChange: (metric: MetricType) => void;
}

export function MetricSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-1.5">
      {METRICS.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={cn(
            'rounded-sm px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider transition-colors duration-100 tap-target',
            selected === m
              ? 'bg-primary/15 text-primary border border-primary/30'
              : 'text-text-muted border border-border dark:border-border-dark',
          )}
        >
          {METRIC_LABELS[m]}
        </button>
      ))}
    </div>
  );
}
