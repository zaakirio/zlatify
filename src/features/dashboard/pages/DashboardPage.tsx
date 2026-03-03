import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserProfileStore } from '../../../store/user-profile.store';
import { CurrentStageCard } from '../components/CurrentStageCard';
import { NextWorkoutCard } from '../components/NextWorkoutCard';
import { RecentWorkouts } from '../components/RecentWorkouts';

export function DashboardPage() {
  const { profile, programState, isLoading, loadProfile, loadProgramState } =
    useUserProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
    loadProgramState();
  }, [loadProfile, loadProgramState]);

  useEffect(() => {
    if (!isLoading && !profile?.isOnboarded) {
      navigate('/onboarding');
    }
  }, [isLoading, profile, navigate]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
          <div className="h-5 w-20 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
          <div className="h-36 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
          <div className="h-36 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
        </div>
        <div className="h-24 animate-pulse rounded-sm bg-surface dark:bg-surface-secondary-dark" />
      </div>
    );
  }

  if (!profile || !programState) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest md:hidden">Zlatify</h1>
        <h1 className="hidden font-display text-2xl font-bold uppercase tracking-widest md:block">Dashboard</h1>
        <span className="font-mono text-xs text-text-muted dark:text-text-muted-dark tracking-wider">
          {profile.bodyweightKg}kg BW
        </span>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
        <CurrentStageCard programState={programState} />
        <NextWorkoutCard programState={programState} />
      </div>
      <RecentWorkouts />
    </div>
  );
}
