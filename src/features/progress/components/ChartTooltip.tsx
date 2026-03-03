import { formatWeight, formatVolume } from '../../../lib/utils';
import type { ChartDataPoint, MetricType } from '../utils/types';

function formatMetricValue(value: number, metric: MetricType): string {
  switch (metric) {
    case 'e1rm':
    case 'max_weight':
      return formatWeight(value);
    case 'volume':
      return formatVolume(value);
  }
}

interface Props {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  metric: MetricType;
}

export function ChartTooltip({ active, payload, metric }: Props) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as ChartDataPoint;

  return (
    <div className="card px-3 py-2 shadow-lg">
      <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
        {point.label}
      </div>
      <div className="font-mono text-base font-bold tabular-nums text-primary">
        {formatMetricValue(point.value, metric)}
      </div>
      {point.isPR && (
        <span className="mt-1 inline-block rounded-sm bg-primary/15 px-1.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-primary">
          PR
        </span>
      )}
    </div>
  );
}
