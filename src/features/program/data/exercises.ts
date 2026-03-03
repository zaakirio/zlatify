import type { ExerciseFormGuide } from '../types/program.types';

export const PULL_UP_FORM_GUIDE: ExerciseFormGuide = {
  exerciseId: 'weighted_pull_up',
  displayName: 'Pull Up',
  musclesWorked: [
    'Upper back - lats',
    'Upper back - middle and lower traps',
    'Upper back - rear delts',
    'Arms - biceps',
    'Arms - brachialis',
    'Arms - brachioradialis',
    'Arms - forearm flexors',
    'Core - rectus abdominis',
    'Core - obliques',
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'Hang',
      description:
        'Arms straight, overhand grip approximately 1.5x shoulder width. Thumbs on top of or wrapped around the bar.',
    },
    {
      stepNumber: 2,
      title: 'Initiate the pull',
      description:
        'Pull using lats and arms, fast and explosive. Pull slightly back as well as up to engage the back fully.',
    },
    {
      stepNumber: 3,
      title: 'Finish the pull up',
      description:
        'Pull chin over the bar (covering the bar with your chin). The slight forward motion from step 2 makes the top position easier.',
    },
    {
      stepNumber: 4,
      title: 'Lower down',
      description:
        'Lock out arms at the bottom. Do not slam your joints but do not lower too slowly either. Aim for a comfortable, controlled pace.',
    },
  ],
  mistakes: [
    {
      mistakeNumber: 1,
      title: 'Wrong grip',
      description:
        'Grip too close or too wide reduces max strength. Underhand or neutral grip is rarely allowed in competition.',
    },
    {
      mistakeNumber: 2,
      title: 'Jump start',
      description:
        'Jumping builds leg explosiveness, not pulling strength. You are cheating yourself.',
    },
    {
      mistakeNumber: 3,
      title: 'Starting from bent arms',
      description:
        'Disqualifies reps in competition. Also makes pull ups harder by cutting the bottom range of motion.',
    },
    {
      mistakeNumber: 4,
      title: 'Not going chin over bar',
      description:
        'Chin to bar only is a step towards perfection, not the goal. Pull chin fully over the bar.',
    },
    {
      mistakeNumber: 5,
      title: 'Kipping',
      description:
        'Slight leg movement for balance is fine. Noticeable kicking or swinging is wrong.',
    },
    {
      mistakeNumber: 6,
      title: 'Not controlling weight',
      description:
        'Always keep the weight controlled. No swinging at any point during the movement.',
    },
  ],
};

export const DIP_FORM_GUIDE: ExerciseFormGuide = {
  exerciseId: 'weighted_dip',
  displayName: 'Dip',
  musclesWorked: [
    'Chest - all pectoral fibers',
    'Triceps - elbow extension and lockout',
    'Shoulders - front deltoids',
    'Shoulders - lateral deltoids',
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'Setup',
      description:
        'Grab the bars, get into support position with locked elbows and protracted shoulders. Squeeze the bars, keep legs straight if possible, and keep abs tight.',
    },
    {
      stepNumber: 2,
      title: 'Negative',
      description:
        'Go down with protracted shoulders and a tight core. Lean forward — this is critical. You can round your back slightly but do not pike.',
    },
    {
      stepNumber: 3,
      title: 'Breaking parallel',
      description:
        'Bend arms to 90 degrees or lower. Keep shoulders protracted (closed chest position). This reduces shoulder injury risk.',
    },
    {
      stepNumber: 4,
      title: 'Push up',
      description:
        'Extend arms forcefully. Retract the scapula and arch from a rounded to neutral position. Lean back to compensate for the forward lean on the way down.',
    },
    {
      stepNumber: 5,
      title: 'Lock out',
      description:
        'Lock elbows fully and arrive in the support position from step 1.',
    },
  ],
  mistakes: [
    {
      mistakeNumber: 1,
      title: 'Not going full ROM',
      description:
        'Quarter dips are not dips. Break parallel AND lock out at the top.',
    },
    {
      mistakeNumber: 2,
      title: 'Going completely vertical',
      description:
        'No forward lean puts too much strain on the elbows and is unnecessarily hard.',
    },
    {
      mistakeNumber: 3,
      title: 'Excessive lean and piking',
      description:
        'Only leaning or piking for range of motion while the lower body stays still. The lower body should move with the upper body.',
    },
    {
      mistakeNumber: 4,
      title: 'Starting with retracted shoulders',
      description:
        'Unnecessarily hard and traumatic for the shoulder joint. Keep shoulders protracted and under tension.',
    },
    {
      mistakeNumber: 5,
      title: 'Lack of control on negative',
      description:
        'Dropping down in an uncontrolled manner is dangerous. Squeeze the bars for control throughout the descent.',
    },
    {
      mistakeNumber: 6,
      title: 'Not controlling weight',
      description:
        'Same principle as pull ups. Keep the weight controlled at all times, no swinging.',
    },
  ],
};

/** All exercise form guides indexed by exercise ID */
export const EXERCISE_FORM_GUIDES: Record<string, ExerciseFormGuide> = {
  weighted_pull_up: PULL_UP_FORM_GUIDE,
  weighted_dip: DIP_FORM_GUIDE,
};
