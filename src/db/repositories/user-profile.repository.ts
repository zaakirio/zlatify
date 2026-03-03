import { db } from '../database';
import type { UserProfile } from '../../features/program/types/progression.types';

const PROFILE_ID = 'current';

export async function getUserProfile(): Promise<UserProfile | null> {
  const record = await db.userProfile.get(PROFILE_ID);
  if (!record) return null;
  return JSON.parse(record.data) as UserProfile;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  await db.userProfile.put({
    id: PROFILE_ID,
    data: JSON.stringify(profile),
  });
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
  const existing = await getUserProfile();
  if (!existing) return;
  const updated = { ...existing, ...updates };
  await saveUserProfile(updated);
}
