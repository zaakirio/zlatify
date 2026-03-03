import type { ProgramState } from '../../program/types/progression.types';
import type { Stage } from '../../program/types/program.types';
import { stageDisplayName, phaseDisplayName, formatWeightSigned } from '../../../lib/utils';

interface Props {
  programState: ProgramState;
}

const stageColors: Record<string, string> = {
  novice: '#c8ff00',
  advanced_novice: '#00d4ff',
  intermediate: '#a855f7',
  advanced: '#ff6b00',
};

const stageBorderColors: Record<string, string> = {
  novice: 'border-l-[#c8ff00]',
  advanced_novice: 'border-l-[#00d4ff]',
  intermediate: 'border-l-[#a855f7]',
  advanced: 'border-l-[#ff6b00]',
};

const stageTextColors: Record<string, string> = {
  novice: 'text-[#c8ff00]',
  advanced_novice: 'text-[#00d4ff]',
  intermediate: 'text-[#a855f7]',
  advanced: 'text-[#ff6b00]',
};

const stagePhaseCount: Record<Stage, number> = {
  novice: 3,
  advanced_novice: 2,
  intermediate: 2,
  advanced: 1,
};

const stagePhaseIndex: Record<string, number> = {
  hypertrophy: 1,
  transition: 2,
  strength: 3,
  introductory: 1,
  progressive: 2,
  one_week_cycle: 1,
  two_week_cycle: 2,
  advanced_cycle: 1,
};

function ProgressRing({ percentage, color, size = 48 }: { percentage: number; color: string; size?: number }) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#252525"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-current text-[10px] font-mono font-bold"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

export function CurrentStageCard({ programState }: Props) {
  const pullUpWeight = programState.currentWeights.pullUp.working ?? programState.currentWeights.pullUp.top ?? 0;
  const dipWeight = programState.currentWeights.dip.working ?? programState.currentWeights.dip.top ?? 0;

  const ringColor = stageColors[programState.currentStage] ?? '#666';
  const totalPhases = stagePhaseCount[programState.currentStage] ?? 1;
  const currentPhaseIndex = stagePhaseIndex[programState.currentPhase] ?? 1;
  const borderColor = stageBorderColors[programState.currentStage] ?? 'border-l-[#666]';
  const textColor = stageTextColors[programState.currentStage] ?? 'text-[#666]';

  const maxCycles = 10;
  const progressPercentage = Math.min((programState.cycleCounter / maxCycles) * 100, 100);

  return (
    <div className={`rounded-sm border border-border border-l-[3px] ${borderColor} bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className={`font-display text-sm font-bold uppercase tracking-wider ${textColor}`}>
              {stageDisplayName(programState.currentStage)}
            </span>
            <span className="text-xs text-text-muted dark:text-text-muted-dark font-mono">
              {phaseDisplayName(programState.currentPhase)}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
            Phase {currentPhaseIndex} of {totalPhases}
          </span>
        </div>
        <ProgressRing percentage={progressPercentage} color={ringColor} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-sm bg-surface-secondary p-3 dark:bg-surface-dark">
          <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Pull Ups</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums">{formatWeightSigned(pullUpWeight)}</div>
        </div>
        <div className="rounded-sm bg-surface-secondary p-3 dark:bg-surface-dark">
          <div className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Dips</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums">{formatWeightSigned(dipWeight)}</div>
        </div>
      </div>
    </div>
  );
}
