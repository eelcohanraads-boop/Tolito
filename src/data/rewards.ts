import type { Redemption, Reward } from '../types/rewards';

/** Starter rewards every new family gets — admins can change them */
export const starterRewards: Reward[] = [
{ id: 'r1', title: '30 min extra screen time', cost: 40 },
{ id: 'r2', title: 'Stay up 30 min later', cost: 50, description: 'Any night except school nights.' },
{ id: 'r3', title: 'Choose Friday dinner', cost: 60, description: 'You pick, the family cooks or orders.' },
{ id: 'r4', title: 'Pick the movie night film', cost: 80 },
{ id: 'r5', title: 'Skip one chore', cost: 100, description: "Hand one of your chores to the admins — no questions asked." },
{ id: 'r6', title: 'Breakfast in bed', cost: 120 }];


export const sampleRedemptions: Redemption[] = [
{ id: 'rd1', rewardId: 'r1', title: '30 min extra screen time', cost: 40, memberId: 'emma', when: 'Yesterday' },
{ id: 'rd2', rewardId: 'r3', title: 'Choose Friday dinner', cost: 60, memberId: 'daan', when: 'Last Friday' }];