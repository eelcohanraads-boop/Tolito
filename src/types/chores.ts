export type AreaId = 'kitchen' | 'bathroom' | 'laundry' | 'outside' | 'pets' | 'general';

export type Due = 'today' | 'tomorrow' | 'week';

export type Role = 'admin' | 'contributor';

export interface Member {
  id: string;
  name: string;
  role: Role;
  /** Pastel background behind the avatar */
  bg: string;
  /** Deeper tone used for initials and progress bars */
  fg: string;
  /** Optional illustrated avatar or photo; falls back to the initial */
  avatarUrl?: string;
  email?: string;
  /** How this person signs in — SSO users can't change their password in Tolito */
  provider?: 'password' | 'google' | 'apple' | 'microsoft';
  /** Chores completed earlier this week (before today) */
  weekDone: number;
  /** Tokens this person is expected to earn per period (set by admins) */
  pointsGoal?: number;
  /** Tokens earned earlier in the current period (before today's chores) */
  periodEarned?: number;
  /** Saved tokens from earlier periods, incl. the welcome bonus, minus spending */
  banked?: number;
}

/** Weekday index: 0 = Monday … 6 = Sunday */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Repeat =
{kind: 'none';} |
{kind: 'daily';} |
{kind: 'weekly';} |
{kind: 'custom';days: Weekday[];};

/** Owner per weekday for repeating chores; null = anyone */
export type Rotation = Partial<Record<Weekday, string | null>>;

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Chore {
  id: string;
  title: string;
  area: AreaId;
  due: Due;
  assigneeId: string | null;
  done: boolean;
  doneById?: string;
  note?: string;
  repeat?: Repeat;
  /** Days until the chore expires if not done; undefined/null = never */
  expiresInDays?: number | null;
  subtasks?: Subtask[];
  /** Tokens awarded when done — set in minutes (1 min = 1 token) by admins */
  points?: number | null;
  /** Different owners on different days, e.g. Tue → Emma, Wed → Daan */
  rotation?: Rotation | null;
}

export interface NewChore {
  title: string;
  area: AreaId;
  due: Due;
  assigneeId: string | null;
  repeat: Repeat;
  expiresInDays: number | null;
  subtasks: Subtask[];
  points: number | null;
  rotation: Rotation | null;
}