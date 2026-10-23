import type { Chore, Member } from '../types/chores';
import type { PointsPeriod } from '../types/rewards';

/** One place to rename the currency */
export const TOKENS_NAME = 'Tolitokens';
export const WELCOME_BONUS = 50;
export const DEFAULT_GOAL = 60;

/** Chore worth is set in minutes: 1 minute = 1 token */
export const minuteOptions = [5, 10, 15, 20, 30, 45, 60];

export function tokens(n: number): string {
  return `${n} ${Math.abs(n) === 1 ? 'token' : 'tokens'}`;
}

export const periodInfo: Record<PointsPeriod, {option: string;noun: string;label: string;daysLeft: number;}> = {
  week: { option: 'Week', noun: 'week', label: 'this week', daysLeft: 4 },
  fortnight: { option: '2 weeks', noun: 'two weeks', label: 'these two weeks', daysLeft: 11 },
  month: { option: 'Month', noun: 'month', label: 'this month', daysLeft: 10 }
};

export interface Wallet {
  /** Earned in the current period */
  earned: number;
  goal: number;
  /** Earned above the goal — spendable straight away */
  surplus: number;
  /** Still needed to reach the goal */
  toGo: number;
  /** Saved from earlier periods (incl. welcome bonus), minus anything spent */
  banked: number;
  spendable: number;
}

export function walletFor(member: Member, chores: Chore[]): Wallet {
  const fromChores = chores.
  filter((c) => c.done && c.doneById === member.id).
  reduce((sum, c) => sum + (c.points ?? 0), 0);
  const earned = (member.periodEarned ?? 0) + fromChores;
  const goal = member.pointsGoal ?? DEFAULT_GOAL;
  const surplus = Math.max(0, earned - goal);
  const banked = member.banked ?? 0;
  return {
    earned,
    goal,
    surplus,
    toGo: Math.max(0, goal - earned),
    banked,
    spendable: Math.max(0, banked + surplus)
  };
}