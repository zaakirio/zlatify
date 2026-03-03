import type { AdditionalExercise } from '../types/program.types';

export const LEGS: AdditionalExercise = {
  category: 'legs',
  displayName: 'Legs',
  description:
    'Barbell back squat and pistol squats. Recommended to add after the basic pull up and dip work. ' +
    'Volume varies by stage. Never perform on deload sessions except maybe 1-2 very light sets.',
  recommended: true,
  placementRule: 'after_basics',
  volumePerStage: {
    novice:
      '1 set of 4-6 reps back squat + 1 set of 4-6 pistol squats. Same progression rules as main lifts.',
    advanced_novice:
      '2 sets back squats + 1 set pistol squats, 4-6 reps. Only on heavy days.',
    intermediate:
      '2 sets back squats + 1 set pistol squats on volume day. 1 set of each on max day.',
    advanced:
      '2 sets back squats + 1 set pistol squats on heavy days. 1 set of each on max/realization day.',
  },
};

export const ONE_ARM_PULL_UPS: AdditionalExercise = {
  category: 'one_arm_pull_ups',
  displayName: 'One Arm Pull Ups',
  description:
    'Perform BEFORE the basic weighted pull up and dip work. Maximum 10 sets of weighted singles ' +
    'or 4 sets of reps/assisted work. On deload sessions, perform light single or double work only.',
  recommended: true,
  placementRule: 'before_basics',
  volumePerStage: {
    novice:
      'Max 10 sets weighted singles or 4 sets reps/assisted. Deload: light single/double work.',
    advanced_novice:
      'Max 10 sets weighted singles or 4 sets reps/assisted. Deload: light single/double work.',
    intermediate:
      'Max 10 sets weighted singles or 4 sets reps/assisted. Deload: light single/double work.',
    advanced:
      'Max 10 sets weighted singles or 4 sets reps/assisted. Deload: light single/double work.',
  },
};

export const MUSCLE_UPS: AdditionalExercise = {
  category: 'muscle_ups',
  displayName: 'Muscle Ups',
  description:
    'Weighted muscle ups go BEFORE basics. Bodyweight muscle ups go AFTER basics. ' +
    'Maximum 10 sets of weighted singles or 4 sets of reps. On deload sessions, ' +
    'perform light work with 3-5 explosive reps.',
  recommended: true,
  placementRule: 'before_basics',
  volumePerStage: {
    novice:
      'Max 10 sets weighted singles or 4 sets reps. Deload: light work, 3-5 explosive reps.',
    advanced_novice:
      'Max 10 sets weighted singles or 4 sets reps. Deload: light work, 3-5 explosive reps.',
    intermediate:
      'Max 10 sets weighted singles or 4 sets reps. Deload: light work, 3-5 explosive reps.',
    advanced:
      'Max 10 sets weighted singles or 4 sets reps. Deload: light work, 3-5 explosive reps.',
  },
};

export const SKILL_WORK: AdditionalExercise = {
  category: 'skill_work',
  displayName: 'Skill Work',
  description:
    'Light/medium skill work goes AFTER basics. Hard skill work (e.g. planche, front lever) can go BEFORE basics ' +
    'only if it is not fatiguing. 3-5 sets per skill, no more than 2 skills per session. Avoid on deload days.',
  recommended: true,
  placementRule: 'after_basics',
  volumePerStage: {
    novice:
      '3-5 sets per skill, max 2 skills per session. Avoid on deloads.',
    advanced_novice:
      '3-5 sets per skill, max 2 skills per session. Avoid on deloads.',
    intermediate:
      '3-5 sets per skill, max 2 skills per session. Avoid on deloads.',
    advanced:
      '3-5 sets per skill, max 2 skills per session. Avoid on deloads.',
  },
};

export const BODYBUILDING: AdditionalExercise = {
  category: 'bodybuilding',
  displayName: 'Bodybuilding',
  description:
    'NOT recommended. If included, perform after the basic work. No more than 2 exercises, ' +
    '3-4 sets of 8-12 reps each. Only on heavy sessions — never on deload or recovery days.',
  recommended: false,
  placementRule: 'after_basics',
  volumePerStage: {
    novice:
      'Max 2 exercises, 3-4 sets of 8-12 reps. Heavy sessions only.',
    advanced_novice:
      'Max 2 exercises, 3-4 sets of 8-12 reps. Heavy sessions only.',
    intermediate:
      'Max 2 exercises, 3-4 sets of 8-12 reps. Heavy sessions only.',
    advanced:
      'Max 2 exercises, 3-4 sets of 8-12 reps. Heavy sessions only.',
  },
};

export const CORE: AdditionalExercise = {
  category: 'core',
  displayName: 'Core',
  description:
    'Recommended. Perform after the basic work. 3-4 sets. No problem to add — ' +
    'core work does not meaningfully interfere with weighted calisthenics recovery.',
  recommended: true,
  placementRule: 'after_basics',
  volumePerStage: {
    novice: '3-4 sets. No problem to add.',
    advanced_novice: '3-4 sets. No problem to add.',
    intermediate: '3-4 sets. No problem to add.',
    advanced: '3-4 sets. No problem to add.',
  },
};

export const ENDURANCE: AdditionalExercise = {
  category: 'endurance',
  displayName: 'Endurance',
  description:
    'NOT recommended at all. Endurance work harms recovery, reduces strength via nervous system interference. ' +
    'Strength work already improves endurance on its own — dedicated endurance training is counterproductive.',
  recommended: false,
  placementRule: 'after_basics',
  volumePerStage: {
    novice: 'Not recommended. Harms recovery and strength gains.',
    advanced_novice: 'Not recommended. Harms recovery and strength gains.',
    intermediate: 'Not recommended. Harms recovery and strength gains.',
    advanced: 'Not recommended. Harms recovery and strength gains.',
  },
};

/** All additional exercise categories */
export const ALL_ADDITIONAL_EXERCISES: AdditionalExercise[] = [
  LEGS,
  ONE_ARM_PULL_UPS,
  MUSCLE_UPS,
  SKILL_WORK,
  BODYBUILDING,
  CORE,
  ENDURANCE,
];

/** General rule: no more than 2 additional things per session */
export const MAX_ADDITIONAL_PER_SESSION = 2;
