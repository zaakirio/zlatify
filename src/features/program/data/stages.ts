import type { StageConfig } from '../types/program.types';

// ---------------------------------------------------------------------------
// Stage 1: NOVICE
// Requirements: 12 BW pull ups, 15 BW dips
// Strength range: Pull ups up to +50kg x 5, Dips up to +70kg x 5
// Uses additional weight only for percentages (not absolute)
// ---------------------------------------------------------------------------
export const NOVICE_STAGE: StageConfig = {
  stage: 'novice',
  displayName: 'Novice',
  description:
    'Entry stage for athletes who can perform 12 bodyweight pull ups and 15 bodyweight dips. ' +
    'Progresses through hypertrophy, transition, and strength phases using double progression on additional weight.',
  strengthRange: {
    pullUp: { minAddedWeight: 0, maxAddedWeight: 50, reps: 5 },
    dip: { minAddedWeight: 0, maxAddedWeight: 70, reps: 5 },
  },
  prerequisites: '12 BW pull ups, 15 BW dips',
  usesAbsolutePercentages: false,
  phases: [
    // ----- Phase 1: Hypertrophy -----
    {
      phase: 'hypertrophy',
      displayName: 'Phase 1: Hypertrophy',
      description:
        'High-rep accumulation phase. 3 identical sessions per week, 3 working sets of each exercise at 8-10 reps. ' +
        'Double progression: add weight when you hit the top of the rep range across all sets.',
      durationGuideline: '4-6 weeks',
      cycleStructure: {
        weeks: [
          {
            weekLabel: 'Standard Week',
            weekType: 'regular',
            sessions: [
              // Monday
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
              // Wednesday
              {
                sessionType: 'heavy',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
              // Friday
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [8, 10],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 10, increment: 2.5 },
                            { reps: 9, increment: 1.25 },
                            { reps: 8, increment: 1.25 },
                            { reps: 7, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          working: {
            type: 'rep_based',
            repThresholds: [
              { reps: 10, increment: 2.5 },
              { reps: 9, increment: 1.25 },
              { reps: 8, increment: 1.25 },
              { reps: 7, increment: 0 },
            ],
            stallThreshold: 3,
            stallAction: 'phase_transition',
          },
        },
        weighted_dip: {
          working: {
            type: 'rep_based',
            repThresholds: [
              { reps: 10, increment: 2.5 },
              { reps: 9, increment: 1.25 },
              { reps: 8, increment: 1.25 },
              { reps: 7, increment: 0 },
            ],
            stallThreshold: 3,
            stallAction: 'phase_transition',
          },
        },
      },
      advancementCriteria: {
        type: 'consecutive_stall',
        threshold: 3,
        action: 'next_phase',
        description:
          '7 reps in at least 1 set for MORE than 3 sessions triggers transition to Phase 2 (Transition).',
      },
      warmupProtocol: {
        beforeSession: 'Basic full body warm up, 8 pull ups, 10 dips',
        beforeWorkingSets: [{ percentageOfWorkingWeight: 50, reps: 5 }],
        skipThreshold: 15,
      },
    },

    // ----- Phase 2: Transition -----
    {
      phase: 'transition',
      displayName: 'Phase 2: Transition',
      description:
        'Bridge between hypertrophy and strength. Same 3-session structure with 3 sets each, but rep range drops to 6-8. ' +
        'Start weight is the last successful weight from Phase 1 where all sets exceeded 7 reps.',
      durationGuideline: '6-8 weeks',
      cycleStructure: {
        weeks: [
          {
            weekLabel: 'Standard Week',
            weekType: 'regular',
            sessions: [
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                sessionType: 'heavy',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [6, 8],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 8, increment: 2.5 },
                            { reps: 7, increment: 1.25 },
                            { reps: 6, increment: 0.5 },
                            { reps: 5, increment: 0 },
                          ],
                          stallThreshold: 3,
                          stallAction: 'phase_transition',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          working: {
            type: 'rep_based',
            repThresholds: [
              { reps: 8, increment: 2.5 },
              { reps: 7, increment: 1.25 },
              { reps: 6, increment: 0.5 },
              { reps: 5, increment: 0 },
            ],
            stallThreshold: 3,
            stallAction: 'phase_transition',
          },
        },
        weighted_dip: {
          working: {
            type: 'rep_based',
            repThresholds: [
              { reps: 8, increment: 2.5 },
              { reps: 7, increment: 1.25 },
              { reps: 6, increment: 0.5 },
              { reps: 5, increment: 0 },
            ],
            stallThreshold: 3,
            stallAction: 'phase_transition',
          },
        },
      },
      advancementCriteria: {
        type: 'consecutive_stall',
        threshold: 3,
        action: 'next_phase',
        description:
          '5 reps in at least 1 set for more than 3 sessions triggers transition to Phase 3 (Strength).',
      },
      warmupProtocol: {
        beforeSession: 'Basic full body warm up, 8 pull ups, 10 dips',
        beforeWorkingSets: [{ percentageOfWorkingWeight: 50, reps: 5 }],
        skipThreshold: 15,
      },
    },

    // ----- Phase 3: Strength -----
    {
      phase: 'strength',
      displayName: 'Phase 3: Strength',
      description:
        'Pure strength phase. 1 top set of 3-6 reps followed by 3 back-off sets at 10% less weight. ' +
        'Progression on top set only. Run this as long as possible before advancing to Advanced Novice.',
      durationGuideline: 'As long as possible',
      cycleStructure: {
        weeks: [
          {
            weekLabel: 'Standard Week',
            weekType: 'regular',
            sessions: [
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                sessionType: 'heavy',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallThreshold: 2,
                          stallAction: 'stage_transition',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [3, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          top: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallThreshold: 2,
            stallAction: 'stage_transition',
          },
        },
        weighted_dip: {
          top: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallThreshold: 2,
            stallAction: 'stage_transition',
          },
        },
      },
      advancementCriteria: {
        type: 'rep_floor',
        threshold: 2,
        action: 'next_stage',
        description:
          '2 reps in any top set triggers advancement to Advanced Novice stage.',
      },
      warmupProtocol: {
        beforeSession: 'Basic full body warm up, 8 pull ups, 10 dips',
        beforeWorkingSets: [{ percentageOfWorkingWeight: 50, reps: 5 }],
        skipThreshold: 15,
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Stage 2: ADVANCED NOVICE
// Strength range: Pull ups +50-70kg x 5, Dips +70-100kg x 5
// ---------------------------------------------------------------------------

/** Helper: the rep-based progression rule shared across Advanced Novice heavy sessions */
const advNoviceHeavyProgression = {
  type: 'rep_based' as const,
  repThresholds: [
    { reps: 6, increment: 2.5 },
    { reps: 5, increment: 1.25 },
    { reps: 4, increment: 0.5 },
    { reps: 3, increment: 0.5 },
  ],
  stallThreshold: 2,
  stallAction: 'deload_and_restart' as const,
};

export const ADVANCED_NOVICE_STAGE: StageConfig = {
  stage: 'advanced_novice',
  displayName: 'Advanced Novice',
  description:
    'Heavy/deload periodisation introduced. Monday & Friday heavy sessions with a Wednesday deload. ' +
    'Progresses into a two-week-type system with 1RM testing every 3 weeks.',
  strengthRange: {
    pullUp: { minAddedWeight: 50, maxAddedWeight: 70, reps: 5 },
    dip: { minAddedWeight: 70, maxAddedWeight: 100, reps: 5 },
  },
  usesAbsolutePercentages: false,
  phases: [
    // ----- Phase 1: Introductory -----
    {
      phase: 'introductory',
      displayName: 'Phase 1: Introductory',
      description:
        'Heavy/deload split. Monday & Friday are heavy 4x3-6 sessions; Wednesday is a deload at 70% with form emphasis. ' +
        'Progression carries from heavy session to heavy session (twice per week).',
      durationGuideline: '4-6 weeks',
      cycleStructure: {
        weeks: [
          {
            weekLabel: 'Standard Week',
            weekType: 'regular',
            sessions: [
              // Monday: Heavy
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: advNoviceHeavyProgression,
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: advNoviceHeavyProgression,
                      },
                    ],
                  },
                ],
              },
              // Wednesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 70,
                        },
                        executionNotes:
                          'Dead hang pause explosive form',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 70,
                        },
                        executionNotes: '3 count pause at bottom',
                      },
                    ],
                  },
                ],
              },
              // Friday: Heavy
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: advNoviceHeavyProgression,
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: [3, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: advNoviceHeavyProgression,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          working: advNoviceHeavyProgression,
        },
        weighted_dip: {
          working: advNoviceHeavyProgression,
        },
      },
      advancementCriteria: {
        type: 'consecutive_stall',
        threshold: 2,
        action: 'deload_then_next_phase',
        description:
          '3 reps more than 2 times in a row triggers a 10% deload and move to Phase 2 (Progressive).',
      },
      warmupProtocol: {
        beforeSession: '10 pull ups, 10 dips',
        beforeWorkingSets: [
          { percentageOfWorkingWeight: 50, reps: 5 },
          { percentageOfWorkingWeight: 75, reps: 3 },
        ],
        beforeDeload: [{ percentageOfWorkingWeight: 60, reps: 5 }],
      },
    },

    // ----- Phase 2: Progressive -----
    {
      phase: 'progressive',
      displayName: 'Phase 2: Progressive',
      description:
        'Two week types: regular (3x/week with Mon heavy, Wed deload, Fri medium) and 1RM test (every 3 regular weeks). ' +
        'Back-off sets use top-set weight minus 10%. Progression carries from Mon top set to Fri top set and vice versa.',
      durationGuideline: 'Until consecutive deloads trigger stage advancement',
      cycleStructure: {
        regularWeeksBeforeTest: 3,
        weeks: [
          // Regular week
          {
            weekLabel: 'Regular Week',
            weekType: 'regular',
            sessions: [
              // Monday: Heavy - 1 top + max 5 back-offs
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 5,
                        maxSets: 5,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                        executionNotes:
                          'As many back-off sets as possible, max 5. Same reps as top set.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 5,
                        maxSets: 5,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                        executionNotes:
                          'As many back-off sets as possible, max 5. Same reps as top set.',
                      },
                    ],
                  },
                ],
              },
              // Wednesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 70,
                        },
                        executionNotes:
                          'Dead hang pause explosive form',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 70,
                        },
                        executionNotes: '3 count pause at bottom',
                      },
                    ],
                  },
                ],
              },
              // Friday: Medium - 1 top + 3 back-offs
              {
                sessionType: 'medium',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 1RM Test week
          {
            weekLabel: '1RM Test Week',
            weekType: '1rm_test',
            sessions: [
              // Monday: Heavy - 1 top + max 4 back-offs
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 4,
                        maxSets: 4,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                        executionNotes:
                          'As many back-off sets as possible, max 4. Same reps as top set.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: { type: 'absolute' },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 4,
                        maxSets: 4,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_top_set',
                          pct: 90,
                        },
                        executionNotes:
                          'As many back-off sets as possible, max 4. Same reps as top set.',
                      },
                    ],
                  },
                ],
              },
              // Wednesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 80,
                        },
                        executionNotes:
                          'Dead hang pause explosive form',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 80,
                        },
                        executionNotes: '3 count pause at bottom',
                      },
                    ],
                  },
                ],
              },
              // Friday: 1RM Test + back-offs
              {
                sessionType: '1rm_test',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 90,
                        },
                        executionNotes:
                          'Same reps as Monday top set, 10% less than Monday top weight.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_monday_top',
                          pct: 90,
                        },
                        executionNotes:
                          'Same reps as Monday top set, 10% less than Monday top weight.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          top: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0 },
            ],
            stallAction: 'deload_and_restart',
          },
        },
        weighted_dip: {
          top: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0 },
            ],
            stallAction: 'deload_and_restart',
          },
        },
      },
      advancementCriteria: {
        type: 'consecutive_deloads',
        threshold: 2,
        action: 'next_stage',
        description:
          "Can't add weight/reps for 1 week triggers a 10% deload. 2+ consecutive deloads triggers advancement to Intermediate.",
      },
      warmupProtocol: {
        beforeSession: '10 pull ups, 10 dips',
        beforeWorkingSets: [
          { percentageOfWorkingWeight: 50, reps: 5 },
          { percentageOfWorkingWeight: 75, reps: 3 },
        ],
        beforeDeload: [{ percentageOfWorkingWeight: 60, reps: 5 }],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Stage 3: INTERMEDIATE
// Strength: Pull ups +70kg x 5 to +90kg x 3-4, Dips +100kg x 5 to +120kg x 3-4
// Uses absolute percentages (bodyweight/2 formula)
// ---------------------------------------------------------------------------
export const INTERMEDIATE_STAGE: StageConfig = {
  stage: 'intermediate',
  displayName: 'Intermediate',
  description:
    'Percentage-based programming using bodyweight/2 formula for 1RM percentage calculations. ' +
    'Phase 1 uses a 1-week cycle (volume/deload/max); Phase 2 uses a 2-week volume/realization cycle.',
  strengthRange: {
    pullUp: { minAddedWeight: 70, maxAddedWeight: 90, reps: 4 },
    dip: { minAddedWeight: 100, maxAddedWeight: 120, reps: 4 },
  },
  usesAbsolutePercentages: true,
  phases: [
    // ----- Phase 1: 1-Week Cycle -----
    {
      phase: 'one_week_cycle',
      displayName: 'Phase 1: 1-Week Cycle',
      description:
        'Monday volume (3x3 at 80% + 3x4-6 at 65%), Wednesday deload (70% of 3x3 weight), ' +
        'Friday max (1 set at 3x3 weight + 2 back-offs). 1RM test every 3 weeks replaces Friday max. ' +
        '4 independent progression tracks.',
      durationGuideline: '4-6 months',
      cycleStructure: {
        regularWeeksBeforeTest: 3,
        weeks: [
          // Regular week
          {
            weekLabel: 'Regular Week',
            weekType: 'regular',
            sessions: [
              // Monday: Volume
              {
                sessionType: 'volume',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: '3x3 at 80% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 65,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes: '3x4-6 at 65% 1RM (independent progression)',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: '3x3 at 80% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 65,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes: '3x4-6 at 65% 1RM (independent progression)',
                      },
                    ],
                  },
                ],
              },
              // Wednesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 70,
                        },
                        executionNotes:
                          'Dead hang pause explosive form. 70% of Monday 3x3 weight.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 70,
                        },
                        executionNotes:
                          '3 count pause at bottom. 70% of Monday 3x3 weight.',
                      },
                    ],
                  },
                ],
              },
              // Friday: Max
              {
                sessionType: 'max',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 100,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                            { reps: 2, increment: 0 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes:
                          'Same weight as Monday 3x3. Max set drives progression for 3x3 and deload.',
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'fixed_offset_from_top',
                          offsetKg: -15,
                        },
                        executionNotes:
                          'Dead hang form. 15kg less than top set weight.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'top',
                        targetSets: 1,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 100,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                            { reps: 2, increment: 0 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes:
                          'Same weight as Monday 3x3. Max set drives progression for 3x3 and deload.',
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'fixed_offset_from_top',
                          offsetKg: -20,
                        },
                        executionNotes:
                          '3 count pause form. 20kg less than top set weight.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 1RM Test week (replaces max session every 3 weeks)
          {
            weekLabel: '1RM Test Week',
            weekType: '1rm_test',
            sessions: [
              // Monday: Volume (same as regular)
              {
                sessionType: 'volume',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: '3x3 at 80% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 65,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes: '3x4-6 at 65% 1RM (independent progression)',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: '3x3 at 80% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 65,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'phase_transition',
                        },
                        executionNotes: '3x4-6 at 65% 1RM (independent progression)',
                      },
                    ],
                  },
                ],
              },
              // Wednesday: Deload (same as regular)
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 70,
                        },
                        executionNotes:
                          'Dead hang pause explosive form. 70% of Monday 3x3 weight.',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_3x3',
                          pct: 70,
                        },
                        executionNotes:
                          '3 count pause at bottom. 70% of Monday 3x3 weight.',
                      },
                    ],
                  },
                ],
              },
              // Friday: 1RM Test
              {
                sessionType: '1rm_test',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'fixed_offset_from_top',
                          offsetKg: -15,
                        },
                        executionNotes:
                          "Dead hang form. Back-offs use last regular week's max weight minus 15kg.",
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'fixed_offset_from_top',
                          offsetKg: -20,
                        },
                        executionNotes:
                          "3 count pause form. Back-offs use last regular week's max weight minus 20kg.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          max_set: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
              { reps: 2, increment: 0 },
            ],
            stallAction: 'phase_transition',
          },
          '3x4_6': {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallAction: 'phase_transition',
          },
        },
        weighted_dip: {
          max_set: {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
              { reps: 2, increment: 0 },
            ],
            stallAction: 'phase_transition',
          },
          '3x4_6': {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallAction: 'phase_transition',
          },
        },
      },
      advancementCriteria: {
        type: 'no_progress_cycles',
        threshold: 3,
        action: 'next_phase',
        description:
          'No 0.5kg progress for 3 full cycles triggers transition to Phase 2 (2-Week Cycle).',
      },
      warmupProtocol: {
        beforeSession: '10 pull ups, 10 dips',
        beforeWorkingSets: [
          { percentageOfWorkingWeight: 35, reps: 5 },
          { percentageOfWorkingWeight: 60, reps: 3 },
          { percentageOfWorkingWeight: 85, reps: 2 },
        ],
        beforeDeload: [{ percentageOfWorkingWeight: 60, reps: 5 }],
      },
    },

    // ----- Phase 2: 2-Week Cycle -----
    {
      phase: 'two_week_cycle',
      displayName: 'Phase 2: 2-Week Cycle',
      description:
        'Alternating volume and realization weeks. Volume week: 4 sessions (Mon/Fri heavy 3x3 at 85%, Tue/Sat accessory). ' +
        'Realization week: Tuesday deload 2x2 at 80%, Friday 1RM test + back-offs. RPE-based progression on 3x3.',
      durationGuideline: '6 months to 1 year',
      cycleStructure: {
        weeks: [
          // Week 1: Volume
          {
            weekLabel: 'Week 1: Volume',
            weekType: 'volume',
            sessions: [
              // Monday: Heavy 3x3
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
              // Tuesday: Accessory
              {
                sessionType: 'accessory',
                dayLabel: 'Tuesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 50,
                        },
                        executionNotes: 'Dead hang pause explosive form',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 60,
                        },
                        executionNotes: '3 count pause at bottom',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
              // Friday: Heavy 3x3
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
              // Saturday: Accessory
              {
                sessionType: 'accessory',
                dayLabel: 'Saturday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 50,
                        },
                        executionNotes: 'Dead hang pause explosive form',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 5,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 60,
                        },
                        executionNotes: '3 count pause at bottom',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // Week 2: Realization
          {
            weekLabel: 'Week 2: Realization',
            weekType: 'realization',
            sessions: [
              // Tuesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Tuesday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Dead hang explosive form',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: '3 count pause at bottom',
                      },
                    ],
                  },
                ],
              },
              // Friday: 1RM Test + back-offs
              {
                sessionType: '1rm_test',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Deadhang form',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                      },
                      {
                        setType: 'back_off',
                        targetSets: 2,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Paused form',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          '3x3': {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
          accessory: {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
        },
        weighted_dip: {
          '3x3': {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
          accessory: {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
        },
      },
      advancementCriteria: {
        type: 'no_progress_cycles',
        threshold: 3,
        action: 'next_stage',
        description:
          "Can't add weight/reps for 3+ full 2-week cycles triggers advancement to Advanced stage.",
      },
      warmupProtocol: {
        beforeSession: '10 pull ups, 10 dips',
        beforeWorkingSets: [
          { percentageOfWorkingWeight: 35, reps: 5 },
          { percentageOfWorkingWeight: 60, reps: 3 },
          { percentageOfWorkingWeight: 85, reps: 2 },
        ],
        beforeDeload: [{ percentageOfWorkingWeight: 60, reps: 5 }],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Stage 4: ADVANCED
// Strength: Pull ups 105kg+ 1RM, Dips 140kg+ 1RM
// Uses absolute percentages
// ---------------------------------------------------------------------------
export const ADVANCED_STAGE: StageConfig = {
  stage: 'advanced',
  displayName: 'Advanced',
  description:
    'Peak-level programming with a 3-week cycle: volume week (5 sessions), recovery week (2 sessions), ' +
    'realization week (2 sessions). RPE-based progression on heavy work with 1RM testing every cycle.',
  strengthRange: {
    pullUp: { minAddedWeight: 105, maxAddedWeight: 999, reps: 1 },
    dip: { minAddedWeight: 140, maxAddedWeight: 999, reps: 1 },
  },
  usesAbsolutePercentages: true,
  phases: [
    {
      phase: 'advanced_cycle',
      displayName: 'Advanced Cycle',
      description:
        '3-week mesocycle. Week 1: volume (Mon/Fri heavy, Tue/Sun accessory, Thu recovery). ' +
        'Week 2: recovery (Wed deload, Sat preparatory). Week 3: realization (Tue 1RM test, Fri prep for next cycle).',
      durationGuideline: 'Indefinite',
      cycleStructure: {
        weeks: [
          // ----- Week 1: Volume (5 sessions) -----
          {
            weekLabel: 'Week 1: Volume',
            weekType: 'volume',
            sessions: [
              // Monday: Heavy
              {
                sessionType: 'heavy',
                dayLabel: 'Monday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                        executionNotes: 'Dips 3x3 at 85% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 70,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                        executionNotes: 'Dips 3x4-6 at 70% 1RM (independent progression)',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                        executionNotes: 'Pull ups 3x3 at 85% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 70,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                        executionNotes:
                          'Pull ups 3x4-6 at 70% 1RM (independent progression)',
                      },
                    ],
                  },
                ],
              },
              // Tuesday: Accessory
              {
                sessionType: 'accessory',
                dayLabel: 'Tuesday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 60,
                        },
                        executionNotes:
                          'Double paused dips: 3 count in support position + 3 count at bottom',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 55,
                        },
                        executionNotes:
                          'Double paused pull ups: 3 count deadhang + 3 count at top',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
              // Thursday: Recovery
              {
                sessionType: 'recovery',
                dayLabel: 'Thursday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 2,
                        targetReps: 6,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 50,
                        },
                        executionNotes: 'Recovery dips 2x6 at 50% 1RM',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 2,
                        targetReps: 6,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 50,
                        },
                        executionNotes: 'Recovery pull ups 2x6 at 50% 1RM',
                      },
                    ],
                  },
                ],
              },
              // Friday: Heavy (same as Monday)
              {
                sessionType: 'heavy',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                        executionNotes: 'Dips 3x3 at 85% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 70,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                        executionNotes: 'Dips 3x4-6 at 70% 1RM (independent progression)',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 85,
                        },
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                        executionNotes: 'Pull ups 3x3 at 85% 1RM',
                      },
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: [4, 6],
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 70,
                        },
                        progressionRule: {
                          type: 'rep_based',
                          repThresholds: [
                            { reps: 6, increment: 2.5 },
                            { reps: 5, increment: 1.25 },
                            { reps: 4, increment: 0.5 },
                            { reps: 3, increment: 0.5 },
                          ],
                          stallAction: 'deload_and_restart',
                        },
                        executionNotes:
                          'Pull ups 3x4-6 at 70% 1RM (independent progression)',
                      },
                    ],
                  },
                ],
              },
              // Sunday: Accessory (same as Tuesday)
              {
                sessionType: 'accessory',
                dayLabel: 'Sunday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 60,
                        },
                        executionNotes:
                          'Double paused dips: 3 count in support position + 3 count at bottom',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 4,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 55,
                        },
                        executionNotes:
                          'Double paused pull ups: 3 count deadhang + 3 count at top',
                        progressionRule: {
                          type: 'rpe_based',
                          rpeThresholds: [
                            { rpe: 'easy', increment: 2.5 },
                            { rpe: 'moderate', increment: 1.25 },
                            { rpe: 'hard', increment: 0.5 },
                            { rpe: 'failed', increment: 0 },
                          ],
                          failAction: 'deload_5_10_percent',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // ----- Week 2: Recovery (2 sessions) -----
          {
            weekLabel: 'Week 2: Recovery',
            weekType: 'recovery',
            sessions: [
              // Wednesday: Deload
              {
                sessionType: 'deload',
                dayLabel: 'Wednesday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Paused dips',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Deadstop explosive pull ups',
                      },
                    ],
                  },
                ],
              },
              // Saturday: Preparatory
              {
                sessionType: 'preparatory',
                dayLabel: 'Saturday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 1,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 90,
                        },
                        executionNotes: 'Paused dips 3x1 at 90% 1RM',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'working',
                        targetSets: 3,
                        targetReps: 1,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 90,
                        },
                        executionNotes: 'Explosive pull ups 3x1 at 90% 1RM',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // ----- Week 3: Realization (2 sessions) -----
          {
            weekLabel: 'Week 3: Realization',
            weekType: 'realization',
            sessions: [
              // Tuesday: 1RM Test + back-offs
              {
                sessionType: '1rm_test',
                dayLabel: 'Tuesday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                        executionNotes: '1RM test dips',
                      },
                      {
                        setType: 'back_off',
                        targetSets: 1,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes: 'Paused dips 1x3 at 80% 1RM',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: '1rm_attempt',
                        targetSets: 1,
                        targetReps: 1,
                        weightCalculation: { type: 'absolute' },
                        executionNotes: '1RM test pull ups',
                      },
                      {
                        setType: 'back_off',
                        targetSets: 1,
                        targetReps: 3,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes:
                          'Deadhang explosive pull ups 1x3 at 80% 1RM',
                      },
                    ],
                  },
                ],
              },
              // Friday: Prep for next cycle
              {
                sessionType: 'deload',
                dayLabel: 'Friday',
                exercises: [
                  {
                    exerciseId: 'weighted_dip',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes:
                          'Paused dips. Prep for next cycle (same as Week 2 Wednesday).',
                      },
                    ],
                  },
                  {
                    exerciseId: 'weighted_pull_up',
                    sets: [
                      {
                        setType: 'deload',
                        targetSets: 2,
                        targetReps: 2,
                        weightCalculation: {
                          type: 'percentage_of_1rm',
                          pct: 80,
                        },
                        executionNotes:
                          'Deadstop explosive pull ups. Prep for next cycle (same as Week 2 Wednesday).',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      progressionRules: {
        weighted_pull_up: {
          '3x3': {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
          '3x4_6': {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallAction: 'deload_and_restart',
          },
          accessory: {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
        },
        weighted_dip: {
          '3x3': {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
          '3x4_6': {
            type: 'rep_based',
            repThresholds: [
              { reps: 6, increment: 2.5 },
              { reps: 5, increment: 1.25 },
              { reps: 4, increment: 0.5 },
              { reps: 3, increment: 0.5 },
            ],
            stallAction: 'deload_and_restart',
          },
          accessory: {
            type: 'rpe_based',
            rpeThresholds: [
              { rpe: 'easy', increment: 2.5 },
              { rpe: 'moderate', increment: 1.25 },
              { rpe: 'hard', increment: 0.5 },
              { rpe: 'failed', increment: 0 },
            ],
            failAction: 'deload_5_10_percent',
          },
        },
      },
      advancementCriteria: {
        type: 'no_progress_cycles',
        threshold: 999,
        action: 'next_stage',
        description:
          'Advanced is the final stage. No further advancement. Continue running 3-week cycles indefinitely.',
      },
      warmupProtocol: {
        beforeSession: '10 pull ups, 10 dips',
        beforeWorkingSets: [
          { percentageOfWorkingWeight: 35, reps: 5 },
          { percentageOfWorkingWeight: 60, reps: 3 },
          { percentageOfWorkingWeight: 85, reps: 2 },
        ],
        beforeDeload: [{ percentageOfWorkingWeight: 60, reps: 5 }],
      },
    },
  ],
};

/** All 4 stages in progression order */
export const ALL_STAGES: StageConfig[] = [
  NOVICE_STAGE,
  ADVANCED_NOVICE_STAGE,
  INTERMEDIATE_STAGE,
  ADVANCED_STAGE,
];
