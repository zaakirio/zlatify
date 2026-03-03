import { create } from 'zustand';
import type { UserProfile } from '../features/program/types/progression.types';
import type { ProgramState } from '../features/program/types/progression.types';
import * as profileRepo from '../db/repositories/user-profile.repository';
import * as stateRepo from '../db/repositories/program-state.repository';

interface UserProfileStore {
  profile: UserProfile | null;
  programState: ProgramState | null;
  isLoading: boolean;
  loadProfile: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;
  updateBodyweight: (kg: number) => Promise<void>;
  loadProgramState: () => Promise<void>;
  saveProgramState: (state: ProgramState) => Promise<void>;
  updateProgramState: (updates: Partial<ProgramState>) => Promise<void>;
}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
  profile: null,
  programState: null,
  isLoading: true,

  loadProfile: async () => {
    set({ isLoading: true });
    const profile = await profileRepo.getUserProfile();
    set({ profile, isLoading: false });
  },

  saveProfile: async (profile: UserProfile) => {
    await profileRepo.saveUserProfile(profile);
    set({ profile });
  },

  updateBodyweight: async (kg: number) => {
    const profile = get().profile;
    if (!profile) return;
    const updated: UserProfile = {
      ...profile,
      bodyweightKg: kg,
      bodyweightHistory: [
        ...profile.bodyweightHistory,
        { date: new Date().toISOString().split('T')[0], weightKg: kg },
      ],
    };
    await profileRepo.saveUserProfile(updated);
    set({ profile: updated });

    // Also update program state bodyweight
    const state = get().programState;
    if (state) {
      const updatedState = { ...state, bodyweightKg: kg, lastUpdated: Date.now() };
      await stateRepo.saveProgramState(updatedState);
      set({ programState: updatedState });
    }
  },

  loadProgramState: async () => {
    const programState = await stateRepo.getProgramState();
    set({ programState });
  },

  saveProgramState: async (state: ProgramState) => {
    await stateRepo.saveProgramState(state);
    set({ programState: state });
  },

  updateProgramState: async (updates: Partial<ProgramState>) => {
    const current = get().programState;
    if (!current) return;
    const updated = { ...current, ...updates, lastUpdated: Date.now() };
    await stateRepo.saveProgramState(updated);
    set({ programState: updated });
  },
}));
