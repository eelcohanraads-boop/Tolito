import type { Role } from '../types/chores';

/** Friendly names: "admin" → Admin, "contributor" → Member */
export const roleInfo: Record<Role, {label: string;description: string;}> = {
  admin: {
    label: 'Admin',
    description: 'Can invite people, change roles, rename the family and switch features on or off.'
  },
  contributor: {
    label: 'Member',
    description: 'Can add, pick up, hand over and complete chores.'
  }
};

export function roleLabel(role: Role): string {
  return roleInfo[role].label;
}

export const providerNames: Record<'google' | 'apple' | 'microsoft', {name: string;account: string;}> = {
  google: { name: 'Google', account: 'Google account' },
  apple: { name: 'Apple', account: 'Apple ID' },
  microsoft: { name: 'Microsoft', account: 'Microsoft account' }
};