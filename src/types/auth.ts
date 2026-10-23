import type { Chore, Member } from './chores';
import type { Features, Invite } from './settings';
import type { ShoppingItem } from './shopping';
import type { PointsPeriod, Redemption, Reward } from './rewards';

export type AuthProvider = 'password' | 'google' | 'apple' | 'microsoft';

export interface AuthUser {
  name: string;
  email: string;
  provider: AuthProvider;
}

export interface HouseholdSeed {
  name: string;
  members: Member[];
  currentUserId: string;
  chores: Chore[];
  features?: Features;
  invites?: Invite[];
  shopping?: ShoppingItem[];
  rewards?: Reward[];
  redemptions?: Redemption[];
  pointsPeriod?: PointsPeriod;
}