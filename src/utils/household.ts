import { newMemberColors } from '../data/households';
import { DEFAULT_GOAL, WELCOME_BONUS } from './points';
import type { StarterChore } from '../data/starterChores';
import type { AuthUser, HouseholdSeed } from '../types/auth';
import type { Chore, Member } from '../types/chores';

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || 'there';
}

export function lastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

export function suggestedHomeName(user: AuthUser): string {
  const last = lastName(user.name);
  return last ? `The ${last} home` : `${firstName(user.name)}'s home`;
}

function newMember(user: AuthUser, role: Member['role']): Member {
  return {
    id: 'you',
    name: firstName(user.name),
    role,
    bg: newMemberColors.bg,
    fg: newMemberColors.fg,
    email: user.email,
    provider: user.provider,
    weekDone: 0,
    pointsGoal: DEFAULT_GOAL,
    periodEarned: 0,
    // Every new member gets a head start to spend in the store
    banked: WELCOME_BONUS
  };
}

/** Invited users join the existing family as a contributor */
export function joinHousehold(seed: HouseholdSeed, user: AuthUser): HouseholdSeed {
  const me = newMember(user, 'contributor');
  return { ...seed, members: [...seed.members, me], currentUserId: me.id };
}

/** Everyone else starts their own family as its admin */
export function createHousehold(name: string, user: AuthUser, starters: StarterChore[]): HouseholdSeed {
  const me = newMember(user, 'admin');
  const chores: Chore[] = starters.map((s) => ({
    id: `new-${s.id}`,
    title: s.title,
    area: s.area,
    due: s.due,
    assigneeId: null,
    done: false,
    repeat: s.repeat,
    subtasks: s.steps?.map((step, i) => ({ id: `new-${s.id}-${i}`, title: step, done: false }))
  }));
  return { name, members: [me], currentUserId: me.id, chores };
}