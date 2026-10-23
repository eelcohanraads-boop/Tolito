import type { AreaId, Due, Repeat } from '../types/chores';

export interface StarterChore {
  id: string;
  title: string;
  area: AreaId;
  due: Due;
  repeat?: Repeat;
  steps?: string[];
  suggested: boolean;
}

export const starterChores: StarterChore[] = [
{ id: 'st1', title: 'Empty the dishwasher', area: 'kitchen', due: 'today', repeat: { kind: 'daily' }, suggested: true },
{ id: 'st2', title: 'Take out the bins', area: 'outside', due: 'today', repeat: { kind: 'weekly' }, suggested: true },
{
  id: 'st3',
  title: 'Do the laundry',
  area: 'laundry',
  due: 'tomorrow',
  steps: ['Put it in the machine', 'Hang it out to dry', 'Fold it', 'Put it away in the closets'],
  suggested: true
},
{ id: 'st4', title: 'Vacuum the living room', area: 'general', due: 'tomorrow', repeat: { kind: 'weekly' }, suggested: true },
{ id: 'st5', title: 'Clean the bathroom', area: 'bathroom', due: 'week', repeat: { kind: 'weekly' }, suggested: true },
{ id: 'st6', title: 'Do the grocery shopping', area: 'general', due: 'tomorrow', repeat: { kind: 'weekly' }, suggested: false },
{ id: 'st7', title: 'Change the bed sheets', area: 'laundry', due: 'week', repeat: { kind: 'weekly' }, suggested: false },
{ id: 'st8', title: 'Water the plants', area: 'outside', due: 'week', suggested: false }];