import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import type { ChartDataPoint, MetricType } from '../utils/types';

const COLORS = {
  primary: '#c8ff00',
  grid: '#252525',
  muted: '#666666',
  bg: '#0a0a0a',
};

const FONT_MONO = "'Space Mono', ui-monospace, monospace";

interface Props {
  data: ChartDataPoint[];
  metric: MetricType;
}

function formatYAxisTick(value: number, metric: MetricType): string {
  if (metric === 'volume' && value >= 1000) return `${(value / 1000).toFixed(1)}t`;
  return `${value}kg`;
}

export function ProgressChart({ data, metric }: Props) {
  if (data.length === 0) {
    return (
      <div className="card flex h-[240px] items-center justify-center">
        <p className="font-mono text-xs text-text-muted dark:text-text-muted-dark">
          No data for this period
        </p>
      </div>
    );
  }

  const commonAxisProps = {
    tick: { fill: COLORS.muted, fontSize: 10, fontFamily: FONT_MONO },
    tickLine: false,
  };

  const tooltipContent = <ChartTooltip metric={metric} />;

  if (metric === 'volume') {
    return (
      <div className="card p-3">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              {...commonAxisProps}
              axisLine={{ stroke: COLORS.grid }}
              interval="preserveStartEnd"
            />
            <YAxis
              {...commonAxisProps}
              axisLine={false}
              width={50}
              tickFormatter={(v) => formatYAxisTick(v, metric)}
            />
            <Tooltip content={tooltipContent} cursor={{ fill: 'rgba(200, 255, 0, 0.05)' }} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={COLORS.primary}
                  fillOpacity={entry.isPR ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="card p-3">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
          <XAxis
            dataKey="label"
            {...commonAxisProps}
            axisLine={{ stroke: COLORS.grid }}
            interval="preserveStartEnd"
          />
          <YAxis
            {...commonAxisProps}
            axisLine={false}
            width={50}
            tickFormatter={(v) => formatYAxisTick(v, metric)}
          />
          <Tooltip content={tooltipContent} cursor={{ stroke: COLORS.muted, strokeDasharray: '3 3' }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={COLORS.primary}
            strokeWidth={2}
            dot={(props: Record<string, unknown>) => {
              const point = props.payload as ChartDataPoint;
              if (!point.isPR) return <circle key={props.key as string} r={0} />;
              return (
                <circle
                  key={props.key as string}
                  cx={props.cx as number}
                  cy={props.cy as number}
                  r={5}
                  fill={COLORS.primary}
                  stroke={COLORS.bg}
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{
              r: 5,
              fill: COLORS.primary,
              stroke: COLORS.bg,
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
