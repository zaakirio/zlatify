import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Play } from 'iconoir-react';
import type { ProgramState } from '../../program/types/progression.types';
import { sessionTypeDisplayName } from '../../../lib/utils';
import { getNextWorkoutDay } from '../../../lib/date';
import { getLastWorkout } from '../../../db/repositories/workout.repository';

interface Props {
  programState: ProgramState;
}

const stageAccentBorders: Record<string, string> = {
  novice: 'border-l-[#c8ff00]',
  advanced_novice: 'border-l-[#00d4ff]',
  intermediate: 'border-l-[#a855f7]',
  advanced: 'border-l-[#ff6b00]',
};

const stageButtonColors: Record<string, string> = {
  novice: 'bg-[#c8ff00] text-black',
  advanced_novice: 'bg-[#00d4ff] text-black',
  intermediate: 'bg-[#a855f7] text-black',
  advanced: 'bg-[#ff6b00] text-black',
};

export function NextWorkoutCard({ programState }: Props) {
  const navigate = useNavigate();
  const [nextDay, setNextDay] = useState(() => getNextWorkoutDay(programState.currentStage));

  useEffect(() => {
    getLastWorkout().then((last) => {
      setNextDay(getNextWorkoutDay(programState.currentStage, last?.date));
    });
  }, [programState.currentStage]);

  const sessionIndex = programState.sessionInWeek;
  const sessionLabels: Record<string, string[]> = {
    novice: ['Heavy', 'Heavy', 'Heavy'],
    advanced_novice: ['Heavy', 'Deload', 'Heavy'],
    intermediate: ['Volume', 'Deload', 'Max'],
    advanced: ['Heavy', 'Accessory', 'Recovery', 'Heavy', 'Accessory'],
  };

  const labels = sessionLabels[programState.currentStage] ?? ['Workout'];
  const totalSessions = labels.length;
  const nextSession = labels[sessionIndex % labels.length] ?? 'Workout';
  const currentSessionNumber = (sessionIndex % totalSessions) + 1;

  const accentBorder = stageAccentBorders[programState.currentStage] ?? 'border-l-[#666]';
  const buttonColor = stageButtonColors[programState.currentStage] ?? 'bg-primary text-black';

  return (
    <div className={`rounded-sm border border-border border-l-[3px] ${accentBorder} bg-surface p-4 dark:border-border-dark dark:bg-surface-secondary-dark`}>
      <div className="mb-2 text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
        Next Workout
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-lg font-bold uppercase tracking-wide">
            {nextDay.dayName} &mdash; {nextSession}
          </div>
          <div className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
            {nextDay.isToday ? 'Today' : nextDay.daysAway === 1 ? 'Tomorrow' : `In ${nextDay.daysAway} days`} &middot; {sessionTypeDisplayName(programState.currentStage === 'novice' ? 'heavy' : 'volume')} &middot; Pull Ups &amp; Dips
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-text-muted dark:text-text-muted-dark">
            Session {currentSessionNumber}/{totalSessions}
          </div>
        </div>
        <button
          onClick={() => navigate('/workout')}
          className={`flex h-12 w-12 items-center justify-center rounded-sm ${buttonColor} transition-transform active:scale-95`}
        >
          <Play className="h-5 w-5 ml-0.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
