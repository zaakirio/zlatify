import { useState } from 'react';
import { Download, Upload, Weight, Activity, HalfMoon, SunLight } from 'iconoir-react';
import { useUserProfileStore } from '../../../store/user-profile.store';
import { stageDisplayName, phaseDisplayName } from '../../../lib/utils';
import { db } from '../../../db/database';

export function SettingsPage() {
  const { profile, programState, updateBodyweight } = useUserProfileStore();
  const [newBW, setNewBW] = useState(profile?.bodyweightKg ?? 80);
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  const handleExport = async () => {
    const workouts = await db.workouts.toArray();
    const state = await db.programState.toArray();
    const profiles = await db.userProfile.toArray();

    const data = { workouts, programState: state, userProfile: profiles, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zlatify-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.workouts) {
        await db.workouts.clear();
        await db.workouts.bulkAdd(data.workouts);
      }
      if (data.programState) {
        await db.programState.clear();
        await db.programState.bulkAdd(data.programState);
      }
      if (data.userProfile) {
        await db.userProfile.clear();
        await db.userProfile.bulkAdd(data.userProfile);
      }
      window.location.reload();
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold uppercase tracking-widest">Settings</h1>

      {/* Bodyweight */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Weight className="h-5 w-5 text-primary" strokeWidth={1.8} />
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">Bodyweight</h2>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={newBW}
            onChange={(e) => setNewBW(Number(e.target.value))}
            className="w-24 rounded-sm border border-border bg-surface-secondary px-3 py-2 text-center font-mono font-bold dark:border-border-dark dark:bg-surface-dark"
            step={0.5}
            min={30}
            max={200}
          />
          <span className="text-xs uppercase tracking-wider text-text-muted dark:text-text-muted-dark">kg</span>
          {newBW !== profile?.bodyweightKg && (
            <button
              onClick={() => updateBodyweight(newBW)}
              className="rounded-sm bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-black tap-target"
            >
              Update
            </button>
          )}
        </div>
      </div>

      {/* Current Program */}
      {programState && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-primary" strokeWidth={1.8} />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider">Current Program</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted dark:text-text-muted-dark uppercase text-xs tracking-wider">Stage</span>
              <span className="font-mono font-medium">{stageDisplayName(programState.currentStage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted dark:text-text-muted-dark uppercase text-xs tracking-wider">Phase</span>
              <span className="font-mono font-medium">{phaseDisplayName(programState.currentPhase)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted dark:text-text-muted-dark uppercase text-xs tracking-wider">Cycle</span>
              <span className="font-mono font-bold">#{programState.cycleCounter}</span>
            </div>
          </div>
        </div>
      )}

      {/* Theme */}
      <div className="card p-4">
        <button
          onClick={() => {
            setIsDark(!isDark);
            document.documentElement.classList.toggle('dark');
          }}
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2">
            {isDark ? <HalfMoon className="h-5 w-5 text-primary" strokeWidth={1.8} /> : <SunLight className="h-5 w-5 text-primary" strokeWidth={1.8} />}
            <span className="font-display text-sm font-bold uppercase tracking-wider">Theme</span>
          </div>
          <span className="font-mono text-xs text-text-muted dark:text-text-muted-dark">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>

      {/* Data */}
      <div className="card p-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider mb-3">Data</h2>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-border py-2.5 text-xs font-bold uppercase tracking-wider dark:border-border-dark tap-target hover:bg-surface-secondary dark:hover:bg-surface-dark transition-colors"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            Export
          </button>
          <button
            onClick={handleImport}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-border py-2.5 text-xs font-bold uppercase tracking-wider dark:border-border-dark tap-target hover:bg-surface-secondary dark:hover:bg-surface-dark transition-colors"
          >
            <Upload className="h-4 w-4" strokeWidth={1.8} />
            Import
          </button>
        </div>
      </div>

      {/* About */}
      <div className="text-center font-mono text-[10px] text-text-muted/50 dark:text-text-muted-dark/50 py-4 uppercase tracking-widest">
        <p>Zlatify v0.1.0</p>
        <p>Mathew Zlat's Weighted Calisthenics</p>
      </div>
    </div>
  );
}
