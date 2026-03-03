import type { Stage, Phase, SessionType } from '../features/program/types/program.types';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

export function formatWeight(kg: number): string {
  if (kg === Math.floor(kg)) return `${kg}kg`;
  return `${kg.toFixed(kg % 0.5 === 0 ? 1 : 2)}kg`;
}

export function formatWeightSigned(kg: number): string {
  const prefix = kg >= 0 ? '+' : '';
  return `${prefix}${formatWeight(kg)}`;
}

export function formatVolume(kg: number): string {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`;
  return `${Math.round(kg)}kg`;
}

export function stageDisplayName(stage: Stage): string {
  const names: Record<Stage, string> = {
    novice: 'Novice',
    advanced_novice: 'Advanced Novice',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };
  return names[stage];
}

export function phaseDisplayName(phase: Phase): string {
  const names: Record<Phase, string> = {
    hypertrophy: 'Hypertrophy',
    transition: 'Transition',
    strength: 'Strength',
    introductory: 'Introductory',
    progressive: 'Progressive',
    one_week_cycle: '1-Week Cycle',
    two_week_cycle: '2-Week Cycle',
    advanced_cycle: 'Advanced Cycle',
  };
  return names[phase];
}

export function sessionTypeDisplayName(type: SessionType): string {
  const names: Record<SessionType, string> = {
    heavy: 'Heavy',
    deload: 'Deload',
    medium: 'Medium',
    volume: 'Volume',
    max: 'Max',
    accessory: 'Accessory',
    recovery: 'Recovery',
    preparatory: 'Preparatory',
    '1rm_test': '1RM Test',
    realization: 'Realization',
  };
  return names[type];
}
