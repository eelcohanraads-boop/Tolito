import { initialChores } from './chores';
import { initialShopping } from './shopping';
import { sampleRedemptions } from './rewards';
import { currentUserId, householdName, members } from './members';
import type { AuthUser, HouseholdSeed } from '../types/auth';

/** The de Vries family — the household that sends the invite in the prototype */
export const demoHousehold: HouseholdSeed = {
  name: householdName,
  members,
  currentUserId,
  chores: initialChores,
  shopping: initialShopping,
  redemptions: sampleRedemptions
};

export const inviterId = 'sanne';

/** Stand-in for the person signing up in Screens previews */
export const demoNewUser: AuthUser = {
  name: 'Lotte Jansen',
  email: 'lotte.jansen@gmail.com',
  provider: 'google'
};

/** Colour pair given to a brand-new member */
export const newMemberColors = { bg: '#D6EEDF', fg: '#3E8A5E' };