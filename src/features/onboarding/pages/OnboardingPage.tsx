import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserProfileStore } from '../../../store/user-profile.store';
import type { Stage, Phase } from '../../program/types/program.types';
import type { ProgramState } from '../../program/types/progression.types';
import type { UserProfile } from '../../program/types/progression.types';
import { generateId } from '../../../lib/utils';

type Step = 'welcome' | 'bodyweight' | 'experience' | 'weights' | 'confirm';

interface OnboardingData {
  bodyweight: number;
  stage: Stage;
  pullUpWeight: number;
  dipWeight: number;
  pullUp1RM: number;
  dip1RM: number;
}

const stageInfo: Record<Stage, { name: string; description: string; phase: Phase }> = {
  novice: {
    name: 'Novice',
    description: 'New to weighted calisthenics. Pull ups ≤+50kg×5, Dips ≤+70kg×5',
    phase: 'hypertrophy',
  },
  advanced_novice: {
    name: 'Advanced Novice',
    description: 'Pull ups +50-70kg×5, Dips +70-100kg×5',
    phase: 'introductory',
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Pull ups +70kg×5 to +90kg×3-4, Dips +100kg×5 to +120kg×3-4',
    phase: 'one_week_cycle',
  },
  advanced: {
    name: 'Advanced',
    description: 'Pull ups 105kg+ 1RM, Dips 140kg+ 1RM',
    phase: 'advanced_cycle',
  },
};

const stageColors: Record<Stage, { border: string; text: string; bg: string }> = {
  novice: {
    border: 'border-[#c8ff00]',
    text: 'text-[#c8ff00]',
    bg: 'bg-[#c8ff00]/5',
  },
  advanced_novice: {
    border: 'border-[#00d4ff]',
    text: 'text-[#00d4ff]',
    bg: 'bg-[#00d4ff]/5',
  },
  intermediate: {
    border: 'border-[#a855f7]',
    text: 'text-[#a855f7]',
    bg: 'bg-[#a855f7]/5',
  },
  advanced: {
    border: 'border-[#ff6b00]',
    text: 'text-[#ff6b00]',
    bg: 'bg-[#ff6b00]/5',
  },
};

export function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome');
  const [data, setData] = useState<OnboardingData>({
    bodyweight: 80,
    stage: 'novice',
    pullUpWeight: 0,
    dipWeight: 0,
    pullUp1RM: 0,
    dip1RM: 0,
  });
  const { saveProfile, saveProgramState } = useUserProfileStore();
  const navigate = useNavigate();

  const handleComplete = async () => {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];

    const profile: UserProfile = {
      id: 'current',
      name: undefined,
      bodyweightKg: data.bodyweight,
      bodyweightHistory: [{ date: today, weightKg: data.bodyweight }],
      createdAt: now,
      isOnboarded: true,
      unitPreference: 'kg',
      restTimerSeconds: 240,
    };

    const needsPercentages = data.stage === 'intermediate' || data.stage === 'advanced';
    const initialWeightKey = data.stage === 'novice' || data.stage === 'advanced_novice'
      ? 'working'
      : 'top';

    const programState: ProgramState = {
      id: generateId(),
      currentStage: data.stage,
      currentPhase: stageInfo[data.stage].phase,
      bodyweightKg: data.bodyweight,
      oneRepMax: {
        pullUp: needsPercentages ? data.pullUp1RM : 0,
        dip: needsPercentages ? data.dip1RM : 0,
      },
      currentWeights: {
        pullUp: { [initialWeightKey]: data.pullUpWeight },
        dip: { [initialWeightKey]: data.dipWeight },
      },
      stallTracker: {
        pullUp: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
        dip: { consecutiveStalls: 0, consecutiveDeloads: 0, cyclesWithoutProgress: 0 },
      },
      cycleCounter: 1,
      weekInCycle: 0,
      sessionInWeek: 0,
      weeksSinceLast1RMTest: 0,
      lastUpdated: now,
    };

    await saveProfile(profile);
    await saveProgramState(programState);
    navigate('/');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col px-4 py-6">
      {step !== 'welcome' && (
        <div className="flex items-center justify-center gap-2 py-4">
          {(['welcome', 'bodyweight', 'experience', 'weights', 'confirm'] as Step[]).map((s, i) => {
            const steps: Step[] = ['welcome', 'bodyweight', 'experience', 'weights', 'confirm'];
            const currentIdx = steps.indexOf(step);
            const thisIdx = i;
            return (
              <div
                key={s}
                className={`h-0.5 transition-all duration-300 ${
                  thisIdx === currentIdx
                    ? 'w-8 bg-primary'
                    : thisIdx < currentIdx
                      ? 'w-3 bg-primary/60'
                      : 'w-3 bg-border dark:bg-border-dark'
                }`}
              />
            );
          })}
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Geometric brand mark */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-sm bg-primary">
            <span className="font-display text-4xl font-bold text-black">Z</span>
          </div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-widest mb-2">Zlatify</h1>
          <p className="text-text-muted dark:text-text-muted-dark mb-10 max-w-xs text-sm">
            Track your weighted calisthenics progress with Mathew Zlat's program
          </p>
          <button
            onClick={() => setStep('bodyweight')}
            className="rounded-sm bg-primary px-10 py-3.5 font-display font-bold uppercase tracking-wider text-black active:scale-[0.97] transition-transform duration-75"
          >
            Get Started
          </button>
        </div>
      )}

      {step === 'bodyweight' && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-1">Your Bodyweight</h2>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6">
            Used for percentage calculations in later stages
          </p>
          <div className="flex items-center gap-3 mb-8">
            <input
              type="number"
              value={data.bodyweight}
              onChange={(e) => setData({ ...data, bodyweight: Number(e.target.value) })}
              className="w-28 rounded-sm border border-border bg-surface px-4 py-3 text-center font-mono text-2xl font-bold dark:border-border-dark dark:bg-surface-secondary-dark"
              min={30}
              max={200}
              step={0.5}
            />
            <span className="text-sm uppercase tracking-wider text-text-muted dark:text-text-muted-dark">kg</span>
          </div>
          <div className="mt-auto flex gap-3">
            <button
              onClick={() => setStep('welcome')}
              className="flex-1 rounded-sm border border-border px-4 py-3 font-medium uppercase tracking-wider text-sm dark:border-border-dark active:scale-[0.97] transition-transform duration-75"
            >
              Back
            </button>
            <button
              onClick={() => setStep('experience')}
              className="flex-1 rounded-sm bg-primary px-4 py-3 font-bold uppercase tracking-wider text-sm text-black active:scale-[0.97] transition-transform duration-75"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 'experience' && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-1">Your Level</h2>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6">
            Select based on your current max added weight
          </p>
          <div className="space-y-2 mb-8">
            {(Object.entries(stageInfo) as [Stage, typeof stageInfo[Stage]][]).map(
              ([stage, info]) => {
                const colors = stageColors[stage];
                const isSelected = data.stage === stage;
                return (
                  <button
                    key={stage}
                    onClick={() => setData({ ...data, stage })}
                    className={`w-full rounded-sm border p-4 text-left transition-all duration-100 active:scale-[0.97] ${
                      isSelected
                        ? `${colors.border} ${colors.bg} border-2`
                        : 'border-border dark:border-border-dark hover:border-border-dark'
                    }`}
                  >
                    <div className={`font-display font-bold uppercase tracking-wide ${isSelected ? colors.text : ''}`}>
                      {info.name}
                    </div>
                    <div className="text-sm text-text-muted dark:text-text-muted-dark mt-0.5">
                      {info.description}
                    </div>
                  </button>
                );
              },
            )}
          </div>
          <div className="mt-auto flex gap-3">
            <button
              onClick={() => setStep('bodyweight')}
              className="flex-1 rounded-sm border border-border px-4 py-3 font-medium uppercase tracking-wider text-sm dark:border-border-dark active:scale-[0.97] transition-transform duration-75"
            >
              Back
            </button>
            <button
              onClick={() => setStep('weights')}
              className="flex-1 rounded-sm bg-primary px-4 py-3 font-bold uppercase tracking-wider text-sm text-black active:scale-[0.97] transition-transform duration-75"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 'weights' && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-1">Working Weights</h2>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6">
            {data.stage === 'novice'
              ? 'Enter starting added weight (0 if brand new)'
              : data.stage === 'intermediate' || data.stage === 'advanced'
                ? 'Enter your current 1RM (added weight)'
                : 'Enter your current working added weight'}
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-1.5 block">
                Pull Up {data.stage === 'intermediate' || data.stage === 'advanced' ? '1RM' : 'Working Weight'} (kg)
              </label>
              <input
                type="number"
                value={data.pullUpWeight}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setData({ ...data, pullUpWeight: v, pullUp1RM: v });
                }}
                className="w-full rounded-sm border border-border bg-surface px-4 py-3 font-mono text-lg font-bold dark:border-border-dark dark:bg-surface-secondary-dark"
                min={0}
                step={1.25}
              />
            </div>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-1.5 block">
                Dip {data.stage === 'intermediate' || data.stage === 'advanced' ? '1RM' : 'Working Weight'} (kg)
              </label>
              <input
                type="number"
                value={data.dipWeight}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setData({ ...data, dipWeight: v, dip1RM: v });
                }}
                className="w-full rounded-sm border border-border bg-surface px-4 py-3 font-mono text-lg font-bold dark:border-border-dark dark:bg-surface-secondary-dark"
                min={0}
                step={1.25}
              />
            </div>
          </div>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => setStep('experience')}
              className="flex-1 rounded-sm border border-border px-4 py-3 font-medium uppercase tracking-wider text-sm dark:border-border-dark active:scale-[0.97] transition-transform duration-75"
            >
              Back
            </button>
            <button
              onClick={() => setStep('confirm')}
              className="flex-1 rounded-sm bg-primary px-4 py-3 font-bold uppercase tracking-wider text-sm text-black active:scale-[0.97] transition-transform duration-75"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="flex flex-1 flex-col">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-1">Confirm Setup</h2>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6">
            Review your settings before starting
          </p>

          <div className="space-y-2 mb-8">
            <div className="rounded-sm bg-surface p-4 border border-border dark:bg-surface-secondary-dark dark:border-border-dark">
              <div className="text-[10px] uppercase tracking-widest text-text-muted dark:text-text-muted-dark">Bodyweight</div>
              <div className="font-mono text-lg font-bold tabular-nums">{data.bodyweight}kg</div>
            </div>
            <div className="rounded-sm bg-surface p-4 border border-border dark:bg-surface-secondary-dark dark:border-border-dark">
              <div className="text-[10px] uppercase tracking-widest text-text-muted dark:text-text-muted-dark">Stage</div>
              <div className={`font-display text-lg font-bold uppercase tracking-wide ${stageColors[data.stage].text}`}>
                {stageInfo[data.stage].name}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-sm bg-surface p-4 border border-border dark:bg-surface-secondary-dark dark:border-border-dark">
                <div className="text-[10px] uppercase tracking-widest text-text-muted dark:text-text-muted-dark">Pull Up</div>
                <div className="font-mono text-lg font-bold tabular-nums">+{data.pullUpWeight}kg</div>
              </div>
              <div className="rounded-sm bg-surface p-4 border border-border dark:bg-surface-secondary-dark dark:border-border-dark">
                <div className="text-[10px] uppercase tracking-widest text-text-muted dark:text-text-muted-dark">Dip</div>
                <div className="font-mono text-lg font-bold tabular-nums">+{data.dipWeight}kg</div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => setStep('weights')}
              className="flex-1 rounded-sm border border-border px-4 py-3 font-medium uppercase tracking-wider text-sm dark:border-border-dark active:scale-[0.97] transition-transform duration-75"
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 rounded-sm bg-primary px-4 py-3 font-bold uppercase tracking-wider text-sm text-black active:scale-[0.97] transition-transform duration-75"
            >
              Start Training
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
