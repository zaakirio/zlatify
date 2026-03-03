export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDayOfWeek(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// Training day schedules per stage (0=Sun, 1=Mon, ..., 6=Sat)
const STAGE_TRAINING_DAYS: Record<string, number[]> = {
  novice: [1, 3, 5],           // Mon, Wed, Fri
  advanced_novice: [1, 3, 5],  // Mon, Wed, Fri
  intermediate: [1, 3, 5],     // Mon, Wed, Fri
  advanced: [1, 2, 4, 5, 6],   // Mon, Tue, Thu, Fri, Sat
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Returns the next valid training day name and whether it's today.
 * For novice/advanced_novice, ensures at least 1 rest day between workouts.
 */
export function getNextWorkoutDay(
  stage: string,
  lastWorkoutDate?: string,
): { dayName: string; isToday: boolean; daysAway: number } {
  const trainingDays = STAGE_TRAINING_DAYS[stage] ?? [1, 3, 5];
  const now = new Date();
  const todayDow = now.getDay();
  const requiresRestDay = stage === 'novice' || stage === 'advanced_novice';

  // Determine the last workout's day-of-week if available
  let lastWorkoutDow: number | null = null;
  let daysSinceLastWorkout: number | null = null;
  if (lastWorkoutDate) {
    const lastDate = new Date(lastWorkoutDate + 'T12:00:00');
    lastWorkoutDow = lastDate.getDay();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastStart = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    daysSinceLastWorkout = Math.round((todayStart.getTime() - lastStart.getTime()) / 86400000);
  }

  // Look up to 7 days ahead to find the next valid training day
  for (let offset = 0; offset < 7; offset++) {
    const candidateDow = (todayDow + offset) % 7;
    if (!trainingDays.includes(candidateDow)) continue;

    // If rest day required, check the candidate isn't consecutive with last workout
    if (requiresRestDay && daysSinceLastWorkout !== null) {
      const totalDaysFromLast = daysSinceLastWorkout + offset;
      if (totalDaysFromLast === 1) continue; // would be consecutive day — skip
    }

    return {
      dayName: DAY_NAMES[candidateDow],
      isToday: offset === 0,
      daysAway: offset,
    };
  }

  // Fallback — shouldn't happen with valid config
  return { dayName: DAY_NAMES[todayDow], isToday: true, daysAway: 0 };
}
