/** How long members have to reach their token goal */
export type PointsPeriod = 'week' | 'fortnight' | 'month';

export interface Reward {
  id: string;
  title: string;
  cost: number;
  description?: string;
}

export interface Redemption {
  id: string;
  rewardId: string;
  title: string;
  cost: number;
  memberId: string;
  /** Human-readable moment, e.g. "Yesterday" */
  when: string;
}