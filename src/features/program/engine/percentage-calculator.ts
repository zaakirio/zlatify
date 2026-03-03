/**
 * Zlat's percentage calculator for weighted calisthenics.
 *
 * Formula: effective_weight = additional_weight + (bodyweight / 2)
 *
 * IMPORTANT: This formula does NOT apply to novice and advanced novice programs.
 * Those use percentages of additional weight only.
 */

export interface PercentageResult {
  additionalWeight: number;
  bodyweight: number;
  effectiveWeight: number;
  percentageOf1RM: number;
}

/**
 * Calculate the effective weight (for intermediate/advanced only).
 * additional_weight + bodyweight/2
 */
export function calculateEffectiveWeight(
  additionalWeight: number,
  bodyweight: number,
): number {
  return additionalWeight + bodyweight / 2;
}

/**
 * Calculate the percentage of 1RM given additional weight and bodyweight.
 * Uses the Zlat formula: (additional_weight + bodyweight/2) / (1rm_additional + bodyweight/2)
 */
export function calculatePercentageOf1RM(
  additionalWeight: number,
  bodyweight: number,
  oneRepMaxAdditional: number,
): PercentageResult {
  const effectiveWeight = calculateEffectiveWeight(additionalWeight, bodyweight);
  const effective1RM = calculateEffectiveWeight(oneRepMaxAdditional, bodyweight);
  const percentageOf1RM = effective1RM > 0
    ? (effectiveWeight / effective1RM) * 100
    : 0;

  return {
    additionalWeight,
    bodyweight,
    effectiveWeight,
    percentageOf1RM,
  };
}

/**
 * Given a target percentage of 1RM, calculate the additional weight needed.
 * Reverses the formula: additional_weight = (percentage * effective_1rm / 100) - bodyweight/2
 */
export function additionalWeightForPercentage(
  targetPercentage: number,
  bodyweight: number,
  oneRepMaxAdditional: number,
): number {
  const effective1RM = calculateEffectiveWeight(oneRepMaxAdditional, bodyweight);
  const targetEffective = (targetPercentage / 100) * effective1RM;
  return targetEffective - bodyweight / 2;
}

/**
 * For novice/advanced novice: simple percentage of additional weight only.
 * Does NOT use the bodyweight/2 formula.
 */
export function simplePercentageOfAdditional(
  additionalWeight: number,
  percentage: number,
): number {
  return additionalWeight * (percentage / 100);
}
