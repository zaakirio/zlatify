import { db } from '../database';
import type { ProgramState } from '../../features/program/types/progression.types';

const STATE_ID = 'current';

export async function getProgramState(): Promise<ProgramState | null> {
  const record = await db.programState.get(STATE_ID);
  if (!record) return null;
  return JSON.parse(record.data) as ProgramState;
}

export async function saveProgramState(state: ProgramState): Promise<void> {
  await db.programState.put({
    id: STATE_ID,
    data: JSON.stringify(state),
    lastUpdated: Date.now(),
  });
}

export async function updateProgramState(updates: Partial<ProgramState>): Promise<void> {
  const existing = await getProgramState();
  if (!existing) return;
  const updated = { ...existing, ...updates, lastUpdated: Date.now() };
  await saveProgramState(updated);
}
